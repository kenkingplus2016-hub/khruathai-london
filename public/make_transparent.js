const Jimp = require('jimp');

async function makeTransparent() {
    console.log("Loading logo...");
    const image = await Jimp.read("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    
    console.log("Processing background removal (white to transparent)...");
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // If the pixel is very close to white (R, G, B > 240)
        // Make it transparent
        if (r > 240 && g > 240 && b > 240) {
            this.bitmap.data[idx + 3] = 0; // Set alpha to 0
        } else if (r > 220 && g > 220 && b > 220) {
            // Anti-aliasing for edges
            const avg = (r + g + b) / 3;
            // The closer to 255, the more transparent
            const alpha = Math.round(((255 - avg) / 35) * 255);
            this.bitmap.data[idx + 3] = alpha;
        }
    });

    console.log("Saving transparent logo...");
    await image.writeAsync("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done!");
}

makeTransparent().catch(console.error);
