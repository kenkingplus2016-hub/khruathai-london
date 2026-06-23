const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

async function createBeautifulPosts() {
    console.log('🎨 Generating beautiful sample posts...');
    const imagesDir = path.join(__dirname, 'public', 'images');
    const outDir = imagesDir;

    // --- Post 1: Premium Seafood Promotion ---
    {
        const WIDTH = 1080;
        const HEIGHT = 1080;
        const canvas = createCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext('2d');

        // Load food image
        try {
            const foodBuf = fs.readFileSync(path.join(imagesDir, 'Chao Lay Seafood Premium Tray.jpeg'));
            const foodImg = await loadImage(foodBuf);
            
            // Draw food covering the canvas
            const scale = Math.max(WIDTH / foodImg.width, HEIGHT / foodImg.height);
            const sw = foodImg.width * scale;
            const sh = foodImg.height * scale;
            const sx = (WIDTH - sw) / 2;
            const sy = (HEIGHT - sh) / 2;
            ctx.drawImage(foodImg, sx, sy, sw, sh);
        } catch(e) { console.log('Error loading food image 1:', e.message); }

        // Gradients for text readability
        const topGrad = ctx.createLinearGradient(0, 0, 0, 300);
        topGrad.addColorStop(0, 'rgba(13, 31, 20, 0.9)');
        topGrad.addColorStop(1, 'rgba(13, 31, 20, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, WIDTH, 300);

        const botGrad = ctx.createLinearGradient(0, HEIGHT - 400, 0, HEIGHT);
        botGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        botGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)');
        botGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, HEIGHT - 400, WIDTH, 400);

        // Logo
        try {
            const logo = await loadImage(path.join(__dirname, 'public', 'logo.png'));
            const logoScale = 150 / logo.width;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 10;
            ctx.drawImage(logo, WIDTH / 2 - 75, 40, 150, logo.height * logoScale);
            ctx.shadowColor = 'transparent';
        } catch(e) {}

        // Title
        ctx.font = 'bold 64px Georgia';
        ctx.fillStyle = '#D4AF37';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 4;
        ctx.fillText('CHAO LAY', WIDTH / 2, HEIGHT - 250);
        
        ctx.font = 'italic 40px Georgia';
        ctx.fillStyle = '#F5E6B8';
        ctx.fillText('Premium Seafood Tray', WIDTH / 2, HEIGHT - 190);
        
        ctx.shadowColor = 'transparent';

        // Price Badge
        ctx.beginPath();
        ctx.arc(WIDTH - 150, 150, 70, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#0D1F14';
        ctx.fillText('ONLY', WIDTH - 150, 120);
        ctx.font = 'bold 46px Arial';
        ctx.fillText('£149', WIDTH - 150, 165);

        // Details
        ctx.font = '26px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('Fresh Grilled River Prawns & Local Seafood', WIDTH / 2, HEIGHT - 120);
        
        // Call to action
        ctx.fillStyle = '#D4AF37';
        ctx.fillRect(WIDTH / 2 - 120, HEIGHT - 80, 240, 50);
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#0D1F14';
        ctx.fillText('RESERVE NOW', WIDTH / 2, HEIGHT - 48);

        const out1 = path.join(outDir, 'post-seafood-promo.jpg');
        fs.writeFileSync(out1, canvas.toBuffer('image/jpeg', { quality: 0.9 }));
        console.log('✅ Created:', out1);
    }

    // --- Post 2: Canapes Event ---
    {
        const WIDTH = 1080;
        const HEIGHT = 1080;
        const canvas = createCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext('2d');

        // Load food image
        try {
            const foodBuf = fs.readFileSync(path.join(imagesDir, 'canape_pork_satay.jpg'));
            const foodImg = await loadImage(foodBuf);
            const scale = Math.max(WIDTH / foodImg.width, HEIGHT / foodImg.height);
            const sw = foodImg.width * scale;
            const sh = foodImg.height * scale;
            ctx.drawImage(foodImg, (WIDTH - sw) / 2, (HEIGHT - sh) / 2, sw, sh);
        } catch(e) { console.log('Error loading food image 2:', e.message); }

        // Gradients
        const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
        grad.addColorStop(0, 'rgba(13, 31, 20, 0.8)');
        grad.addColorStop(0.4, 'rgba(13, 31, 20, 0.2)');
        grad.addColorStop(1, 'rgba(13, 31, 20, 0.9)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Border Frame
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, WIDTH - 80, HEIGHT - 80);
        ctx.lineWidth = 1;
        ctx.strokeRect(55, 55, WIDTH - 110, HEIGHT - 110);

        // Text
        ctx.font = 'bold 50px Georgia';
        ctx.fillStyle = '#D4AF37';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText('ELEVATE YOUR EVENT', WIDTH / 2, 140);
        
        ctx.font = '32px Georgia';
        ctx.fillStyle = '#fff';
        ctx.fillText('With Our Premium Thai Canapés', WIDTH / 2, 200);

        // Center Box
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(WIDTH / 2 - 250, HEIGHT - 320, 500, 200);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        ctx.strokeRect(WIDTH / 2 - 240, HEIGHT - 310, 480, 180);

        ctx.font = 'bold 36px Georgia';
        ctx.fillStyle = '#D4AF37';
        ctx.fillText('SIAM VIJIT SET', WIDTH / 2, HEIGHT - 240);
        
        ctx.font = '24px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('32 Pieces of Exquisite Thai Bites', WIDTH / 2, HEIGHT - 190);
        ctx.fillStyle = '#F5E6B8';
        ctx.fillText('Perfect for Private Parties', WIDTH / 2, HEIGHT - 150);

        const out2 = path.join(outDir, 'post-canape-event.jpg');
        fs.writeFileSync(out2, canvas.toBuffer('image/jpeg', { quality: 0.9 }));
        console.log('✅ Created:', out2);
    }
}

createBeautifulPosts().catch(e => console.error(e));
