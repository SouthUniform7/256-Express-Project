import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { MathUtils } from 'https://unpkg.com/three@0.126.1/build/three.module.js';


import { setupModel } from './setupModel.js';

const radiansPerSecond = MathUtils.degToRad(30);

async function loadEbon() {
    const loader = new GLTFLoader();
  
    const [hawkData] = await Promise.all([
        loader.loadAsync('/assets/ebon_hawk.glb'),
      ]);
    console.log('bruh2', hawkData);

    const ebon = setupModel(hawkData);
    ebon.position.set(7.5,0, -10);
    ebon.scale.set(0.005, 0.005, 0.005);

    return { ebon }
  }
  
  export { loadEbon };