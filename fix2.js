const fs = require('fs');
let html = fs.readFileSync('public/meeting-meals.html', 'utf8');
html = html.replace(/Premium Coffee &amp; Tea, served with Assorted Sandwiches or Thai Sangkhaya Bread \([^)]+\)/g, 'Premium Coffee &amp; Tea, served with Assorted Sandwiches or Thai Sangkhaya Bread (แซนด์วิช หรือ ขนมปังสังขยา)');
fs.writeFileSync('public/meeting-meals.html', html, 'utf8');
console.log('Fixed using Node write_to_file');
