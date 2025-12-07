import * as THREE from 'three';
import { HouseShell } from './house.js';

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
            roughness: 0.9, // More matte for concrete
            metalness: 0.1, // Slight metallic sheen
            envMapIntensity: 0.3
        });
        
        this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
        this.floor.receiveShadow = true;
        this.floor.position.y = 0;
        
        this.group.add(this.floor);
    }

    createGridHelper() {
        // Grid for spatial reference (150 units, 30 divisions = 5 unit spacing)
        const gridHelper = new THREE.GridHelper(150, 30, 0x555555, 0x333333);
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
        // Main belt surface (polished dark material)
        const beltGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
        const beltMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a, // Very dark gray (almost black)
            roughness: 0.4, // Polished surface
            metalness: 0.6, // More metallic for futuristic feel
            envMapIntensity: 0.5
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
            color: 0x888888, // Lighter gray for contrast
            roughness: 0.5,
            metalness: 0.7, // Shiny metal rails
            envMapIntensity: 0.6
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
            // Station marker (glowing colored box beside conveyor)
            const markerGeometry = new THREE.BoxGeometry(2, 2, 2);
            const markerMaterial = new THREE.MeshStandardMaterial({
                color: station.color,
                emissive: station.color,
                emissiveIntensity: 0.5, // Stronger glow
                roughness: 0.3, // Polished
                metalness: 0.4,
                envMapIntensity: 0.5
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

/**
 * ProductionLine - Manages multiple houses and production statistics
 */
export class ProductionLine {
    constructor(scene, conveyor) {
        this.scene = scene;
        this.conveyor = conveyor;
        
        // Production settings
        this.maxHouses = 3; // Maximum concurrent houses
        this.minSpacing = 25; // Minimum distance between houses
        this.spawnThreshold = -20; // Spawn new house when lead house passes this Z
        
        // Active houses array
        this.houses = [];
        
        // Statistics
        this.housesCompleted = 0;
        this.startTime = Date.now();
        this.productionSpeed = 1.0; // Speed multiplier (for future UI control)
        
        // Spawn first house
        this.spawnHouse();
    }

    spawnHouse() {
        if (this.houses.length >= this.maxHouses) {
            return; // Already at max capacity
        }
        
        const house = new HouseShell();
        house.getGroup().position.set(0, 0, 0); // Start at beginning of conveyor
        this.scene.add(house.getGroup());
        this.houses.push(house);
        
        console.log(`Spawned house ${this.houses.length}/${this.maxHouses}`);
    }

    update(deltaTime) {
        // Update all houses
        for (let i = this.houses.length - 1; i >= 0; i--) {
            const house = this.houses[i];
            
            // Apply production speed multiplier
            house.update(deltaTime * this.productionSpeed);
            
            // Check if house is at a station
            const currentStation = this.conveyor.getStationAtPosition(house.getPosition());
            if (currentStation && house.currentStage < currentStation.stage) {
                house.setStage(currentStation.stage);
                console.log(`House at Station ${currentStation.stage}: ${currentStation.name}`);
            }
            
            // Remove house if it's past the end
            if (house.getPosition() < -100) {
                this.scene.remove(house.getGroup());
                this.houses.splice(i, 1);
                this.housesCompleted++;
                console.log(`House completed! Total: ${this.housesCompleted}`);
            }
        }
        
        // Spawn new house if there's space and lead house has moved forward enough
        if (this.houses.length < this.maxHouses) {
            const shouldSpawn = this.houses.length === 0 || 
                               this.houses[this.houses.length - 1].getPosition() < this.spawnThreshold;
            
            if (shouldSpawn) {
                this.spawnHouse();
            }
        }
    }

    /**
     * Get production statistics
     */
    getStats() {
        const elapsedMs = Date.now() - this.startTime;
        const elapsedHours = elapsedMs / (1000 * 60 * 60);
        
        // Avoid division by zero
        const housesPerHour = elapsedHours > 0 
            ? this.housesCompleted / elapsedHours 
            : 0;
        
        const housesPerDay = housesPerHour * 24;
        
        return {
            housesCompleted: this.housesCompleted,
            housesInProgress: this.houses.length,
            housesPerHour: housesPerHour.toFixed(1),
            housesPerDay: housesPerDay.toFixed(0),
            productionSpeed: this.productionSpeed,
            elapsedTime: this.formatElapsedTime(elapsedMs)
        };
    }

    formatElapsedTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    /**
     * Set production speed multiplier
     */
    setSpeed(speed) {
        this.productionSpeed = Math.max(0.1, Math.min(5.0, speed));
    }
}

console.log('factory.js loaded ✓');