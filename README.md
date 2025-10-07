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
teleport:
```
function main() {
    ig.game.O4269.kill = function() {};
    let oldUpdate = ig.game.update;
    ig.game.update = function() {
        let result = oldUpdate.apply(this, arguments);
        if (ig.input.state('shift') && ig.input.pressed('middleclick')) {
            let x = ig.game.screen.x + ig.input.mouse.x;
            let y = ig.game.screen.y + ig.input.mouse.y;
            ig.game.O4269.pos = {x: x, y: y}
        }
        return result;
    }
}
main();
```
