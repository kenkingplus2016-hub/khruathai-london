const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        if (file.endsWith('.html')) {
            let filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Remove header dark gradients
            const headerRegex = /bg-gradient-to-b from-\[#0d1f14\] via-dark-green to-\[#0d1f14\]/g;
            if (headerRegex.test(content)) {
                content = content.replace(headerRegex, 'bg-white');
                modified = true;
            }

            // Remove section dark gradients
            const sectionRegex = /bg-\[linear-gradient\(rgba\(13,31,20,0\.85\),rgba\(13,31,20,0\.85\)\),url\('images\/cover\.jpg'\)\]/g;
            if (sectionRegex.test(content)) {
                content = content.replace(sectionRegex, 'bg-white');
                modified = true;
            }

            // Change text-gold-light to text-black for readability on white bg
            const goldLightRegex = /text-gold-light/g;
            if (goldLightRegex.test(content)) {
                content = content.replace(goldLightRegex, 'text-black');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated tailwind classes in ${file}`);
            }
        }
    });
});
