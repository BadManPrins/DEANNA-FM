const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const regex = /\/\* Base petal positions \(Closed\/Bud shape\) \*\/[\s\S]*?\.lily-container:hover \.stamen-6 \{ transform: rotate\(315deg\) scale\(1\); \}/;

const newCss = `/* Base petal positions (Closed/Bud shape) */
.petal-out-1 { transform: rotate(-15deg) scale(0.6); }
.petal-out-2 { transform: rotate(15deg) scale(0.6); }
.petal-out-3 { transform: rotate(0deg) scale(0.5); }

.petal-in-1 { transform: rotate(-8deg) scale(0.7); }
.petal-in-2 { transform: rotate(8deg) scale(0.7); }
.petal-in-3 { transform: rotate(0deg) scale(0.8); }

/* Base stamen positions */
.stamen-1 { transform: rotate(-5deg) scale(0.3); }
.stamen-2 { transform: rotate(5deg) scale(0.3); }
.stamen-3 { transform: rotate(-2deg) scale(0.4); }
.stamen-4 { transform: rotate(2deg) scale(0.4); }
.stamen-5 { transform: rotate(-8deg) scale(0.2); }
.stamen-6 { transform: rotate(8deg) scale(0.2); }

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

    .lily-container:hover .stamen-1 { transform: rotate(-35deg) scale(1.1); }
    .lily-container:hover .stamen-2 { transform: rotate(35deg) scale(1.1); }
    .lily-container:hover .stamen-3 { transform: rotate(-15deg) scale(1.2); }
    .lily-container:hover .stamen-4 { transform: rotate(15deg) scale(1.2); }
    .lily-container:hover .stamen-5 { transform: rotate(-55deg) scale(1); }
    .lily-container:hover .stamen-6 { transform: rotate(55deg) scale(1); }`;

css = css.replace(regex, newCss);
fs.writeFileSync('style.css', css);
console.log('Fixed lily animation');
