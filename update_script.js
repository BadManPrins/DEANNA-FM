const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

const oldLib = `const trackLibrary = [`;
const newLib = `
const thonyLibrary = [
    { id: 'thony-aya', title: 'Aya Nakamura - Copines', vocal: 'audio/user-track-aya.mp3', inst: null, bpm: 105, color: '#ffcc00' },
    { id: 'thony-voodoo', title: 'Carel & Ronnie Flex - Voodoo', vocal: 'audio/user-track-voodoo.mp3', inst: null, bpm: 105, color: '#ff3366' },
    { id: 'thony-dj', title: 'DJ', vocal: 'audio/user-track-dj.mp3', inst: null, bpm: 120, color: '#9933ff' }
];

const trackLibrary = [`;

s = s.replace(oldLib, newLib);

const oldRender = `function renderCoverFlow() {
    coverFlow.innerHTML = '';
    
    trackLibrary.forEach(track => {
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
        
        coverFlow.appendChild(card);
    });
}`;

const newRender = `function renderCoverFlow() {
    coverFlow.innerHTML = '';
    const specialsContainer = document.getElementById('thony-specials');
    if(specialsContainer) specialsContainer.innerHTML = '';
    
    trackLibrary.forEach(track => {
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
        
        coverFlow.appendChild(card);
    });
    
    if(specialsContainer) {
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
    }
}`;

s = s.replace(oldRender, newRender);

const oldFX = `// DEANNA FM
const audioElDeannaFm = document.getElementById('audio-deanna-fm');
document.getElementById('fx-deanna').addEventListener('click', (e) => {
    audioElDeannaFm.currentTime = 0;
    audioElDeannaFm.play();
    e.currentTarget.classList.add('active');
    setTimeout(() => e.currentTarget.classList.remove('active'), 200);
});`;

const newFX = `// DEANNA FM
const audioElDeannaFm = document.getElementById('audio-deanna-fm');
document.getElementById('fx-deanna').addEventListener('click', (e) => {
    audioElDeannaFm.currentTime = 0;
    audioElDeannaFm.play();
    e.currentTarget.classList.add('active');
    setTimeout(() => e.currentTarget.classList.remove('active'), 200);
});

// NEW FX
const createFX = (id, audioId) => {
    const el = document.getElementById(id);
    const audio = document.getElementById(audioId);
    if(el && audio) {
        el.addEventListener('click', (e) => {
            audio.currentTime = 0;
            audio.play();
            e.currentTarget.classList.add('active');
            setTimeout(() => e.currentTarget.classList.remove('active'), 200);
        });
    }
};

createFX('fx-siren', 'audio-siren');
createFX('fx-laser', 'audio-laser');
createFX('fx-rewind', 'audio-rewind');
createFX('fx-explosion', 'audio-explosion');
`;

s = s.replace(oldFX, newFX);

fs.writeFileSync('script.js', s);
console.log('Script updated');
