const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 10, 25);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
renderer.setSize(innerWidth, innerHeight);

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const COLOR_MIN = 0;
const COLOR_MAX = 250;
const COLOR_STEP = 0.5;

// Shader uniforms used for animation time and animated color ramps.
const uniforms = {
  time: { value: 0 },
  randomX1: { value: Math.random() * COLOR_MAX },
  randomY1: { value: Math.random() * COLOR_MAX },
  randomZ1: { value: Math.random() * COLOR_MAX },
  randomX2: { value: Math.random() * COLOR_MAX },
  randomY2: { value: Math.random() * COLOR_MAX },
  randomZ2: { value: Math.random() * COLOR_MAX },
};

const colorKeys = ["randomX1", "randomY1", "randomZ1", "randomX2", "randomY2", "randomZ2"];
const directions = Object.fromEntries(colorKeys.map((key) => [key, false]));

function updateOscillatingUniformValue(uniformKey) {
  const uniform = uniforms[uniformKey];
  const isAscending = directions[uniformKey];

  uniform.value += isAscending ? COLOR_STEP : -COLOR_STEP;

  if (uniform.value <= COLOR_MIN) {
    uniform.value = COLOR_MIN;
    directions[uniformKey] = true;
  } else if (uniform.value >= COLOR_MAX) {
    uniform.value = COLOR_MAX;
    directions[uniformKey] = false;
  }
}

function rerollColors() {
  for (const key of colorKeys) {
    updateOscillatingUniformValue(key);
  }

  // Keep a little asymmetry so all channels do not move in lockstep.
  const x1 = directions.randomX1;
  const y1 = directions.randomY1;
  const z1 = directions.randomZ1;

  if ((x1 && y1 && z1) || (!x1 && !y1 && !z1)) {
    directions.randomX1 = true;
    directions.randomY1 = false;
    directions.randomZ1 = true;
  }

  if ((directions.randomY1 && directions.randomZ1) || (!directions.randomY1 && !directions.randomZ1)) {
    directions.randomY1 = false;
  }
}

function createGalaxyGeometry() {
  const points = [];
  const sizes = [];
  const shifts = [];

  const pushShift = () => {
    shifts.push(
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2,
      (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
      Math.random() * 0.9 + 0.1
    );
  };

  for (let i = 0; i < 10000; i += 1) {
    sizes.push(Math.random() * 1.5 + 0.5);
    pushShift();
    points.push(new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5));
  }

  for (let i = 0; i < 50000; i += 1) {
    const innerRadius = 10;
    const outerRadius = 40;
    const rand = Math.pow(Math.random(), 1.5);
    const radius = Math.sqrt(outerRadius * outerRadius * rand + (1 - rand) * innerRadius * innerRadius);

    points.push(
      new THREE.Vector3().setFromCylindricalCoords(
        radius,
        Math.random() * 2 * Math.PI,
        (Math.random() - 0.5) * 2
      )
    );
    sizes.push(Math.random() * 1.5 + 0.5);
    pushShift();
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute("shift", new THREE.Float32BufferAttribute(shifts, 4));
  return geometry;
}

const galaxyGeometry = createGalaxyGeometry();

function createColorMaterial(colorAOrder, colorBOrder, options = {}) {
  const { additive = true } = options;

  const material = new THREE.PointsMaterial({
    size: 0.1,
    transparent: additive,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    onBeforeCompile: (shader) => {
      shader.uniforms.time = uniforms.time;
      for (const key of colorKeys) {
        shader.uniforms[key] = uniforms[key];
      }

      shader.vertexShader = `
        uniform float time;
        uniform float randomX1;
        uniform float randomY1;
        uniform float randomZ1;
        uniform float randomX2;
        uniform float randomY2;
        uniform float randomZ2;
        attribute float sizes;
        attribute vec4 shift;
        varying vec3 vColor;
        ${shader.vertexShader}
      `
        .replace("gl_PointSize = size;", "gl_PointSize = size * sizes;")
        .replace(
          "#include <color_vertex>",
          `#include <color_vertex>
           vec3 randColor1 = vec3(${colorAOrder.join(", ")});
           vec3 randColor2 = vec3(${colorBOrder.join(", ")});
           float d = length(abs(position) / vec3(40., 10., 40));
           d = clamp(d, 0., 1.);
           vColor = mix(randColor1, randColor2, d) / 255.;`
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           float t = time;
           float moveT = mod(shift.x + shift.z * t, PI2);
           float moveS = mod(shift.y + shift.z * t, PI2);
           transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;`
        );

      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `
        .replace(
          "#include <clipping_planes_fragment>",
          `#include <clipping_planes_fragment>
           float d = length(gl_PointCoord.xy - 0.5);
           if (d > 0.5) discard;`
        )
        .replace(
          "vec4 diffuseColor = vec4( diffuse, opacity );",
          "vec4 diffuseColor = vec4(vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5);"
        );
    },
  });

  return material;
}

// Main cloud in front of the camera.
const mainCloud = new THREE.Points(
  galaxyGeometry,
  createColorMaterial(["randomZ1", "randomX1", "randomY1"], ["randomY2", "randomZ2", "randomX2"], {
    additive: false,
  })
);
mainCloud.rotation.order = "ZYX";
mainCloud.rotation.z = 0.2;
scene.add(mainCloud);

// Variants reused across planets instead of creating a new shader per planet.
const planetMaterials = [
  createColorMaterial(["randomY1", "randomZ1", "randomX1"], ["randomZ2", "randomX2", "randomY2"]),
  createColorMaterial(["randomX1", "randomY1", "randomZ1"], ["randomX2", "randomY2", "randomZ2"]),
  createColorMaterial(["randomZ1", "randomX1", "randomY1"], ["randomY2", "randomZ2", "randomX2"]),
  createColorMaterial(["randomX1", "randomY2", "randomZ2"], ["randomX2", "randomY1", "randomZ1"]),
  createColorMaterial(["randomX2", "randomY2", "randomZ2"], ["randomX1", "randomY1", "randomZ1"]),
];

function addPlanet(material) {
  const planet = new THREE.Points(galaxyGeometry, material);
  const [x, y, z] = Array.from({ length: 3 }, () => THREE.MathUtils.randFloatSpread(1500));

  planet.position.set(x, y, z);
  planet.rotation.order = "ZYX";
  planet.rotation.z = 0.2;
  scene.add(planet);
}

for (let i = 0; i < 50; i += 1) {
  addPlanet(planetMaterials[i % planetMaterials.length]);
}

// Reuse geometry/material for all stars to reduce GPU allocations.
const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0x70a0af });

function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  const [x, y, z] = Array.from({ length: 3 }, () => THREE.MathUtils.randFloatSpread(1000));
  star.position.set(x, y, z);
  scene.add(star);
}

for (let i = 0; i < 2000; i += 1) {
  addStar();
}

scene.background = new THREE.TextureLoader().load("./space.jpg");

const clock = new THREE.Clock();
const rotationSpeed = 0.05;

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  camera.position.z = top * -0.02;
  camera.position.x = top * -0.01;
  camera.rotation.y = top * -0.0001;
}

document.body.onscroll = moveCamera;
moveCamera();

renderer.setAnimationLoop(() => {
  rerollColors();

  const elapsed = clock.getElapsedTime() * 0.5;
  uniforms.time.value = elapsed * Math.PI;
  mainCloud.rotation.y = elapsed * rotationSpeed;

  renderer.render(scene, camera);
});