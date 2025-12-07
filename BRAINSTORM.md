# FactoryVis - Enhancement Ideas & Roadmap

**Current Status:** Functional MVP with 3-house pipeline, animated conveyor, and real-time stats  
**Time Invested:** ~100 minutes  
**Next Phase:** Polish & expand

---

## 🎬 Priority 1: Assembly Animations (Smooth Transitions)

**Goal:** Make component assembly visually smooth instead of instant pop-in

### Walls Assembly Animation
- **Current:** Instant visibility toggle
- **Target:** Walls slide up from below floor
  - Start: scale.y = 0, position.y = 0
  - End: scale.y = 1, position.y = height/2
  - Duration: 1-1.5 seconds
  - Easing: EaseOutCubic for natural deceleration

### Roof Assembly Animation
- **Current:** Instant visibility toggle
- **Target:** Roof descends from above with slight rotation
  - Start: position.y = height + 10, rotation.x = 0.1
  - End: position.y = height + 0.25, rotation.x = 0
  - Duration: 1-1.5 seconds
  - Easing: EaseInOutQuad for smooth landing
  - Optional: Slight bounce on landing

### Frame Assembly (Already Visible)
- Could add: wireframe "drawing effect" (gradual opacity 0 → 1)
- Or: pulsing glow when first spawned

### Implementation Notes
- Use GSAP or custom lerp-based tweening
- Trigger animations in `HouseShell.startAssembly()`
- Adjust `assemblyDuration` to match animation length
- Coordinate with station pause timing

---

## 🏠 Priority 2: Improved House Models

**Goal:** More realistic and detailed house geometry

### Level 1: Better Primitive Models (Quick - 30 min)
- **Roof improvement:**
  - Change from flat box to gabled/sloped roof
  - Use ExtrudeGeometry or custom geometry
  - Add overhang details
- **Walls improvement:**
  - Add window/door placeholders (darker rectangles)
  - Slight texture variation
- **Foundation:**
  - Add base platform beneath house
  - Darker concrete color

### Level 2: Modular Components (Medium - 1-2 hours)
- **Separate wall panels:**
  - 4 individual walls instead of single box
  - Allows for more detailed assembly (one wall at a time)
- **Corner posts:**
  - Vertical supports at frame corners
  - Metallic material
- **Roof sections:**
  - Multiple pieces (left slope, right slope, ridge)

### Level 3: glTF Models (Advanced - 2-3 hours)
- **Create in Blender:**
  - Detailed house model with proper UVs
  - Export as .glb
- **Import via GLTFLoader:**
  - Load model once, clone for instances
  - Animate individual parts via object hierarchy
- **Benefits:**
  - Professional look
  - Complex details (railings, trim, etc.)
  - Efficient (object pooling)

### Color Variations
- **Currently:** All houses identical beige/tan
- **Enhancement:** Randomize wall colors
  - Palette: white, beige, light blue, sage green
  - Keeps roof color consistent (dark gray)

---

## 🎨 Priority 3: Visual Polish

### Particle Effects
**Assembly Sparks:**
- When walls/roof snap into place
- Small particle burst at connection points
- Orange/yellow sparks
- 0.5-second duration
- Uses THREE.Points or custom particle system

**Welding Effect:**
- During assembly pause
- Subtle glow + particles along frame edges
- Blue/white color (arc welding aesthetic)

**Completion Celebration:**
- When house exits at Z=-100
- Quick green particle burst
- Optional: triumphant sound effect

### Environmental Effects
**Factory Ambiance:**
- Add steam/smoke rising from stations
- Subtle fog particles drifting
- Heat shimmer effect (shader-based, advanced)

**Ground Details:**
- Oil stains on factory floor (decals)
- Safety lines (yellow/black stripes)
- Station number labels on floor

### Lighting Enhancements
**Dynamic Shadows:**
- Houses cast dynamic shadows on each other
- Update shadow camera frustum as houses move

**Volumetric Lighting (Advanced):**
- God rays through fog
- Requires custom shader or postprocessing

### Camera Improvements
**Smooth Transitions:**
- Camera preset buttons use GSAP for smooth fly-to
- Instead of instant jump

**Follow Mode:**
- Camera tracks a specific house through assembly
- Toggle via UI button

**Cinematic Mode:**
- Auto-rotating camera around factory
- Slow dolly along conveyor
- Toggle on/off

---

## 🔊 Priority 4: Sound Effects

**Web Audio API Implementation**

### Ambient Sounds (Looping)
- **Conveyor hum:** Low-frequency rumble (100-200Hz)
  - Volume tied to production speed
  - Fades in/out with speed changes
- **Factory atmosphere:** Distant machinery, clanks
  - Very quiet background layer

### Event-Based Sounds (One-Shot)
**Assembly Sounds:**
- **Walls installation:** Hydraulic hiss + clunk
- **Roof placement:** Heavy thud + metallic ring
- **Frame spawn:** Mechanical whir

