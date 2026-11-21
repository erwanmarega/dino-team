import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import handler from '../api/contact.js'

function makeRes() {
  const res = {
    headers: {},
    statusCode: undefined,
    payload: undefined,
    setHeader(name, value) {
      res.headers[name] = value
    },
    status(code) {
      res.statusCode = code
      return res
    },
    json(data) {
      res.payload = data
      return res
    },
  }
  return res
}

function validBody(overrides = {}) {
  return {
    name: 'Alice',
    email: 'alice@example.com',
    message: 'Hello there',
    startedAt: Date.now() - 10_000,
    ...overrides,
  }
}

function makeReq({ method = 'POST', headers, body } = {}) {
  return {
    method,
    headers: { 'content-type': 'application/json', ...headers },
    body: body === undefined ? validBody() : body,
  }
}

async function run(reqOptions) {
  const res = makeRes()
  await handler(makeReq(reqOptions), res)
  return res
}

let fetchMock
let errorSpy

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
  vi.stubGlobal('fetch', fetchMock)
  vi.stubEnv('RESEND_API_KEY', 'test-key')
  vi.stubEnv('CONTACT_TO_EMAIL', 'owner@example.com')
  vi.stubEnv('CONTACT_FROM_EMAIL', '')
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('method and headers', () => {
  it('rejects non-POST with 405 and Allow: POST', async () => {
    const res = await run({ method: 'GET' })
    expect(res.statusCode).toBe(405)
    expect(res.headers.Allow).toBe('POST')
    expect(res.payload).toEqual({ ok: false, error: 'method_not_allowed' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects non-JSON content-type with 415', async () => {
    const res = await run({ headers: { 'content-type': 'text/plain' } })
    expect(res.statusCode).toBe(415)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects missing content-type with 415', async () => {
    const res = await run({ headers: { 'content-type': '' } })
    expect(res.statusCode).toBe(415)
  })

  it('accepts content-type with charset and mixed case', async () => {
    const res = await run({ headers: { 'content-type': 'Application/JSON; charset=utf-8' } })
    expect(res.statusCode).toBe(200)
  })

  it('sets Cache-Control: no-store on success and on errors', async () => {
    const ok = await run()
    const bad = await run({ method: 'GET' })
    expect(ok.headers['Cache-Control']).toBe('no-store')
    expect(bad.headers['Cache-Control']).toBe('no-store')
  })
})

describe('body size and parsing', () => {
  it('returns 413 when content-length exceeds 10 KB', async () => {
    const res = await run({ headers: { 'content-length': String(10 * 1024 + 1) } })
    expect(res.statusCode).toBe(413)
    expect(res.payload).toEqual({ ok: false, error: 'payload_too_large' })
  })

  it('does not reject content-length of exactly 10 KB', async () => {
    const res = await run({ headers: { 'content-length': String(10 * 1024) } })
    expect(res.statusCode).toBe(200)
  })

  it('returns 413 when a string body is too large', async () => {
    const res = await run({ body: JSON.stringify(validBody({ message: 'x'.repeat(11 * 1024) })) })
    expect(res.statusCode).toBe(413)
  })

  it('returns 413 when an object body is too large', async () => {
    const res = await run({ body: validBody({ extra: 'x'.repeat(11 * 1024) }) })
    expect(res.statusCode).toBe(413)
  })

  it('parses a JSON string body', async () => {
    const res = await run({ body: JSON.stringify(validBody()) })
    expect(res.statusCode).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('returns 400 invalid on unparsable JSON string', async () => {
    const res = await run({ body: '{not json' })
    expect(res.statusCode).toBe(400)
    expect(res.payload).toEqual({ ok: false, error: 'invalid', fields: [] })
  })

  it('returns 400 invalid on array body', async () => {
    const res = await run({ body: [validBody()] })
    expect(res.statusCode).toBe(400)
    expect(res.payload.error).toBe('invalid')
  })

  it('returns 400 invalid on null body and on JSON "null"', async () => {
    expect((await run({ body: null })).statusCode).toBe(400)
    expect((await run({ body: 'null' })).statusCode).toBe(400)
  })
})

describe('field validation', () => {
  it('lists every invalid field when all are missing', async () => {
    const res = await run({ body: { startedAt: Date.now() - 10_000 } })
    expect(res.statusCode).toBe(400)
    expect(res.payload.fields).toEqual(['name', 'email', 'message'])
  })

  it('flags a missing name only', async () => {
    const res = await run({ body: validBody({ name: undefined }) })
    expect(res.payload.fields).toEqual(['name'])
  })

  it('flags non-string values', async () => {
    const res = await run({ body: validBody({ name: 42, message: { a: 1 } }) })
    expect(res.payload.fields).toEqual(['name', 'message'])
  })

  it.each([
    'not-an-email',
    'a@b',
    'a@b.c, x@y.z',
    'a@b.c;x@y.z',
    'a b@c.de',
    '<a@b.cd>',
  ])('flags bad email %j', async (email) => {
    const res = await run({ body: validBody({ email }) })
    expect(res.statusCode).toBe(400)
    expect(res.payload.fields).toEqual(['email'])
  })

  it.each(['Al\nice', 'Al\r\nice', 'Al ice'])('flags control chars in name %j', async (name) => {
    const res = await run({ body: validBody({ name }) })
    expect(res.payload.fields).toEqual(['name'])
  })

  it('flags CR/LF in email', async () => {
    const res = await run({ body: validBody({ email: 'a@b.cd\r\nBcc: x@y.zz' }) })
    expect(res.payload.fields).toEqual(['email'])
  })

  it('flags name longer than 100 chars', async () => {
    const res = await run({ body: validBody({ name: 'n'.repeat(101) }) })
    expect(res.payload.fields).toEqual(['name'])
  })

  it('flags message longer than 1000 chars and accepts exactly 1000', async () => {
    const bad = await run({ body: validBody({ message: 'm'.repeat(1001) }) })
    expect(bad.payload.fields).toEqual(['message'])
    const good = await run({ body: validBody({ message: 'm'.repeat(1000) }) })
    expect(good.statusCode).toBe(200)
  })

  it('flags values empty after trim', async () => {
    const res = await run({ body: validBody({ name: '   ', email: ' \t ', message: '\n  ' }) })
    expect(res.payload.fields).toEqual(['name', 'email', 'message'])
  })

  it('allows newlines inside the message', async () => {
    const res = await run({ body: validBody({ message: 'line1\nline2' }) })
    expect(res.statusCode).toBe(200)
  })
})

describe('anti-spam', () => {
  it('returns fake 200 for a filled honeypot without sending', async () => {
    const res = await run({ body: validBody({ website: 'http://spam.example' }) })
    expect(res.statusCode).toBe(200)
    expect(res.payload).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('treats empty or null honeypot as human', async () => {
    expect((await run({ body: validBody({ website: '' }) })).statusCode).toBe(200)
    expect((await run({ body: validBody({ website: null }) })).statusCode).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it.each([
    ['missing', undefined],
    ['non-numeric', '123'],
    ['NaN-like null', null],
    ['too recent', Date.now() - 1000],
    ['in the future', Date.now() + 60_000],
    ['older than 24h', Date.now() - 24 * 60 * 60 * 1000 - 1000],
  ])('returns 429 retry when startedAt is %s', async (_label, startedAt) => {
    const res = await run({ body: validBody({ startedAt }) })
    expect(res.statusCode).toBe(429)
    expect(res.payload).toEqual({ ok: false, error: 'retry' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('uses the clock: accepts exactly 3 s elapsed with fake timers', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'))
    const startedAt = Date.now() - 3000
    const res = await run({ body: validBody({ startedAt }) })
    expect(res.statusCode).toBe(200)
  })
})

describe('configuration', () => {
  it('returns 502 send_failed when RESEND_API_KEY is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const res = await run()
    expect(res.statusCode).toBe(502)
    expect(res.payload).toEqual({ ok: false, error: 'send_failed' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns 502 send_failed when CONTACT_TO_EMAIL is missing', async () => {
    vi.stubEnv('CONTACT_TO_EMAIL', '')
    const res = await run()
    expect(res.statusCode).toBe(502)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('sending', () => {
  it('calls Resend once with the expected request', async () => {
    const res = await run({
      body: validBody({ name: '  Alice  ', email: ' alice@example.com ', message: '  Hi  ' }),
    })
    expect(res.statusCode).toBe(200)
    expect(res.payload).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.method).toBe('POST')
    expect(init.headers.Authorization).toBe('Bearer test-key')
    expect(init.headers['Content-Type']).toBe('application/json')
    expect(init.signal).toBeInstanceOf(AbortSignal)

    const sent = JSON.parse(init.body)
    expect(sent.to).toEqual(['owner@example.com'])
    expect(sent.reply_to).toEqual(['alice@example.com'])
    expect(sent.subject).toBe('Nouveau message du site DinoTeam')
    expect(sent.subject).not.toContain('Alice')
    expect(sent.text).toContain('Nom : Alice\n')
    expect(sent.text).toContain('Email : alice@example.com\n')
    expect(sent.text).toContain('Message :\nHi\n')
  })

  it('uses the default from address when CONTACT_FROM_EMAIL is unset', async () => {
    await run()
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).from).toBe('DinoTeam <onboarding@resend.dev>')
  })

  it('uses CONTACT_FROM_EMAIL when set', async () => {
    vi.stubEnv('CONTACT_FROM_EMAIL', 'Site <site@example.com>')
    await run()
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).from).toBe('Site <site@example.com>')
  })
})

describe('Resend failures', () => {
  const visitor = { name: 'SecretName', email: 'secret@example.com', message: 'SecretMessage' }

  function loggedText() {
    return errorSpy.mock.calls.flat().map(String).join(' ')
  }

  function expectNoVisitorData() {
    const logged = loggedText()
    for (const value of Object.values(visitor)) expect(logged).not.toContain(value)
  }

  it('returns 502 on a non-OK Resend response and logs no visitor data', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ name: 'validation_error', message: 'bad address secret@example.com' }),
    })
    const res = await run({ body: validBody(visitor) })
    expect(res.statusCode).toBe(502)
    expect(res.payload).toEqual({ ok: false, error: 'send_failed' })
    expect(errorSpy).toHaveBeenCalled()
    expect(loggedText()).toContain('422')
    expect(loggedText()).toContain('validation_error')
    expectNoVisitorData()
  })

  it('returns 502 when the error body of Resend is unreadable', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('bad json')
      },
    })
    const res = await run({ body: validBody(visitor) })
    expect(res.statusCode).toBe(502)
    expect(loggedText()).toContain('500')
  })

  it('returns 502 when fetch throws and logs no visitor data', async () => {
    fetchMock.mockRejectedValue(new Error('network down for secret@example.com SecretName'))
    const res = await run({ body: validBody(visitor) })
    expect(res.statusCode).toBe(502)
    expect(res.payload).toEqual({ ok: false, error: 'send_failed' })
    expect(errorSpy).toHaveBeenCalled()
    expectNoVisitorData()
  })

  it('does not log the API key', async () => {
    fetchMock.mockRejectedValue(new Error('boom test-key'))
    await run()
    expect(loggedText()).not.toContain('test-key')
  })
})
