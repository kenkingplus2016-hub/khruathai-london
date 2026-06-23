const Jimp = require('jimp');

async function removeBackground() {
    console.log("Loading image...");
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\daee0a85-06de-431a-a6c2-f8eee6fb4183\\media__1778938248471.jpg");
    
    console.log("Processing image...");
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // Grayscale check: the difference between the max and min RGB values should be small
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        // The glowing effect might have some semi-grayscale pixels, but gold/yellow is usually high red/green, low blue.
        // A true gray checkerboard will have diff < 15.
        // Also check if it's somewhat in the mid-tones (to avoid deleting pure black or pure white if there's any, though the checkboard is mid-gray).
        // Let's be aggressive with grayscale removal: diff < 20.
        if (diff < 20) {
            // Set alpha to 0
            this.bitmap.data[idx + 3] = 0;
        } else {
            // Smooth blending for edges: if diff is between 20 and 40, partially transparent
            if (diff < 40) {
                const alpha = Math.floor(((diff - 20) / 20) * 255);
                this.bitmap.data[idx + 3] = alpha;
            }
        }
    });
    
    console.log("Saving image...");
    await image.writeAsync("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done!");
}

removeBackground().catch(console.error);
