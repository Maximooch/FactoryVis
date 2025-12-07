import * as THREE from 'three';

/**
 * Factory Floor - The foundation for the manufacturing facility
 */
export class FactoryFloor {
    constructor() {
        this.group = new THREE.Group();
        this.createFloor();
        this.createGridHelper();
        this.createAxisHelper();
    }

    createFloor() {
        // Large plane for factory floor (150x150 units)
        const floorGeometry = new THREE.PlaneGeometry(150, 150);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a, // Dark gray concrete
            roughness: 0.8,
            metalness: 0.2
        });
        
        this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
        this.floor.receiveShadow = true;
        this.floor.position.y = 0;
        
        this.group.add(this.floor);
    }

    createGridHelper() {
        // Grid for spatial reference (150 units, 30 divisions = 5 unit spacing)
        const gridHelper = new THREE.GridHelper(150, 30, 0x444444, 0x333333);
        gridHelper.position.y = 0.01; // Slightly above floor to prevent z-fighting
        this.group.add(gridHelper);
    }

    createAxisHelper() {
        // Axis helper for debugging (10 units long)
        // Red = X, Green = Y, Blue = Z
        const axisHelper = new THREE.AxesHelper(10);
        axisHelper.position.y = 0.02;
        this.group.add(axisHelper);
    }

    getGroup() {
        return this.group;
    }
}

console.log('factory.js loaded ✓');