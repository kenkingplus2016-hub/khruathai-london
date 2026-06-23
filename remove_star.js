const Jimp = require('jimp');

async function removeCornerStar() {
    console.log("Loading logo...");
    // Let's load the original uploaded image to re-process background removal cleanly, 
    // or edit the current logo.png. Since the crop cropped the star as well, it lies at the bottom right.
    const logo = await Jimp.read("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    const width = logo.bitmap.width;
    const height = logo.bitmap.height;

    console.log(`Logo size: ${width}x${height}`);

    // The star is at the bottom right. Let's find any visible pixels in the bottom-right corner 
    // and make them transparent. The star is small (roughly 30x30 pixels).
    // Let's clear a box in the bottom right corner:
    // X from width - 70 to width, Y from height - 70 to height.
    const starBoxSize = 85; 

    console.log(`Clearing bottom-right area (size: ${starBoxSize}x${starBoxSize}) to remove the star...`);
    
    logo.scan(width - starBoxSize, height - starBoxSize, starBoxSize, starBoxSize, function(x, y, idx) {
        this.bitmap.data[idx + 3] = 0; // Set Alpha to 0 (fully transparent)
    });

    // Let's re-crop the logo since removing the star might change the bounding box at the bottom right.
    let minX = logo.bitmap.width;
    let maxX = 0;
    let minY = logo.bitmap.height;
    let maxY = 0;
    let found = false;

    logo.scan(0, 0, logo.bitmap.width, logo.bitmap.height, function(x, y, idx) {
        const alpha = this.bitmap.data[idx + 3];
        if (alpha > 50) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            found = true;
        }
    });

    if (found) {
        const padding = 15;
        const cropX = Math.max(0, minX - padding);
        const cropY = Math.max(0, minY - padding);
        const cropW = Math.min(logo.bitmap.width - cropX, (maxX - minX) + (padding * 2));
        const cropH = Math.min(logo.bitmap.height - cropY, (maxY - minY) + (padding * 2));

        console.log(`Re-cropping logo: X:${cropX}, Y:${cropY}, W:${cropW}, H:${cropH}`);
        logo.crop(cropX, cropY, cropW, cropH);
    }

    console.log("Saving updated logo...");
    await logo.writeAsync("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done! Corner star removed and logo cropped beautifully.");
}

removeCornerStar().catch(console.error);
