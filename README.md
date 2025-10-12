# Script board ui
scripts here

These are scripts either ive made or others have

add these into the inspect element console (dont past them in all at once) 

Building script (works the same way as regular fill with some tweaks)
```
ig.game.O7715.queuePerformDelayMs = 0;
eval(`ig.game.mapPlacementValidation.getAllInnerOfRectangleAreSameForFillBuilding=${ig.game.mapPlacementValidation.getAllInnerOfRectangleAreSameForFillBuilding.toString().replaceAll("return g", "return true")}`)
ig.game.mapPlacementValidation.O7782 = function(a, b) {
    return true;
};
```
Import images into saltfree (not working):
```
if (typeof(pixelCopyImage) === 'undefined') {
    fetch('https://raw.githubusercontent.com/Pixelguru26/manyland-importer-3/main/PixelCopyImage.js').then(
        response => response.text()
    ).then(
        script => {
            pci = document.createElement('script');
            pci.innerHTML = 'Promise.resolve((async () => {\n'+script+'\n})());';
            $('body')[0].appendChild(pci);
        }
    );
}


```
Anti death:
```
ig.game.O4269.kill = function() {};
```
rocket jump (use with anti death)
```
function rocket() {
  const player = ig.game.O4269;
  if(player && typeof player.vel !== "undefined"){
    player.vel.y = -1100; // negative y = upward velocity
  }
}

// Trigger the rocket
rocket();
```
spasm/shake (client sided for now)
```
const player = ig.game.O4269;
if (player && player.anims) {
  const origDraw = player.draw;
  player.spasmTime = 0;
  player.draw = function() {
    this.spasmTime++;
    const shake = Math.sin(this.spasmTime * 1.5) * 3;
    ig.system.context.save();
    ig.system.context.translate(shake, Math.cos(this.spasmTime * 2) * 3);
    origDraw.apply(this, arguments);
    ig.system.context.restore();
  };
  console.log("spasm attack, will add more later)");
}
```
client-sided editor (allows you to place blocks in other peoples worlds but only appear to you)
```
ig.game.isEditorHere=true
```
cocaine script
```
const cocaineSpasm = () => {
    if (!ig?.game?.O4269) return setTimeout(cocaineSpasm, 500);
    let p = ig.game.O4269;
    let oldKill = p.kill.bind(p);
    let old = p.update.bind(p);

    // prevent death initially
    p.kill = function() {}; 

    // Spasm toggle
    let spasmActive = true;
    setInterval(() => { spasmActive = !spasmActive; }, 30000);

    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let hue = 0;
    let elapsed = 0;

    // Gradually drain health over 25 seconds
    const drainDuration = 25000; // ms
    const drainInterval = 100; // ms
    const steps = drainDuration / drainInterval;
    const initialHealth = p.health ?? 100; 
    const drainAmount = initialHealth / steps;

    const healthDrain = setInterval(() => {
        elapsed += drainInterval;
        if (p.health !== undefined) {
            p.health -= drainAmount;
            if (p.health <= 0) {
                clearInterval(healthDrain);
                p.kill = oldKill;
                p.kill();
            }
        }
    }, drainInterval);

    const liquidWarp = () => {
        const w = canvas.width;
        const h = canvas.height;

        // Capture current canvas frame
        const frame = ctx.getImageData(0, 0, w, h);
        const srcData = new Uint8ClampedArray(frame.data);

        // Gradually increase amplitude over time
        const amplitude = 5 + 10 * Math.min(elapsed / drainDuration, 1); // 5 → 15 max
        const frequency = 0.02;

        for (let y = 0; y < h; y++) {
            const offset = Math.floor(Math.sin((y + hue) * frequency) * amplitude);
            for (let x = 0; x < w; x++) {
                let dstX = x + offset;
                if (dstX < 0) dstX = 0;
                if (dstX >= w) dstX = w - 1;

                const srcIdx = (y * w + x) * 4;
                const dstIdx = (y * w + dstX) * 4;

                frame.data[dstIdx] = srcData[srcIdx];
                frame.data[dstIdx + 1] = srcData[srcIdx + 1];
                frame.data[dstIdx + 2] = srcData[srcIdx + 2];
                frame.data[dstIdx + 3] = srcData[srcIdx + 3];
            }
        }

        ctx.putImageData(frame, 0, 0);

        // color chaos
        hue += 2;
        canvas.style.filter = `hue-rotate(${hue}deg) saturate(1.5)`;
        canvas.style.transform = `scale(${1 + Math.sin(hue/30)*0.02}) rotate(${Math.sin(hue/20)*0.5}deg)`;

        requestAnimationFrame(liquidWarp);
    };
    liquidWarp();

    p.update = function() {
        if (spasmActive) {
            this.gravityFactor = 0;

            const s = 1600;
            if (ig.input.state('left'))  this.vel.x = -s;
            if (ig.input.state('right')) this.vel.x = s;
            if (ig.input.state('up'))    this.vel.y = -s;
            if (ig.input.state('down'))  this.vel.y = s;

            if (!ig.input.state('left') && !ig.input.state('right')) this.vel.x *= 0.7;
            if (!ig.input.state('up') && !ig.input.state('down'))   this.vel.y *= 0.7;

            this.pos.x += (Math.random() - 0.5) * 20;
            this.pos.y += (Math.random() - 0.5) * 20;

            if (this._rot === undefined) this._rot = 0;
            this._rot += (Math.random() - 0.5) * 0.4;
            if ('angle' in this) this.angle = this._rot;
        } else {
            this.gravityFactor = 1;
            this.vel.x *= 0.95;
            this.vel.y *= 0.95;
        }

        old();
    };
};

cocaineSpasm();


```
no gravity flight only wasd and </> arrow keys work not up and down ^V
```
`
ig.game.gravity = 0; // No gravity

