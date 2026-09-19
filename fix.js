const fs = require('fs');
let script = fs.readFileSync('script.js', 'utf8');
const findStr =     transitionInterval = setInterval(() => {
        currentVal += (step * valStep);
        if ((step > 0 && currentVal >= targetVal) || (step < 0 && currentVal <= targetVal)) {
    }
});;
const replaceStr =     transitionInterval = setInterval(() => {
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
});;

if (script.includes(findStr)) {
    script = script.replace(findStr, replaceStr);
    fs.writeFileSync('script.js', script);
    console.log('Fixed JS');
} else {
    console.log('Not found');
}
