// ---------------------------------------------------------
// UI & TRANSITION LOGIC
// ---------------------------------------------------------

const introSection = document.getElementById('intro-section');
const mainSection = document.getElementById('main-section');
const lilyContainer = document.getElementById('lily-flower-container');

// Audio Elements
const audioElAVocal = document.getElementById('audio-a-vocal');
const audioElAInst = document.getElementById('audio-a-inst');
const audioElBVocal = document.getElementById('audio-b-vocal');
const audioElBInst = document.getElementById('audio-b-inst');
const audioElAirhorn = document.getElementById('audio-airhorn');

// Audio Context and Nodes
let audioCtx;
let deckGainA, deckGainB, masterGain;
let gainAVocal, gainAInst, gainBVocal, gainBInst;
let eqMidA, eqBassA, filterA, slicerGainA;
let eqMidB, eqBassB, filterB, slicerGainB;
let filterNode, echoDelay, echoFeedback, echoGain;

let audioInitialized = false;

// Handle Lily Click
lilyContainer.addEventListener('click', () => {
    lilyContainer.classList.add('blooming');
    
    if (!audioInitialized) {
        initAudio();
        audioInitialized = true;
    }

    setTimeout(() => {
        introSection.classList.remove('active');
        introSection.classList.add('hidden');
        
        mainSection.classList.remove('hidden');
        mainSection.classList.add('active');
    }, 1500);
});

// ---------------------------------------------------------
// COUNTDOWN TIMER
// ---------------------------------------------------------

const targetDate = new Date("2026-10-30T00:00:00");

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownDisplay = document.getElementById('countdown-display');
const countdownFinished = document.getElementById('countdown-finished');
const countdownSubtitle = document.getElementById('countdown-subtitle');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
        countdownDisplay.classList.add('hidden');
        countdownSubtitle.classList.add('hidden');
        countdownFinished.classList.remove('hidden');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Setup Press Me Button
const pressMeBtn = document.getElementById('press-me-btn');
const audioDeannaIntro = document.getElementById('audio-deanna-intro');
if (pressMeBtn && audioDeannaIntro) {
    pressMeBtn.addEventListener('click', () => {
        // Init audio context if not already done
        if (!audioInitialized && lilyContainer) {
            lilyContainer.click(); // Trigger lily click to init audio
        } else if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        audioDeannaIntro.volume = 1.0;
        audioDeannaIntro.play();
        
        // Optional: fade out button or show it's playing
        pressMeBtn.textContent = '▶ PLAYING...';
        pressMeBtn.style.animation = 'none';
        pressMeBtn.style.boxShadow = '0 0 30px rgba(255, 153, 204, 0.8)';
    });
}

// ---------------------------------------------------------
// WEB AUDIO API & DJ CONSOLE (STEMS)
// ---------------------------------------------------------

function initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Create Sources
    const sourceAVocal = audioCtx.createMediaElementSource(audioElAVocal);
    const sourceAInst = audioCtx.createMediaElementSource(audioElAInst);
    const sourceBVocal = audioCtx.createMediaElementSource(audioElBVocal);
    const sourceBInst = audioCtx.createMediaElementSource(audioElBInst);

    // Stem Gain Nodes (for toggling Vocals/Music)
    gainAVocal = audioCtx.createGain();
    gainAInst = audioCtx.createGain();
    gainBVocal = audioCtx.createGain();
    gainBInst = audioCtx.createGain();

    // Deck Gain Nodes (for Crossfader)
    deckGainA = audioCtx.createGain();
    deckGainB = audioCtx.createGain();
    masterGain = audioCtx.createGain();

    // Effects: Filter (for Tape Stop / General FX)
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 22050; 

    // Effects: Echo
    echoDelay = audioCtx.createDelay();
    echoDelay.delayTime.value = 0.4;
    echoFeedback = audioCtx.createGain();
    echoFeedback.gain.value = 0.4;
    echoGain = audioCtx.createGain();
    echoGain.gain.value = 0; 
    
    // Echo routing
    filterNode.connect(echoDelay);
    echoDelay.connect(echoFeedback);
    echoFeedback.connect(echoDelay);
    echoDelay.connect(echoGain);
    echoGain.connect(masterGain);

    // EQ and Filter Nodes Deck A
    eqMidA = audioCtx.createBiquadFilter(); eqMidA.type = 'peaking'; eqMidA.frequency.value = 1000; eqMidA.Q.value = 1;
    eqBassA = audioCtx.createBiquadFilter(); eqBassA.type = 'lowshelf'; eqBassA.frequency.value = 250;
    filterA = audioCtx.createBiquadFilter(); filterA.type = 'lowpass'; filterA.frequency.value = 22050;
    slicerGainA = audioCtx.createGain();

    // EQ and Filter Nodes Deck B
    eqMidB = audioCtx.createBiquadFilter(); eqMidB.type = 'peaking'; eqMidB.frequency.value = 1000; eqMidB.Q.value = 1;
    eqBassB = audioCtx.createBiquadFilter(); eqBassB.type = 'lowshelf'; eqBassB.frequency.value = 250;
    filterB = audioCtx.createBiquadFilter(); filterB.type = 'lowpass'; filterB.frequency.value = 22050;
    slicerGainB = audioCtx.createGain();

    // Main Routing Deck A
    sourceAVocal.connect(gainAVocal).connect(deckGainA);
    sourceAInst.connect(gainAInst).connect(deckGainA);
    deckGainA.connect(eqMidA).connect(eqBassA).connect(filterA).connect(slicerGainA).connect(filterNode);
    
    // Main Routing Deck B
    sourceBVocal.connect(gainBVocal).connect(deckGainB);
    sourceBInst.connect(gainBInst).connect(deckGainB);
    deckGainB.connect(eqMidB).connect(eqBassB).connect(filterB).connect(slicerGainB).connect(filterNode);
    
    filterNode.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    updateCrossfader(50);
    
    // Setup Stem Toggles now that Gain Nodes exist
    setupStemToggle('stem-a-vocal', gainAVocal);
    setupStemToggle('stem-a-inst', gainAInst);
    setupStemToggle('stem-b-vocal', gainBVocal);
    setupStemToggle('stem-b-inst', gainBInst);
    
    // Setup EQ
    const attachEQ = (id, node, type) => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                if (type === 'gain') {
                    node.gain.setTargetAtTime(val, audioCtx.currentTime, 0.05);
                } else if (type === 'filter') {
                    if (val < 0) {
                        node.type = 'lowpass';
                        const freq = 300 * Math.pow(22050/300, (50 + val)/50);
                        node.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.05);
                    } else if (val > 0) {
                        node.type = 'highpass';
                        const freq = 10 * Math.pow(4000/10, val/50);
                        node.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.05);
                    } else {
                        node.type = 'lowpass';
                        node.frequency.setTargetAtTime(22050, audioCtx.currentTime, 0.05);
                    }
                }
            });
        }
    };
    attachEQ('eq-a-mid', eqMidA, 'gain');
    attachEQ('eq-a-bass', eqBassA, 'gain');
    attachEQ('eq-a-filter', filterA, 'filter');
    attachEQ('eq-b-mid', eqMidB, 'gain');
    attachEQ('eq-b-bass', eqBassB, 'gain');
    attachEQ('eq-b-filter', filterB, 'filter');
    
    initXYPads();
}

// ---------------------------------------------------------
// VINYL SCRATCH EFFECT
// ---------------------------------------------------------

function createScratchSynth(speed) {
    if (!audioCtx) return;
    
    const absSpeed = Math.abs(speed);
    if (absSpeed < 0.5) return;
    
    // Create a burst of filtered oscillator to simulate a vinyl scratch
    const osc = audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 100 + (absSpeed * 15);
    
    const bpf = audioCtx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 800 + (absSpeed * 20);
    bpf.Q.value = 3;
    
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;
    
    // Quick attack and release volume envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3 * Math.min(1, absSpeed / 10), now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(bpf);
    bpf.connect(gain);
    gain.connect(masterGain); 
    
    osc.start(now);
    osc.stop(now + 0.1);
}

