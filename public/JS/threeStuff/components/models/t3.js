import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { MathUtils } from 'https://unpkg.com/three@0.126.1/build/three.module.js';


import { setupModel } from './setupModel.js';

const radiansPerSecond = MathUtils.degToRad(30);

async function loadt3() {
    const loader = new GLTFLoader();
  
    const [t3Data] = await Promise.all([
        loader.loadAsync('/assets/t3-m4.glb')
      ]);
  
    console.log('bruh!', t3Data);


    const t3 = setupModel(t3Data);
    t3.position.set(0,0,2.5);
    //t3.rotation.set(180, 0, 0);

    t3.tick = (delta) => {
      // increase rotation each frame
      t3.rotation.z += radiansPerSecond * delta;
      //t3.rotation.x += radiansPerSecond * delta;
      //t3.rotation.y += radiansPerSecond * delta;
    };

    return { t3 }
  }
  
  export { loadt3 };