const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/#track-selector-overlay \{[\s\S]*?opacity: 0;/g, 
`#track-selector-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 80px;
    padding-bottom: 80px;
    overflow-y: auto;
    opacity: 0;`);
fs.writeFileSync('style.css', css);
console.log('Fixed CSS');
