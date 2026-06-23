/**
 * สคริปต์สร้างรูปโพสต์ตัวอย่าง — สาธิตการทำงานของ Post Designer
 * ใช้ fabric-node (Fabric.js สำหรับ Node.js) สร้างรูปจริงๆ
 */
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

async function createDemoPost() {
    console.log('🎨 กำลังสร้างรูปโพสต์ตัวอย่าง...\n');

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // ── 1. Background gradient (dark green) ──
    const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    bgGrad.addColorStop(0, '#0D1F14');
    bgGrad.addColorStop(1, '#1B3022');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // ── 2. Load & draw food image ──
    try {
        // Try to find a food image
        const imagesDir = path.join(__dirname, 'public', 'images');
        const allImages = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
        
        // Pick an appetizing-looking image
        const preferred = allImages.find(img => img.toLowerCase().includes('grilled') || img.toLowerCase().includes('pork') || img.toLowerCase().includes('satay'));
        const imgFile = preferred || allImages[0];
        
        if (imgFile) {
            const foodImg = await loadImage(path.join(imagesDir, imgFile));
            
            // Draw food image centered, covering canvas
            const scale = Math.max(WIDTH / foodImg.width, HEIGHT / foodImg.height);
            const sw = foodImg.width * scale;
            const sh = foodImg.height * scale;
            const sx = (WIDTH - sw) / 2;
            const sy = (HEIGHT - sh) / 2;
            
            ctx.globalAlpha = 0.45;
            ctx.drawImage(foodImg, sx, sy, sw, sh);
            ctx.globalAlpha = 1;
            
            console.log(`  📸 ใช้รูปอาหาร: ${imgFile}`);
        }
    } catch (err) {
        console.log('  ⚠️ ไม่พบรูปอาหาร ใช้พื้นหลังเปล่า');
    }

    // ── 3. Dark overlay on top and bottom ──
    // Top gradient
    const topGrad = ctx.createLinearGradient(0, 0, 0, 180);
    topGrad.addColorStop(0, 'rgba(13, 31, 20, 0.95)');
    topGrad.addColorStop(1, 'rgba(13, 31, 20, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, WIDTH, 180);

    // Bottom overlay
    const botGrad = ctx.createLinearGradient(0, HEIGHT - 250, 0, HEIGHT);
    botGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    botGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.7)');
    botGrad.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, HEIGHT - 250, WIDTH, 250);

    // ── 4. Gold accent lines ──
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(WIDTH, 0);
    ctx.stroke();
    
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, HEIGHT - 220);
    ctx.lineTo(WIDTH - 60, HEIGHT - 220);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT - 3);
    ctx.lineTo(WIDTH, HEIGHT - 3);
    ctx.stroke();

    // ── 5. Decorative diamond ──
    ctx.save();
    ctx.translate(WIDTH / 2, HEIGHT - 220);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(-6, -6, 12, 12);
    ctx.restore();

    // ── 6. Logo placeholder (gold circle with K) ──
    // Draw logo circle
    ctx.beginPath();
    ctx.arc(80, 55, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 28px Georgia';
    ctx.fillStyle = '#D4AF37';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('K', 80, 57);

    // ── 7. Brand name ──
    ctx.font = 'bold 22px Georgia';
    ctx.fillStyle = '#D4AF37';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('KHRUA THAI LONDON', 125, 38);

    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(245, 230, 184, 0.8)';
    ctx.fillText('Celebrations & Private Dining', 125, 65);

    // ── 8. Main Heading ──
    ctx.font = 'bold 56px Georgia';
    ctx.fillStyle = '#D4AF37';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText('🔥 SPECIAL OFFER', WIDTH / 2, 160);
    ctx.shadowColor = 'transparent';

    // ── 9. Promotional Price ──
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#D4AF37';
    ctx.textAlign = 'center';
    
    ctx.shadowColor = 'rgba(212,175,55,0.3)';
    ctx.shadowBlur = 20;
    ctx.fillText('£89.99', WIDTH / 2, HEIGHT - 130);
    ctx.shadowColor = 'transparent';

    // Strikethrough original price
    ctx.font = '28px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('£129.99', WIDTH / 2, HEIGHT - 170);

    // Draw strikethrough line
    const oldPriceWidth = ctx.measureText('£129.99').width;
    ctx.strokeStyle = 'rgba(231, 76, 60, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2 - oldPriceWidth / 2 - 5, HEIGHT - 170);
    ctx.lineTo(WIDTH / 2 + oldPriceWidth / 2 + 5, HEIGHT - 170);
    ctx.stroke();

    // ── 10. Description ──
    ctx.font = '22px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Authentic Thai Set for 10 Guests — Limited Time!', WIDTH / 2, HEIGHT - 60);

    // ── 11. CTA Badge ──
    // Rounded rectangle
    const ctaX = WIDTH - 200;
    const ctaY = 30;
    const ctaW = 160;
    const ctaH = 44;
    const ctaR = 22;

    ctx.beginPath();
    ctx.moveTo(ctaX + ctaR, ctaY);
    ctx.lineTo(ctaX + ctaW - ctaR, ctaY);
    ctx.arcTo(ctaX + ctaW, ctaY, ctaX + ctaW, ctaY + ctaR, ctaR);
    ctx.lineTo(ctaX + ctaW, ctaY + ctaH - ctaR);
    ctx.arcTo(ctaX + ctaW, ctaY + ctaH, ctaX + ctaW - ctaR, ctaY + ctaH, ctaR);
    ctx.lineTo(ctaX + ctaR, ctaY + ctaH);
    ctx.arcTo(ctaX, ctaY + ctaH, ctaX, ctaY + ctaH - ctaR, ctaR);
    ctx.lineTo(ctaX, ctaY + ctaR);
    ctx.arcTo(ctaX, ctaY, ctaX + ctaR, ctaY, ctaR);
    ctx.closePath();
    ctx.fillStyle = '#D4AF37';
    ctx.fill();

    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#0D1F14';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BOOK NOW', ctaX + ctaW / 2, ctaY + ctaH / 2 + 1);

    // ── 12. Social media icons area ──
    ctx.font = '13px Arial';
    ctx.fillStyle = 'rgba(245, 230, 184, 0.6)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('FB: Khrua Thai London  |  IG: @khruathailondon  |  khruathailondon.com', WIDTH / 2, HEIGHT - 15);

    // ── Export ──
    const outputPath = path.join(__dirname, 'public', 'images', 'demo-post-example.png');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log(`\n  ✅ สร้างรูปโพสต์สำเร็จ!`);
    console.log(`  📁 บันทึกที่: ${outputPath}`);
    console.log(`  📐 ขนาด: ${WIDTH} × ${HEIGHT}px`);
    console.log(`  📦 ขนาดไฟล์: ${(buffer.length / 1024).toFixed(1)} KB`);
    console.log(`\n  🌐 ดูได้ที่: http://localhost:8080/images/demo-post-example.png\n`);
}

createDemoPost().catch(err => {
    console.error('Error:', err.message);
});
