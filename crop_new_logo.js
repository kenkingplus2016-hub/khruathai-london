const Jimp = require('jimp');

async function cropLogo() {
    console.log("Loading processed logo...");
    const image = await Jimp.read("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    
    let minX = image.bitmap.width;
    let maxX = 0;
    let minY = image.bitmap.height;
    let maxY = 0;
    let found = false;

    // Scan the image to find the bounding box of non-transparent pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const alpha = this.bitmap.data[idx + 3];
        if (alpha > 50) { // Keep non-transparent pixels
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            found = true;
        }
    });

    if (!found) {
        console.log("No visible pixels found! Bounding box detection failed.");
        return;
    }

    console.log(`Detected logo bounding box: minX:${minX}, maxX:${maxX}, minY:${minY}, maxY:${maxY}`);
    
    // Add small padding (e.g., 10 pixels) to avoid cutting off anti-aliased edges
    const padding = 15;
    const cropX = Math.max(0, minX - padding);
    const cropY = Math.max(0, minY - padding);
    const cropW = Math.min(image.bitmap.width - cropX, (maxX - minX) + (padding * 2));
    const cropH = Math.min(image.bitmap.height - cropY, (maxY - minY) + (padding * 2));

    console.log(`Cropping logo with padding: X:${cropX}, Y:${cropY}, W:${cropW}, H:${cropH}`);
    image.crop(cropX, cropY, cropW, cropH);

    console.log("Saving cropped logo...");
    await image.writeAsync("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Logo cropping complete!");
}

cropLogo().catch(console.error);