function setupScratch(deckId, audioVocal, audioInst, playBtn) {
    const deck = document.getElementById(deckId);
    if(!deck) return;
    
    const wrapper = deck.querySelector('.record-wrapper');
    if(!wrapper) return;
    
    let isDragging = false;
    let startY = 0;
    let startX = 0;
    let currentRotation = 0;
    let wasPlaying = false;
    
    wrapper.addEventListener('pointerdown', (e) => {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        isDragging = true;
        startY = e.clientY;
        startX = e.clientX;
        wrapper.classList.add('scratching');
        
        // Pause music if it was playing
        wasPlaying = !audioVocal.paused;
        if (wasPlaying) {
            audioVocal.pause();
            audioInst.pause();
        }
        
        e.preventDefault();
        wrapper.setPointerCapture(e.pointerId);
    });
    
    wrapper.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        
        const deltaY = e.clientY - startY;
        const deltaX = e.clientX - startX;
        const delta = (deltaY + deltaX) * 0.5; // combined movement
        
        if (Math.abs(delta) > 0.5) {
            currentRotation += delta * 3;
            wrapper.style.transform = `rotate(${currentRotation}deg)`;
            
            // Audio Seek based on mouse movement
            let newTime = audioVocal.currentTime + (delta * 0.02);
            newTime = Math.max(0, Math.min(newTime, audioVocal.duration || 1000));
            audioVocal.currentTime = newTime;
            audioInst.currentTime = newTime;
            
            createScratchSynth(delta);
            
            startY = e.clientY;
            startX = e.clientX;
        }
    });
    
    const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        wrapper.classList.remove('scratching');
        wrapper.releasePointerCapture(e.pointerId);
        
        // Resume music
        if (wasPlaying) {
            audioVocal.play();
            audioInst.play();
        }
    };
    
    wrapper.addEventListener('pointerup', endDrag);
    wrapper.addEventListener('pointercancel', endDrag);
}

setupScratch('deck-a-container', audioElAVocal, audioElAInst);
setupScratch('deck-b-container', audioElBVocal, audioElBInst);

// ---------------------------------------------------------
// BPM CONTROL & SYNC
// ---------------------------------------------------------
const deckABaseBPM = parseFloat(audioElAVocal.dataset.bpm || 89);
const deckBBaseBPM = parseFloat(audioElBVocal.dataset.bpm || 126);

const deckAState = { baseBPM: deckABaseBPM, currentBPM: deckABaseBPM, rate: 1.0 };
const deckBState = { baseBPM: deckBBaseBPM, currentBPM: deckBBaseBPM, rate: 1.0 };

function setupBPM(btnDownId, btnUpId, displayId, audioVocal, audioInst, stateObj) {
    const btnDown = document.getElementById(btnDownId);
    const btnUp = document.getElementById(btnUpId);
    const display = document.getElementById(displayId);
    if (!btnDown || !btnUp || !display) return;
    
    stateObj.updateRate = (newRate) => {
        newRate = Math.max(0.5, Math.min(2.0, newRate));
        stateObj.rate = newRate;
        stateObj.currentBPM = stateObj.baseBPM * newRate;
        display.textContent = Math.round(stateObj.currentBPM) + ' BPM';
        if (audioVocal) audioVocal.playbackRate = newRate;
        if (audioInst) audioInst.playbackRate = newRate;
    };
    
    btnDown.addEventListener('click', () => stateObj.updateRate(stateObj.rate - 0.01));
    btnUp.addEventListener('click', () => stateObj.updateRate(stateObj.rate + 0.01));
}

setupBPM('bpm-a-down', 'bpm-a-up', 'bpm-a-val', audioElAVocal, audioElAInst, deckAState);
setupBPM('bpm-b-down', 'bpm-b-up', 'bpm-b-val', audioElBVocal, audioElBInst, deckBState);

// Sync Logic
const syncA = document.getElementById('sync-a');
const syncB = document.getElementById('sync-b');

if (syncA) {
    syncA.addEventListener('click', () => {
        // Sync Deck A to match Deck B's BPM
        const targetBPM = deckBState.currentBPM;
        const requiredRate = targetBPM / deckAState.baseBPM;
        deckAState.updateRate(requiredRate);
    });
}
if (syncB) {
    syncB.addEventListener('click', () => {
        // Sync Deck B to match Deck A's BPM
        const targetBPM = deckAState.currentBPM;
        const requiredRate = targetBPM / deckBState.baseBPM;
        deckBState.updateRate(requiredRate);
    });
}

