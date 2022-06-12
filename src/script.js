import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();

// Objects
const getBox = (size, color) => {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({ color });
  const box = new THREE.Mesh(geometry, material);
  return box;
}

const box1 = getBox(0.75, 0xff0000);
box1.position.x = -1.5;
const box2 = getBox(0.75, 0x00ff00);
const box3 = getBox(0.75, 0x0000ff);
box3.position.x = 1.5;
scene.add(box1);
scene.add(box2);
scene.add(box3);

// Sizes
const sizes = {
  width: 800,
  height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
});
renderer.setSize(sizes.width, sizes.height);

/**
 * using traditional calculations to get delta time
 */
let prev_time = Date.now();

/**
 * instead of calculating delta time on our own
 * we can use clock from THREE
 */
const clock = new THREE.Clock();

/**
 * we can also use Performance from JavaScript
 */
let prev_per = performance.now();

// Animation
const tick = () => {
  // // tradition calculation
  const curr_time = Date.now();
  const delta_time = curr_time - prev_time;
  prev_time = curr_time;

  // // ThreeJS clock
  const elapsedTime = clock.getElapsedTime(); // it is already a 1000th of a second

  // JS Performance
  const curr_per = performance.now();
  const delta_per = curr_per - prev_per;
  prev_per = curr_per;

  // update objects
  box1.rotation.y += 0.001 * delta_time; // using delta time
  box2.rotation.y = elapsedTime; // using THREE Clock
  box3.rotation.y += 0.001 * delta_per; // using JS Performance

  // render at every frame instead of once
  renderer.render(scene, camera);
  
  // will call tick function at screen refresh rate
  window.requestAnimationFrame(tick);
}

tick();
