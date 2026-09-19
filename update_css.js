const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const regex = /\.petal \{[\s\S]*?\.lily-container:hover \.petal-c \{ transform: scale\(1\.02\); \}/;

const newCss = `.petal, .stamen {
    transform-origin: 100px 120px;
    transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stamens {
    opacity: 0;
    transition: opacity 1.5s ease;
}

.lily-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background: var(--accent-green);
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0;
    transition: opacity var(--transition-normal);
    z-index: 1;
}

/* Base petal positions (Closed/Bud shape) */
.petal-out-1 { transform: rotate(-120deg) scale(0.4); }
.petal-out-2 { transform: rotate(120deg) scale(0.4); }
.petal-out-3 { transform: rotate(180deg) scale(0.4); }

.petal-in-1 { transform: rotate(-60deg) scale(0.4); }
.petal-in-2 { transform: rotate(60deg) scale(0.4); }
.petal-in-3 { transform: rotate(0deg) scale(0.4); }

/* Base stamen positions */
.stamen-1 { transform: rotate(15deg) scale(0.2); }
.stamen-2 { transform: rotate(75deg) scale(0.2); }
.stamen-3 { transform: rotate(135deg) scale(0.2); }
.stamen-4 { transform: rotate(195deg) scale(0.2); }
.stamen-5 { transform: rotate(255deg) scale(0.2); }
.stamen-6 { transform: rotate(315deg) scale(0.2); }

/* Hover effects (Blooming Animation) */
@media (hover: hover) {
    .lily-container:hover #lily-svg {
        transform: scale(1.1);
    }
    .lily-container:hover .stamens {
        opacity: 1;
    }
    
    .lily-container:hover .petal-out-1 { transform: rotate(-120deg) scale(1.1); }
    .lily-container:hover .petal-out-2 { transform: rotate(120deg) scale(1.1); }
    .lily-container:hover .petal-out-3 { transform: rotate(180deg) scale(1.1); }

    .lily-container:hover .petal-in-1 { transform: rotate(-60deg) scale(1.05); }
    .lily-container:hover .petal-in-2 { transform: rotate(60deg) scale(1.05); }
    .lily-container:hover .petal-in-3 { transform: rotate(0deg) scale(1.05); }

    .lily-container:hover .stamen-1 { transform: rotate(15deg) scale(1); }
    .lily-container:hover .stamen-2 { transform: rotate(75deg) scale(1); }
    .lily-container:hover .stamen-3 { transform: rotate(135deg) scale(1); }
    .lily-container:hover .stamen-4 { transform: rotate(195deg) scale(1); }
    .lily-container:hover .stamen-5 { transform: rotate(255deg) scale(1); }
    .lily-container:hover .stamen-6 { transform: rotate(315deg) scale(1); }`;

css = css.replace(regex, newCss);
fs.writeFileSync('style.css', css);
console.log('CSS Replaced');
