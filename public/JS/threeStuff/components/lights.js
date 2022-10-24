import { DirectionalLight } from 'https://unpkg.com/three@0.126.1/build/three.module.js';

function createLights() {
    // Create a directional light
    const light = new DirectionalLight('white', 8);
  
    // move the light right, up, and towards us
    light.position.set(10, 10, 10);
  
    return light;
}

export { createLights };