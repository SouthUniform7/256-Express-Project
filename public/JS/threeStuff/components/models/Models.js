import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { MathUtils } from 'https://unpkg.com/three@0.126.1/build/three.module.js';


import { setupModel } from './setupModel.js';

const radiansPerSecond = MathUtils.degToRad(30);

async function loadModels() {
    const loader = new GLTFLoader();
  
    const [t3Data, hawkData] = await Promise.all([
        loader.loadAsync('/assets/t3-m4/scene.gltf'),
        loader.loadAsync('/assets/ebon_hawk/scene.gltf'),
      ]);
  
    console.log('bruh!', t3Data);
    console.log('bruh2', hawkData);


    const t3 = setupModel(t3Data);
    t3.position.set(0,0,2.5);
    //t3.rotation.set(180, 0, 0);

    t3.tick = (delta) => {
      // increase rotation each frame
      t3.rotation.z += radiansPerSecond * delta;
      //t3.rotation.x += radiansPerSecond * delta;
      //t3.rotation.y += radiansPerSecond * delta;
    };

    const ebon = setupModel(hawkData);
    ebon.position.set(7.5,0, -10);
    ebon.scale.set(0.005, 0.005, 0.005);

    return { t3, ebon }
  }
  
  export { loadModels };