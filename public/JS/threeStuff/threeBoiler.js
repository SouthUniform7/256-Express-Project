import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const gltfLoader = new GLTFLoader();

//FIGURE OUT THE ASSET ROUTING FIRST, DON'T SERVE ASSETS IN FRONT END

gltfLoader.load('../assets/t3-m4/scene.gltf', (gltfScene) => {

    gltfScene.scene.rotation.y = Math.PI / 8;
    gltfScene.scene.position.y = 0;
    gltfScene.scene.scale.set(10,10,10);

    scene.add(gltfScene.scene)

});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

//light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)


//controls
const controls = new OrbitControls(camera, renderer.domElement);


//random stuff
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100) );

    star.position.set(x,y,z)
    scene.add(star)

}

Array(200).fill().forEach(addStar)

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();