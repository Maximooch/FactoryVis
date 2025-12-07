import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FactoryFloor, ConveyorBelt, ProductionLine } from './factory.js';
import { Dashboard } from './ui.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// Camera setup
const camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
camera.position.set(30, 20, 30);
camera.lookAt(0, 0, -30); // Look toward middle of conveyor

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add canvas to DOM
const container = document.getElementById('canvas-container');
container.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 50, 25);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
scene.add(directionalLight);

// Factory Floor
const factoryFloor = new FactoryFloor();
scene.add(factoryFloor.getGroup());

// Conveyor Belt
const conveyor = new ConveyorBelt();
scene.add(conveyor.getGroup());

// Production Line (manages multiple houses)
const productionLine = new ProductionLine(scene, conveyor);

// Test cube (commented out - kept for debugging reference)
/*
const testGeometry = new THREE.BoxGeometry(5, 5, 5);
const testMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00ff88,
    metalness: 0.3,
    roughness: 0.6
});
const testCube = new THREE.Mesh(testGeometry, testMaterial);
testCube.position.set(15, 2.5, -30);
testCube.castShadow = true;
testCube.receiveShadow = true;
scene.add(testCube);
*/

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 10;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2; // Prevent camera going below ground

// UI Dashboard
const dashboard = new Dashboard(productionLine, camera, controls);

// WASD Camera Movement
const moveSpeed = 20; // Units per second
const keyState = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false, // For moving up
    space: false  // For moving down
};

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key in keyState) {
        keyState[key] = true;
    }
    if (e.key === 'Shift') keyState.shift = true;
    if (e.key === ' ') {
        keyState.space = true;
        e.preventDefault(); // Prevent page scroll
    }
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key in keyState) {
        keyState[key] = false;
    }
    if (e.key === 'Shift') keyState.shift = false;
    if (e.key === ' ') keyState.space = false;
});

function updateCameraMovement(deltaTime) {
    const moveDistance = moveSpeed * deltaTime;
    
    // Get camera direction vectors
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0; // Keep movement horizontal
    forward.normalize();
    
    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();
    
    // WASD movement
    if (keyState.w) {
        camera.position.addScaledVector(forward, moveDistance);
        controls.target.addScaledVector(forward, moveDistance);
    }
    if (keyState.s) {
        camera.position.addScaledVector(forward, -moveDistance);
        controls.target.addScaledVector(forward, -moveDistance);
    }
    if (keyState.a) {
        camera.position.addScaledVector(right, -moveDistance);
        controls.target.addScaledVector(right, -moveDistance);
    }
    if (keyState.d) {
        camera.position.addScaledVector(right, moveDistance);
        controls.target.addScaledVector(right, moveDistance);
    }
    
    // Vertical movement (Shift = up, Space = down)
    if (keyState.shift) {
        camera.position.y += moveDistance;
        controls.target.y += moveDistance;
    }
    if (keyState.space) {
        camera.position.y -= moveDistance;
        controls.target.y -= moveDistance;
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Update production line (handles all houses)
    productionLine.update(deltaTime);
    
    // Update dashboard stats
    dashboard.update();
    
    // Update camera movement
    updateCameraMovement(deltaTime);
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Start animation
animate();

console.log('FactoryVis scene initialized ✓');
console.log('Factory floor added ✓');
console.log('Conveyor belt added ✓');
console.log('Production line active ✓');
console.log('Movement system active ✓');
console.log('WASD controls enabled ✓');
console.log('Stats tracking enabled ✓');
console.log('UI Dashboard active ✓');