import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';
import gsap from 'gsap';
import GUI from 'lil-gui';
import './style.css';

/**
 * Debug UI: Only works on objects
 */
const gui = new GUI();

const debugParameters = {
  materialColor: 0xff0000, // now we need not to use it as we are using lil-gui instead of dat.gui
  jump: () => {
    gsap.to(box.position, { y: box.position.y + 1, direction: 0.5 });
    gsap.to(box.position, { y: 0, duration: 0.5, delay: 0.5 });
  },
  spin: () => {
    gsap.to(box.rotation, { z: box.rotation.z + Math.PI * 2, duration: 1 });
  }
};

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Debug
gui.add(box.position, 'x').name('Cube-X'); // manually enter the number
gui.add(box.position, 'y', -3, 3, 0.1).name('Cube-Y'); // with 3 more params min, max and step
gui.add(box.position, 'z').min(-3).max(3).step(0.1).name('Cube-Z'); // also we can use these methods to configure
gui.add(box, 'visible'); // can auto pick the type of the value that we want to change
gui.add(material, 'wireframe');
gui.addColor(material, 'color');
gui.add(debugParameters, 'jump');
gui.add(debugParameters, 'spin');

/* Note: In dat.gui, we handle colors differntly. We create an object and assign a color to a key
const debugColors = { materialColor: 0xff0000 };
and we use debugColors.materialColor while making the materials and to update the material color
we use THREE.Color class' method '.set()' in the following way
gui.addColor(debugColors, 'materialColor').onChange(() => material.color.set(debugColor.materialColor));
*/

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
