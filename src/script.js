import * as THREE from 'three';
import gsap from 'gsap';
import './style.css';

/**
 * Camera: an abstract class which is inherited by every type of camera
 * Types of Camera:
 *   1. Array Camera: to render multiple views [can use to split the scene view for various players]
 *      It uses multiple cameras to render the scene
 *   2. Cube Camera: to render 6 sides like cubes [used for environment maps]
 *   3. Stereo Camera: to create the parallax effect, it renders the scene using
 *      two cameras to mimic the eye views.
 *   4. Orthographic Camera: Renders without perspective
 *   5. Perspective Camera: Renders with perspective
 */

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Sizes
const sizes = { width: 800, height: 600 };

// Perspective Camera [any object that are closer than near and further than far will not be rendered]
const camera = new THREE.PerspectiveCamera(
  75, // FOV: field of view (vertical angle in degrees)
  sizes.width / sizes.height, // aspect ratio
  0.1,  // how near can camera look
  100 // how far can camera look
);

// Orthographic Camera: [left, right, top, bottom for rectangle render]
/**
 * this camera renders and resize everything as per the size
 * try changing the height in sizes. to overcome this problem,
 * we can use AspectRatio in orthographic camera too
 */
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio, // left
//   1 * aspectRatio,  // right
//   1,  // top
//   -1, // bottom
//   0.1,  // near
//   100 // far
// );
/**
 * Note: if we put (1, -1, 1, -1) then it will render the mirror of the scene.
 * also we need to multiply apsectRation to horizontal values [left and right]
 * to render the perfect square because we are calculating aspectRation using width/height
 */

camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(box.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
});
renderer.setSize(sizes.width, sizes.height);

// ThreeJS clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
  // ThreeJS clock
  const elapsedTime = clock.getElapsedTime();

  // update object
  box.rotation.y = elapsedTime; // using THREE Clock

  // render at every frame instead of once
  renderer.render(scene, camera);
  
  // will call tick function at screen refresh rate
  window.requestAnimationFrame(tick);
}

tick();
