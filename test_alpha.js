const Jimp = require('jimp');

async function testAlpha() {
    const image = await Jimp.read("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Has alpha:", image.hasAlpha());
    const idx = image.getPixelIndex(0, 0);
    const a = image.bitmap.data[idx + 3];
    console.log("Top-left alpha:", a);
}
testAlpha().catch(console.error);