// ---------------------------------------------------------
// WAVEFORM SEEKING
// ---------------------------------------------------------
function setupWaveformSeek(containerId, audioVocal, audioInst) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.addEventListener('click', (e) => {
        if (!audioVocal || !audioVocal.duration) return;
        const rect = container.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * audioVocal.duration;
        audioVocal.currentTime = newTime;
        if(audioInst) audioInst.currentTime = newTime;
    });
}
setupWaveformSeek('waveform-a', audioElAVocal, audioElAInst);
setupWaveformSeek('waveform-b', audioElBVocal, audioElBInst);

// ---------------------------------------------------------
// XY FX PAD (SLICER / STUTTER)
// ---------------------------------------------------------
function setupXYPad(padId, crosshairId, deckGain, filterNode) {
    const pad = document.getElementById(padId);
    const crosshair = document.getElementById(crosshairId);
    if (!pad || !crosshair) return;
    
    let isDragging = false;
    let slicerOsc = null;
    
    const updatePad = (e) => {
        const rect = pad.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));
        
        crosshair.style.left = x + 'px';
        crosshair.style.top = y + 'px';
        
        if (!audioCtx) return;
        
        // Map Y to slicer speed (center is slow, top/bottom is fast)
        const yNorm = (y / rect.height) * 2 - 1; // -1 to 1
        const speed = 2 + Math.pow(Math.abs(yNorm), 2) * 20; // 2Hz to 22Hz
        if (slicerOsc) slicerOsc.frequency.setTargetAtTime(speed, audioCtx.currentTime, 0.05);
        
        // Map X to Filter Cutoff
        // If we want to safely modify filterNode (which is used by EQ), wait, filterNode here is filterA / filterB!
        // We can just use the Biquad filter of the deck.
        // Or if we don't pass filterNode, we can just use the Y axis for slicer for now to keep it safe.
    };

    const startPad = (e) => {
        if (!audioCtx) return;
        isDragging = true;
        pad.classList.add('active');
        pad.setPointerCapture(e.pointerId);
        
        // Start Slicer
        slicerOsc = audioCtx.createOscillator();
        slicerOsc.type = 'square';
        
        // We use an AM modulation trick:
        // By connecting osc to a gain node that controls the main signal, it multiplies it.
        // Wait, standard gain is 1. If we connect osc directly, it adds.
        // We need an intermediate node or just use setInterval if it's simpler.
        // Actually, setInterval is very simple and safe for a UI effect.
    };
    
    let sliceInterval;
    
    pad.addEventListener('pointerdown', (e) => {
        if (!audioCtx) return;
        isDragging = true;
        pad.classList.add('active');
        pad.setPointerCapture(e.pointerId);
        
        // Trancegate / Slicer using interval
        let isMuted = false;
        sliceInterval = setInterval(() => {
            isMuted = !isMuted;
            if(deckGain) deckGain.gain.setTargetAtTime(isMuted ? 0 : 1, audioCtx.currentTime, 0.01);
        }, 100);
        
        updatePad(e);
    });
    
    pad.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        updatePad(e);
        // update interval speed based on Y
        const rect = pad.getBoundingClientRect();
        const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        const yNorm = Math.abs((y / rect.height) * 2 - 1); // 0 to 1
        const speedMs = 150 - (yNorm * 120); // 150ms to 30ms
        
        clearInterval(sliceInterval);
        let isMuted = false;
        sliceInterval = setInterval(() => {
            isMuted = !isMuted;
            if(deckGain) deckGain.gain.setTargetAtTime(isMuted ? 0 : 1, audioCtx.currentTime, 0.01);
        }, speedMs);
    });
    
    const stopPad = (e) => {
        if (!isDragging) return;
        isDragging = false;
        pad.classList.remove('active');
        pad.releasePointerCapture(e.pointerId);
        clearInterval(sliceInterval);
        if(deckGain) deckGain.gain.setTargetAtTime(1, audioCtx.currentTime, 0.05);
    };
    
    pad.addEventListener('pointerup', stopPad);
    pad.addEventListener('pointercancel', stopPad);
}

