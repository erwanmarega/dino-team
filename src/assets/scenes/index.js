// Responsive scene backgrounds (WebP, 1920×1088 originals) shared by the page
// heroes, the menu and the route transition. Phones get the 960 or 1440 file,
// desktops the 1920 one.
import forestRails960 from './forest-rails-960.webp'
import forestRails1440 from './forest-rails-1440.webp'
import forestRails1920 from './forest-rails-1920.webp'
import boutique960 from './boutique-studio-960.webp'
import boutique1440 from './boutique-studio-1440.webp'
import boutique1920 from './boutique-studio-1920.webp'
import river960 from './river-tent-960.webp'
import river1440 from './river-tent-1440.webp'
import river1920 from './river-tent-1920.webp'
import clearing960 from './clearing-960.webp'
import clearing1440 from './clearing-1440.webp'
import clearing1920 from './clearing-1920.webp'

// Scenes are always displayed full-bleed (or close to it)
export const SCENE_SIZES = '100vw'

const scene = (w960, w1440, w1920) => ({
  src: w1920,
  srcset: `${w960} 960w, ${w1440} 1440w, ${w1920} 1920w`,
})

export const forestRails = scene(forestRails960, forestRails1440, forestRails1920)
export const boutique = scene(boutique960, boutique1440, boutique1920)
export const river = scene(river960, river1440, river1920)
export const clearing = scene(clearing960, clearing1440, clearing1920)

/** Warm the cache with the exact file the browser would pick for an <img sizes="100vw">. */
export function preloadScene({ src, srcset }) {
  const img = new Image()
  img.sizes = SCENE_SIZES
  img.srcset = srcset
  img.src = src
}
