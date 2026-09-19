const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

const anchor = 'const step = targetVal > currentVal ? 1 : -1;';
const parts = s.split(anchor);

const toInject = `
    const duration = 6000; 
    const steps = 60;
    const intervalTime = duration / steps;
    const valStep = 100 / steps;

    transitionInterval = setInterval(() => {
        currentVal += (step * valStep);
        if ((step > 0 && currentVal >= targetVal) || (step < 0 && currentVal <= targetVal)) {
            currentVal = targetVal;
            clearInterval(transitionInterval);
        }
        crossfader.value = currentVal;
        updateCrossfader(currentVal);
    }, intervalTime);
});

// ---------------------------------------------------------
// SMART DJ EFFECTS
// ---------------------------------------------------------

// AIRHORN
document.getElementById('fx-airhorn').addEventListener('click', (e) => {
    audioElAirhorn.currentTime = 0;
    audioElAirhorn.play();
    e.currentTarget.classList.add('active');
    setTimeout(() => e.currentTarget.classList.remove('active'), 200);
});

// DEANNA FM
const audioElDeannaFm = document.getElementById('audio-deanna-fm');
document.getElementById('fx-deanna').addEventListener('click', (e) => {
    audioElDeannaFm.currentTime = 0;
    audioElDeannaFm.play();
    e.currentTarget.classList.add('active');
    setTimeout(() => e.currentTarget.classList.remove('active'), 200);
});

// ECHO
let echoActive = false;
document.getElementById('fx-echo').addEventListener('click', (e) => {
    if (!audioCtx) return;
    echoActive = !echoActive;
    if (echoActive) {
        e.currentTarget.classList.add('active');
        echoGain.gain.setTargetAtTime(0.6, audioCtx.currentTime, 0.1);
    } else {
        e.currentTarget.classList.remove('active');
        echoGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
    }
});


// FIREFLY CURSOR TRAIL
// ---------------------------------------------------------
let lastTrailTime = 0;
`;

if (parts.length === 2) {
    fs.writeFileSync('script.js', parts[0] + anchor + toInject + parts[1].replace('let lastTrailTime = 0;', ''));
    console.log('Patched');
} else {
    console.log('Anchor not found or found multiple times');
}
