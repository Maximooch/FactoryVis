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
        
        // Assembly timing
        this.isAssembling = false;
        this.assemblyTimer = 0;
        this.assemblyDuration = 2.0; // 2 seconds per assembly stage
        this.targetStage = 0;
        
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
            color: 0xaaaaaa, // Lighter gray for better visibility
            wireframe: true,
            wireframeLinewidth: 2
        });
        
        this.frame = new THREE.Mesh(frameGeometry, frameMaterial);
        this.frame.position.y = this.height / 2; // Sit on floor
        this.group.add(this.frame);
    }

    createWalls() {
        // Solid walls (warm beige/tan with enhanced materials)
        const wallsGeometry = new THREE.BoxGeometry(
            this.width - 0.2, // Slightly smaller than frame
            this.height - 0.2,
            this.depth - 0.2
        );
        const wallsMaterial = new THREE.MeshStandardMaterial({
            color: 0xe8c4a0, // Warmer beige/tan
            roughness: 0.6, // Slightly polished
            metalness: 0.1,
            envMapIntensity: 0.3
        });
        
        this.walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        this.walls.position.y = this.height / 2;
        this.walls.castShadow = true;
        this.walls.receiveShadow = true;
        this.group.add(this.walls);
    }

    createRoof() {
        // Flat roof cap (polished dark material)
        const roofGeometry = new THREE.BoxGeometry(
            this.width + 1, // Slightly wider overhang
            0.5, // Thin roof
            this.depth + 1
        );
        const roofMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a3a3a, // Lighter dark gray for contrast
            roughness: 0.4, // Polished finish
            metalness: 0.5, // Metallic roof
            envMapIntensity: 0.6
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
     * Start assembly process to target stage
     */
    startAssembly(targetStage) {
        if (targetStage > this.currentStage) {
            this.targetStage = targetStage;
            this.isAssembling = true;
            this.assemblyTimer = 0;
            this.isPaused = true; // Pause movement during assembly
        }
    }

    /**
     * Update assembly progress
     */
    updateAssembly(deltaTime) {
        if (!this.isAssembling) return;
        
        this.assemblyTimer += deltaTime;
        
        if (this.assemblyTimer >= this.assemblyDuration) {
            // Assembly complete
            this.setStage(this.targetStage);
            this.isAssembling = false;
            this.assemblyTimer = 0;
            this.isPaused = false; // Resume movement
        }
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
        // Update assembly if in progress
        this.updateAssembly(deltaTime);
        
        // Move only if not paused
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

    /**
     * Check if currently assembling
     */
    isCurrentlyAssembling() {
        return this.isAssembling;
    }
}

console.log('house.js loaded ✓');