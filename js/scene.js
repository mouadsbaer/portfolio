import * as THREE from 'three';

// --- Scene Setup ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x03060C, 0.002); // Deep rich background color match

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- Central Abstract Geometry ---
// Group to hold objects so we can rotate them together
const objectGroup = new THREE.Group();
scene.add(objectGroup);

// 1. Crystal/Icosahedron core
const icosahedronGeo = new THREE.IcosahedronGeometry(1.2, 0); // detail 0 = low poly
const icosahedronMat = new THREE.MeshPhysicalMaterial({
    color: 0x00d4ff,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
    wireframe: false,
    transmission: 0.9,
    clearcoat: 1.0,
});
const icosahedron = new THREE.Mesh(icosahedronGeo, icosahedronMat);
objectGroup.add(icosahedron);

// 2. Surrounding rotating Torus Knot (Wireframe)
const torusGeo = new THREE.TorusKnotGeometry(1.8, 0.05, 100, 16);
const torusMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    metalness: 1,
    roughness: 0.1,
    wireframe: true,
});
const torus = new THREE.Mesh(torusGeo, torusMat);
objectGroup.add(torus);

// --- Particles System ---
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    // Spread particles in a wide area around the camera
    posArray[i] = (Math.random() - 0.5) * 15;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particlesMesh);

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Primary Accent Light (Blue)
const blueLight = new THREE.PointLight(0x3b82f6, 50, 20);
blueLight.position.set(-2, 2, 2);
scene.add(blueLight);

// Secondary Accent Light (Cyan)
const cyanLight = new THREE.PointLight(0x00d4ff, 50, 20);
cyanLight.position.set(2, -2, 2);
scene.add(cyanLight);

// Light to follow mouse
const mouseLight = new THREE.PointLight(0xffffff, 20, 10);
scene.add(mouseLight);

// --- Interactivity & Animations ---
// UI Hover interactions to affect 3D Scene
const interactiveElements = document.querySelectorAll('.hero-buttons a, .portfolio-card, .btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        // Pulse the 3D object when hovering buttons/cards
        icosahedron.material.emissive.setHex(0x00d4ff);
        icosahedron.material.emissiveIntensity = 0.5;
        torus.scale.set(1.2, 1.2, 1.2);
    });
    el.addEventListener('mouseleave', () => {
        icosahedron.material.emissive.setHex(0x000000);
        icosahedron.material.emissiveIntensity = 0;
        torus.scale.set(1, 1, 1);
    });
});

// Mouse Position for Parallax
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
    
    // Normalize coordinates for mouse light (-1 to 1)
    const normX = (event.clientX / window.innerWidth) * 2 - 1;
    const normY = -(event.clientY / window.innerHeight) * 2 + 1;
    mouseLight.position.set(normX * 5, normY * 5, 2);
});

// Scroll Event for vertical parallax
let scrollY = window.scrollY;
document.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. Objects continuous rotation
    icosahedron.rotation.y = elapsedTime * 0.2;
    icosahedron.rotation.x = elapsedTime * 0.15;
    
    torus.rotation.y = -elapsedTime * 0.1;
    torus.rotation.z = elapsedTime * 0.05;

    // 2. Particles gentle continuous movement
    particlesMesh.rotation.y = -elapsedTime * 0.02;

    // 3. Mouse Parallax (Easing effect)
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    objectGroup.rotation.y += 0.05 * (targetX - objectGroup.rotation.y);
    objectGroup.rotation.x += 0.05 * (targetY - objectGroup.rotation.x);
    
    // Slight camera movement based on mouse
    camera.position.x += (mouseX * 0.0005 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.0005 - camera.position.y) * 0.05;

    // 4. Scroll Parallax & Conditional Positioning
    // Initially place at 'atout1' location: left-side of screen
    const heroHeight = window.innerHeight;
    
    if (scrollY < heroHeight * 0.8) {
        // In Hero Section: Position even further to the left
        const targetPosX = -4.5; // Increased again to push it further left
        const targetScale = 0.6; // Small in Hero
        
        objectGroup.position.x += (targetPosX - objectGroup.position.x) * 0.05;
        objectGroup.scale.setScalar(objectGroup.scale.x + (targetScale - objectGroup.scale.x) * 0.05);
        objectGroup.position.y = -scrollY * 0.001; 
    } else {
        // Past Hero Section: Return to Center, back to original scale (1.0)
        const targetPosX = 0;
        const targetScale = 1.0; // Original Size
        
        objectGroup.position.x += (targetPosX - objectGroup.position.x) * 0.05;
        objectGroup.scale.setScalar(objectGroup.scale.x + (targetScale - objectGroup.scale.x) * 0.05);
        
        objectGroup.position.y = -scrollY * 0.001;
    }
    
    particlesMesh.position.y = -scrollY * 0.0005;

    renderer.render(scene, camera);
}

animate();
