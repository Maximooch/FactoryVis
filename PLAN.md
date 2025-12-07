# FactoryVis - Weekend MVP Plan

## Project Vision
Interactive 3D visualization of a modular house manufacturing factory using ThreeJS. **Goal:** Demonstrate the conceptual speed and scale of automated house shell production.

## Success Criteria (Weekend Win)
By end of weekend, you can show someone:
- Factory floor with 3 assembly stations
- House shells moving along conveyor belt
- Progressive assembly (frame → walls → roof)
- Dashboard showing throughput (e.g., "12 houses/day")
- Speed controls to demonstrate scalability

## Tech Stack

**Core:**
- ThreeJS (3D rendering)
- Vanilla JavaScript (no framework overhead)
- dat.GUI (quick parameter controls)

**Optional:**
- GSAP (smooth animations, if ThreeJS tweening insufficient)

**Structure:**
```
FactoryVis/
├── index.html          # Single page app
├── src/
│   ├── main.js         # ThreeJS scene setup
│   ├── factory.js      # Factory logic (conveyor, stations)
│   ├── house.js        # House model & assembly
│   └── ui.js           # Controls/stats overlay
├── assets/
│   └── textures/       # Simple textures (optional)
├── PLAN.md            # This file
└── README.md
```

## Day-by-Day Breakdown

### Day 1 - Foundation (4-6 hours)
**Goal:** See something moving in 3D

- [ ] Setup: HTML boilerplate, ThreeJS import
- [ ] Scene basics: Camera, lights, floor grid
- [ ] Simple factory floor (plane with texture/color)
- [ ] ONE basic house shell (BoxGeometry for now)
- [ ] OrbitControls for camera
- [ ] Conveyor belt (moving platform or animated texture)

**Milestone:** Rotate around a factory floor with one house on a moving conveyor.

### Day 2 - Assembly Magic (5-7 hours)
**Goal:** Show the manufacturing process

- [ ] 3 Assembly stations (visual markers on floor)
- [ ] House assembly sequence:
  - Station 1: Frame appears (wireframe box)
  - Station 2: Walls added (solid sides)
  - Station 3: Roof placed (top geometry)
- [ ] Animation: House moves station-to-station
- [ ] Basic timing system (dwell time at each station)
- [ ] Lighting/shadows for depth

**Milestone:** Watch a single house get assembled step-by-step.

### Day 3 - Scale & Polish (4-6 hours)
**Goal:** Demonstrate throughput

- [ ] Multiple houses in pipeline (3-5 in various stages)
- [ ] Queue system (new houses spawn, completed ones exit)
- [ ] Stats dashboard:
  - Houses completed today
  - Current throughput (houses/hour)
  - Cycle time per house
- [ ] Speed controls (0.5x, 1x, 2x, 5x)
- [ ] Camera presets (overview, station close-ups)
- [ ] Screenshot/export capability

**Milestone:** Visitor sees factory producing houses at scale.

## Ruthless Scope (What to SKIP)

### ❌ Don't Build This Weekend:
- High-fidelity CAD models (use primitives)
- Accurate factory dimensions (schematic OK)
- Physics simulation (linear movement only)
- Backend/database (100% client-side)
- Mobile responsiveness (desktop-first)
- Multiple building types (one design only)
- Interior details (shells only, as specified)
- Material variety (one style sufficient)

### ✅ Keep It Simple:
- House = 4 boxes (frame, 2 walls, roof)
- Conveyor = sliding platform
- Stations = labeled zones on floor
- Animation = linear interpolation
- UI = dat.GUI sliders

## Technical Approach

### House Model (Simplified)
```javascript
// Conceptual - not final code
class HouseShell {
  constructor() {
    this.frame = new BoxGeometry(10, 8, 12);    // Outline
    this.walls = new BoxGeometry(10, 8, 12);    // Solid
    this.roof = new BoxGeometry(12, 2, 14);     // Top cap
  }
  
  assembleAt(station) {
    // Add component based on station
  }
}
```

### Factory Flow
1. Spawn empty platform at Station 0
2. Move to Station 1 → add frame
3. Move to Station 2 → add walls  
4. Move to Station 3 → add roof
5. Exit factory → despawn, increment counter

### Animation System
- Use ThreeJS `requestAnimationFrame` loop
- Track position along conveyor (0.0 to 1.0)
- Lerp between station positions
- Trigger assembly when position reaches station threshold

## Key Learning Goals

**By end of weekend, understand:**
- ThreeJS scene graph (objects, camera, lights)
- Animation loop patterns
- Basic 3D geometry manipulation
- UI overlay with 3D canvas
- Performance considerations (object pooling if needed)

## Next Steps (Post-Weekend)

**If this goes well, consider:**
- Real factory layout (based on research)
- More detailed house models (glTF imports)
- Multiple building designs
- VR/AR exploration
- Performance metrics (FPS, draw calls)
- Deploy to web (GitHub Pages, Vercel)

## Resources

**ThreeJS Docs:**
- https://threejs.org/docs/
- https://threejs.org/examples/

**Inspiration:**
- Boxabl factory videos (modular housing)
- Assembly line simulations
- Factory digital twins

---

**Remember:** The goal is a **proof of concept**, not production software. Ship something satisfying that demonstrates the core idea. Polish comes later.

**Start with:** Basic ThreeJS scene. Get one cube moving. Build from there.
