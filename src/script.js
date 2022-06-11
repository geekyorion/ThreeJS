import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();

/**
 * Axes Helper (length of axis as parameter in global unit)
 * red is +x axis, green is +y axis and blue is +z axis
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

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
camera.position.x = 0.5;
camera.position.y = -0.5;
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

/**
 * We can scale the objects on x, y and z axes
 * and we can also use set function
 */
// box.scale.x = 1.5;
// box.scale.y = 0.5;
// box.scale.z = 0.5;
// or can use set function
box.scale.set(1.5, 0.5, 0.5);

/**
 * We can rotate any object using it's vector3 around x, y and z axes
 * and we can also use set function
 * NOTE: To avoid gimbal lock, apply right order in which we want the rotation
 */
box.rotation.reorder('YXZ'); // this should be done before and after we should apply rotation
box.rotation.y = Math.PI / 4;
box.rotation.x = Math.PI / 4;

/**
 * lookAt(<targeted_object>) method on object to rotate the object in such a way that
 * its -z axis will rotate towards the targeted object
 */
camera.lookAt(box.position);
// we can create our own vector3
// camera.lookAt(new THREE.Vector3(0, 1, 1));

/**
 * we can apply these transformation at once in a complex design using groups
 */
const cubes = new THREE.Group();
const getCubeGeometry = side => new THREE.BoxGeometry(side, side, side);
const getCubeMaterial = color => new THREE.MeshBasicMaterial({ color });
const getACube = (side, color) => new THREE.Mesh(getCubeGeometry(side), getCubeMaterial(color));
const cube1 = getACube(1.5, 0xffff00);
const cube2 = getACube(1, 0x00ff00);
const cube3 = getACube(0.5, 0x00ffff);
// change the position of new cubes and add to the "cubes" group
cubes.add(cube1);
cube2.position.x = -2;
cubes.add(cube2);
cube3.position.x = 2;
cubes.add(cube3);
scene.add(cubes);

// change the cubes rotation
cubes.rotation.reorder('YXZ');
cubes.rotation.y = -0.5;
cubes.rotation.x = -0.5;

// change camera to lookAt cubes group
camera.position.z = 7
camera.lookAt(cubes.position);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
