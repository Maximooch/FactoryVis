# FactoryVis - Side Project Plan

## Project Vision
Interactive 3D visualization of a modular house manufacturing factory using ThreeJS. **Goal:** Demonstrate the conceptual speed and scale of automated house shell production while learning 3D graphics programming.

## Project Status

**✅ MVP COMPLETE** (Week 1)
- Factory floor with 3 assembly stations
- House shells moving along conveyor belt  
- Progressive assembly (frame → walls → roof)
- Performance monitoring (FPS, frame time)
- Production controls (pause, resume, reset, speed)
- WASD camera controls + OrbitControls

**🔄 Ongoing Enhancements** (Side Project)
- Smooth assembly animations
- Visual polish and effects
- Advanced camera modes
- Performance optimizations

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

## Development Phases

### Phase 1 - Foundation ✅ COMPLETE
**Goal:** See something moving in 3D (Week 1, Day 1)

- [x] Setup: HTML boilerplate, ThreeJS import
- [x] Scene basics: Camera, lights, floor grid
- [x] Simple factory floor (plane with texture/color)
- [x] ONE basic house shell (BoxGeometry for now)
- [x] OrbitControls for camera + WASD controls
- [x] Conveyor belt with station markers

### Phase 2 - Assembly Magic ✅ COMPLETE
**Goal:** Show the manufacturing process (Week 1, Day 1-2)

- [x] 3 Assembly stations (visual markers on floor)
- [x] House assembly sequence (frame → walls → roof)
- [x] Animation: House moves station-to-station
- [x] Lighting/shadows for depth
- [ ] Smooth assembly animations (stretch goal)

### Phase 3 - UI & Polish ✅ COMPLETE
**Goal:** Production controls and monitoring (Week 1, Day 2-3)

- [x] Performance monitoring (FPS, frame time)
- [x] Production controls (pause, resume, reset)
- [x] Speed controls via dat.GUI
- [ ] Visual feedback enhancements (stretch goal)

### Phase 4 - Enhancements (Ongoing)
**Goal:** Polish and experimental features

- [ ] Smooth assembly animations (lerp/tween)
- [ ] Station pause behavior
- [ ] Advanced camera modes (follow, cinematic)
- [ ] Multiple houses in pipeline
- [ ] Performance optimizations

### Phase 5 - Future Ideas (Backlog)
- Robotic arm animations
- Multiple house types
- Data export and analytics
- Deployment to web

## Ruthless Scope (What to SKIP)

### ❌ Don't Build (Low Priority):
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

**Already learned:**
- ThreeJS scene graph (objects, camera, lights)
- Animation loop patterns
- Basic 3D geometry manipulation
- UI overlay with 3D canvas
- Performance considerations (object pooling if needed)

**Next to learn:**
- Animation systems (lerp, tween, keyframes)
- More complex geometry and materials
- Camera animation and transitions

## Next Steps (When You Have Time)

**High Impact, Low Effort:**
- Smooth assembly animations (most visual bang for buck)
- Station pause behavior (adds drama)

**Medium Effort:**
- Multiple houses in pipeline
- Camera presets and transitions

**Future Exploration:**
- Real factory layout (based on research)
- More detailed house models (glTF imports)
- Multiple building designs
- VR/AR exploration
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

**Project Philosophy:**
- This is a **learning project** and **side project** - no deadlines, no pressure
- Work on it when you have time and energy
- Focus on features that interest you
- The MVP is done - everything else is bonus
- Have fun with it!

**Current Priority:** Smooth assembly animations would be the most visually impactful next enhancement.
