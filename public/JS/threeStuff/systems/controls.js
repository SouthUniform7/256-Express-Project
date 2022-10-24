import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableKeys = true;

    controls.tick = () => controls.update();
    
    return controls;
}

export { createControls };