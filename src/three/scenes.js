import * as THREE from 'three'

// Keep in sync with --red / --red-deep in style.css.
export const BRAND = {
  red: '#E3261F',
  redDeep: '#8E1216',
  dark: '#141414',
}

// Light intensities below come from the design, which used Three's legacy
// (non-physical) lighting; multiply by PI for the same look in current Three.
const L = Math.PI

function materials() {
  return {
    red: new THREE.MeshStandardMaterial({ color: BRAND.red, metalness: 0.85, roughness: 0.3 }),
    black: new THREE.MeshStandardMaterial({ color: 0x161513, metalness: 0.35, roughness: 0.55 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xc9c6bf, metalness: 0.95, roughness: 0.22 }),
    redDeep: new THREE.MeshStandardMaterial({ color: BRAND.redDeep, metalness: 0.1, roughness: 0.7 }),
    dark: new THREE.MeshStandardMaterial({ color: BRAND.dark, metalness: 0.1, roughness: 0.8 }),
    frame: new THREE.MeshStandardMaterial({ color: 0x1a1918, metalness: 0.6, roughness: 0.45 }),
  }
}

function cylX(r, len, mat, x = 0, segments = 48) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, segments), mat)
  m.rotation.z = Math.PI / 2
  m.position.x = x
  return m
}

function dumbbell(M, s) {
  const g = new THREE.Group()
  g.add(cylX(0.12 * s, 2.4 * s, M.steel))
  for (let i = -3; i <= 3; i++) g.add(cylX(0.135 * s, 0.03 * s, M.frame, i * 0.07 * s))
  for (const d of [-1, 1]) {
    g.add(cylX(0.2 * s, 0.08 * s, M.steel, d * 0.62 * s))
    g.add(cylX(0.85 * s, 0.22 * s, M.black, d * 0.77 * s))
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.85 * s, 0.03 * s, 12, 64), M.red)
    rim.rotation.y = Math.PI / 2
    rim.position.x = d * 0.77 * s
    g.add(rim)
    g.add(cylX(0.7 * s, 0.14 * s, M.red, d * 0.95 * s))
    g.add(cylX(0.22 * s, 0.1 * s, M.steel, d * 1.08 * s))
  }
  return g
}

function kettlebell(mat, s) {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.32 * s, 32, 24), mat)
  body.position.y = 0.3 * s
  body.scale.y = 0.92
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * s, 0.2 * s, 0.04 * s, 32), mat)
  base.position.y = 0.02 * s
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.2 * s, 0.045 * s, 12, 32, Math.PI), mat)
  handle.position.y = 0.52 * s
  g.add(body, base, handle)
  return g
}

function textTexture(w, h, draw) {
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const c2 = cv.getContext('2d')
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  const paint = () => {
    c2.clearRect(0, 0, w, h)
    draw(c2)
    tex.needsUpdate = true
  }
  paint()
  document.fonts?.ready.then(paint)
  return tex
}

/** Habitat: the future private gym, slowly orbiting. */
export function buildSalle(ctx) {
  const { scene, camera: cam } = ctx
  const M = materials()
  cam.fov = 40
  cam.updateProjectionMatrix()

  const box = (w, h, d, mat, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    m.position.set(x, y, z)
    scene.add(m)
    return m
  }

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.9 }),
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)
  const mat = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 4.2),
    new THREE.MeshStandardMaterial({ color: 0x151413, roughness: 0.95 }),
  )
  mat.rotation.x = -Math.PI / 2
  mat.position.set(0.4, 0.005, -1.4)
  scene.add(mat)

  const wallM = new THREE.MeshStandardMaterial({ color: 0x262626, roughness: 0.85 })
  box(12, 5, 0.1, wallM, 0, 2.5, -4.05)
  box(0.1, 5, 10, wallM, -5.05, 2.5, 0)
  box(3.4, 1.9, 0.06, M.dark, 2.6, 2.6, -3.97)

  const logo = textTexture(1024, 512, (c) => {
    c.fillStyle = BRAND.red
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.font = '170px "Bebas Neue", Impact, sans-serif'
    c.fillText('DINOTEAM', 512, 230)
    c.fillRect(352, 350, 320, 5)
    c.font = "500 44px Oswald, sans-serif"
    c.fillText('PRIVATE GYM', 512, 420)
  })
  const lg = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 1.6),
    new THREE.MeshStandardMaterial({ map: logo, transparent: true, metalness: 0.4, roughness: 0.4 }),
  )
  lg.position.set(2.6, 2.6, -3.93)
  scene.add(lg)

  const strip = new THREE.MeshStandardMaterial({
    color: 0xffe2b0,
    emissive: 0xffd08a,
    emissiveIntensity: 1.2,
  })
  box(11, 0.04, 0.04, strip, 0, 4.4, -3.95)
  box(0.04, 0.04, 9, strip, -4.95, 4.4, 0)
  for (let i = 0; i < 6; i++) box(0.08, 3.6, 0.04, M.redDeep, -4.2 + i * 0.32, 1.8, -3.97)

  // Rack
  const px = -0.6
  const pz = -2.9
  for (const [dx, dz] of [
    [-0.75, 0],
    [0.75, 0],
    [-0.75, 0.75],
    [0.75, 0.75],
  ])
    box(0.09, 2.6, 0.09, M.frame, px + dx, 1.3, pz + dz)
  box(1.6, 0.08, 0.08, M.frame, px, 2.6, pz)
  box(1.6, 0.08, 0.08, M.frame, px, 2.6, pz + 0.75)
  box(0.08, 0.08, 0.84, M.frame, px - 0.75, 2.6, pz + 0.37)
  box(0.08, 0.08, 0.84, M.frame, px + 0.75, 2.6, pz + 0.37)
  box(0.14, 0.06, 0.14, M.red, px - 0.75, 1.38, pz + 0.82)
  box(0.14, 0.06, 0.14, M.red, px + 0.75, 1.38, pz + 0.82)

  // Barbell
  const bar = new THREE.Group()
  bar.add(cylX(0.03, 2.4, M.steel))
  for (const d of [-1, 1]) {
    bar.add(cylX(0.45, 0.07, M.black, d * 0.92))
    bar.add(cylX(0.36, 0.06, M.red, d * 1.0))
    bar.add(cylX(0.05, 0.06, M.steel, d * 1.07))
  }
  bar.position.set(px, 1.46, pz + 0.82)
  scene.add(bar)

  // Bench
  const bx = 2.2
  const bz = -0.6
  box(0.38, 0.1, 1.3, M.redDeep, bx, 0.48, bz)
  box(0.06, 0.43, 0.06, M.frame, bx, 0.215, bz - 0.5)
  box(0.06, 0.43, 0.06, M.frame, bx, 0.215, bz + 0.5)
  box(0.5, 0.05, 0.08, M.frame, bx, 0.03, bz - 0.5)
  box(0.5, 0.05, 0.08, M.frame, bx, 0.03, bz + 0.5)

  // Dumbbell rack
  box(0.7, 0.7, 3.2, M.frame, -4.4, 0.35, -0.3)
  for (let i = 0; i < 6; i++) {
    const d = dumbbell(M, 0.17 + i * 0.012)
    d.position.set(-4.4, 0.85, -1.6 + i * 0.52)
    d.rotation.y = Math.PI / 2
    scene.add(d)
  }

  // Kettlebells
  const kbMats = [M.frame, M.redDeep, M.dark]
  for (let i = 0; i < 3; i++) {
    const k = kettlebell(kbMats[i], 0.9 + i * 0.15)
    k.position.set(-2.6 + i * 0.6, 0, 0.9)
    k.rotation.y = 0.4
    scene.add(k)
  }

  // Plate stack
  for (let i = 0; i < 5; i++) {
    const r = 0.45 - i * 0.04
    const p = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.07, 48), i % 2 ? M.red : M.black)
    p.position.set(3.6, 0.035 + i * 0.075, -3.0)
    scene.add(p)
  }

  const mirror = new THREE.MeshStandardMaterial({ color: 0x8c8a86, metalness: 1, roughness: 0.08 })
  box(0.04, 2.2, 3.6, mirror, -4.98, 1.7, -0.3)

  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x241e17, 0.55 * L))
  const sun = new THREE.DirectionalLight(0xffe6c0, 1.1 * L)
  sun.position.set(3, 7, 5)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 20 })
  sun.shadow.bias = -0.0005
  scene.add(sun)
  const p1 = new THREE.PointLight(0xffd29a, 0.8 * L, 9, 1)
  p1.position.set(-2, 3.8, 0)
  scene.add(p1)
  const p2 = new THREE.PointLight(0xffd29a, 0.6 * L, 9, 1)
  p2.position.set(2.5, 3.8, -1.5)
  scene.add(p2)

  scene.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = o !== floor && o !== mat
      o.receiveShadow = true
    }
  })

  return (t, c) => {
    const a = Math.sin(t * 0.18) * 0.5 + 0.15 + c.pointer.x * 0.25
    const r = 9.6
    cam.position.set(Math.sin(a) * r, 4.4 - c.pointer.y * 0.6, Math.cos(a) * r)
    cam.lookAt(-0.3, 1.0, -1.0)
  }
}
