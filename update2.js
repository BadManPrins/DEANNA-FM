const fs = require('fs');
let script = fs.readFileSync('script.js', 'utf8');

const oldRender = `function renderCoverFlow() {
    coverFlowContainer.innerHTML = '';
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
            if (!currentSelectingDeck || !track.vocal) {
                return;
            }`;

const newRender = `function renderCoverFlow() {
    coverFlowContainer.innerHTML = '';
    
    // Also clear thony specials
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
            if (!currentSelectingDeck || !track.vocal) {
                return;
            }`;

script = script.replace(oldRender, newRender);

const injectEnd = `        coverFlowContainer.appendChild(card);
    });
}`;

const replaceEnd = `        coverFlowContainer.appendChild(card);
    });
    
    if(specialsContainer) {
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
                if (!currentSelectingDeck || !track.vocal) {
                    return;
                }
                
                // We need to duplicate the switchDeck logic or simply rely on the fact that closeSelector and switchDeck are handled globally.
                // Wait, in the existing code, switchDeck is nested inside the click handler! 
                // Let's call a global helper if possible, or just copy the logic.
                
                // Actually, wait, let's just make it call a helper function!
                handleTrackSelect(track);
            });
            
            specialsContainer.appendChild(card);
        });
    }
}`;
