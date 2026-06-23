const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    path.join(__dirname, 'data', 'royal_menu.json'),
    path.join(__dirname, 'public', 'royal.html'),
    path.join(__dirname, 'public', 'booking.html')
];

filesToUpdate.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Thai replacements
        content = content.replace(/35 ชิ้น/g, '32 ชิ้น');
        content = content.replace(/เซต 35 ชิ้น/g, 'เซต 32 ชิ้น'); // Just in case, though the first one covers it

        // English replacements
        content = content.replace(/35 Pcs/g, '32 Pcs');
        content = content.replace(/35-Pcs/g, '32-Pcs');
        content = content.replace(/35-pieces/g, '32-pieces');
        content = content.replace(/35 pieces/g, '32 pieces');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated 35 to 32 pieces in ${path.basename(filePath)}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
