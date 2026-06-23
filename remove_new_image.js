const Jimp = require('jimp');

async function removeBackground() {
    console.log("Loading image...");
    const image = await Jimp.read("C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\daee0a85-06de-431a-a6c2-f8eee6fb4183\\media__1778941270855.png");
    
    console.log("Processing image...");
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        let alpha = 255;
        
        if (diff < 20 && max < 160) {
            alpha = 0;
        } else if (diff < 40 && max < 170) {
            alpha = Math.max(0, Math.min(255, (diff - 20) * 12));
        }

        this.bitmap.data[idx + 3] = alpha;
    });
    
    console.log("Saving image...");
    await image.writeAsync("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done!");
}

removeBackground().catch(console.error);
