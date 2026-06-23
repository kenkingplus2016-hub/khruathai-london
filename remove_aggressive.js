const Jimp = require('jimp');

async function removeBackground() {
    console.log("Loading image...");
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\daee0a85-06de-431a-a6c2-f8eee6fb4183\\media__1778938248471.jpg");
    
    console.log("Processing image...");
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        // The checkerboard has max around 110.
        // The glow mixed with checkerboard has max up to maybe 140, and diff up to 50.
        // Let's create a score for how "foreground" a pixel is.
        // High max (brightness) OR high diff (saturation/colorfulness) means foreground.
        
        let alpha = 255;
        
        if (max < 115 && diff < 30) {
            // Pure checkerboard
            alpha = 0;
        } else if (max < 160 && diff < 60) {
            // This is the weak glow zone, where the checkerboard pattern is highly visible.
            // Let's make it completely transparent to remove the jagged checkerboard halo.
            alpha = 0;
        } else if (max < 180 && diff < 80) {
            // Smooth transition
            alpha = Math.max(0, Math.min(255, (max - 160) * 5 + (diff - 60) * 3));
        }

        this.bitmap.data[idx + 3] = alpha;
    });
    
    console.log("Saving image...");
    await image.writeAsync("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done!");
}

removeBackground().catch(console.error);