// We must call setupXYPad inside initAudio because slicerGainA is not defined until then.
// Actually, I can just pass a function that returns the gain node!
function initXYPads() {
    setupXYPad('xy-pad-a', 'xy-crosshair-a', slicerGainA);
    setupXYPad('xy-pad-b', 'xy-crosshair-b', slicerGainB);
}
// ---------------------------------------------------------
// FIREFLY CURSOR TRAILS (PLAY/PAUSE & STEM TOGGLES)
// ---------------------------------------------------------

const btnPlayA = document.getElementById('play-a');
const btnPlayB = document.getElementById('play-b');
const deckA = document.getElementById('deck-a-container');
const deckB = document.getElementById('deck-b-container');

// Play/Pause Deck A (Syncs both stems)
if (btnPlayA) {
    btnPlayA.addEventListener('click', () => {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        if (audioElAVocal.paused) {
            audioElAVocal.play();
            audioElAInst.play();
            btnPlayA.textContent = '⏸ PAUSE';
            btnPlayA.classList.add('active');
            if (deckA) deckA.classList.add('playing');
        } else {
            audioElAVocal.pause();
            audioElAInst.pause();
            btnPlayA.textContent = '▶ PLAY';
            btnPlayA.classList.remove('active');
            if (deckA) deckA.classList.remove('playing');
        }
    });
}

// Play/Pause Deck B (Syncs both stems)
if (btnPlayB) {
    btnPlayB.addEventListener('click', () => {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        if (audioElBVocal.paused) {
            audioElBVocal.play();
            audioElBInst.play();
            btnPlayB.textContent = '⏸ PAUSE';
            btnPlayB.classList.add('active');
            if (deckB) deckB.classList.add('playing');
        } else {
            audioElBVocal.pause();
            audioElBInst.pause();
            btnPlayB.textContent = '▶ PLAY';
            btnPlayB.classList.remove('active');
            if (deckB) deckB.classList.remove('playing');
        }
    });
}

// Stem Toggles
function setupStemToggle(btnId, gainNode) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    let isActive = true;
    btn.addEventListener('click', () => {
        if (!audioCtx) return;
        isActive = !isActive;
        gainNode.gain.setTargetAtTime(isActive ? 1.0 : 0.0, audioCtx.currentTime, 0.05);
        if (isActive) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}


// Progress Bars (Only need to track one stem per deck since they are synced)
const progressA = document.getElementById('progress-a');
const progressB = document.getElementById('progress-b');

if (audioElAVocal) {
    audioElAVocal.addEventListener('timeupdate', () => {
        const percent = (audioElAVocal.currentTime / audioElAVocal.duration) * 100;
        if (progressA) progressA.style.width = `${percent || 0}%`;
    });
}

if (audioElBVocal) {
    audioElBVocal.addEventListener('timeupdate', () => {
        const percent = (audioElBVocal.currentTime / audioElBVocal.duration) * 100;
        if (progressB) progressB.style.width = `${percent || 0}%`;
    });
}


// ---------------------------------------------------------
// MIXER (CROSSFADER & AUTO TRANSITION)
// ---------------------------------------------------------

const crossfader = document.getElementById('crossfader');

function updateCrossfader(val) {
    if (!audioCtx) return;
    const x = parseInt(val) / 100;
    const gain1 = Math.cos(x * 0.5 * Math.PI);
    const gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI);
    
    deckGainA.gain.setTargetAtTime(gain1, audioCtx.currentTime, 0.01);
    deckGainB.gain.setTargetAtTime(gain2, audioCtx.currentTime, 0.01);
}

crossfader.addEventListener('input', (e) => updateCrossfader(e.target.value));

const btnAuto = document.getElementById('auto-transition');
let transitionInterval;

