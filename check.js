const fs = require('fs');
let html = fs.readFileSync('public/meeting-meals.html', 'utf8');
const match = html.match(/Premium Coffee &amp; Tea, served with Assorted Sandwiches or Thai Sangkhaya Bread \([^)]+\)/);
console.log(match ? match[0] : 'Not found');
