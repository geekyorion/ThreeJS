import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Sizes
const sizes = {
  width: 800,
  height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// Transformation should happen before render [rendere.render(...)]

/**
 * Position
 * we have position [x, y, z]
 *   x => + measn towards right and - means towards left
 *   y => + measn towards top and - means towards bottom
 *   z => + measn towards camera and - means far from camera
 */
box.position.x = -0.85;
box.position.y = -0.75;
box.position.z = 0.5;
 
/**
 * length of the object from the center of the scene
 * can be calculated using verctor3.length()
 * as position is a vector 3 then we can call length function on it
 */
console.log(`The length of the box from vector(0, 0, 0) is ${box.position.length()}`);

/**
 * we can also calculate the distance between the objects
 * and it can be calculated using verctor3.distanceTo()
 */
console.log(`The length of the box from camera is ${box.position.distanceTo(camera.position)}`);

/**
 * we can also reduce the verctor3 position to 1 using normalise() method
 */
box.position.normalize();
const { x: newX, y: newY, z:newZ } = box.position;
console.log(`The length of the box after normalise is ${box.position.length()}
and the position is (${newX}, ${newY}, ${newZ})`);

/**
 * we can set all of the position at once using set method on vector3
 * NOTE: it will change the position of the box
 */
box.position.set(-0.85, -0.75, 0.5);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