btnAuto.addEventListener('click', () => {
    if (transitionInterval) clearInterval(transitionInterval);
    
    let currentVal = parseInt(crossfader.value);
    const targetVal = currentVal < 50 ? 100 : 0;
    const step = targetVal > currentVal ? 1 : -1;
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

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 30) return; 
    lastTrailTime = now;

    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    
    const offsetX = (Math.random() - 0.5) * 15;
    const offsetY = (Math.random() - 0.5) * 15;
    
    particle.style.left = (e.clientX + offsetX) + 'px';
    particle.style.top = (e.clientY + offsetY) + 'px';
    
    const scale = 0.6 + Math.random() * 0.8;
    particle.style.width = (5 * scale) + 'px';
    particle.style.height = (5 * scale) + 'px';

    document.body.appendChild(particle);
    
    setTimeout(() => {
        if(particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1200);
});

// ---------------------------------------------------------
// APPLE STYLE TRACK SELECTOR
// ---------------------------------------------------------

const thonyLibrary = [
    { id: 'thony-aya', title: 'Aya Nakamura - Copines', vocal: 'audio/user-track-aya.mp3', inst: null, bpm: 105, color: '#ffcc00' },
    { id: 'thony-voodoo', title: 'Carel & Ronnie Flex - Voodoo', vocal: 'audio/user-track-voodoo.mp3', inst: null, bpm: 105, color: '#ff3366' },
    { id: 'thony-dj', title: 'DJ', vocal: 'audio/user-track-dj.mp3', inst: null, bpm: 120, color: '#9933ff' }
];

const trackLibrary = [
    { id: 'lauryn', title: 'Lauryn Hill - Can\'t Take My Eyes Off Of You', vocal: 'audio/track-a-vocal.mp3', inst: 'audio/track-a-inst.mp3', bpm: 89, color: '#FF99CC' },
    { id: 'lana', title: 'Lana Del Rey - Summertime', vocal: 'audio/track-b-vocal.mp3', inst: 'audio/track-b-inst.mp3', bpm: 126, color: '#00e5ff' },
    { id: 'user0', title: 'Kanye West - Bound 2', vocal: 'audio/user-track-0.mp3', inst: null, bpm: 149, color: '#FFD700' },
    { id: 'user1', title: 'KAYTRANADA - You\'re The One', vocal: 'audio/user-track-1.mp3', inst: null, bpm: 112, color: '#FF0055' },
    { id: 'user2', title: 'George Benson - Give Me The Night', vocal: 'audio/user-track-2.mp3', inst: null, bpm: 110, color: '#00ff00' },
    { id: 'user3', title: 'Frank Ocean - Lost', vocal: 'audio/user-track-3.mp3', inst: null, bpm: 123, color: '#ff6600' },
    { id: 'user4', title: 'Mura Masa - Love$ick', vocal: 'audio/user-track-4.mp3', inst: null, bpm: 95, color: '#33ccff' },
    { id: 'user5', title: 'Bob Marley - Sun Is Shining', vocal: 'audio/user-track-5.mp3', inst: null, bpm: 143, color: '#ff33cc' },
    { id: 'user6', title: 'Drake - Passionfruit', vocal: 'audio/user-track-6.mp3', inst: null, bpm: 112, color: '#ccff33' },
    { id: 'deanna', title: 'Deanna FM - Intro', vocal: 'audio/deanna-intro.mp3', inst: null, bpm: 100, color: '#a020f0' }
];
const playlistContainer = document.getElementById('playlist-container');
const trackSelectorOverlay = document.getElementById('track-selector-overlay');
const closeSelectorBtn = document.getElementById('close-selector');
const coverFlowContainer = document.getElementById('cover-flow');
let currentSelectingDeck = null;

function renderCoverFlow() {
    coverFlowContainer.innerHTML = '';
    const specialsContainer = document.getElementById('thony-specials');
    if (specialsContainer) specialsContainer.innerHTML = '';

    const renderCard = (track, container) => {
        const card = document.createElement('div');
        card.className = 'track-card';
        card.innerHTML = `
            <div class="track-card-record">
                <div class="track-card-label" style="background: ${track.color}"></div>
            </div>
            <div class="track-card-title">${track.title}</div>
        `;
        
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
}

function openSelector(deckId) {
    currentSelectingDeck = deckId;
    renderCoverFlow();
    trackSelectorOverlay.classList.remove('hidden');
}

function closeSelector() {
    trackSelectorOverlay.classList.add('hidden');
    currentSelectingDeck = null;
}

if (closeSelectorBtn) {
    closeSelectorBtn.addEventListener('click', closeSelector);
}

const changeBtnA = document.getElementById('change-track-a');
const changeBtnB = document.getElementById('change-track-b');

if (changeBtnA) changeBtnA.addEventListener('click', () => openSelector('A'));
if (changeBtnB) changeBtnB.addEventListener('click', () => openSelector('B'));
