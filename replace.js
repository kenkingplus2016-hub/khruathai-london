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
    if(f.includes('replace.js')) return;
    let content = fs.readFileSync(f, 'utf8');
    let original = content;
    content = content.replace(/UBON THAI/g, 'KHRUA THAI');
    content = content.replace(/Ubon Thai/g, 'Khrua Thai');
    content = content.replace(/ubon-thai/g, 'khrua-thai');
    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log('Updated', f);
    }
});
