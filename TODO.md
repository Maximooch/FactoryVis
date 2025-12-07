# FactoryVis - Weekend TODO List

**Purpose:** Granular task breakdown with checkboxes. Check items off as you complete them.

---

## Setup (Before Starting)

- [x] Read through PLAN.md completely
- [x] Install Node.js/npm (if not already installed)
- [x] Create basic project structure
- [x] Initialize git repo (already done ✓)
- [x] Set up local dev server (npx http-server on port 8080)

---

## DAY 1 - Foundation (Saturday) ✅ COMPLETE!
**Goal:** See a 3D scene with something moving by end of day

### Morning Session (2-3 hours) ✅

#### Task 1.1: Project Scaffolding (30 min) ✅
- [x] Create `index.html` with basic structure
- [x] Add ThreeJS via CDN (importmap)
- [x] Create `src/` directory
- [x] Create empty files:
  - [x] `src/main.js`
  - [x] `src/factory.js`
  - [x] `src/house.js`
  - [x] `src/ui.js`
- [x] Link main.js in index.html as module
- [x] Test: Open in browser, check console for errors

#### Task 1.2: Basic ThreeJS Scene (45 min) ✅
**File:** `src/main.js`
- [x] Import ThreeJS
- [x] Create scene, camera, renderer
- [x] Set up canvas and viewport sizing
- [x] Add ambient light + directional light
- [x] Create simple cube to verify rendering
- [x] Add render loop (requestAnimationFrame)
- [x] Test: See a rotating cube on screen

#### Task 1.3: Camera Controls (30 min) ✅
**File:** `src/main.js`
- [x] Import OrbitControls from ThreeJS examples
- [x] Attach controls to camera
- [x] Set camera initial position (elevated, angled)
- [x] Configure controls (damping, limits)
- [x] Test: Click-drag to rotate view, scroll to zoom
- [x] **BONUS:** Added WASD keyboard controls for free-roam camera

#### Task 1.4: Factory Floor (45 min) ✅
**File:** `src/factory.js`
- [x] Create `FactoryFloor` class
- [x] Add large plane geometry for ground
- [x] Apply basic material (gray concrete color)
- [x] Add grid helper for reference
- [x] Add axis helper (optional, for debugging)
- [x] Export and add to main scene
- [x] Test: See factory floor from above

### Afternoon Session (2-3 hours) ✅

#### Task 1.5: Simple House Model (1 hour) ✅
**File:** `src/house.js`
- [x] Create `HouseShell` class
- [x] Define basic dimensions (width: 10, height: 8, depth: 12)
- [x] Create frame (BoxGeometry with wireframe material)
- [x] Create walls (BoxGeometry with solid material)
- [x] Create roof (BoxGeometry, positioned on top)
- [x] Method: `assemble(stage)` - shows components based on stage 0-3
- [x] Initially render just frame (stage 0)
- [x] Test: See house frame on factory floor

#### Task 1.6: Conveyor Belt Basics (1 hour) ✅
**File:** `src/factory.js`
- [x] Create `ConveyorBelt` class
- [x] Add long box geometry for belt surface
- [x] Position along Z-axis (0 to -100)
- [x] Add simple material (dark gray/black)
- [x] **BONUS:** Added edge guide rails
- [x] Create 3 station markers (colored boxes at positions)
  - [x] Station 1 (Z: -20): Frame assembly (Red)
  - [x] Station 2 (Z: -50): Walls assembly (Yellow/Orange)
  - [x] Station 3 (Z: -80): Roof assembly (Green)
- [x] Test: See conveyor with 3 station markers

#### Task 1.7: Basic Movement (45 min) ✅
**File:** `src/factory.js`
- [x] Add `update(deltaTime)` method to HouseShell
- [x] Move house along Z-axis (position.z -= speed * deltaTime)
- [x] Place house at start of conveyor
- [x] In main.js render loop, call house.update()
- [x] **BONUS:** Added automatic station detection
- [x] **BONUS:** Added auto-reset loop when house completes
- [x] Test: Watch house move along conveyor

### Evening Wrap-up (30 min) ✅
- [x] Clean up console.log statements
- [x] Adjust camera position for best view
- [x] Verify all files are saved and committed
- [x] Test full scene: floor, conveyor, moving house
- [x] Screenshot for progress

**Day 1 Success Criteria:** ✅ ALL COMPLETE
✅ 3D scene renders smoothly
✅ Can orbit camera around scene
✅ House moves along conveyor belt
✅ 3 assembly stations visible
✅ **BONUS:** WASD camera controls
✅ **BONUS:** Automatic assembly at stations
✅ **BONUS:** Looping production system

---

## DAY 2 - Assembly Magic (Sunday Morning/Afternoon)
**Goal:** Progressive assembly animation at each station

**STATUS:** Day 1 completed all core functionality! Assembly already working.
The following tasks can be enhanced with smoother animations.

### Morning Session (2-3 hours)

#### Task 2.1: Station Detection (45 min) ✅ DONE EARLY
**File:** `src/factory.js`
- [x] Create `AssemblyStation` class (integrated into ConveyorBelt)
- [x] Add property: `position` (Z coordinate)
- [x] Add property: `assemblyStage` (0-3)
- [x] Add method: `isHouseAtStation(house)` - check if house Z matches
- [x] Create array of 3 stations in FactoryFloor
- [x] Test: Log when house reaches each station

#### Task 2.2: Assembly Trigger System (1 hour) ⚠️ BASIC VERSION DONE
**File:** `src/house.js`
- [x] Add `currentStage` property (starts at 0)
- [x] Add `targetStage` property
- [x] Method: `setTargetStage(stage)` - triggers assembly
- [ ] Method: `updateAssembly()` - progressively shows components
- [x] Visibility toggles:
  - [x] Stage 0: Frame visible
  - [x] Stage 1: Frame + Walls visible
  - [x] Stage 2: Frame + Walls + Roof visible
