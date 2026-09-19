const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

const anchor1 = 'function renderCoverFlow() {';
const anchor2 = '}\n\nfunction openSelector(deckId) {';
const anchor2r = '}\r\n\r\nfunction openSelector(deckId) {';

const split1 = s.indexOf(anchor1);
let split2 = s.indexOf(anchor2);
if(split2 === -1) split2 = s.indexOf(anchor2r);

if (split1 !== -1 && split2 !== -1) {
    const newRender = `function renderCoverFlow() {
    coverFlowContainer.innerHTML = '';
    const specialsContainer = document.getElementById('thony-specials');
    if (specialsContainer) specialsContainer.innerHTML = '';

    const renderCard = (track, container) => {
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
            
            const switchDeck = async (vocalEl, instEl, playBtn, titleId, stemsId, state) => {
                // Update UI first
                document.getElementById(titleId).textContent = track.title;
                state.baseBPM = track.bpm;
                state.updateRate(1.0);
                
                const stemsContainer = document.getElementById(stemsId);
                if (track.inst) {
                    stemsContainer.style.display = 'flex';
                } else {
                    stemsContainer.style.display = 'none';
                }
                
                const wasPlaying = playBtn.classList.contains('active');
                if (wasPlaying) {
                    vocalEl.pause();
                    instEl.pause();
                }
                
                vocalEl.src = track.vocal;
                if (track.inst) {
                    instEl.src = track.inst;
                } else {
                    instEl.removeAttribute('src');
                    instEl.load(); // Reset element
                }
                
                if (wasPlaying) {
                    try {
                        const playPromiseVocal = vocalEl.play();
                        if (playPromiseVocal !== undefined) {
                            playPromiseVocal.catch(e => console.log('Vocal play error:', e));
                        }
                        
                        if (track.inst) {
                            const playPromiseInst = instEl.play();
                            if (playPromiseInst !== undefined) {
                                playPromiseInst.catch(e => console.log('Inst play error:', e));
                            }
                        }
                    } catch (e) {
                        console.error("Play interrupted", e);
                    }
                }
            };

            if (currentSelectingDeck === 'A') {
                switchDeck(audioElAVocal, audioElAInst, btnPlayA, 'track-title-a', 'stems-container-a', deckAState);
            } else if (currentSelectingDeck === 'B') {
                switchDeck(audioElBVocal, audioElBInst, btnPlayB, 'track-title-b', 'stems-container-b', deckBState);
            }
            
            closeSelector();
        });
        container.appendChild(card);
    };

    trackLibrary.forEach(track => renderCard(track, coverFlowContainer));
    
    if (specialsContainer) {
        thonyLibrary.forEach(track => renderCard(track, specialsContainer));
    }
}`;

    const newS = s.substring(0, split1) + newRender + s.substring(split2);
    fs.writeFileSync('script.js', newS);
    console.log('Fixed JS Render Function');
} else {
    console.log('Anchors not found!', split1, split2);
}
