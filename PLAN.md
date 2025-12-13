# FactoryVis - Side Project Plan

## Project Vision
Interactive 3D visualization of a modular house manufacturing factory using ThreeJS, inspired by Tesla Gigafactory aesthetics. **Goal:** Demonstrate the conceptual speed and scale of automated house shell production with realistic physics-based animations and mechanical assembly processes.

## Project Status

**✅ MVP COMPLETE** (Week 1)
- Factory floor with 3 assembly stations
- House shells moving along conveyor belt  
- Progressive assembly (frame → walls → roof)
- Performance monitoring (FPS, frame time)
- Production controls (pause, resume, reset, speed)
- WASD camera controls + OrbitControls

**🔄 Current Focus:** Realistic assembly animations & logistics
**🐧 Future:** Penguin workers (realistic style)

## Design Direction

**Style:** Tesla Gigafactory-inspired
- Clean, minimalist industrial aesthetic
- White/gray floors with colored zone markings
- Mechanical precision in animations
- Visible logistics flow (parts → staging → assembly)

**Animation Philosophy:**
- Physics-based, realistic movement
- Mechanical assembly (robotic arms, lifts, clamps)
- Parts arrive from logistics, not "magic appearance"
- Satisfying precision and timing

## Tech Stack

**Core:**
- ThreeJS (3D rendering)
- Vanilla JavaScript (no framework overhead)
- dat.GUI (quick parameter controls)

**Structure:**
```
FactoryVis/
├── index.html
├── src/
│   ├── main.js         # Scene setup, render loop
│   ├── factory.js      # Factory floor, conveyors, zones
│   ├── house.js        # House model & assembly states
│   ├── logistics.js    # Parts storage, staging, transport (NEW)
│   ├── machinery.js    # Robotic arms, lifts, clamps (NEW)
│   ├── penguin.js      # Penguin workers (FUTURE)
│   └── ui.js           # Controls/stats overlay
├── assets/
└── README.md
```

## Development Phases

### Phase 1 - Foundation ✅ COMPLETE
- [x] Basic ThreeJS scene with lighting
- [x] Factory floor and conveyor belt
- [x] Simple house model with assembly stages
- [x] Camera controls (Orbit + WASD)

### Phase 2 - Assembly System ✅ COMPLETE
- [x] 3 Assembly stations with visual markers
- [x] House moves station-to-station
- [x] Components appear at each stage
- [x] Shadows and basic lighting

### Phase 3 - UI & Controls ✅ COMPLETE
- [x] dat.GUI integration
- [x] Performance monitoring (FPS)
- [x] Production controls (pause/resume/reset)
- [x] Speed controls

### Phase 4 - Realistic Assembly Animations 🔄 CURRENT
**Goal:** Physics-based, mechanical assembly process

#### 4A: Station Pause & Timing
- [ ] House pauses at each station
- [ ] Configurable dwell time per station
- [ ] Visual "processing" indicator
- [ ] Smooth acceleration/deceleration

#### 4B: Component Animations
- [ ] Frame: Rises from floor or slides in from side
- [ ] Walls: Slide in from perpendicular conveyor/staging
- [ ] Roof: Lowers from overhead gantry/crane
- [ ] Easing functions for realistic motion

#### 4C: Assembly Machinery
- [ ] Robotic arm models (articulated cylinders)
- [ ] Arm reaches, grabs, places components
- [ ] Overhead crane/gantry for roof
- [ ] Clamps/fixtures that engage during assembly

### Phase 5 - Logistics System
**Goal:** Show where parts come from (Gigafactory-style flow)

#### 5A: Factory Layout Expansion
- [ ] Parts storage zone (side area)
- [ ] Staging area near assembly line
- [ ] Floor markings and zone colors
- [ ] Expanded camera bounds

#### 5B: Parts Transport
- [ ] Wall panels stored in racks
- [ ] Roof sections in overhead staging
- [ ] Automated guided vehicles (AGVs) or conveyors
- [ ] Parts queue visualization

#### 5C: Multi-Line Scaling
- [ ] Parallel assembly lines
- [ ] Shared logistics feeding multiple lines
- [ ] Throughput visualization

### Phase 6 - Penguin Workers 🐧 FUTURE
**Goal:** Realistic penguin characters operating the factory

#### 6A: Penguin Model
- [ ] Anatomically-inspired model (not cartoonish)
- [ ] Body, head, beak, flippers, feet
- [ ] Multiple poses (standing, walking, operating)
- [ ] Simple rig for animation

#### 6B: Penguin Roles
- [ ] Station operators (monitoring assembly)
- [ ] Forklift/AGV drivers
- [ ] Quality inspectors
- [ ] Supervisors with clipboards

#### 6C: Penguin Animation
- [ ] Idle animations (head turn, shift weight)
- [ ] Walk cycle
- [ ] Operating machinery gestures
- [ ] Reactive behaviors (watch house pass by)

### Phase 7 - Polish & Advanced Features (Backlog)
- [ ] Multiple house types/sizes
- [ ] Day/night lighting cycles
- [ ] Sound effects
- [ ] Data export and analytics
- [ ] VR/AR exploration
- [ ] Deploy to web (GitHub Pages)

## Technical Approach

### Animation System (Phase 4)
```javascript
// Lerp helper with easing
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Component animation state
class AnimatedComponent {
  constructor(mesh, startPos, endPos, duration) {
    this.mesh = mesh;
    this.startPos = startPos;
    this.endPos = endPos;
    this.duration = duration;
    this.elapsed = 0;
  }
  
  update(deltaTime) {
    this.elapsed += deltaTime;
    const t = Math.min(this.elapsed / this.duration, 1);
    const eased = easeInOutQuad(t);
    this.mesh.position.lerpVectors(this.startPos, this.endPos, eased);
    return t >= 1; // returns true when complete
  }
}
```

### Robotic Arm (Phase 4C)
```javascript
class RoboticArm {
  constructor() {
    this.base = new CylinderGeometry(...);
    this.shoulder = new CylinderGeometry(...);
    this.elbow = new CylinderGeometry(...);
    this.wrist = new CylinderGeometry(...);
    // Hierarchical parenting for articulation
  }
  
  animateTo(targetAngles, duration) {
    // Interpolate joint angles
  }
}
```

### Factory Flow (Updated)
1. Parts arrive at storage zone
2. AGV/conveyor moves parts to staging
3. Empty platform enters assembly line
4. Station 1: Arm places frame → platform pauses → assembly animates
5. Station 2: Walls slide in from staging → clamps engage → attach
6. Station 3: Overhead crane lowers roof → secures
7. Completed house exits → counter increments

## Key Learning Goals

**Already learned:**
- ThreeJS scene graph
- Animation loops
- Basic geometry
- UI overlays

**Currently learning:**
- Easing and interpolation
- Articulated/hierarchical models
- Complex animation sequencing

**Future learning:**
- Character modeling and rigging
- Walk cycles and procedural animation
- Factory simulation patterns

## Resources

**Inspiration:**
- Tesla Gigafactory tours (YouTube)
- Boxabl factory videos
- Industrial automation demos
- Factorio/Satisfactory (game aesthetics)

**Technical:**
- ThreeJS docs: https://threejs.org/docs/
- Easing functions: https://easings.net/

---

**Project Philosophy:**
- Learning project, no deadlines
- Build what's interesting
- MVP is done - everything else is bonus
- Have fun with it! 🐧

**Current Priority:** Phase 4A (station pause behavior) → 4B (component animations)
