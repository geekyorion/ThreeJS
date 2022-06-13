import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';
import gsap from 'gsap';
import './style.css';

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Sizes
const sizes = { width: 800, height: 600 };

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// DOM element
const canvas = document.querySelector('canvas.webgl');

// OrbitControls
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// ThreeJS clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
  // ThreeJS clock
  const elapsedTime = clock.getElapsedTime();

  // update object
  box.rotation.y = elapsedTime; // using THREE Clock

  // update orbit control
  control.update();

  // render at every frame instead of once
  renderer.render(scene, camera);
  
  // will call tick function at screen refresh rate
  window.requestAnimationFrame(tick);
}

tick();
