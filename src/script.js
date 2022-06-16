import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';
// import gsap from 'gsap';
import './style.css';

// Scene
const scene = new THREE.Scene();

/**
 * Geometries: A geometry is created using vertices and faces
 * ThreeJS built-in geometries are inherted from BufferGeometry class
 * Built-in geometries: BoxGeometry, PlaneGeometry, CircleGeometry, ConeGeometry,
 *   CylinderGeometry, RingGeometry, TorusGeometry, DodecahedronGeometry
 *   OctahedronGeometry, TetrahedronGeometry, IcosahedronGeometry, SphereGeometry,
 *   ShapeGeometry, TubeGeometry, ExtrudeGeometry, LatheGeometry, TextGeometry
 */

// Objects
const geometry = new THREE.BoxGeometry(
  1, // width
  1, // height
  1, // depth
  3, // widthSegments
  3, // heightSegments
  3  // depthSegments
);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Resize handling
window.addEventListener('resize', () => {
  // udpates sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera aspect and projection matrix
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // udpate renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
