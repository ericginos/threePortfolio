
//import * as THREE from './three.js';//'../three';
// import { InteractionManager } from "../three.interactive";

// import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls';
// import { MeshSurfaceSampler } from '../three/examples/jsm/math/MeshSurfaceSampler';

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector('#bg'),
//   antialias: true
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.set(0, 1, 1.5);

// const controls = new OrbitControls(camera, renderer.domElement);

// const group = new THREE.Group();
// scene.add(group);

// // Create a cube with basic geometry & material
// const geometry = new THREE.TorusKnotGeometry(4, 1.3, 100, 16);
// const torusKnot = new THREE.Mesh(geometry);

// // Instantiate a sampler so we can use it later
// const sampler = new MeshSurfaceSampler(torusKnot).build();

// // Define the basic geometry of the spheres
// const sphereGeometry = new THREE.SphereGeometry(0.05, 6, 6);
// // Define the basic material of the spheres
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffa0e6
// });
// const spheres = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, 300);
// group.add(spheres);

// // Array used to store all points coordinates
// const vertices = [];
// // Create a dummy Vector to store the sampled coordinates
// const tempPosition = new THREE.Vector3();
// // Loop to sample a coordinate for each points
// for (let i = 0; i < 15000; i ++) {
//   // Sample a random position in the torus
//   sampler.sample(tempPosition);
//   // Push the coordinates of the sampled coordinates into the array
//   vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
// }

// // Create a geometry for the points
// const pointsGeometry = new THREE.BufferGeometry();
// // Define all points positions from the previously created array
// pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
// // Define the matrial of the points
// const pointsMaterial = new THREE.PointsMaterial({
//   color: 0xff61d5,
//   size: 0.03
// });
// // Create an instance of points based on the geometry & material
// const points = new THREE.Points(pointsGeometry, pointsMaterial);
// // Add them into the main group
// group.add(points);

// const axisZ = new THREE.Vector3(0,0,1);
// const axisX = new THREE.Vector3(1,0,0);
// const axisY = new THREE.Vector3(0,1,0);

// function render () {  
//   // Rotate the cube a little on each frame
//   //group.rotation.y += 0.01;

//   points.rotateOnAxis(axisZ, Math.PI/360);
//   points.rotateOnAxis(axisX, Math.PI/360);
//   points.rotateOnAxis(axisY, Math.PI/360);
  
//   renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(render);

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }
// window.addEventListener('resize', onWindowResize);

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper);



console.clear();

let scene = new THREE.Scene();
// scene.background = new THREE.Color(0x160016);
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 10, 25);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", event => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
})

// const interactionManager = new InteractionManager(
//   renderer,
//   camera,
//   renderer.domElement
// );

// ORBIT CONTROLS

// let controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enablePan = false;

//LIGHT AND GRID HELPERS

// const pointLight = new THREE.PointLight(0xffffff)
// pointLight.position.set(5,5,5)

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight,ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper(200,5)
// scene.add(gridHelper)

let gu = {
  time: {value: 0},
  randomX1: {value: Math.random() * 250},
  randomY1: {value: Math.random() * 250},
  randomZ1: {value: Math.random() * 250},
  randomX2: {value: Math.random() * 250},
  randomY2: {value: Math.random() * 250},
  randomZ2: {value: Math.random() * 250}
}

let directionX1 = false;
let directionY1 = false;
let directionZ1 = false;
let directionX2 = false;
let directionY2 = false;
let directionZ2 = false;

