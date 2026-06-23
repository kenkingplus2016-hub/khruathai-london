const Jimp = require('jimp');

async function sharpenImage() {
    console.log("Loading image...");
    const image = await Jimp.read("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    
    console.log("Sharpening image...");
    const sharpenMatrix = [
        [ 0, -1,  0 ],
        [-1,  5, -1 ],
        [ 0, -1,  0 ]
    ];
    
    // Apply convolution matrix
    image.convolute(sharpenMatrix);
    
    console.log("Saving image...");
    await image.writeAsync("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done!");
}

sharpenImage().catch(console.error);
