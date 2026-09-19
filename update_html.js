const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldFx = `<div class="effects-container" style="margin-top: 30px;">
                    <button class="effect-btn" id="fx-airhorn">
                        <span class="icon">📢</span> AIRHORN
                    </button>
                    <button class="effect-btn" id="fx-deanna">
                        <span class="icon">📻</span> DEANNA FM
                    </button>
                    <button class="effect-btn" id="fx-echo">
                        <span class="icon">〰️</span> ECHO
                    </button>
                </div>`;

const newFx = `<div class="effects-container" style="margin-top: 30px;">
                    <button class="effect-btn" id="fx-airhorn">
                        <span class="icon">📢</span> AIRHORN
                    </button>
                    <button class="effect-btn" id="fx-deanna">
                        <span class="icon">📻</span> DEANNA FM
                    </button>
                    <button class="effect-btn" id="fx-echo">
                        <span class="icon">〰️</span> ECHO
                    </button>
                    <button class="effect-btn" id="fx-siren">
                        <span class="icon">🚨</span> SIRENE
                    </button>
                    <button class="effect-btn" id="fx-laser">
                        <span class="icon">🔫</span> LASER
                    </button>
                    <button class="effect-btn" id="fx-rewind">
                        <span class="icon">⏪</span> REWIND
                    </button>
                    <button class="effect-btn" id="fx-explosion">
                        <span class="icon">💥</span> DROP
                    </button>
                </div>`;

html = html.replace(oldFx, newFx);

const oldAudio = `<audio id="audio-deanna-fm" src="audio/deanna-fm.mp3" preload="auto"></audio>`;
const newAudio = `<audio id="audio-deanna-fm" src="audio/deanna-fm.mp3" preload="auto"></audio>
    <audio id="audio-siren" src="audio/siren.wav" preload="auto"></audio>
    <audio id="audio-laser" src="audio/laser.wav" preload="auto"></audio>
    <audio id="audio-rewind" src="audio/rewind.wav" preload="auto"></audio>
    <audio id="audio-explosion" src="audio/explosion.wav" preload="auto"></audio>`;

html = html.replace(oldAudio, newAudio);
html = html.replace('script.js?v=4', 'script.js?v=5');

// Now add the 'Thony specials' section to the track selector overlay.
const oldCover = `<div class="cover-flow-container" id="cover-flow">
                <!-- Records injected by JS -->
            </div>`;
const newCover = `<div class="cover-flow-container" id="cover-flow">
                <!-- Records injected by JS -->
            </div>
            
            <h4 style="font-family: 'Montserrat', sans-serif; color: var(--accent-green); margin-top: 20px; letter-spacing: 2px;">THONY SPECIALS</h4>
            <div class="thony-specials-container" id="thony-specials" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px; width: 80%; max-width: 400px; max-height: 200px; overflow-y: auto;">
                <!-- Specials injected by JS -->
            </div>`;

html = html.replace(oldCover, newCover);

fs.writeFileSync('index.html', html);
console.log('HTML updated');
