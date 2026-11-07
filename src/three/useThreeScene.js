import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'

/**
 * Mounts a Three.js scene on a <canvas> ref.
 *
 * `setup(ctx)` builds the scene and returns `update(t, ctx)`, called every
 * frame while the canvas is on screen. `ctx.pointer` is the eased pointer
 * position over the canvas's parent (-1..1).
 */
export function useThreeScene(canvasRef, setup, { shadows = false } = {}) {
  let dispose = () => {}

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    try {
      dispose = mount(canvas, setup, { shadows })
    } catch (e) {
      console.warn('[DinoTeam 3D]', e)
    }
  })

  onBeforeUnmount(() => dispose())
}

function mount(canvas, setup, { shadows }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  if (shadows) {
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  const ctx = { scene, camera, renderer, pointer: { x: 0, y: 0 }, target: { x: 0, y: 0 } }
  const update = setup(ctx)

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const draw = (t) => {
    update(t, ctx)
    renderer.render(scene, camera)
  }

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    if (reduce) draw(0)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  let visible = true
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting
  })
  io.observe(canvas)

  const host = canvas.parentElement
  const onMove = (e) => {
    const r = host.getBoundingClientRect()
    ctx.target.x = ((e.clientX - r.left) / r.width) * 2 - 1
    ctx.target.y = ((e.clientY - r.top) / r.height) * 2 - 1
  }
  const onLeave = () => {
    ctx.target.x = 0
    ctx.target.y = 0
  }
  host.addEventListener('pointermove', onMove)
  host.addEventListener('pointerleave', onLeave)

  let raf = 0
  const start = performance.now()
  const tick = (now) => {
    raf = requestAnimationFrame(tick)
    if (!visible) return
    ctx.pointer.x += (ctx.target.x - ctx.pointer.x) * 0.06
    ctx.pointer.y += (ctx.target.y - ctx.pointer.y) * 0.06
    draw((now - start) / 1000)
  }
  if (reduce) draw(0)
  else raf = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    host.removeEventListener('pointermove', onMove)
    host.removeEventListener('pointerleave', onLeave)
    scene.traverse((o) => {
      o.geometry?.dispose()
      const m = o.material
      if (!m) return
      ;(Array.isArray(m) ? m : [m]).forEach((mm) => {
        mm.map?.dispose()
        mm.dispose()
      })
    })
    renderer.dispose()
  }
}
