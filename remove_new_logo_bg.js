const Jimp = require('jimp');

async function analyzeAndProcess() {
    console.log("Loading uploaded image...");
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\b6481807-a08b-4c8a-b8f7-7ad073a8761b\\media__1779024494400.jpg");
    
    // Analyze background (top-left 20x20 pixels)
    console.log("Analyzing background pixels:");
    let bgR = 0, bgG = 0, bgB = 0, count = 0;
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            const idx = image.getPixelIndex(x, y);
            bgR += image.bitmap.data[idx + 0];
            bgG += image.bitmap.data[idx + 1];
            bgB += image.bitmap.data[idx + 2];
            count++;
        }
    }
    bgR = Math.round(bgR / count);
    bgG = Math.round(bgG / count);
    bgB = Math.round(bgB / count);
    console.log(`Average background color: R:${bgR} G:${bgG} B:${bgB}`);

    // Process image to make background transparent
    console.log("Processing background removal...");
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // Background is dark green. 
        // Golden ornament lines have higher brightness (especially Red and Green)
        // Let's use distance from average background color, or a threshold on Red component.
        // Gold has R > 100, and usually R > B + 20.
        // Let's see: if we keep gold, we want R > 80.
        
        let alpha = 255;
        
        // A pixel is background if it's very close to the dark green background
        // Or if it's just dark green overall.
        // Distance to average background color:
        const dist = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2));
        
        if (dist < 45) {
            alpha = 0; // Solid background
        } else if (dist < 75) {
            // Anti-aliasing transition
            alpha = Math.max(0, Math.min(255, Math.round(((dist - 45) / 30) * 255)));
        }
        
        // Also ensure dark/greenish pixels are transparent, while keeping gold
        if (r < 75 && g > r) {
            alpha = 0;
        }

        this.bitmap.data[idx + 3] = alpha;
    });

    console.log("Saving processed logo to public/logo.png...");
    await image.writeAsync("c:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Background removal complete!");
}

analyzeAndProcess().catch(console.error);