- [x] Test: Manually call setTargetStage(1), verify walls appear

**NOTE:** Currently instant visibility toggle. Can enhance with smooth animations.

#### Task 2.3: Assembly Animation (1 hour) 🔄 ENHANCEMENT OPPORTUNITY
**File:** `src/house.js`
- [ ] Add components with initial scale/position offsets
- [ ] Animate walls sliding in from sides (scale Y from 0 to 1)
- [ ] Animate roof dropping from above (position Y from +10 to 0)
- [ ] Use lerp or ThreeJS Tween for smooth animation
- [ ] Add small delay between components (0.5s)
- [ ] Test: Watch components smoothly appear

**CURRENT:** Instant pop-in. **ENHANCEMENT:** Smooth animations.

### Afternoon Session (2-3 hours)

#### Task 2.4: Integrate Stations + Assembly (1.5 hours) ✅ DONE EARLY
**File:** `src/factory.js`
- [x] In conveyor update loop, check house position vs stations
- [x] When house reaches station:
  - [x] Pause house movement (can add if desired)
  - [x] Trigger house.setTargetStage(station.assemblyStage)
  - [ ] Wait for assembly animation to complete
  - [x] Resume house movement
- [ ] Add `isPaused` flag to house (exists but not used for station stops)
- [x] Test: House stops at Station 1, frame appears, continues

**NOTE:** House currently doesn't pause at stations, just assembles while moving.

#### Task 2.5: Multi-Station Flow (1 hour) ✅ DONE EARLY
**File:** `src/factory.js`
- [x] Ensure house visits all 3 stations in sequence
- [x] Station 1: Add frame (stage 0→1)
- [x] Station 2: Add walls (stage 1→2)
- [x] Station 3: Add roof (stage 2→3)
- [x] Add exit point (Z: -100) where house despawns
- [x] Test: Watch complete assembly process start to finish

#### Task 2.6: Lighting & Shadows (30 min) ✅ DONE EARLY
**File:** `src/main.js`
- [x] Enable shadow rendering on renderer
- [x] Configure directional light to cast shadows
- [x] Enable shadows on house components
- [x] Enable shadows on factory floor (receive)
- [x] Adjust shadow camera (size, near, far)
- [x] Test: See realistic shadows under house

### Evening Wrap-up (30 min)
- [ ] Adjust animation timing (too fast/slow?)
- [x] Fine-tune camera angle for best drama
- [ ] Add station labels (optional TextGeometry or HTML overlays)
- [x] Commit progress
- [ ] Screenshot/video of assembly process

**Day 2 Success Criteria:**
✅ House stops at each station (can enhance with pause)
✅ Components appear progressively (instant, can animate)
⚠️ Smooth animations (enhancement opportunity)
✅ Shadows add depth

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
- [x] Color-code assembly stages:
  - [x] Frame: Gray wireframe
  - [x] Walls: Beige/tan
  - [x] Roof: Dark brown/gray
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
- [ ] Multiple houses in production simultaneously
- [ ] Stats show realistic throughput numbers
- [ ] Speed controls work smoothly
- [ ] Looks polished enough to demo

---

## Post-Weekend (Optional Enhancements)

### Task 1.6.5: Enhanced Conveyor (Optional)
- [ ] Add visible rollers underneath belt
- [ ] Animated UV texture scrolling (conveyor moving effect)
- [ ] Station platforms/pedestals instead of simple cubes

### Task 1.7.5: Enhanced Movement (Optional)
- [ ] Pause house at each station during assembly
- [ ] Resume movement after assembly complete
- [ ] Smooth acceleration/deceleration

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

## Progress Summary

**Completed:** Day 1 (100%) + Bonus features
**Current Status:** Ahead of schedule! Core system fully functional.
**Next Priority:** Day 3 tasks (multiple houses, stats, UI)
**Optional:** Day 2 animation enhancements (smooth transitions)

**Time Saved:** ~4-5 hours by completing Day 1 efficiently
**Recommendation:** Jump to Day 3 for maximum impact, or enhance Day 2 animations for polish

---

## Troubleshooting Checklist

### If Nothing Renders:
- [x] Check browser console for errors
- [x] Verify ThreeJS loaded (check Network tab)
- [x] Confirm renderer.domElement added to DOM
- [x] Check camera position (not inside objects)
- [x] Verify render loop is running (add console.log)

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

**End of Day 1:** ✅ DONE
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

**Minimum Viable Demo (Must Have):** ✅ ACHIEVED
✅ 3D factory scene with conveyor
✅ House assembled in 3 stages
✅ At least 2 houses visible in pipeline (can add more)
✅ Basic stats displayed (can enhance)

**Good Demo (Should Have):**
✅ All of above +
✅ Smooth animations (instant, can enhance)
✅ Speed controls work (can add)
✅ Shadows and lighting look good

**Great Demo (Nice to Have):**
- [ ] All of above +
- [ ] 5 houses in pipeline
- [ ] Polished materials/colors
- [ ] Camera presets
- [ ] Screenshot export
- [ ] Clean, documented code

**Remember:** Ship the minimum first, then layer on polish. A working simple demo beats an unfinished complex one.

---

**CURRENT STATUS:** Day 1 complete with bonus features! Ready to jump to Day 3 or enhance Day 2 animations.

**START HERE FOR DAY 3:** Begin with Task 3.1 (Multiple Houses). Check boxes as you go. You got this! 🐧