const fs = require('fs');

let jsFile = fs.readFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', 'utf8');
const thaiRegex = /[\u0E00-\u0E7F]+/g;

if (thaiRegex.test(jsFile)) {
    // Also remove Thai from JS
    jsFile = jsFile.replace(/\|\|\s*raw === '[^']*[\u0E00-\u0E7F]+[^']*'/g, ''); // Remove condition like: || raw === 'ติดต่อเรา'
    jsFile = jsFile.replace(/[\u0E00-\u0E7F]+/g, '');
    jsFile = jsFile.replace(/\(\s*\)/g, '');
    jsFile = jsFile.replace(/\s+\)/g, ')');
    jsFile = jsFile.replace(/  +/g, ' ');
    
    fs.writeFileSync('public/zabsiam_chatbot/zabsiam-chatbot.js', jsFile, 'utf8');
    console.log('Removed Thai from chatbot JS');
} else {
    console.log('No Thai found in chatbot JS');
}
