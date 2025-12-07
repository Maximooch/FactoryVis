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

/**
 * ConveyorBelt - Manufacturing line with assembly stations
 */
export class ConveyorBelt {
    constructor() {
        this.group = new THREE.Group();
        
        // Conveyor dimensions
        this.width = 15;
        this.length = 100;
        this.height = 0.5;
        
        // Station positions along Z-axis
        this.stations = [
            { z: -20, stage: 1, name: 'Frame Assembly', color: 0xff4444 },  // Red
            { z: -50, stage: 2, name: 'Walls Assembly', color: 0xffaa44 },  // Yellow/Orange
            { z: -80, stage: 3, name: 'Roof Assembly', color: 0x44ff44 }    // Green
        ];
        
        this.createBelt();
        this.createStations();
    }

    createBelt() {
        // Main belt surface (dark gray/black)
        const beltGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
        const beltMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a, // Very dark gray (almost black)
            roughness: 0.6,
            metalness: 0.4
        });
        
        this.belt = new THREE.Mesh(beltGeometry, beltMaterial);
        this.belt.position.set(0, this.height / 2, -this.length / 2); // Position so it starts at Z=0
        this.belt.receiveShadow = true;
        this.belt.castShadow = true;
        
        this.group.add(this.belt);
        
        // Add edge guides (optional side rails)
        this.createEdgeGuides();
    }

    createEdgeGuides() {
        const guideGeometry = new THREE.BoxGeometry(0.3, 1, this.length);
        const guideMaterial = new THREE.MeshStandardMaterial({
            color: 0x666666,
            roughness: 0.7,
            metalness: 0.3
        });
        
        // Left guide
        const leftGuide = new THREE.Mesh(guideGeometry, guideMaterial);
        leftGuide.position.set(-this.width / 2 - 0.15, 0.5, -this.length / 2);
        leftGuide.castShadow = true;
        this.group.add(leftGuide);
        
        // Right guide
        const rightGuide = new THREE.Mesh(guideGeometry, guideMaterial);
        rightGuide.position.set(this.width / 2 + 0.15, 0.5, -this.length / 2);
        rightGuide.castShadow = true;
        this.group.add(rightGuide);
    }

    createStations() {
        this.stationMarkers = [];
        
        this.stations.forEach((station) => {
            // Station marker (colored box beside conveyor)
            const markerGeometry = new THREE.BoxGeometry(2, 2, 2);
            const markerMaterial = new THREE.MeshStandardMaterial({
                color: station.color,
                emissive: station.color,
                emissiveIntensity: 0.3,
                roughness: 0.5,
                metalness: 0.3
            });
            
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.set(
                -this.width / 2 - 3, // Left side of conveyor
                1, // Sitting on floor
                station.z
            );
            marker.castShadow = true;
            marker.userData = station; // Store station info
            
            this.group.add(marker);
            this.stationMarkers.push(marker);
        });
    }

    /**
     * Check if a house is at a station position
     * Returns station data or null
     */
    getStationAtPosition(zPosition) {
        const tolerance = 1.0; // Within 1 unit of station
        
        for (const station of this.stations) {
            if (Math.abs(zPosition - station.z) < tolerance) {
                return station;
            }
        }
        return null;
    }

    getGroup() {
        return this.group;
    }

    getStations() {
        return this.stations;
    }
}

console.log('factory.js loaded ✓');