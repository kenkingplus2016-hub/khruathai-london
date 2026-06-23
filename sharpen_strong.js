const Jimp = require('jimp');

async function strongSharpen() {
    console.log("Loading image...");
    const image = await Jimp.read("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    
    console.log("Applying contrast and strong sharpening...");
    // Increase contrast slightly to make details pop
    image.contrast(0.2);
    
    // Strong sharpening matrix
    const strongSharpenMatrix = [
        [-1, -1, -1],
        [-1,  9, -1],
        [-1, -1, -1]
    ];
    
    image.convolute(strongSharpenMatrix);
    
    // Apply a second mild sharpen to really bring out edges if needed
    const mildSharpen = [
        [ 0, -1,  0 ],
        [-1,  5, -1 ],
        [ 0, -1,  0 ]
    ];
    image.convolute(mildSharpen);
    
    console.log("Saving image...");
    await image.writeAsync("C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\logo.png");
    console.log("Done!");
}

strongSharpen().catch(console.error);
