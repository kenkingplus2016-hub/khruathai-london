const Jimp = require('jimp');

async function findGap() {
    const image = await Jimp.read("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    for (let y = 500; y < 1000; y += 10) {
        let alphaSum = 0;
        for (let x = 0; x < 1024; x++) {
            const idx = image.getPixelIndex(x, y);
            alphaSum += image.bitmap.data[idx + 3];
        }
        console.log(`Row ${y} avg alpha: ${Math.round(alphaSum / 1024)}`);
    }
}
findGap().catch(console.error);
