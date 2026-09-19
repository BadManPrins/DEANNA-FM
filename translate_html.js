const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/title="Kies ander nummer"/g, 'title="Choose track"');
html = html.replace(/WISSEL/g, 'CHANGE');
html = html.replace(/ZANG/g, 'VOCAL');
html = html.replace(/MUZIEK/g, 'MUSIC');
html = html.replace(/KIES EEN NUMMER/g, 'CHOOSE A TRACK');
html = html.replace(/SIRENE/g, 'SIREN');
html = html.replace(/Note: Plaats 'track-a-vocal\.mp3', 'track-a-inst\.mp3', 'track-b-vocal\.mp3', 'track-b-inst\.mp3' en 'airhorn\.mp3' in de \/audio map\./g, '');

fs.writeFileSync('index.html', html);
console.log('HTML translated');