function reroll(){

  

  if(gu.randomX1.value <= 0 && directionX1 == false){ // down and less than or 0
    directionX1 = true;
    gu.randomX1.value += 0.5;
  }
  else if(gu.randomX1.value <= 0 && directionX1 == true){ // up and less than or 0
    gu.randomX1.value += 0.5;
  }
  else if(directionX1 == true && gu.randomX1.value <= 250){  // up and less than 250
    gu.randomX1.value += 0.5;
  }
  else if(directionX1 == true && gu.randomX1.value > 250){ //up and above 250 change to down and decrement
    directionX1 = false;
    gu.randomX1.value -= 0.5;
  }
  else if(directionX1 == false && gu.randomX1.value > 250){ //down and above 250 decrement
    gu.randomX1.value -= 0.5;
  }
  else if(directionX1 == false && gu.randomX1.value > 0){ // down but not zero
    directionX1 = false;
    gu.randomX1.value -= 0.5;
  }
  

  if(gu.randomY1.value <= 0 && directionY1 == false){ // down and less than or 0
    directionY1 = true;
    gu.randomY1.value += 0.5;
  }
  else if(gu.randomY1.value <= 0 && directionY1 == true){ // up and less than or 0
    gu.randomY1.value += 0.5;
  }
  else if(directionY1 == true && gu.randomY1.value <= 250){  // up and less than 250
    gu.randomY1.value += 0.5;
  }
  else if(directionY1 == true && gu.randomY1.value > 250){ //up and above 250 change to down and decrement
    directionY1 = false;
    gu.randomY1.value -= 0.5;
  }
  else if(directionY1 == false && gu.randomY1.value > 250){ //down and above 250 decrement
    gu.randomY1.value -= 0.5;
  }
  else if(directionY1 == false && gu.randomY1.value > 0){ // down but not zero
    directionY1 = false;
    gu.randomY1.value -= 0.5;
  }


  if(gu.randomZ1.value <= 0 && directionZ1 == false){ // down and less than or 0
    directionZ1 = true;
    gu.randomZ1.value += 0.5;
  }
  else if(gu.randomZ1.value <= 0 && directionZ1 == true){ // up and less than or 0
    gu.randomZ1.value += 0.5;
  }
  else if(directionZ1 == true && gu.randomZ1.value <= 250){  // up and less than 250
    gu.randomZ1.value += 0.5;
  }
  else if(directionZ1 == true && gu.randomZ1.value > 250){ //up and above 250 change to down and decrement
    directionZ1 = false;
    gu.randomZ1.value -= 0.5;
  }
  else if(directionZ1 == false && gu.randomZ1.value > 250){ //down and above 250 decrement
    gu.randomZ1.value -= 0.5;
  }
  else if(directionZ1 == false && gu.randomZ1.value > 0){ // down but not zero
    directionZ1 = false;
    gu.randomZ1.value -= 0.5;
  }

  
  if(gu.randomX2.value <= 0 && directionX2 == false){ // down and less than or 0
    directionX2 = true;
    gu.randomX2.value += 0.5;
  }
  else if(gu.randomX2.value <= 0 && directionX2 == true){ // up and less than or 0
    gu.randomX2.value += 0.5;
  }
  else if(directionX2 == true && gu.randomX2.value <= 250){  // up and less than 250
    gu.randomX2.value += 0.5;
  }
  else if(directionX2 == true && gu.randomX2.value > 250){ //up and above 250 change to down and decrement
    directionX2 = false;
    gu.randomX2.value -= 0.5;
  }
  else if(directionX2 == false && gu.randomX2.value > 250){ //down and above 250 decrement
    gu.randomX2.value -= 0.5;
  }
  else if(directionX2 == false && gu.randomX2.value > 0){ // down but not zero
    directionX2 = false;
    gu.randomX2.value -= 0.5;
  }


  
  if(gu.randomY2.value <= 0 && directionY2 == false){ // down and less than or 0
    directionY2 = true;
    gu.randomY2.value += 0.5;
  }
  else if(gu.randomY2.value <= 0 && directionY2 == true){ // up and less than or 0
    gu.randomY2.value += 0.5;
  }
  else if(directionY2 == true && gu.randomY2.value <= 250){  // up and less than 250
    gu.randomY2.value += 0.5;
  }
  else if(directionY2 == true && gu.randomY2.value > 250){ //up and above 250 change to down and decrement
    directionY2 = false;
    gu.randomY2.value -= 0.5;
  }
  else if(directionY2 == false && gu.randomY2.value > 250){ //down and above 250 decrement
    gu.randomY2.value -= 0.5;
  }
  else if(directionY2 == false && gu.randomY2.value > 0){ // down but not zero
    directionY2 = false;
    gu.randomY2.value -= 0.5;
  }


  
  if(gu.randomZ2.value <= 0 && directionZ2 == false){ // down and less than or 0
    directionZ2 = true;
    gu.randomZ2.value += 0.5;
  }
  else if(gu.randomZ2.value <= 0 && directionZ2 == true){ // up and less than or 0
    gu.randomZ2.value += 0.5;
  }
  else if(directionZ2 == true && gu.randomZ2.value <= 250){  // up and less than 250
    gu.randomZ2.value += 0.5;
  }
  else if(directionZ2 == true && gu.randomZ2.value > 250){ //up and above 250 change to down and decrement
    directionZ2 = false;
    gu.randomZ2.value -= 0.5;
  }
  else if(directionZ2 == false && gu.randomZ2.value > 250){ //down and above 250 decrement
    gu.randomZ2.value -= 0.5;
  }
  else if(directionZ2 == false && gu.randomZ2.value > 0){ // down but not zero
    directionZ2 = false;
    gu.randomZ2.value -= 0.5;
  }

if((directionX1 && directionY1 && directionZ1) || (!directionX1 && !directionY1 && !directionZ1)){
  directionX1 = true;
  directionY1 = false;
  directionZ1 = true;
}
if((directionY1 && directionZ1)|| (!directionY1 && !directionZ1)){
  directionY1 = false;
}


// UNComment for Glitch Effect

  // if(Math.abs(gu.randomX1.value - gu.randomY1.value) < 63){
  //   gu.randomX1.value =  Math.random() * 250;
  // }
  // else if(Math.abs(gu.randomY1.value - gu.randomZ1.value) < 63){
  //   gu.randomY1.value =  Math.random() * 250;
  // }
  // else if(Math.abs(gu.randomZ1.value - gu.randomX2.value) < 63){
  //   gu.randomZ1.value =  Math.random() * 250;
  // }
  // else if(Math.abs(gu.randomX2.value - gu.randomY2.value) < 63){
  //   gu.randomX2.value =  Math.random() * 250;
  // }
  // else if(Math.abs(gu.randomY2.value - gu.randomZ2.value) < 63){
  //   gu.randomY2.value =  Math.random() * 250;
  // }
  // else if(Math.abs(gu.randomZ2.value - gu.randomX1.value) < 63){
  //   gu.randomZ2.value =  Math.random() * 250;
  // }

  // console.log("X1:" + gu.randomX1.value + "\n");
  // console.log("Y1:" + gu.randomY1.value + "\n");
  // console.log("Z1:" + gu.randomZ1.value + "\n");
  // console.log("X2:" + gu.randomX2.value + "\n");
  // console.log("Y2:" + gu.randomY2.value + "\n");
  // console.log("Z2:" + gu.randomZ1.value + "\n");

}

