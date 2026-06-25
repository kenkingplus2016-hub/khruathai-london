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

            // Increase h-[100px] to h-[150px]
            const h100Regex = /class="h-\[100px\]/g;
            if (h100Regex.test(content)) {
                content = content.replace(h100Regex, 'class="h-[180px] md:h-[220px]'); // Make it responsive and much bigger
                modified = true;
            }

            // Increase style="height: 60px;" to 90px
            const inlineHeightRegex = /style="height: 60px;/g;
            if (inlineHeightRegex.test(content)) {
                content = content.replace(inlineHeightRegex, 'style="height: 90px;');
                modified = true;
            }

            // Remove tailwind drop-shadow from logo
            const dropShadowRegex = /drop-shadow-\[0_4px_15px_rgba\(212,175,55,0\.5\)\]/g;
            if (dropShadowRegex.test(content)) {
                content = content.replace(dropShadowRegex, '');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated logo sizes in ${file}`);
            }
        }
    });
});
