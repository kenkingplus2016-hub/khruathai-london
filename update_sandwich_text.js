const fs = require('fs');

let html = fs.readFileSync('public/meeting-meals.html', 'utf8');

const searchRegex = /Premium Coffee &amp; Tea, served with Assorted Sandwiches or Thai Sangkhaya Bread \([^)]+\)/g;
const replaceStr = 'Premium Coffee &amp; Tea, served with Assorted Sandwiches or Thai Sangkhaya Bread (แซนด์วิชทูนา หรือ ขนมปังสังขยาใบเตย)';

html = html.replace(searchRegex, replaceStr);

fs.writeFileSync('public/meeting-meals.html', html, 'utf8');
console.log('Fixed and updated the text.');