let sizes = [];
let shift = [];
let pushShift = () => {
  shift.push(
    Math.random() * Math.PI, 
    Math.random() * Math.PI * 2, 
    (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
    Math.random() * 0.9 + 0.1
  );
}
let pts = new Array(10000).fill().map(p => {
  sizes.push(Math.random() * 1.5 + 0.5);
  pushShift();
  return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
})
for(let i = 0; i < 50000; i++){
  let r = 10, R = 40;
  let rand = Math.pow(Math.random(), 1.5);
  let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
  pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2 ));
  sizes.push(Math.random() * 1.5 + 0.5);
  pushShift();
}


let g = new THREE.BufferGeometry().setFromPoints(pts);
g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
let m = new THREE.PointsMaterial({
  size: 0.1,
  transparent: true,
  blending: THREE.AdditiveBlending,
  onBeforeCompile: shader => {
    shader.uniforms.time = gu.time;
    shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `.replace(
      `gl_PointSize = size;`,
      `gl_PointSize = size * sizes;`
    ).replace(
      `#include <color_vertex>`,
      `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `
    ).replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
      `
    );
    //console.log(shader.vertexShader);
    shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `.replace(
      `#include <clipping_planes_fragment>`,
      `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        if (d > 0.5) discard;
      `
    ).replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5 );`
    );
    //console.log(shader.fragmentShader);
  }
});
let m0 = new THREE.PointsMaterial({
  size: 0.1,
  // transparent: true,
  // blending: THREE.AdditiveBlending,
  onBeforeCompile: shader => {
    shader.uniforms.time = gu.time;
    shader.uniforms.randomX1 = gu.randomX1;
    shader.uniforms.randomY1 = gu.randomY1;
    shader.uniforms.randomZ1 = gu.randomZ1;
    shader.uniforms.randomX2 = gu.randomX2;
    shader.uniforms.randomY2 = gu.randomY2;
    shader.uniforms.randomZ2 = gu.randomZ2;
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
      vec3 randColor1;
      vec3 randColor2;
      varying vec3 vColor;
      
      ${shader.vertexShader}
    `.replace(
      `gl_PointSize = size;`,
      `gl_PointSize = size * sizes;`
    ).replace(
      `#include <color_vertex>`,
      `#include <color_vertex>

        randColor1 = vec3(randomZ1, randomX1, randomY1);
        randColor2 = vec3(randomY2, randomZ2, randomX2);
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(randColor1, randColor2, d) / 255.;
      `
    ).replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
      `
    );
    console.log(shader.vertexShader);
    shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `.replace(
      `#include <clipping_planes_fragment>`,
      `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        if (d > 0.5) discard;
      `
    ).replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5 );`
    );
    console.log(shader.fragmentShader);
  }
});



let p = new THREE.Points(g, m0);

p.rotation.order = "ZYX";
p.rotation.z = 0.2;
scene.add(p)

var counter = 0;
function addPlanet(){

  counter++;

  let m2 = new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    blending: THREE.AdditiveBlending,
    onBeforeCompile: shader => {
      shader.uniforms.time = gu.time;
      shader.uniforms.randomX1 = gu.randomX1;
      shader.uniforms.randomY1 = gu.randomY1;
      shader.uniforms.randomZ1 = gu.randomZ1;
      shader.uniforms.randomX2 = gu.randomX2;
      shader.uniforms.randomY2 = gu.randomY2;
      shader.uniforms.randomZ2 = gu.randomZ2;
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
        vec3 randColor1;
        vec3 randColor2;
        varying vec3 vColor;
        
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
  
          randColor1 = vec3(randomX1, randomY1, randomZ1);
          randColor2 = vec3(randomX2, randomY2, randomZ2);
          float d = length(abs(position) / vec3(40., 10., 40));
          d = clamp(d, 0., 1.);
          vColor = mix(randColor1, randColor2, d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
        `
      );
      console.log(shader.vertexShader);
      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
          float d = length(gl_PointCoord.xy - 0.5);
          if (d > 0.5) discard;
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5 );`
      );
      console.log(shader.fragmentShader);
    }
  });

  let m1 = new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    blending: THREE.AdditiveBlending,
    onBeforeCompile: shader => {
      shader.uniforms.time = gu.time;
      shader.uniforms.randomX1 = gu.randomX1;
      shader.uniforms.randomY1 = gu.randomY1;
      shader.uniforms.randomZ1 = gu.randomZ1;
      shader.uniforms.randomX2 = gu.randomX2;
      shader.uniforms.randomY2 = gu.randomY2;
      shader.uniforms.randomZ2 = gu.randomZ2;
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
        vec3 randColor1;
        vec3 randColor2;
        varying vec3 vColor;
        
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
  
          randColor1 = vec3(randomY1, randomZ1, randomX1);
          randColor2 = vec3(randomZ2, randomX2, randomY2);
          float d = length(abs(position) / vec3(40., 10., 40));
          d = clamp(d, 0., 1.);
          vColor = mix(randColor1, randColor2, d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
        `
      );
      console.log(shader.vertexShader);
      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
          float d = length(gl_PointCoord.xy - 0.5);
          if (d > 0.5) discard;
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5 );`
      );
      console.log(shader.fragmentShader);
    }
  });
  let m3 = new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    blending: THREE.AdditiveBlending,
    onBeforeCompile: shader => {
      shader.uniforms.time = gu.time;
      shader.uniforms.randomX1 = gu.randomX1;
      shader.uniforms.randomY1 = gu.randomY1;
      shader.uniforms.randomZ1 = gu.randomZ1;
      shader.uniforms.randomX2 = gu.randomX2;
      shader.uniforms.randomY2 = gu.randomY2;
      shader.uniforms.randomZ2 = gu.randomZ2;
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
        vec3 randColor1;
        vec3 randColor2;
        varying vec3 vColor;
        
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
  
          randColor1 = vec3(randomZ1, randomX1, randomY1);
          randColor2 = vec3(randomY2, randomZ2, randomX2);
          float d = length(abs(position) / vec3(40., 10., 40));
          d = clamp(d, 0., 1.);
          vColor = mix(randColor1, randColor2, d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
        `
      );
      console.log(shader.vertexShader);
      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
          float d = length(gl_PointCoord.xy - 0.5);
          if (d > 0.5) discard;
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5 );`
      );
      console.log(shader.fragmentShader);
    }
  });
  let m4 = new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    blending: THREE.AdditiveBlending,
    onBeforeCompile: shader => {
      shader.uniforms.time = gu.time;
      shader.uniforms.randomX1 = gu.randomX1;
      shader.uniforms.randomY1 = gu.randomY1;
      shader.uniforms.randomZ1 = gu.randomZ1;
      shader.uniforms.randomX2 = gu.randomX2;
      shader.uniforms.randomY2 = gu.randomY2;
      shader.uniforms.randomZ2 = gu.randomZ2;
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
        vec3 randColor1;
        vec3 randColor2;
        varying vec3 vColor;
        
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
  
          randColor1 = vec3(randomX1, randomY2, randomZ2);
          randColor2 = vec3(randomX2, randomY1, randomZ1);
          float d = length(abs(position) / vec3(40., 10., 40));
          d = clamp(d, 0., 1.);
          vColor = mix(randColor1, randColor2, d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
        `
      );
      console.log(shader.vertexShader);
      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
          float d = length(gl_PointCoord.xy - 0.5);
          if (d > 0.5) discard;
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5 );`
      );
      console.log(shader.fragmentShader);
    }
  });
  let m5 = new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    blending: THREE.AdditiveBlending,
    onBeforeCompile: shader => {
      shader.uniforms.time = gu.time;
      shader.uniforms.randomX1 = gu.randomX1;
      shader.uniforms.randomY1 = gu.randomY1;
      shader.uniforms.randomZ1 = gu.randomZ1;
      shader.uniforms.randomX2 = gu.randomX2;
      shader.uniforms.randomY2 = gu.randomY2;
      shader.uniforms.randomZ2 = gu.randomZ2;
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
        vec3 randColor1;
        vec3 randColor2;
        varying vec3 vColor;
        
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
  
          randColor1 = vec3(randomX2, randomY2, randomZ2);
          randColor2 = vec3(randomX1, randomY1, randomZ1);
          float d = length(abs(position) / vec3(40., 10., 40));
          d = clamp(d, 0., 1.);
          vColor = mix(randColor1, randColor2, d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
        `
      );
      console.log(shader.vertexShader);
      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
          float d = length(gl_PointCoord.xy - 0.5);
          if (d > 0.5) discard;
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.2, d) * 0.5 + 0.5 );`
      );
      console.log(shader.fragmentShader);
    }
  });
  

  if(counter % 5 == 1 || counter == 1){
    const planet = new THREE.Points(g,m1);
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1500));

    planet.position.set(x,y,z);
  
    planet.rotation.order = "ZYX";
    planet.rotation.z = 0.2; 
    
    
    scene.add(planet)
    
  }
  else if(counter % 5 == 2 || counter == 2){
    const planet = new THREE.Points(g,m2);
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1500));

    planet.position.set(x,y,z);
  
    planet.rotation.order = "ZYX";
    planet.rotation.z = 0.2; 
    

    
  }  
  else if(counter % 5 == 3 || counter == 3){
    const planet = new THREE.Points(g,m3);
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1500));

    planet.position.set(x,y,z);
  
    planet.rotation.order = "ZYX";
    planet.rotation.z = 0.2; 
    
    scene.add(planet)
    
  }
  else if(counter % 5 == 4 || counter == 4){
    const planet = new THREE.Points(g,m4);
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1500));

    planet.position.set(x,y,z);
  
    planet.rotation.order = "ZYX";
    planet.rotation.z = 0.2; 
    

    scene.add(planet)
    
  }
  else if(counter % 5 == 0){
    const planet = new THREE.Points(g,m5);
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1500));

    planet.position.set(x,y,z);
  
    planet.rotation.order = "ZYX";
    planet.rotation.z = 0.2; 
    
  // planet.addEventListener("click", (event) => {
  //   //event.stopPropagation();
  //   console.log(`cube was clicked`);
  //   const planet = event.target;
  //   camera.position.set(planet.position.x, planet.position.y, planet.position.z);
  // });
  // interactionManager.add(planet);

    scene.add(planet)
    
  }



}

let planetArray = Array(50).fill().forEach(addPlanet)



function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshBasicMaterial({ color: 0x70A0AF});
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x,y,z);

  scene.add(star)

}
Array(2000).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
scene.background = spaceTexture;
 

let clock = new THREE.Clock();

let rotationSpeed = 0.05;

function moveCamera() {
  const topPage  = document.body.getBoundingClientRect().top;
  camera.position.z = topPage * -0.02;
  camera.position.x = topPage * -0.01;
  camera.rotation.y = topPage * -0.0001;
  //rotationSpeed = topPage *  -0.0001;
}

document.body.onscroll = moveCamera;
moveCamera();

renderer.setAnimationLoop(() => {
  // controls.update();
  // interactionManager.update();
  
   reroll()
  
  let t = clock.getElapsedTime() * 0.5;
  gu.time.value = t * Math.PI;
  p.rotation.y = t * rotationSpeed;
  renderer.render(scene, camera);
});

// function setupSelectAndZoom(camera, container, controls, materials, meshes) {
//   const selection = [];

//   let isDragging = false;
//   const mouse = new THREE.Vector2();
//   const raycaster = new THREE.Raycaster();

//   container.addEventListener(
//     "mousedown",
//     () => {
//       isDragging = false;
//     },
//     false
//   );

//   container.addEventListener(
//     "mousemove",
//     () => {
//       isDragging = true;
//     },
//     false
//   );

//   window.addEventListener(
//     "mouseup",
//     (event) => {
//       if (isDragging) {
//         isDragging = false;
//         return;
//       }

//       isDragging = false;

//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//       raycaster.setFromCamera(mouse, camera);

//       const intersects = raycaster.intersectObjects(meshes.boxes);

//       if (intersects.length > 0) {
//         const mesh = intersects[0].object;

//         if (selection.includes(mesh)) {
//           mesh.material = materials.main;
//           selection.splice(selection.indexOf(mesh), 1);
//         } else {
//           selection.push(mesh);
//           mesh.material = materials.highlight;
//         }

//         if (selection.length > 0)
//           zoomCameraToSelection(camera, controls, selection);
//       }
//     },
//     false
//   );
// }

// function zoomCameraToSelection(camera, controls, selection, fitRatio = 1.2) {
//   const box = new THREE.Box3();

//   for (const object of selection) box.expandByObject(object);

//   const size = box.getSize(new THREE.Vector3());
//   const center = box.getCenter(new THREE.Vector3());

//   const maxSize = Math.max(size.x, size.y, size.z);
//   const fitHeightDistance =
//     maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
//   const fitWidthDistance = fitHeightDistance / camera.aspect;
//   const distance = fitRatio * Math.max(fitHeightDistance, fitWidthDistance);

//   const direction = controls.target
//     .clone()
//     .sub(camera.position)
//     .normalize()
//     .multiplyScalar(distance);

//   controls.maxDistance = distance * 10;
//   controls.target.copy(center);

//   camera.near = distance / 100;
//   camera.far = distance * 100;
//   camera.updateProjectionMatrix();

//   camera.position.copy(controls.target).sub(direction);

//   controls.update();
// }

