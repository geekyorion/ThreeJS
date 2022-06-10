import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
box.rotation.x = Math.PI * 45 / 180;
box.rotation.y = Math.PI * 45 / 180;
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

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
