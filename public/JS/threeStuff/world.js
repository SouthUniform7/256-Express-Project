import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


import { loadModels } from './components/models/Models.js';
import { loadt3 } from './components/models/t3.js';
import { loadEbon } from './components/models/ebon.js';
import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;
let controls;
let opt;

class World {
  constructor(container, choice) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

     controls = createControls(camera, renderer.domElement);
    
    
    controls.addEventListener('change', () => {
      this.render();
      });

      

    const cube = createCube();

    opt = choice;

    const light = createLights();

    //loop.updatables.push(cube);
    loop.updatables.push(controls);

    scene.add(light);

    const resizer = new Resizer(container, camera, renderer);
  }

  

  async init() {
    const { t3, ebon } = await loadModels();

    if (opt === 't3'){
      controls.target.copy(t3.position);
      scene.add(t3)
      loop.updatables.push(t3);
    }

    if (opt === 'ebon'){
      scene.add(ebon)
    }
  
    //controls.target.copy(t3.position);

    //scene.add(t3, ebon);
    //loop.updatables.push(t3);
    
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }
  
  stop() {
    loop.stop();
  }
}

export { World };
