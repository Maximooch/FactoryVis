# FactoryVis - Weekend TODO List

**Purpose:** Granular task breakdown with checkboxes. Check items off as you complete them.

---

## Setup (Before Starting)

- [ ] Read through PLAN.md completely
- [ ] Install Node.js/npm (if not already installed)
- [ ] Create basic project structure
- [ ] Initialize git repo (already done ✓)
- [ ] Set up local dev server (Live Server, python -m http.server, or Vite)

---

## DAY 1 - Foundation (Saturday)
**Goal:** See a 3D scene with something moving by end of day

### Morning Session (2-3 hours)

#### Task 1.1: Project Scaffolding (30 min)
- [ ] Create `index.html` with basic structure
- [ ] Add ThreeJS via CDN (or npm install three)
- [ ] Create `src/` directory
- [ ] Create empty files:
  - [ ] `src/main.js`
  - [ ] `src/factory.js`
  - [ ] `src/house.js`
  - [ ] `src/ui.js`
- [ ] Link main.js in index.html as module
- [ ] Test: Open in browser, check console for errors

#### Task 1.2: Basic ThreeJS Scene (45 min)
**File:** `src/main.js`
- [ ] Import ThreeJS
- [ ] Create scene, camera, renderer
- [ ] Set up canvas and viewport sizing
- [ ] Add ambient light + directional light
- [ ] Create simple cube to verify rendering
- [ ] Add render loop (requestAnimationFrame)
- [ ] Test: See a rotating cube on screen

#### Task 1.3: Camera Controls (30 min)
**File:** `src/main.js`
- [ ] Import OrbitControls from ThreeJS examples
- [ ] Attach controls to camera
- [ ] Set camera initial position (elevated, angled)
- [ ] Configure controls (damping, limits)
- [ ] Test: Click-drag to rotate view, scroll to zoom

#### Task 1.4: Factory Floor (45 min)
**File:** `src/factory.js`
- [ ] Create `FactoryFloor` class
- [ ] Add large plane geometry for ground
- [ ] Apply basic material (gray concrete color)
- [ ] Add grid helper for reference
- [ ] Add axis helper (optional, for debugging)
- [ ] Export and add to main scene
- [ ] Test: See factory floor from above

### Afternoon Session (2-3 hours)

#### Task 1.5: Simple House Model (1 hour)
**File:** `src/house.js`
- [ ] Create `HouseShell` class
- [ ] Define basic dimensions (width: 10, height: 8, depth: 12)
- [ ] Create frame (BoxGeometry with wireframe material)
- [ ] Create walls (BoxGeometry with solid material)
- [ ] Create roof (BoxGeometry, positioned on top)
- [ ] Method: `assemble(stage)` - shows components based on stage 0-3
- [ ] Initially render just frame (stage 0)
- [ ] Test: See house frame on factory floor

#### Task 1.6: Conveyor Belt Basics (1 hour)
**File:** `src/factory.js`
- [ ] Create `ConveyorBelt` class
- [ ] Add long box geometry for belt surface
- [ ] Position along Z-axis (0 to -100)
- [ ] Add simple material (dark gray/black)
- [ ] Optional: Add animated texture for movement effect
- [ ] Create 3 station markers (colored boxes at positions)
  - [ ] Station 1 (Z: -20): Frame assembly
  - [ ] Station 2 (Z: -50): Walls assembly
  - [ ] Station 3 (Z: -80): Roof assembly
- [ ] Test: See conveyor with 3 station markers

#### Task 1.7: Basic Movement (45 min)
**File:** `src/factory.js`
- [ ] Add `update(deltaTime)` method to HouseShell
- [ ] Move house along Z-axis (position.z -= speed * deltaTime)
- [ ] Place house at start of conveyor
- [ ] In main.js render loop, call house.update()
- [ ] Test: Watch house move along conveyor

### Evening Wrap-up (30 min)
- [ ] Clean up console.log statements
- [ ] Adjust camera position for best view
- [ ] Verify all files are saved and committed
- [ ] Test full scene: floor, conveyor, moving house
- [ ] Screenshot for progress

**Day 1 Success Criteria:**
✓ 3D scene renders smoothly
✓ Can orbit camera around scene
✓ House moves along conveyor belt
✓ 3 assembly stations visible

---

## DAY 2 - Assembly Magic (Sunday Morning/Afternoon)
**Goal:** Progressive assembly animation at each station

### Morning Session (2-3 hours)

#### Task 2.1: Station Detection (45 min)
**File:** `src/factory.js`
- [ ] Create `AssemblyStation` class
- [ ] Add property: `position` (Z coordinate)
- [ ] Add property: `assemblyStage` (0-3)
- [ ] Add method: `isHouseAtStation(house)` - check if house Z matches
- [ ] Create array of 3 stations in FactoryFloor
- [ ] Test: Log when house reaches each station

