import * as THREE from 'three';

/**
 * Easing functions for smooth animations
 * t = progress (0 to 1)
 * Returns eased value (0 to 1)
 */
export const Easing = {
    // Linear (no easing)
    linear: (t) => t,
    
    // Quadratic
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    
    // Cubic (smoother)
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    
    // Exponential (dramatic)
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    
    // Back (overshoot)
    easeOutBack: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    
    // Bounce (settle effect)
    easeOutBounce: (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    }
};

/**
 * Animated value that interpolates from start to end over duration
 */
export class AnimatedValue {
    constructor(startValue, endValue, duration, easingFn = Easing.easeOutCubic) {
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.easingFn = easingFn;
        this.elapsed = 0;
        this.isComplete = false;
    }
    
    update(deltaTime) {
        if (this.isComplete) return this.endValue;
        
        this.elapsed += deltaTime;
        const t = Math.min(this.elapsed / this.duration, 1);
        const eased = this.easingFn(t);
        
        if (t >= 1) {
            this.isComplete = true;
            return this.endValue;
        }
        
        return this.startValue + (this.endValue - this.startValue) * eased;
    }
    
    reset() {
        this.elapsed = 0;
        this.isComplete = false;
    }
    
    getValue() {
        const t = Math.min(this.elapsed / this.duration, 1);
        const eased = this.easingFn(t);
        return this.startValue + (this.endValue - this.startValue) * eased;
    }
}

/**
 * Animated Vector3 - interpolates THREE.Vector3 from start to end
 */
export class AnimatedVector3 {
    constructor(startVec, endVec, duration, easingFn = Easing.easeOutCubic) {
        this.startVec = startVec.clone();
        this.endVec = endVec.clone();
        this.currentVec = startVec.clone();
        this.duration = duration;
        this.easingFn = easingFn;
        this.elapsed = 0;
        this.isComplete = false;
    }
    
    update(deltaTime) {
        if (this.isComplete) return this.currentVec;
        
        this.elapsed += deltaTime;
        const t = Math.min(this.elapsed / this.duration, 1);
        const eased = this.easingFn(t);
        
        this.currentVec.lerpVectors(this.startVec, this.endVec, eased);
        
        if (t >= 1) {
            this.isComplete = true;
        }
        
        return this.currentVec;
    }
    
    reset() {
        this.elapsed = 0;
        this.isComplete = false;
        this.currentVec.copy(this.startVec);
    }
}

/**
 * Component Animation - manages animating a mesh into position
 */
export class ComponentAnimation {
    constructor(mesh, config) {
        this.mesh = mesh;
        this.config = config;
        
        // Store final position (where mesh should end up)
        this.finalPosition = mesh.position.clone();
        
        // Calculate start position based on animation type
        this.startPosition = this.calculateStartPosition(config.type);
        
        // Animation state
        this.positionAnim = null;
        this.isActive = false;
        this.isComplete = false;
        
        // Initially hide and position at start
        this.mesh.visible = false;
    }
    
    calculateStartPosition(type) {
        const start = this.finalPosition.clone();
        
        switch (type) {
            case 'rise':
                // Rise from below floor
                start.y -= 15;
                break;
            case 'drop':
                // Drop from above
                start.y += 15;
                break;
            case 'slideLeft':
                // Slide in from left
                start.x -= 20;
                break;
            case 'slideRight':
                // Slide in from right
                start.x += 20;
                break;
            case 'slideIn':
                // Slide in from back
                start.z -= 15;
                break;
            default:
                // No offset
                break;
        }
        
        return start;
    }
    
    start(duration = 1.5, easingFn = Easing.easeOutCubic) {
        if (this.isActive || this.isComplete) return;
        
        // Position at start
        this.mesh.position.copy(this.startPosition);
        this.mesh.visible = true;
        
        // Create position animation
        this.positionAnim = new AnimatedVector3(
            this.startPosition,
            this.finalPosition,
            duration,
            easingFn
        );
        
        this.isActive = true;
    }
    
    update(deltaTime) {
        if (!this.isActive || this.isComplete) return;
        
        // Update position
        const newPos = this.positionAnim.update(deltaTime);
        this.mesh.position.copy(newPos);
        
        // Check completion
        if (this.positionAnim.isComplete) {
            this.isComplete = true;
            this.isActive = false;
            this.mesh.position.copy(this.finalPosition);
        }
    }
    
    reset() {
        this.isActive = false;
        this.isComplete = false;
        this.mesh.visible = false;
        this.mesh.position.copy(this.finalPosition);
        if (this.positionAnim) {
            this.positionAnim.reset();
        }
    }
    
    // Instantly complete (for skipping animation)
    complete() {
        this.isActive = false;
        this.isComplete = true;
        this.mesh.visible = true;
        this.mesh.position.copy(this.finalPosition);
    }
}

/**
 * Animation Sequence - runs multiple animations in order or parallel
 */
export class AnimationSequence {
    constructor() {
        this.animations = [];
        this.currentIndex = 0;
        this.isRunning = false;
        this.isComplete = false;
        this.mode = 'sequential'; // 'sequential' or 'parallel'
    }
    
    add(animation) {
        this.animations.push(animation);
        return this;
    }
    
    setMode(mode) {
        this.mode = mode;
        return this;
    }
    
    start() {
        if (this.animations.length === 0) {
            this.isComplete = true;
            return;
        }
        
        this.isRunning = true;
        this.currentIndex = 0;
        
        if (this.mode === 'parallel') {
            // Start all animations
            this.animations.forEach(anim => anim.start());
        } else {
            // Start first animation
            this.animations[0].start();
        }
    }
    
    update(deltaTime) {
        if (!this.isRunning || this.isComplete) return;
        
        if (this.mode === 'parallel') {
            // Update all, check if all complete
            let allComplete = true;
            this.animations.forEach(anim => {
                anim.update(deltaTime);
                if (!anim.isComplete) allComplete = false;
            });
            
            if (allComplete) {
                this.isComplete = true;
                this.isRunning = false;
            }
        } else {
            // Sequential mode
            const current = this.animations[this.currentIndex];
            current.update(deltaTime);
            
            if (current.isComplete) {
                this.currentIndex++;
                
                if (this.currentIndex >= this.animations.length) {
                    this.isComplete = true;
                    this.isRunning = false;
                } else {
                    this.animations[this.currentIndex].start();
                }
            }
        }
    }
    
    reset() {
        this.currentIndex = 0;
        this.isRunning = false;
        this.isComplete = false;
        this.animations.forEach(anim => anim.reset());
    }
}

console.log('animation.js loaded ✓');
