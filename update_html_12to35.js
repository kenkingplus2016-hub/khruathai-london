const fs = require('fs');
const path = require('path');

const filesToUpdate = ['royal.html', 'booking.html'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(__dirname, 'public', fileName);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Thai replacements
        content = content.replace(/12 ชิ้น/g, '35 ชิ้น');
        content = content.replace(/เซต 12 ชิ้น/g, 'เซต 35 ชิ้น');

        // English replacements
        content = content.replace(/12 Pcs/g, '35 Pcs');
        content = content.replace(/12-Pcs/g, '35-Pcs');
        content = content.replace(/12-pieces/g, '35-pieces');
        content = content.replace(/12 pieces/g, '35 pieces');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated 12 pieces to 35 pieces in ${fileName}`);
    } else {
        console.log(`File not found: ${fileName}`);
    }
});
