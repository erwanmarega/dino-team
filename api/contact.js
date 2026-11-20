// Vercel serverless function: sends the contact form by e-mail via Resend.

const MAX_BODY_BYTES = 10 * 1024
const MIN_FILL_MS = 3000
const MAX_AGE_MS = 24 * 60 * 60 * 1000
const SEND_TIMEOUT_MS = 8000
// No separators/quotes so a single address only reaches reply_to.
const EMAIL_RE = /^[^\s@,;<>()"'\\]+@[^\s@,;<>()"'\\]+\.[^\s@,;<>()"'\\]+$/
// Control characters (incl. CR/LF and Unicode line separators)
const CONTROL_RE = /[\u0000-\u001f\u007f\u2028\u2029]/

function send(res, status, payload) {
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).json(payload)
}

// Returns the parsed body object, or an error code string.
function readBody(req) {
  const length = Number(req.headers['content-length'])
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) return 'payload_too_large'

  let body = req.body
  if (typeof body === 'string') {
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) return 'payload_too_large'
    try {
      body = JSON.parse(body)
    } catch {
      return 'invalid'
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'invalid'
  if (Buffer.byteLength(JSON.stringify(body)) > MAX_BODY_BYTES) return 'payload_too_large'
  return body
}

// Returns { values, invalid } with trimmed values and the list of invalid fields.
function validate(body) {
  const invalid = []
  const values = {}
  const rules = {
    name: { min: 1, max: 100, noControl: true },
    email: { min: 3, max: 255, noControl: true, regex: EMAIL_RE },
    message: { min: 1, max: 1000 },
  }
  for (const [field, rule] of Object.entries(rules)) {
    const raw = body[field]
    if (typeof raw !== 'string') {
      invalid.push(field)
      continue
    }
    const value = raw.trim()
    const bad =
      value.length < rule.min ||
      value.length > rule.max ||
      (rule.noControl && CONTROL_RE.test(value)) ||
      (rule.regex && !rule.regex.test(value))
    if (bad) invalid.push(field)
    values[field] = value
  }
  return { values, invalid }
}

// Honeypot filled: almost certainly a bot.
function isHoneypot(body) {
  return body.website !== undefined && body.website !== null && body.website !== ''
}

// Submitted too fast or from a stale page. Not a silent drop: a human may hit
// this (autofill + Enter), so the client is told to retry.
function hasBadTiming(body) {
  const { startedAt } = body
  if (typeof startedAt !== 'number' || !Number.isFinite(startedAt)) return true
  const elapsed = Date.now() - startedAt
  return elapsed < MIN_FILL_MS || elapsed > MAX_AGE_MS
}

async function sendEmail({ name, email, message }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS)
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'DinoTeam <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: [email],
        // Fixed subject: the visitor's name stays in the body only.
        subject: 'Nouveau message du site DinoTeam',
        text: `Nom : ${name}\nEmail : ${email}\nDate : ${new Date().toISOString()}\n\nMessage :\n${message}\n`,
      }),
      signal: controller.signal,
    })
    if (!response.ok) {
      // Log the error type only: Resend's message may echo visitor data.
      let errorName = ''
      try {
        const data = await response.json()
        errorName = data?.name ?? ''
      } catch {
        // ignore unreadable error body
      }
      console.error(`Resend error: status=${response.status} ${errorName}`.trim())
      return false
    }
    return true
  } catch (err) {
    console.error(`Resend request failed: ${err?.name ?? 'Error'}`)
    return false
  } finally {
    clearTimeout(timer)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { ok: false, error: 'method_not_allowed' })
  }

  const contentType = String(req.headers['content-type'] || '')
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return send(res, 415, { ok: false, error: 'unsupported_media_type' })
  }

  const body = readBody(req)
  if (body === 'payload_too_large') return send(res, 413, { ok: false, error: body })
  if (body === 'invalid') return send(res, 400, { ok: false, error: 'invalid', fields: [] })

  const { values, invalid } = validate(body)
  if (invalid.length) return send(res, 400, { ok: false, error: 'invalid', fields: invalid })

  // Bots get a fake success and nothing is sent.
  if (isHoneypot(body)) return send(res, 200, { ok: true })
  if (hasBadTiming(body)) return send(res, 429, { ok: false, error: 'retry' })

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error('Contact form not configured: RESEND_API_KEY or CONTACT_TO_EMAIL missing')
    // Generic error: don't reveal the setup state to visitors.
    return send(res, 502, { ok: false, error: 'send_failed' })
  }

  const sent = await sendEmail(values)
  if (!sent) return send(res, 502, { ok: false, error: 'send_failed' })
  return send(res, 200, { ok: true })
}
