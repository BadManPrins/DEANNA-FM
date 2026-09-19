const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldHtml = `<div class="thony-specials-container" id="thony-specials" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px; width: 80%; max-width: 400px; max-height: 200px; overflow-y: auto;">`;
const newHtml = `<div class="cover-flow-container" id="thony-specials" style="margin-top: 0; padding-top: 20px; max-height: 350px;">`;

html = html.replace(oldHtml, newHtml);
fs.writeFileSync('index.html', html);

let script = fs.readFileSync('script.js', 'utf8');

const oldScript = `    if(specialsContainer) {
        thonyLibrary.forEach(track => {
            const btn = document.createElement('button');
            btn.style.padding = '10px 20px';
            btn.style.background = 'rgba(0,0,0,0.4)';
            btn.style.border = '1px solid ' + track.color;
            btn.style.color = '#fff';
            btn.style.borderRadius = '5px';
            btn.style.cursor = 'pointer';
            btn.style.fontFamily = 'Inter, sans-serif';
            btn.style.textAlign = 'left';
            btn.innerHTML = '💿 ' + track.title;
            
            btn.addEventListener('click', () => {
                selectTrack(track, currentSelectingDeck);
                closeSelector();
            });
            
            btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(255,255,255,0.1)');
            btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(0,0,0,0.4)');
            
            specialsContainer.appendChild(btn);
        });
    }`;

const newScript = `    if(specialsContainer) {
        thonyLibrary.forEach(track => {
            const card = document.createElement('div');
            card.className = 'track-card';
            card.innerHTML = \`
                <div class="track-card-record">
                    <div class="track-card-label" style="background: \${track.color}"></div>
                </div>
                <div class="track-card-title">\${track.title}</div>
            \`;
            
            card.addEventListener('click', () => {
                selectTrack(track, currentSelectingDeck);
                closeSelector();
            });
            
            specialsContainer.appendChild(card);
        });
    }`;

script = script.replace(oldScript, newScript);
fs.writeFileSync('script.js', script);
console.log('Fixed rendering');
