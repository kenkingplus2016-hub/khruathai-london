const Jimp = require('jimp');

async function findColors() {
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\daee0a85-06de-431a-a6c2-f8eee6fb4183\\media__1778938248471.jpg");
    const colors = new Set();
    // Scan top 100 pixels to find checkerboard colors
    for (let x = 0; x < Math.min(100, image.bitmap.width); x++) {
        const idx = image.getPixelIndex(x, 0);
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        if (r === g && g === b) {
            colors.add(r);
        }
    }
    console.log("Colors in top edge:", Array.from(colors).join(', '));
}
findColors().catch(console.error);
