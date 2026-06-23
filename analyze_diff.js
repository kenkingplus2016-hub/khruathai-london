const Jimp = require('jimp');

async function analyze() {
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\daee0a85-06de-431a-a6c2-f8eee6fb4183\\media__1778938248471.jpg");
    
    let maxDiff = 0;
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            const idx = image.getPixelIndex(x, y);
            const r = image.bitmap.data[idx + 0];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];
            const diff = Math.max(r,g,b) - Math.min(r,g,b);
            if (diff > maxDiff) maxDiff = diff;
        }
    }
    console.log("Max diff in top-left 20x20:", maxDiff);
}

analyze().catch(console.error);
