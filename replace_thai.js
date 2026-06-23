const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        try {
            filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
        } catch (err) {}
    });
    return filelist;
};

const files = walkSync(__dirname).filter(f => f.endsWith('.html') || f.endsWith('.json') || f.endsWith('.js'));

files.forEach(f => {
    if(f.includes('node_modules')) return;
    if(f.includes('replace') || f.includes('replace_thai')) return;
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Replace in Thai descriptions
    content = content.replace(/สำคัญ KHRUA THAI CELEBRATIONS พร้อม/g, 'สำคัญ ครัวไทย พร้อม');
    
    // In index.html welcome text
    content = content.replace(/<div class="thai-welcome">ยินดีต้อนรับ<\/div>/g, '<div class="thai-welcome">ยินดีต้อนรับสู่ ครัวไทย</div>');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log('Updated', f);
    }
});