#### Task 2.2: Assembly Trigger System (1 hour)
**File:** `src/house.js`
- [ ] Add `currentStage` property (starts at 0)
- [ ] Add `targetStage` property
- [ ] Method: `setTargetStage(stage)` - triggers assembly
- [ ] Method: `updateAssembly()` - progressively shows components
- [ ] Visibility toggles:
  - [ ] Stage 0: Frame visible
  - [ ] Stage 1: Frame + Walls visible
  - [ ] Stage 2: Frame + Walls + Roof visible
- [ ] Test: Manually call setTargetStage(1), verify walls appear

#### Task 2.3: Assembly Animation (1 hour)
**File:** `src/house.js`
- [ ] Add components with initial scale/position offsets
- [ ] Animate walls sliding in from sides (scale Y from 0 to 1)
- [ ] Animate roof dropping from above (position Y from +10 to 0)
- [ ] Use lerp or ThreeJS Tween for smooth animation
- [ ] Add small delay between components (0.5s)
- [ ] Test: Watch components smoothly appear

### Afternoon Session (2-3 hours)

#### Task 2.4: Integrate Stations + Assembly (1.5 hours)
**File:** `src/factory.js`
- [ ] In conveyor update loop, check house position vs stations
- [ ] When house reaches station:
  - [ ] Pause house movement
  - [ ] Trigger house.setTargetStage(station.assemblyStage)
  - [ ] Wait for assembly animation to complete
  - [ ] Resume house movement
- [ ] Add `isPaused` flag to house
- [ ] Test: House stops at Station 1, frame appears, continues

#### Task 2.5: Multi-Station Flow (1 hour)
**File:** `src/factory.js`
- [ ] Ensure house visits all 3 stations in sequence
- [ ] Station 1: Add frame (stage 0→1)
- [ ] Station 2: Add walls (stage 1→2)
- [ ] Station 3: Add roof (stage 2→3)
- [ ] Add exit point (Z: -100) where house despawns
- [ ] Test: Watch complete assembly process start to finish

#### Task 2.6: Lighting & Shadows (30 min)
**File:** `src/main.js`
- [ ] Enable shadow rendering on renderer
- [ ] Configure directional light to cast shadows
- [ ] Enable shadows on house components
- [ ] Enable shadows on factory floor (receive)
- [ ] Adjust shadow camera (size, near, far)
- [ ] Test: See realistic shadows under house

### Evening Wrap-up (30 min)
- [ ] Adjust animation timing (too fast/slow?)
- [ ] Fine-tune camera angle for best drama
- [ ] Add station labels (optional TextGeometry or HTML overlays)
- [ ] Commit progress
- [ ] Screenshot/video of assembly process

**Day 2 Success Criteria:**
✓ House stops at each station
✓ Components appear progressively
✓ Smooth animations (no pop-in)
✓ Shadows add depth

---

## DAY 3 - Scale & Polish (Sunday Afternoon/Evening)
**Goal:** Multiple houses, stats dashboard, speed controls

### Afternoon Session (2-3 hours)

#### Task 3.1: Multiple Houses (1 hour)
**File:** `src/factory.js`
- [ ] Create `ProductionLine` class
- [ ] Maintain array of active houses (max 5)
- [ ] Spawn new house every X seconds (variable interval)
- [ ] Ensure spacing between houses (minimum distance)
- [ ] Remove houses when they exit conveyor
- [ ] Test: See 3-5 houses in pipeline at various stages

#### Task 3.2: Stats Tracking (45 min)
**File:** `src/factory.js`
- [ ] Add properties:
  - [ ] `housesCompleted` counter
  - [ ] `startTime` timestamp
  - [ ] `productionSpeed` multiplier (default 1.0)
- [ ] Increment counter when house exits
- [ ] Calculate `housesPerHour` from elapsed time
- [ ] Calculate `housesPerDay` (housesPerHour * 24)
- [ ] Method: `getStats()` returns object with metrics

#### Task 3.3: UI Dashboard (1.5 hours)
**File:** `src/ui.js`
- [ ] Add dat.GUI library (CDN or npm)
- [ ] Create GUI panel (top-right corner)
- [ ] Add stat displays (read-only):
  - [ ] Houses Completed
  - [ ] Houses/Hour
  - [ ] Houses/Day (projected)
- [ ] Add speed slider (0.5x to 5x)
- [ ] Wire slider to factory.productionSpeed
- [ ] Add camera preset buttons:
  - [ ] Overview
  - [ ] Station 1 close-up
  - [ ] Station 2 close-up
  - [ ] Station 3 close-up
