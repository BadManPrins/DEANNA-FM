const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// DECK A
html = html.replace(
    `>Lauryn Hill - Can't Take My Eyes Off Of You</div>`,
    `>KAYTRANADA - You're The One</div>`
);
html = html.replace(
    `<span class="bpm-display" id="bpm-a-val">89 BPM</span>`,
    `<span class="bpm-display" id="bpm-a-val">112 BPM</span>`
);
html = html.replace(
    `<div class="stems-container" id="stems-container-a">`,
    `<div class="stems-container" id="stems-container-a" style="display: none;">`
);

// DECK B
html = html.replace(
    `>Lana Del Rey - Summertime</div>`,
    `>Frank Ocean - Lost</div>`
);
html = html.replace(
    `<span class="bpm-display" id="bpm-b-val">126 BPM</span>`,
    `<span class="bpm-display" id="bpm-b-val">123 BPM</span>`
);
html = html.replace(
    `<div class="stems-container" id="stems-container-b">`,
    `<div class="stems-container" id="stems-container-b" style="display: none;">`
);

// AUDIO ELEMENTS
const oldAudio = `<audio id="audio-a-vocal" src="audio/track-a-vocal.mp3" preload="auto" loop data-bpm="89"></audio>
    <audio id="audio-a-inst" src="audio/track-a-inst.mp3" preload="auto" loop data-bpm="89"></audio>
    <audio id="audio-b-vocal" src="audio/track-b-vocal.mp3" preload="auto" loop data-bpm="126"></audio>
    <audio id="audio-b-inst" src="audio/track-b-inst.mp3" preload="auto" loop data-bpm="126"></audio>`;
const oldAudioR = `<audio id="audio-a-vocal" src="audio/track-a-vocal.mp3" preload="auto" loop data-bpm="89"></audio>\r\n    <audio id="audio-a-inst" src="audio/track-a-inst.mp3" preload="auto" loop data-bpm="89"></audio>\r\n    <audio id="audio-b-vocal" src="audio/track-b-vocal.mp3" preload="auto" loop data-bpm="126"></audio>\r\n    <audio id="audio-b-inst" src="audio/track-b-inst.mp3" preload="auto" loop data-bpm="126"></audio>`;

const newAudio = `<audio id="audio-a-vocal" src="audio/user-track-1.mp3" preload="auto" loop data-bpm="112"></audio>
    <audio id="audio-a-inst" preload="auto" loop data-bpm="112"></audio>
    <audio id="audio-b-vocal" src="audio/user-track-3.mp3" preload="auto" loop data-bpm="123"></audio>
    <audio id="audio-b-inst" preload="auto" loop data-bpm="123"></audio>`;

html = html.replace(oldAudio, newAudio);
html = html.replace(oldAudioR, newAudio);

fs.writeFileSync('index.html', html);
console.log('HTML tracks updated');