**Station Sounds:**
- Subtle beep when house arrives at station
- Different pitch per station (red=low, yellow=mid, green=high)

**Completion Sound:**
- Satisfying "ding" or success chime when house exits

### Implementation Notes
- Load sounds as AudioBuffers
- Use PositionalAudio for 3D spatial audio (sounds come from stations)
- Add volume slider to UI dashboard
- Mute button for quiet mode
- All sounds <100KB (compressed .mp3 or .ogg)

### Sound Sources
- **Free libraries:** Freesound.org, Zapsplat
- **Procedural:** Use Tone.js to generate synthetic sounds
- **Record:** DIY foley with household items

---

## 📊 Priority 5: Performance Stats & Monitoring

### FPS Counter
**Display:**
- Top-left corner, small text
- Green (>50 FPS), Yellow (30-50), Red (<30)
- Updates every second

**Implementation:**
- Use THREE.Stats or custom calculation
- `deltaTime` tracking for frame duration

### Draw Call Monitor
**Display:**
- Show number of draw calls per frame
- Helps identify performance bottlenecks

**Info:**
- `renderer.info.render.calls`
- `renderer.info.render.triangles`

### Factory Metrics (Extended Stats)
**Add to Dashboard:**
- **Assembly efficiency:** % of time houses spend assembling vs. moving
- **Station utilization:** Time each station is active
- **Average cycle time:** Time from spawn to completion per house
- **Throughput graph:** Real-time chart of houses/hour over time

### Debug Mode
**Toggle via keyboard (D key):**
- Show bounding boxes
- Display house IDs/positions
- Station range visualization (tolerance circles)
- Frame graph (FPS over time)

---

## 🚀 Priority 6: Deployment to GitHub Pages

**Goal:** Make project publicly accessible at `https://maximooch.github.io/FactoryVis`

### Deployment via gh CLI (Preferred)

**Option A: GitHub Actions (Automated)**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

**Option B: Manual gh CLI**
```bash
# One-time setup
gh repo edit --enable-pages --pages-branch gh-pages

# Deploy
git checkout -b gh-pages
git push origin gh-pages
```

**Prerequisites:**
- Update any absolute paths to relative
- Test locally first
- Ensure all assets load via CDN (ThreeJS, dat.GUI)

### Deployment via Vercel CLI (Backup)
- If gh-pages has issues
- Simpler: `vercel --prod`
- Custom domain support

### Post-Deployment
- Update README with live demo link
- Add screenshots to repo
- Share on social media (Twitter, Reddit r/threejs)

---

## 🎯 Future Expansion Ideas

### Multiple Building Types
- Add 2-3 different house designs
- Random selection at spawn
- Different assembly requirements
- Color-coded by type

### Quality Control Station
- Add 4th station: inspection
- Small % chance of defect
- Defective houses routed to repair area
- Red alert light

### Resource Management
- Track "materials" required per house
- Display material inventory
- Pause production if resources low
- Delivery trucks replenish materials

### Factory Expansion
- Start with 1 conveyor, upgrade to 2+
- Parallel production lines
- Bottleneck simulation

### VR Mode (WebXR)
- Walk through factory floor
- Inspect houses up close
- Interactive controls in VR

### Mobile Support
- Touch controls for camera
- Responsive layout
- Lower detail models for performance

### Export/Share Features
- Generate production report (PDF)
- Share stats on social media
- Export 3D model of completed house (glTF)

---

## 📅 Suggested Implementation Order

**Phase 1: Polish (Next Session - 1-2 hours)**
1. Smooth assembly animations (walls slide, roof drops)
2. Improved house models (gabled roof, windows)
3. Particle effects (assembly sparks)
4. Sound effects (conveyor hum, assembly clunks)

**Phase 2: Stats & Deploy (30-60 min)**
5. FPS counter + performance stats
6. Deploy to GitHub Pages
7. Screenshots for README
8. Social media announcement

**Phase 3: Expansion (Future)**
9. Multiple house types
10. Quality control station
11. Mobile support
12. VR mode

---

## 🛠️ Technical Considerations

### Performance Budget
- Target: 60 FPS on mid-range hardware
- Max triangles: ~100K
- Max draw calls: ~50
- Object pooling if >5 houses

### Browser Compatibility
- Test on Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Android
- Fallbacks for older browsers (no fog, simpler materials)

### Code Quality
- Add JSDoc comments
- Split large files (factory.js getting big)
- Consider class hierarchy refactor
- Add error handling for asset loading

### Accessibility
- Keyboard shortcuts list
- Screen reader support (stat announcements)
- High contrast mode option
- Motion reduction mode (disable animations)

---

**Next Steps:** Pick 2-3 items from Phase 1 and let's build them! 🚀

**Priority Suggestion:**
1. Smooth assembly animations (biggest visual impact)
2. Sound effects (adds life to the scene)
3. FPS counter (validate performance)
4. Deploy to GH Pages (share with world)

**Estimated time:** 1-2 hours for Phase 1 polish

Let's make this factory SING! 🎵🏭