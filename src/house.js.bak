import * as THREE from 'three';

/**
 * HouseShell - Modular house shell with progressive assembly stages
 * Dimensions: 10 units wide x 8 units tall x 12 units deep
 */
export class HouseShell {
    constructor() {
        this.group = new THREE.Group();
        
        // Dimensions
        this.width = 10;
        this.height = 8;
        this.depth = 12;
        
        // Assembly stage (0 = frame only, 1 = +walls, 2 = +roof)
        this.currentStage = 0;
        
        // Movement properties
        this.speed = 5; // Units per second
        this.isPaused = false;
        
        // Create all components (initially hidden except frame)
        this.createFrame();
        this.createWalls();
        this.createRoof();
        
        // Show only frame initially
        this.setStage(0);
    }

    createFrame() {
        // Wireframe box representing the structural frame
        const frameGeometry = new THREE.BoxGeometry(
            this.width, 
            this.height, 
            this.depth
        );
        const frameMaterial = new THREE.MeshBasicMaterial({
            color: 0x888888,
            wireframe: true,
            wireframeLinewidth: 2
        });
        
        this.frame = new THREE.Mesh(frameGeometry, frameMaterial);
        this.frame.position.y = this.height / 2; // Sit on floor
        this.group.add(this.frame);
    }

    createWalls() {
        // Solid walls (beige/tan color)
        const wallsGeometry = new THREE.BoxGeometry(
            this.width - 0.2, // Slightly smaller than frame
            this.height - 0.2,
            this.depth - 0.2
        );
        const wallsMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4a574, // Beige/tan
            roughness: 0.7,
            metalness: 0.1
        });
        
        this.walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        this.walls.position.y = this.height / 2;
        this.walls.castShadow = true;
        this.walls.receiveShadow = true;
        this.group.add(this.walls);
    }

    createRoof() {
        // Flat roof cap (dark gray/brown)
        const roofGeometry = new THREE.BoxGeometry(
            this.width + 1, // Slightly wider overhang
            0.5, // Thin roof
            this.depth + 1
        );
        const roofMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a, // Dark gray
            roughness: 0.8,
            metalness: 0.2
        });
        
        this.roof = new THREE.Mesh(roofGeometry, roofMaterial);
        this.roof.position.y = this.height + 0.25; // On top of walls
        this.roof.castShadow = true;
        this.roof.receiveShadow = true;
        this.group.add(this.roof);
    }

    /**
     * Set assembly stage (0-2)
     * 0: Frame only
     * 1: Frame + Walls
     * 2: Frame + Walls + Roof (complete)
     */
    setStage(stage) {
        this.currentStage = stage;
        
        // Always show frame
        this.frame.visible = true;
        
        // Show/hide components based on stage
        this.walls.visible = stage >= 1;
        this.roof.visible = stage >= 2;
    }

    /**
     * Get the THREE.Group for adding to scene
     */
    getGroup() {
        return this.group;
    }

    /**
     * Update method for movement along conveyor
     */
    update(deltaTime) {
        if (!this.isPaused) {
            // Move along negative Z-axis (down the conveyor)
            this.group.position.z -= this.speed * deltaTime;
        }
    }

    /**
     * Pause/resume movement
     */
    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    /**
     * Get current Z position
     */
    getPosition() {
        return this.group.position.z;
    }
}

console.log('house.js loaded ✓');