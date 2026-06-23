const fs = require('fs');
let data = fs.readFileSync('c:/Users/KENDEE/Desktop/เว็บ/data/classic_menu.json', 'utf8');
data = data.replace(/"th": "สยามพฤกษา \/ Siam Pruksa Box Set: /g, '"th": "สยามพฤกษา: ');
fs.writeFileSync('c:/Users/KENDEE/Desktop/เว็บ/data/classic_menu.json', data);
console.log('done');
