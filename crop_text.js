const Jimp = require('jimp');

async function removeText() {
    console.log("Loading image...");
    const image = await Jimp.read("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    
    console.log("Erasing bottom text...");
    image.scan(0, 750, image.bitmap.width, image.bitmap.height - 750, function(x, y, idx) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
    });
    
    // We can also crop the image to make it tighter around the pot.
    // Let's crop it to 1024x750.
    image.crop(0, 0, 1024, 750);
    
    console.log("Saving image...");
    await image.writeAsync("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done!");
}

removeText().catch(console.error);
