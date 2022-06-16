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
box.position.x = -1.25;
scene.add(box);

/**
 * Creating a custom buffer geometry
 * positionArray: a linear typed float32array for vertex position (so 3 vertex means size 9 array)
 * bufferAttributes: ThreeJS uses bufferAttributes for the positions
 */
// method 1: define values separately
// const positionArray = new Float32Array(9);
// // 1st point
// positionArray[0] = 0;
// positionArray[1] = 0;
// positionArray[2] = 0;
// // 2nd point
// positionArray[3] = 1;
// positionArray[4] = 0;
// positionArray[5] = 0;
// // 3rd point
// positionArray[6] = 0;
// positionArray[7] = 1;
// positionArray[8] = 0;

// method 2: define values using array
const positionArray = new Float32Array([
  0, 0, 0,
  1, 0, 0,
  0, 1, 0
]);
// covert the positionArray to bufferAttribute (<array>, <vertex_size(x, y, z)>)
const bufferAttribute = new THREE.BufferAttribute(positionArray, 3);
// creating a bufferGeometry that we need to setup
const customTriangleGeometry = new THREE.BufferGeometry();
// we need to set the position with the generated bufferAttribute
customTriangleGeometry.setAttribute('position', bufferAttribute);
// we can use the same material to create the mesh
const triangle = new THREE.Mesh(customTriangleGeometry, material);
scene.add(triangle);
// NOTE: ThreeJS uses built-in shaders to render the triangle which are already written
//       that is why we are using position attribute to set the bufferAttributes

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
