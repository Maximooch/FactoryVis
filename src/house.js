import * as THREE from 'three';
import { ComponentAnimation, Easing } from './animation.js';

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
        
        // Assembly stage (0 = nothing, 1 = frame, 2 = +walls, 3 = +roof)
        this.currentStage = 0;
        
        // Movement properties
        this.speed = 5; // Units per second
        this.isPaused = false;
        
        // Assembly timing
        this.isAssembling = false;
        this.assemblyTimer = 0;
        this.assemblyDuration = 2.0; // Will be set per animation
        this.targetStage = 0;
        
        // Component animations
        this.animations = {};
        
        // Create all components (initially hidden)
        this.createFrame();
        this.createWalls();
        this.createRoof();
        
        // Start with nothing visible (stage 0)
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
            color: 0xaaaaaa,
            wireframe: true,
            wireframeLinewidth: 2
        });
        
        this.frame = new THREE.Mesh(frameGeometry, frameMaterial);
        this.frame.position.y = this.height / 2; // Final position: sit on floor
        this.group.add(this.frame);
        
        // Animation: frame rises from below
        this.animations.frame = new ComponentAnimation(this.frame, {
            type: 'rise'
        });
    }

    createWalls() {
        // Solid walls (warm beige/tan with enhanced materials)
        const wallsGeometry = new THREE.BoxGeometry(
            this.width - 0.2,
            this.height - 0.2,
            this.depth - 0.2
        );
        const wallsMaterial = new THREE.MeshStandardMaterial({
            color: 0xe8c4a0,
            roughness: 0.6,
            metalness: 0.1,
            envMapIntensity: 0.3
        });
        
        this.walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        this.walls.position.y = this.height / 2;
        this.walls.castShadow = true;
        this.walls.receiveShadow = true;
        this.group.add(this.walls);
        
        // Animation: walls slide in from side
        this.animations.walls = new ComponentAnimation(this.walls, {
            type: 'slideLeft'
        });
    }

    createRoof() {
        // Flat roof cap (polished dark material)
        const roofGeometry = new THREE.BoxGeometry(
            this.width + 1,
            0.5,
            this.depth + 1
        );
        const roofMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a3a3a,
            roughness: 0.4,
            metalness: 0.5,
            envMapIntensity: 0.6
        });
        
        this.roof = new THREE.Mesh(roofGeometry, roofMaterial);
        this.roof.position.y = this.height + 0.25; // Final position: on top
        this.roof.castShadow = true;
        this.roof.receiveShadow = true;
        this.group.add(this.roof);
        
        // Animation: roof drops from above
        this.animations.roof = new ComponentAnimation(this.roof, {
            type: 'drop'
        });
    }

    /**
     * Set assembly stage instantly (no animation)
     * 0: Nothing visible (empty platform)
     * 1: Frame only
     * 2: Frame + Walls
     * 3: Frame + Walls + Roof (complete)
     */
    setStage(stage) {
        this.currentStage = stage;
        
        // Set visibility based on stage
        if (stage >= 1) {
            this.animations.frame.complete();
        } else {
            this.animations.frame.reset();
        }
        
        if (stage >= 2) {
            this.animations.walls.complete();
        } else {
            this.animations.walls.reset();
        }
        
        if (stage >= 3) {
            this.animations.roof.complete();
        } else {
            this.animations.roof.reset();
        }
    }

    /**
     * Start assembly process to target stage
     */
    startAssembly(targetStage) {
        if (targetStage > this.currentStage) {
            this.targetStage = targetStage;
            this.isAssembling = true;
            this.isPaused = true; // Pause movement during assembly
            
            // Start the appropriate animation
            this.startComponentAnimation(targetStage);
        }
    }
    
    /**
     * Start animation for specific assembly stage
     */
    startComponentAnimation(stage) {
        const animDuration = 1.8; // Animation duration in seconds
        
        switch (stage) {
            case 1: // Frame assembly
                this.animations.frame.start(animDuration, Easing.easeOutCubic);
                break;
            case 2: // Walls assembly
                this.animations.walls.start(animDuration, Easing.easeOutBack);
                break;
            case 3: // Roof assembly
                this.animations.roof.start(animDuration, Easing.easeOutBounce);
                break;
        }
        
        // Set assembly duration with small buffer
        this.assemblyDuration = animDuration + 0.3;
        this.assemblyTimer = 0;
    }

    /**
     * Update assembly progress and animations
     */
    updateAssembly(deltaTime) {
        if (!this.isAssembling) return;
        
        this.assemblyTimer += deltaTime;
        
        // Update active animations
        Object.values(this.animations).forEach(anim => {
            if (anim.isActive) {
                anim.update(deltaTime);
            }
        });
        
        // Check if assembly duration complete
        if (this.assemblyTimer >= this.assemblyDuration) {
            // Assembly complete
            this.currentStage = this.targetStage;
            this.isAssembling = false;
            this.assemblyTimer = 0;
            this.isPaused = false; // Resume movement
            
            console.log(`Assembly complete: Stage ${this.currentStage}`);
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
     * Reset house to initial state (for reuse/pooling)
     */
    resetState() {
        this.currentStage = 0;
        this.targetStage = 0;
        this.isAssembling = false;
        this.assemblyTimer = 0;
        this.isPaused = false;
        
        // Reset all animations
        Object.values(this.animations).forEach(anim => anim.reset());
    }

    /**
     * Check if currently assembling
     */
    isCurrentlyAssembling() {
        return this.isAssembling;
    }
}

console.log('house.js loaded ✓');
