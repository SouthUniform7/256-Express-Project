import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

import { World } from './world.js';

async function main() {
    // Get a reference to the container element
    const container = document.querySelector('#threeContainer');
  
    // 1. Create an instance of the World app
    const world = new World(container);

    // complete async tasks
    await world.init();
  
    // 2. Render the scene
    world.render();
  }

  main().catch((err) => {
    console.error(err);
  });