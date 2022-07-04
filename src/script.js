import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';
// import gsap from 'gsap';
import GUI from 'lil-gui';
import './style.css';

//Debug UI
const gui = new GUI();

/**
 * Texture loading
 */
// using JS method
// const image = new Image();
// image.src = '/textures/door/color.jpg';

// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// }

// add loading manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = (url, loaded, total) => console.log(`item to be loaded: ${url} and progress: (${loaded}/${total})`);
loadingManager.onProgress = (url, loaded, total) => console.log(`currently loaded item: ${url} and progress: (${loaded}/${total})`);
loadingManager.onLoad = () => console.log('loading finished');
loadingManager.onError = (url) => console.log(`Error occurred while loading: ${url}`);

// using texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture = textureLoader.load(
//   '/textures/door/color.jpg',
//   () => { console.log('loaded'); },
//   () => { console.log('progressing'); },
//   () => { console.log('error'); }
// );

// load various textures
const colorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

/**
 * UV unwrapping: Texture gets stretched or squeezed to cover the geometry
 * - these are 2D cordinates
 * - can be accessed by 'geometryInstance.attributes.uv'
 */

// repeating a texture (repeat is vetcor2; only x and y)
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// above code will display only 1 colorTexture (in 2x3 grid only 1 grid is displayed, rest is stretched)
// to overcome this issue we have wrapS and wrapT
// colorTexture.wrapS = THREE.RepeatWrapping; // for x
// colorTexture.wrapT = THREE.RepeatWrapping; // for y

// we can also use MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping; // for y
// colorTexture.wrapS = THREE.MirroredRepeatWrapping; // for x

// we can also provide offset from x and y to the texture
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// we can rotate the texture [in radians] [it is just a 2D rotation]
// colorTexture.rotation = Math.PI / 4;
// we can change the pivot point (0, 0 be default) to center
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

/**
 * minmapping [6 types] and magmapping [2 types]
 * - minmapping is creating a new texture with smaller version until we get 1x1 version
 */
const checksLargerTexture = textureLoader.load('/textures/checkerboard-1024x1024.png');
const checksSmallerTexture = textureLoader.load('/textures/checkerboard-8x8.png');

checksLargerTexture.minFilter = THREE.NearestFilter; // NearestFilter has the highest performance
checksSmallerTexture.magFilter = THREE.NearestFilter;
// NOTE: while using NearestFilter on minFilter we don't need the minmaps
checksLargerTexture.generateMipmaps = false; // will increase the performance cause it removes extra calculations

// Scene
const scene = new THREE.Scene();

// AxesHelper
const axesHelper = new THREE.AxesHelper(3);
axesHelper.visible = false;
scene.add(axesHelper);
gui.add(axesHelper, 'visible').name('Axes Visiblity');

/**
 * Textures: an image which applies the effect on geometries and covers the surface
 * types of textures:
 * - color texture (albeda texture): the simplest one, applied on geometry
 * - alpha texture: visibility (opacity) [white means fully visible and black means transparent]
 * - displacement texture (height texture): to show the depth effect (to show relief),
 *   grayscale (white up and black down), needs divisions
 * - normal texture: add details, no need of subdivisions, vertices doesn't move,
 *   used to provide the orientation of the light as per the depth (better performance than height texture)
 * - ambient occlusion texture: grayscale, for fake shadows, not physically correct
 *   but help to create contrast and other details 
 * - metalness texture: grayscale, white: metallic and black: non-metallic, for light reflection
 * - roughness texture: grayscale, white: rough and black: smooth,
 *   for light dissipation and great duo with metalness textures
 * 
 * Textures follow PBR principle: (Physically based rendering)
 * - mainly for metalness and roughness
 * - follow the techniques to provide the real life like result
 * - many softwares are using this principle
 */

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: checksSmallerTexture });
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
