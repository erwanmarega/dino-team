// Updates document head tags (description, canonical, Open Graph, robots) for a route.
function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(create.tag)
    for (const [k, v] of Object.entries(create.attrs)) el.setAttribute(k, v)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const meta = (attr, name) => ({
  selector: `meta[${attr}="${name}"]`,
  create: { tag: 'meta', attrs: { [attr]: name } },
})

export function applyPageMeta(to) {
  const title = to.meta.title || 'DinoTeam'
  const description = to.meta.description || ''
  const url = window.location.origin + to.path

  document.title = title

  const set = (attr, name, value) => {
    const m = meta(attr, name)
    setTag(m.selector, m.create, 'content', value)
  }
  set('name', 'description', description)
  set('property', 'og:title', title)
  set('property', 'og:description', description)
  set('property', 'og:url', url)
  set('name', 'robots', to.meta.noindex ? 'noindex' : 'index, follow')

  setTag('link[rel="canonical"]', { tag: 'link', attrs: { rel: 'canonical' } }, 'href', url)
}