- [ ] Test: Verify stats update in real-time

### Evening Session (1-2 hours)

#### Task 3.4: Visual Polish (1 hour)
**File:** Multiple
- [ ] Better materials (use MeshStandardMaterial with roughness/metalness)
- [ ] Color-code assembly stages:
  - [ ] Frame: Gray wireframe
  - [ ] Walls: Beige/tan
  - [ ] Roof: Dark brown/gray
- [ ] Add subtle fog for depth
- [ ] Improve lighting (add rim light or fill light)
- [ ] Add simple skybox or background color gradient
- [ ] Test: Does it look satisfying?

#### Task 3.5: Screenshot/Export (30 min)
**File:** `src/main.js`
- [ ] Add button: "Capture Screenshot"
- [ ] Use `renderer.domElement.toDataURL()`
- [ ] Download as PNG
- [ ] Optional: Record short video (browser extension or manual)
- [ ] Test: Save image showing multiple houses being assembled

#### Task 3.6: Final Touches (30 min)
- [ ] Update README.md with:
  - [ ] Project description
  - [ ] How to run locally
  - [ ] Controls explanation
  - [ ] Screenshot/GIF
- [ ] Clean up code:
  - [ ] Remove debug console.logs
  - [ ] Add comments to complex sections
  - [ ] Consistent code style
- [ ] Final commit with descriptive message
- [ ] Test on fresh browser session

**Day 3 Success Criteria:**
✓ Multiple houses in production simultaneously
✓ Stats show realistic throughput numbers
✓ Speed controls work smoothly
✓ Looks polished enough to demo

---

## Post-Weekend (Optional Enhancements)

### If You Have Extra Time:
- [ ] Add pause/play button (freeze simulation)
- [ ] Add reset button (clear all houses, restart stats)
- [ ] Show individual house IDs/labels
- [ ] Add sound effects (optional - assembly clunks, conveyor hum)
- [ ] Performance optimization (object pooling if FPS drops)
- [ ] Deploy to GitHub Pages or Vercel

### Future Ideas (Don't Do This Weekend):
- [ ] More realistic house models (glTF import)
- [ ] Multiple building types (single-story, two-story)
- [ ] Accurate factory layout based on real facilities
- [ ] Mobile/touch controls
- [ ] VR mode (WebXR)
- [ ] Export statistics as CSV/JSON
- [ ] Add defect/quality control station
- [ ] Simulate material shortages/delays

---

## Troubleshooting Checklist

### If Nothing Renders:
- [ ] Check browser console for errors
- [ ] Verify ThreeJS loaded (check Network tab)
- [ ] Confirm renderer.domElement added to DOM
- [ ] Check camera position (not inside objects)
- [ ] Verify render loop is running (add console.log)

### If Performance is Slow:
- [ ] Reduce number of houses (max 3 instead of 5)
- [ ] Simplify geometry (lower segment counts)
- [ ] Disable shadows temporarily
- [ ] Check draw calls (use Stats.js)

### If Animations Glitch:
- [ ] Ensure deltaTime is used correctly
- [ ] Check for NaN values in positions
- [ ] Verify animation complete before next action
- [ ] Add state machine if logic gets complex

---

## Daily Commit Messages (Suggested)

**End of Day 1:**
```
feat: basic ThreeJS scene with moving house on conveyor
- Scene setup with camera, lights, floor
- Simple house model (frame only)
- Conveyor belt with 3 station markers
- House moves along Z-axis
```

**End of Day 2:**
```
feat: progressive assembly animation at stations
- House stops at each station
- Components appear sequentially (frame → walls → roof)
- Smooth animations with shadows
- Complete assembly flow working
```

**End of Day 3:**
```
feat: multi-house production with stats dashboard
- 3-5 houses in pipeline simultaneously
- Real-time stats (houses/hour, houses/day)
- Speed controls (0.5x to 5x)
- UI dashboard with camera presets
- Screenshot export capability
```

---

## Success Metrics

**Minimum Viable Demo (Must Have):**
✓ 3D factory scene with conveyor
✓ House assembled in 3 stages
✓ At least 2 houses visible in pipeline
✓ Basic stats displayed

**Good Demo (Should Have):**
✓ All of above +
✓ Smooth animations
✓ Speed controls work
✓ Shadows and lighting look good

**Great Demo (Nice to Have):**
✓ All of above +
✓ 5 houses in pipeline
✓ Polished materials/colors
✓ Camera presets
✓ Screenshot export
✓ Clean, documented code

**Remember:** Ship the minimum first, then layer on polish. A working simple demo beats an unfinished complex one.

---

**START HERE:** Begin with Day 1, Task 1.1. Check boxes as you go. You got this! 🐧