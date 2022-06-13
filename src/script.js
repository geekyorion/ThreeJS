import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import gsap from 'gsap';
import './style.css';

/**
 * ThreeJS controls
 *   1. DeviceOrientationControl [Android]: to use device sensor control the view of scene
 *   2. FlyControl: control kind of speceship [including rotate]
 *   3. FirstPersonControl: horizontal control for first person (without swing and vertical control)
 *   4. PointerControl: actual POV control [similar like game which is using WASD(movement) and space(jump)] [Uses PointerLockAPI of JavaScript]
 *   5. OrbitControl: 3D control which has limit such as [can't go down below 0 degree or past 90 degree; Vertical angle limit]
 *      But we can zoom in, zoom out, pan in any direction, etc
 *   6. TrackballControl: Orbit control but without vertical angle limitation
 *   7. TransformControl: let the user transform the objects [like an editor]
 *   8. DragControls: let the user to drag (move) the objects [like an editor] 
 */

/**
 * mouse cursor
 */
const cursor = { x: 0, y: 0 };
window.addEventListener('mousemove', event => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -1 * (event.clientY / sizes.height - 0.5);
});

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

camera.position.z = 5;
camera.lookAt(box.position);
scene.add(camera);

// DOM Element
const canvas = document.querySelector('canvas.webgl');

// OrbitControls
const control = new OrbitControls(camera, canvas);
// we can change the target [if we change something then we need to update the control]
// control.target.y = 2; // it's like cube is moved -2 units [or panned downwards]
// control.update();

// we can also enable daming to the controls [but need to update in the render cause damping works on FPS]
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

  // update camera using custom control
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(box.position);

  // udpate the controls
  control.update();

  // render at every frame instead of once
  renderer.render(scene, camera);
  
  // will call tick function at screen refresh rate
  window.requestAnimationFrame(tick);
}

tick();
