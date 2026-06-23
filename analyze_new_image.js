const Jimp = require('jimp');

async function analyze() {
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\daee0a85-06de-431a-a6c2-f8eee6fb4183\\media__1778941270855.png");
    
    console.log("Top-left 10x10 pixels:");
    let maxDiff = 0;
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const idx = image.getPixelIndex(x, y);
            const r = image.bitmap.data[idx + 0];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];
            console.log(`(${x},${y}) -> R:${r} G:${g} B:${b}`);
        }
    }
}
analyze().catch(console.error);
