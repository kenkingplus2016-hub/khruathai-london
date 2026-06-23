const Jimp = require('jimp');

async function checkLogo() {
    const logo = await Jimp.read("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log(`Cropped logo dimensions: Width: ${logo.bitmap.width}, Height: ${logo.bitmap.height}`);
}

checkLogo().catch(console.error);