let oldUpdate = ig.game.update;
ig.game.update = function() {
    oldUpdate.apply(this, arguments);

    let p = ig.game?.O4269;
    if (!p || !p.pos) return;

    // ---- Free flight movement (WASD + arrow keys) ----
    let speed = 3.5;
    if (ig.input.state('left')  || ig.input.state('a') || ig.input.state('arrowleft'))  p.pos.x -= speed;
    if (ig.input.state('right') || ig.input.state('d') || ig.input.state('arrowright')) p.pos.x += speed;
    if (ig.input.state('up')    || ig.input.state('w') || ig.input.state('arrowup'))    p.pos.y -= speed;
    if (ig.input.state('down')  || ig.input.state('s') || ig.input.state('arrowdown'))  p.pos.y += speed;

    // ---- Random wobble ----
    p.pos.x += (Math.random() - 0.5) * 1.2;
    p.pos.y += (Math.random() - 0.5) * 0.8;

    // ---- No death ----
    if (typeof p.kill === "function") p.kill = function() {};
    if ("O5004" in p) p.O5004 = 0;
    if ("O6766" in p) p.O6766 = false;

    // ---- Keep inside screen ----
    if (typeof ig.utils?.clamp === "function") {
        p.pos.x = ig.utils.clamp(p.pos.x, 0, ig.system.width);
        p.pos.y = ig.utils.clamp(p.pos.y, 0, ig.system.height);
    }

    // ---- Rotation wobble ----
    if (p._wobbleRot === undefined) p._wobbleRot = 0;
    p._wobbleRot += (Math.random() - 0.5) * 0.1;
    if ("angle" in p) p.angle = p._wobbleRot;
};
```
FIXED freecam ctrl+E
```
(function() {
    'use strict';

    const game = ig.game;
    const cam = game.camera;

    
    const oldCameraUpdate = cam.update.bind(cam);
    const originalOffset = { x: cam.offset.x, y: cam.offset.y };
    let followMouse = false;

    // Freecam reach reach (adjust this for bigger range)
    const reachMultiplier = 2; // 1 = normal, 2 = double, etc.

    // Hook camera update
    cam.update = function() {
        oldCameraUpdate();

        // Toggle freecam / mouse follow on Ctrl+E
        if (ig.input.state('ctrl') && ig.input.pressed('e')) {
            followMouse = !followMouse;
            console.log(followMouse ? 'Freecam enabled' : 'Freecam disabled');

            if (!followMouse) {
                cam.offset.x = originalOffset.x;
                cam.offset.y = originalOffset.y;
            }
        }

        // Apply mouse-following freecam (centered + extended)
        if (followMouse) {
            const mx = ig.input.mouse.x;
            const my = ig.input.mouse.y;

            const centerX = ig.system.width / 2;
            const centerY = ig.system.height / 2;

            cam.offset.x = originalOffset.x + ((mx - centerX) / ig.system.scale) * reachMultiplier;
            cam.offset.y = originalOffset.y + ((my - centerY) / ig.system.scale) * reachMultiplier;
        }
    };

})();
```
FIXED high contrast ctrl+[
```
(function() {
    'use strict';

    // Adjustable settings
    const CONTRAST_ON = "300%";   // contrast when enabled
    const CONTRAST_OFF = "100%";  // contrast when disabled
    const BRIGHTNESS_ON = "110%"; // optional brightness tweak
    const BRIGHTNESS_OFF = "100%";

    // Load saved state
    let saved = localStorage.getItem('contrastsettings');
    let enabled = saved ? JSON.parse(saved) : false;

    // Apply current state
    const applyFilter = (state) => {
        const canvas = jQuery("canvas");
        if (state) {
            canvas.css("filter", `contrast(${CONTRAST_ON}) brightness(${BRIGHTNESS_ON})`);
        } else {
            canvas.css("filter", `contrast(${CONTRAST_OFF}) brightness(${BRIGHTNESS_OFF})`);
        }
    };

    applyFilter(enabled);

    // Toggle function
    const toggleContrast = () => {
        enabled = !enabled;
        applyFilter(enabled);
        localStorage.setItem('contrastsettings', JSON.stringify(enabled));
        console.log(enabled ? "High Contrast ON" : "High Contrast OFF");
    };

    // Keybind: Ctrl + [
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === "[") {
            toggleContrast();
        }
    });

})();
``
