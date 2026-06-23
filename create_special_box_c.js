const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function createPoster() {
    console.log('🎨 Generating Special Box Set C poster...');
    const WIDTH = 1080;
    const HEIGHT = 1350; // Portrait (4:5) is great for IG/FB
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // 1. Background (Food Image)
    try {
        const bgBuf = fs.readFileSync(path.join(__dirname, 'public', 'images', 'Special Box Set C.jpg'));
        const bgImg = await loadImage(bgBuf);
        // Cover the canvas
        const scale = Math.max(WIDTH / bgImg.width, HEIGHT / bgImg.height);
        const sw = bgImg.width * scale;
        const sh = bgImg.height * scale;
        const sx = (WIDTH - sw) / 2;
        const sy = (HEIGHT - sh) / 2;
        ctx.drawImage(bgImg, sx, sy, sw, sh);
    } catch(e) {
        console.error('Error loading background:', e.message);
        ctx.fillStyle = '#1B3022';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // 2. Gradients for text readability
    // Top gradient
    const topGrad = ctx.createLinearGradient(0, 0, 0, 500);
    topGrad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
    topGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
    topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, WIDTH, 500);

    // Bottom gradient
    const botGrad = ctx.createLinearGradient(0, HEIGHT - 600, 0, HEIGHT);
    botGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    botGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.7)');
    botGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, HEIGHT - 600, WIDTH, 600);

    // 3. Logo (Top Right)
    try {
        const logoBuf = fs.readFileSync(path.join(__dirname, 'public', 'logo.png'));
        const logoImg = await loadImage(logoBuf);
        const logoScale = 220 / logoImg.width;
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 15;
        ctx.drawImage(logoImg, WIDTH - 250, 40, 220, logoImg.height * logoScale);
        ctx.shadowColor = 'transparent';
    } catch(e) {
        console.error('Error loading logo:', e.message);
    }

    // 4. Headline (Top Left/Center)
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    
    ctx.font = 'bold 80px "Leelawadee UI", Tahoma, Arial';
    ctx.fillStyle = '#D4AF37'; // Gold
    ctx.textAlign = 'left';
    ctx.fillText('SPECIAL BOX', 50, 120);
    
    ctx.font = 'bold 90px "Leelawadee UI", Tahoma, Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('SET C', 50, 210);

    // Subtle line under headline
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(50, 240, 200, 6);

    // 5. Pre-order / Coming Soon Badge (Floating Middle Right)
    ctx.save();
    ctx.translate(WIDTH - 180, HEIGHT / 2 - 100);
    ctx.rotate(10 * Math.PI / 180); // Slight rotation
    
    // Badge Background
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.95)'; // Gold
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Inner dashed line
    ctx.beginPath();
    ctx.arc(0, 0, 95, 0, Math.PI * 2);
    ctx.setLineDash([8, 6]);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Badge Text
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.font = 'bold 32px "Leelawadee UI", Tahoma';
    ctx.fillStyle = '#0D1F14';
    ctx.textAlign = 'center';
    ctx.fillText('พรีออเดอร์', 0, -10);
    ctx.font = 'bold 26px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText('COMING', 0, 25);
    ctx.fillText('SOON', 0, 55);
    ctx.restore();

    // 6. Menu Description (Bottom Left)
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 10;
    
    ctx.font = 'bold 40px "Leelawadee UI", Tahoma';
    ctx.fillStyle = '#D4AF37';
    ctx.fillText('รายการอาหารในชุด:', 50, HEIGHT - 320);

    ctx.font = '34px "Leelawadee UI", Tahoma';
    ctx.fillStyle = '#FFFFFF';
    const menuItems = ['เสือร้องไห้', 'ข้าวเหนียว', 'ส้มตำไทย', 'น้ำจิ้มซีฟู้ด', 'ผักเคียง'];
    
    // Draw list items
    let startY = HEIGHT - 260;
    menuItems.forEach((item, index) => {
        // Draw bullet point
        ctx.fillStyle = '#D4AF37';
        ctx.beginPath();
        ctx.arc(70, startY - 10, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(item, 100, startY);
        startY += 50;
    });

    // 7. Price Tag (Bottom Right)
    // Draw a tag-like shape
    const tagX = WIDTH - 380;
    const tagY = HEIGHT - 280;
    const tagW = 340;
    const tagH = 150;
    
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 10;
    
    ctx.fillStyle = '#F9F7F2'; // Cream white
    ctx.beginPath();
    ctx.moveTo(tagX + 30, tagY); // Top left with slant
    ctx.lineTo(tagX + tagW, tagY); // Top right
    ctx.lineTo(tagX + tagW, tagY + tagH); // Bottom right
    ctx.lineTo(tagX, tagY + tagH); // Bottom left
    ctx.lineTo(tagX + 30, tagY); // Back to start
    ctx.fill();

    // Price Text
    ctx.shadowColor = 'transparent';
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = '#1B3022';
    ctx.textAlign = 'left';
    ctx.fillText('SPECIAL PRICE', tagX + 50, tagY + 45);

    ctx.font = 'bold 90px Arial';
    ctx.fillStyle = '#D4AF37';
    ctx.fillText('£25', tagX + 110, tagY + 125);

    // 8. Bottom Bar (Social / Contact)
    ctx.fillStyle = '#0D1F14';
    ctx.fillRect(0, HEIGHT - 70, WIDTH, 70);
    
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(0, HEIGHT - 70, WIDTH, 4);

    ctx.font = '22px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('📍 Khrua Thai London  |  FB: Khrua Thai London  |  IG: @khruathailondon', WIDTH / 2, HEIGHT - 25);

    // Save the image
    const outPath = path.join(__dirname, 'public', 'images', 'post-special-box-c.jpg');
    fs.writeFileSync(outPath, canvas.toBuffer('image/jpeg', { quality: 0.95 }));
    console.log('✅ Created:', outPath);
}

createPoster().catch(console.error);
