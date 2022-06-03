// Scene
const scene = new THREE.Scene();

/**
 * Object Setup
 */
// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// Mesh
const mesh = new THREE.Mesh(geometry, material);
// add mesh to the scene
scene.add(mesh);

/**
 * Camera setup
 */
// size for aspect ratio
const sizes = {
  width: 800,
  height: 600
};

const camera = new THREE.PerspectiveCamera(
  55,                             // FOV: field of view (vertical field of view) [in degrees]
  sizes.width / sizes.height,     // Aspect ration of the view [width / height]
);
// add camera to scene
scene.add(camera);
// move the camera a little bit back to see the scene
camera.position.z = 5;

/**
 * Renderer Setup
 */
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),   // DOM element; for rendering the threejs scene
});
// set the renderer size
renderer.setSize(sizes.width, sizes.height);

// render the scene to the canvas
renderer.render(scene, camera);
