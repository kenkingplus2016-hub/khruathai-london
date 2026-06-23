const Jimp = require('jimp');

async function findSquareSize() {
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\daee0a85-06de-431a-a6c2-f8eee6fb4183\\media__1778938248471.jpg");
    let lastColor = null;
    let size = 0;
    for (let x = 0; x < 200; x++) {
        const idx = image.getPixelIndex(x, 0);
        const r = image.bitmap.data[idx];
        if (r > 60 && r < 70) {
            if (lastColor === 'light') {
                console.log("Dark starts at", x);
                lastColor = 'dark';
            } else if (lastColor === null) {
                lastColor = 'dark';
            }
        } else if (r > 100 && r < 120) {
            if (lastColor === 'dark') {
                console.log("Light starts at", x);
                lastColor = 'light';
            } else if (lastColor === null) {
                lastColor = 'light';
            }
        }
    }
}
findSquareSize().catch(console.error);
