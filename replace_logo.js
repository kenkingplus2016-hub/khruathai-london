const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function replaceLogo() {
    console.log('🔄 Replacing logo in the image...');
    
    // 1. Load the original image
    const bgBuf = fs.readFileSync(path.join(__dirname, 'public', 'images', 'promo-box-c-bg.png'));
    const img = await loadImage(bgBuf);
    
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    
    // Draw original image
    ctx.drawImage(img, 0, 0);
    
    // 2. Cover the old logo using a dark feathering
    const patchX = 160;
    const patchY = 10;
    const patchW = 450;
    const patchH = 300;
    
    // Draw a dark feathered circle/oval to smoothly hide the old logo
    const cx = patchX + patchW/2;
    const cy = patchY + patchH/2;
    const rad = 200;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, 'rgba(10, 5, 0, 1)');
    grad.addColorStop(0.5, 'rgba(10, 5, 0, 0.9)');
    grad.addColorStop(1, 'rgba(10, 5, 0, 0)');
    
    ctx.fillStyle = grad;
    ctx.fillRect(patchX, patchY, patchW, patchH);

    // 3. Draw the new logo
    const logoBuf = fs.readFileSync(path.join(__dirname, 'public', 'logo.png'));
    const logoImg = await loadImage(logoBuf);
    
    // We want the new logo to fit nicely in that space
    const targetWidth = 320;
    const scale = targetWidth / logoImg.width;
    const targetHeight = logoImg.height * scale;
    
    const logoX = patchX + (patchW - targetWidth) / 2;
    const logoY = patchY + (patchH - targetHeight) / 2 - 10;
    
    // Add subtle shadow to the logo
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 15;
    ctx.drawImage(logoImg, logoX, logoY, targetWidth, targetHeight);
    
    // 4. Save the result
    const outPath = path.join(__dirname, 'public', 'images', 'promo-box-c-updated.jpg');
    fs.writeFileSync(outPath, canvas.toBuffer('image/jpeg', { quality: 0.95 }));
    console.log('✅ Created:', outPath);
}

replaceLogo().catch(console.error);
