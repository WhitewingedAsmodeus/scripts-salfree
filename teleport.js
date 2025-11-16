(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O4269) {
            clearInterval(wait);
            initTeleportUI();
        }
    }, 100);

    function initTeleportUI() {
        if (document.getElementById('teleportBoard')) return;

        const board = document.createElement('div');
        board.id = 'teleportBoard';
        board.style.cssText = `
            position:fixed; top:20px; right:20px; width:180px; padding:5px;
            background:rgba(191,188,184,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            font-family:sans-serif; font-size:12px; color:#000;
            z-index:9999; cursor:grab; box-sizing:border-box;
        `;
        document.body.appendChild(board);

        let dragging = false, ox, oy;
        board.onmousedown = e => { dragging = true; ox = e.clientX - board.offsetLeft; oy = e.clientY - board.offsetTop; board.style.cursor = 'grabbing'; };
        document.onmouseup = () => { dragging = false; board.style.cursor = 'grab'; };
        document.onmousemove = e => { if(dragging){ board.style.left = e.clientX - ox + 'px'; board.style.top = e.clientY - oy + 'px'; } };

        const title = document.createElement('div');
        title.textContent = 'TELEPORT';
        title.style.cssText = 'text-align:center; font-weight:bold; margin-bottom:5px;';
        board.appendChild(title);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'x,y,p,a';
        input.style.cssText = `
            width:100%; padding:2px; margin-bottom:3px; font-size:11px;
            box-sizing:border-box; border:1px solid #6f6d69;
        `;
        board.appendChild(input);

        const btn = document.createElement('button');
        btn.textContent = 'Teleport';
        btn.style.cssText = `
            width:100%; padding:2px 0; margin-top:3px;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
        `;
        board.appendChild(btn);

        btn.onclick = teleport;
        input.addEventListener('keydown', e => { if(e.key === 'Enter') teleport(); });

        function teleport() {
            const val = input.value.trim();
            if(!val) return;
            const parts = val.split(',').map(s => s.trim());
            const bx = parseFloat(parts[0]);
            const by = parseFloat(parts[1]);
            const p = parts[2] ? parseInt(parts[2]) : 0;
            const a = parts[3] || '0';

            if(isNaN(bx) || isNaN(by)) return console.error('Invalid coordinates!');

            const px = bx * 19;
            const py = by * 19;

            ig.game.O4269.pos.x = px;
            ig.game.O4269.pos.y = py;

            console.log(`Teleported to block (${bx}, ${by}, ${p}, ${a}) → pixels (${px}, ${py})`);
        }
    }
})();
