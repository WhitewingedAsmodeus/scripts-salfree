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
const cocaineSpasm = () => {
    if (!ig?.game?.O4269) return setTimeout(cocaineSpasm, 500);
    let p = ig.game.O4269;
    let old = p.update.bind(p);

    // prevent death
    p.kill = function() {}; 

    p.update = function() {
        this.gravityFactor = 0;

        // strong fly movement
        const s = 1600;
        if (ig.input.state('left'))  this.vel.x = -s;
        if (ig.input.state('right')) this.vel.x = s;
        if (ig.input.state('up'))    this.vel.y = -s;
        if (ig.input.state('down'))  this.vel.y = s;

        if (!ig.input.state('left') && !ig.input.state('right')) this.vel.x *= 0.7;
        if (!ig.input.state('up') && !ig.input.state('down'))   this.vel.y *= 0.7;

        // spasm shake
        this.pos.x += (Math.random() - 0.5) * 20;
        this.pos.y += (Math.random() - 0.5) * 20;

        // rotation chaos
        if (this._rot === undefined) this._rot = 0;
        this._rot += (Math.random() - 0.5) * 0.4;
        if ('angle' in this) this.angle = this._rot;

        old();
    };
};

cocaineSpasm();
```
