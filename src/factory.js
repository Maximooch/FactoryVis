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
        this.createRollers();
        this.createStations();
    }

    createBelt() {
        // Create animated texture for conveyor belt
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Draw repeating pattern (diagonal stripes)
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 256, 256);
        
        ctx.strokeStyle = '#2a2a2a';
        ctx.lineWidth = 3;
        
        // Diagonal lines for visual movement
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 20, 0);
            ctx.lineTo(i * 20 + 50, 256);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(this.width / 5, this.length / 5);
        
        // Main belt surface with animated texture
        const beltGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
        const beltMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.4,
            metalness: 0.6,
            envMapIntensity: 0.5
        });
        
        this.belt = new THREE.Mesh(beltGeometry, beltMaterial);
        this.belt.position.set(0, this.height / 2, -this.length / 2);
        this.belt.receiveShadow = true;
        this.belt.castShadow = true;
        
        // Store texture reference for animation
        this.beltTexture = texture;
        
        this.group.add(this.belt);
        
        // Add edge guides
        this.createEdgeGuides();
    }

    createRollers() {
        // Add visible rollers underneath the belt for realism
        const rollerCount = 20;
        const rollerSpacing = this.length / rollerCount;
        
        for (let i = 0; i < rollerCount; i++) {
            const rollerGeometry = new THREE.CylinderGeometry(0.3, 0.3, this.width - 1, 12);
            const rollerMaterial = new THREE.MeshStandardMaterial({
                color: 0x444444,
                roughness: 0.6,
                metalness: 0.7
            });
            
            const roller = new THREE.Mesh(rollerGeometry, rollerMaterial);
            roller.position.set(
                0,
                -0.1, // Just below belt
                -i * rollerSpacing
            );
            roller.rotation.z = Math.PI / 2; // Rotate to align with belt width
            roller.castShadow = true;
            
            this.group.add(roller);
        }
    }

    createEdgeGuides() {
        const guideGeometry = new THREE.BoxGeometry(0.3, 1, this.length);
        const guideMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            roughness: 0.5,
            metalness: 0.7,
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
                emissiveIntensity: 0.5,
                roughness: 0.3,
                metalness: 0.4,
                envMapIntensity: 0.5
            });
            
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.set(
                -this.width / 2 - 3,
                1,
                station.z
            );
            marker.castShadow = true;
            marker.userData = station;
            
            // Store reference to material for pulsing effect
            marker.userData.material = markerMaterial;
            marker.userData.baseIntensity = 0.5;
            marker.userData.activeIntensity = 1.2;
            
            this.group.add(marker);
            this.stationMarkers.push(marker);
        });
    }

    /**
     * Update conveyor belt animation and station effects
     */
    update(deltaTime, productionSpeed = 1.0, activeStations = new Set()) {
        if (this.beltTexture) {
            // Scroll texture to simulate belt movement
            const scrollSpeed = (5 * productionSpeed * deltaTime) / 5;
            this.beltTexture.offset.y -= scrollSpeed;
        }
        
        // Update station marker glow based on active assembly
        this.stationMarkers.forEach(marker => {
            const station = marker.userData;
            const material = marker.userData.material;
            const isActive = activeStations.has(station.stage);
            
            if (isActive) {
                // Pulse effect when assembling
                const pulseSpeed = 3.0; // Pulses per second
                const pulse = Math.sin(Date.now() / 1000 * pulseSpeed * Math.PI * 2) * 0.5 + 0.5;
                material.emissiveIntensity = station.baseIntensity + pulse * (station.activeIntensity - station.baseIntensity);
            } else {
                // Smoothly return to base intensity
                material.emissiveIntensity += (station.baseIntensity - material.emissiveIntensity) * 5 * deltaTime;
            }
        });
    }

    /**
     * Check if a house is at a station position
     * Returns station data or null
     */
    getStationAtPosition(zPosition) {
        const tolerance = 1.0;
        
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
        this.maxHouses = 3;
        this.minSpacing = 25;
        this.spawnThreshold = -20;
        
        // Active houses array
        this.houses = [];
        
        // Track which houses have been processed at each station
        this.processedStations = new Map();
        
        // Statistics
        this.housesCompleted = 0;
        this.startTime = Date.now();
        this.productionSpeed = 1.0;
        
        // Pause state
        this.isPaused = false;
        
        // Spawn first house
        this.spawnHouse();
    }

    spawnHouse() {
        if (this.houses.length >= this.maxHouses) {
            return;
        }
        
        const house = new HouseShell();
        house.getGroup().position.set(0, 0, 0);
        this.scene.add(house.getGroup());
        this.houses.push(house);
        
        // Initialize station tracking for this house
        this.processedStations.set(house, new Set());
        
        console.log(`Spawned house ${this.houses.length}/${this.maxHouses}`);
    }

    update(deltaTime) {
        // Skip updates if paused
        if (this.isPaused) {
            return;
        }
        
        // Track which stations are currently active (for visual feedback)
        const activeStations = new Set();
        
        // Update all houses
        for (let i = this.houses.length - 1; i >= 0; i--) {
            const house = this.houses[i];
            
            house.update(deltaTime * this.productionSpeed);
            
            // Track if house is assembling at a station
            if (house.isCurrentlyAssembling()) {
                activeStations.add(house.targetStage);
            }
            
            // Check if house is at a station and hasn't been processed there yet
            const currentStation = this.conveyor.getStationAtPosition(house.getPosition());
            if (currentStation) {
                const processedSet = this.processedStations.get(house);
                
                if (!processedSet.has(currentStation.stage) && 
                    !house.isCurrentlyAssembling() &&
                    currentStation.stage > house.currentStage) {
                    
                    house.startAssembly(currentStation.stage);
                    processedSet.add(currentStation.stage);
                    
                    console.log(`House paused at Station ${currentStation.stage}: ${currentStation.name} - Assembling...`);
                }
            }
            
            if (house.getPosition() < -100) {
                this.scene.remove(house.getGroup());
                this.houses.splice(i, 1);
                this.processedStations.delete(house);
                this.housesCompleted++;
                console.log(`House completed! Total: ${this.housesCompleted}`);
            }
        }
        
        // Update conveyor animation with active station info
        this.conveyor.update(deltaTime, this.productionSpeed, activeStations);
        
        // Spawn new house if there's space
        if (this.houses.length < this.maxHouses) {
            const shouldSpawn = this.houses.length === 0 || 
                               this.houses[this.houses.length - 1].getPosition() < this.spawnThreshold;
            
            if (shouldSpawn) {
                this.spawnHouse();
            }
        }
    }

    getStats() {
        const elapsedMs = Date.now() - this.startTime;
        const elapsedHours = elapsedMs / (1000 * 60 * 60);
        
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

    setSpeed(speed) {
        this.productionSpeed = Math.max(0.1, Math.min(5.0, speed));
    }

    setPaused(paused) {
        this.isPaused = paused;
    }

    reset() {
        // Remove all houses from scene
        this.houses.forEach(house => {
            this.scene.remove(house.getGroup());
        });

        // Clear arrays and reset stats
        this.houses = [];
        this.processedStations.clear();
        this.housesCompleted = 0;
        this.startTime = Date.now();

        // Spawn first house
        this.spawnHouse();
    }
}

console.log('factory.js loaded ✓');