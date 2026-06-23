const Jimp = require('jimp');

async function checkDims() {
    const image = await Jimp.read("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Width:", image.bitmap.width);
    console.log("Height:", image.bitmap.height);
}
checkDims().catch(console.error);
