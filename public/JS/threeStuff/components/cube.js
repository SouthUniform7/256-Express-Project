import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { MathUtils } from 'https://unpkg.com/three@0.126.1/build/three.module.js';

const radiansPerSecond = MathUtils.degToRad(30);

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2);

  const material = new MeshStandardMaterial({ color: 'purple' });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };