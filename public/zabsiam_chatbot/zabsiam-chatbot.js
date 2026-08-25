(function(){
    const C = Object.assign({
        brandName: 'Zab Siam',
        assistantName: 'Siam Assistant',
        contactEmail: 'info@zabsiam.com',
        bookingUrl: '#booking',
        accent: '#e65100', // Orange (Main)
        gold: '#1b5e20',   // Dark Green (Secondary)
        position: 'right',
        apiEndpoint: '',
        welcomeMessage: 'Hello! Welcome to Zab Siam 🌶️ and Chor Malee 🌸. Would you like to see our menu or book an event catering package?'
    }, window.ZABSIAM_CHATBOT_CONFIG || {});

    // Chatbot UI CSS
    const st = document.createElement('style');
    st.textContent = `
        #zs-chat-root { position: fixed; bottom: 20px; ${C.position}: 20px; z-index: 2147483000; font-family: 'Prompt', sans-serif; color: #333; }
        .zs-launch { width: 62px; height: 62px; border-radius: 50%; border: 0; background: ${C.accent}; color: #fff; font-size: 26px; cursor: pointer; box-shadow: 0 10px 30px rgba(143, 29, 36, 0.4); transition: transform 0.3s; display: flex; align-items: center; justify-content: center; }
        .zs-launch:hover { transform: scale(1.08); }
        .zs-panel { display: none; width: min(380px, calc(100vw - 28px)); height: min(650px, calc(100vh - 110px)); background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.25); margin-bottom: 12px; border: 1px solid #eadfce; flex-direction: column; }
        .zs-panel.open { display: flex; animation: zs-slideUp 0.3s ease-out; }
        @keyframes zs-slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zs-head { background: linear-gradient(135deg, ${C.accent}, #6a1318); color: #fff; padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid ${C.gold}; }
        .zs-head div { display: flex; flex-direction: column; }
        .zs-head strong { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; letter-spacing: 0.5px; }
        .zs-head small { font-size: 13px; opacity: 0.9; margin-top: 2px; }
        .zs-close { border: 0; background: transparent; color: #fff; font-size: 28px; cursor: pointer; line-height: 1; opacity: 0.8; transition: opacity 0.2s; padding: 0; margin-top: -5px; }
        .zs-close:hover { opacity: 1; }
        .zs-messages { flex: 1; overflow-y: auto; padding: 20px 16px; background: #faf8f5; display: flex; flex-direction: column; gap: 14px; scroll-behavior: smooth; }
        .zs-msg { max-width: 85%; padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.5; word-wrap: break-word; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .zs-bot { background: #fff; border: 1px solid #eadfce; border-bottom-left-radius: 4px; color: #333; align-self: flex-start; }
        .zs-user { background: ${C.accent}; color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }
        
        /* Card UI */
        .zs-card-container { display: flex; flex-direction: column; gap: 12px; margin-top: 4px; width: 100%; align-self: flex-start; max-width: 90%; }
        .zs-card { background: #fff; border: 1px solid #eadfce; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.06); width: 100%; display: flex; flex-direction: column; cursor: pointer; transition: transform 0.2s, border-color 0.2s; }
        .zs-card:hover { transform: translateY(-3px); border-color: ${C.gold}; }
        .zs-card img { width: 100%; height: 140px; object-fit: cover; border-bottom: 1px solid #f5f5f5; }
        .zs-card-body { padding: 12px 14px; }
        .zs-card-title { font-weight: bold; font-size: 15px; color: ${C.accent}; margin-bottom: 4px; }
        .zs-card-desc { font-size: 13px; color: #666; line-height: 1.4; }
        .zs-card-btn { background: #fdfdfd; color: ${C.gold}; border-top: 1px solid #f0f0f0; text-align: center; padding: 10px; font-size: 13px; font-weight: bold; transition: all 0.2s; }
        .zs-card:hover .zs-card-btn { background: ${C.gold}; color: #fff; }

        .zs-quick { display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 16px; background: #faf8f5; border-top: 1px dashed #eadfce; }
        .zs-chip { border: 1px solid ${C.gold}; background: #fff; border-radius: 999px; padding: 8px 14px; font-size: 13px; cursor: pointer; color: #444; font-weight: 500; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
        .zs-chip:hover { background: ${C.gold}; color: #fff; border-color: ${C.gold}; }
        .zs-form { display: flex; gap: 10px; padding: 14px; border-top: 1px solid #eadfce; background: #fff; }
        .zs-input { flex: 1; border: 1px solid #d8cbb8; border-radius: 999px; padding: 12px 16px; color: #333; background: #fdfdfd; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .zs-input:focus { border-color: ${C.gold}; box-shadow: 0 0 0 2px rgba(179, 138, 67, 0.15); }
        .zs-send { border: 0; border-radius: 999px; background: ${C.gold}; color: #fff; padding: 0 18px; font-weight: bold; cursor: pointer; transition: background 0.2s; font-size: 14px; }
        .zs-send:hover { background: #9e783a; }
        .zs-link { color: ${C.accent}; font-weight: bold; text-decoration: underline; }
        .zs-typing { opacity: 0.65; font-style: italic; }
        @media(max-width: 520px){ #zs-chat-root{left: 14px; right: 14px; bottom: 14px; } .zs-panel{width: 100%; height: calc(100svh - 90px);} .zs-launch{float: right;} }
    `;
    document.head.appendChild(st);

    // Build DOM
    const root = document.createElement('div');
    root.id = 'zs-chat-root';
    root.innerHTML = `
        <div class="zs-panel">
            <div class="zs-head">
                <div>
                    <strong>${C.assistantName}</strong>
                    <small>${C.brandName} Event Catering</small>
                </div>
                <button class="zs-close">&times;</button>
            </div>
            <div class="zs-messages"></div>
            <div class="zs-quick">
                <button class="zs-chip">Meeting Meals</button>
                <button class="zs-chip">Coffee Break</button>
                <button class="zs-chip">Signature Box</button>
                <button class="zs-chip">Catering Packages</button>
            </div>
            <form class="zs-form">
                <input class="zs-input" placeholder="Type your question..." autocomplete="off">
                <button class="zs-send" type="submit">Send</button>
            </form>
        </div>
        <button class="zs-launch" aria-label="Open Chat">
            <i class="fas fa-comment-dots"></i>
        </button>
    `;
    document.body.appendChild(root);

    // FontAwesome fallback if not loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
        root.querySelector('.zs-launch').textContent = '💬';
    }

    const p = root.querySelector('.zs-panel'), 
          m = root.querySelector('.zs-messages'), 
          i = root.querySelector('.zs-input');

    // Utility
    const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

    function addMessage(html, type) {
        const e = document.createElement('div');
        e.className = 'zs-msg zs-' + type;
        e.innerHTML = html;
        m.appendChild(e);
        setTimeout(() => m.scrollTop = m.scrollHeight, 10);
        return e;
    }

    function addCards(cardsData) {
        const container = document.createElement('div');
        container.className = 'zs-card-container';
        
        cardsData.forEach(c => {
            const card = document.createElement('div');
            card.className = 'zs-card';
            card.innerHTML = `
                <img src="${c.img}" alt="${c.title}">
                <div class="zs-card-body">
                    <div class="zs-card-title">${c.title}</div>
                    <div class="zs-card-desc">${c.desc}</div>
                </div>
                <div class="zs-card-btn">${c.btnText || 'View Details'}</div>
            `;
            card.onclick = () => {
                if (c.action === 'send') send(c.title);
                else if (c.link) {
                    window.location.href = c.link;
                    p.classList.remove('open'); // Close chat when navigating
                }
            };
            container.appendChild(card);
        });
        m.appendChild(container);
        setTimeout(() => m.scrollTop = m.scrollHeight, 10);
    }

    // Logic
    function localLogic(raw) {
        const q = raw.toLowerCase().trim();
        
        if (/meeting|meal|buffet/.test(q) || raw === 'Meeting Meals' || raw === 'อาหารสำหรับประชุม') {
            addMessage('Here are the details for our <strong>Meeting Meals</strong>:', 'bot');
            addCards([
                { img: 'images/meeting_buffet.jpg', title: 'Meeting Meals', desc: 'Minimum 15 guests, 7 days advance booking.', btnText: 'View Details', link: 'meeting-meals.html' }
            ]);
            return null;
        }

        if (/coffee|break/.test(q) || raw === 'Coffee Break' || raw === 'คอฟฟี่เบรค') {
            addMessage('Here are the details for our <strong>Coffee Break</strong> sets:', 'bot');
            addCards([
                { img: 'images/coffee_break.jpg', title: 'Coffee Break', desc: 'Minimum 15 guests, 7 days advance booking.', btnText: 'View Details', link: 'coffee-break.html' }
            ]);
            return null;
        }
        
        if (/signature|box|lunch|crispy pork|mango/.test(q) || raw === 'Signature Box' || raw === 'ซิกเนเจอร์บ็อกซ์') {
            addMessage('<strong>Signature Box</strong> 🍱 No minimum order, 2 days advance booking:', 'bot');
            addCards([
                { img: 'images/crispy_pork_box.jpg', title: 'Crispy Pork Belly', desc: 'Seafood & Sweet Sauce. S(300g): £14 | M(400g): £20 | L(500g): £25', btnText: 'View Details', link: 'lunch-box.html' },
                { img: 'images/mango_sticky_rice_box.jpg', title: 'Mango Sticky Rice', desc: 'Minimum 2 boxes. £8 per Box', btnText: 'View Details', link: 'lunch-box.html' }
            ]);
            return null;
        }

        if (/catering|package|party|event/.test(q) || raw === 'Catering Packages' || raw === 'แพ็กเกจจัดเลี้ยง') {
            addMessage('We offer 3 event catering packages based on your guest count:', 'bot');
            addCards([
                { img: 'images/Special Box Set Premium.jpg', title: 'Package 1: SIAM CLASSIC', desc: 'For 7-8 guests, £500', link: 'catering.html#packages-section', btnText: 'View Package 1' },
                { img: 'images/the-signature.jpg', title: 'Package 2: SIGNATURE', desc: 'For 9-12 guests, £900', link: 'catering.html#packages-section', btnText: 'View Package 2' },
                { img: 'images/party_platter.jpg', title: 'Package 3: CELEBRATION', desc: 'For 13-15 guests, £1,050', link: 'catering.html#packages-section', btnText: 'View Package 3' }
            ]);
            return null;
        }

        if (/package\s*1|siam classic/.test(q) || raw === 'View Package 1') return '<strong>SIAM CLASSIC (Package 1)</strong><br>  For 7-8 guests<br>  £500<br>  Includes: 2 Starters, 2 Mains, 2 Rice/Noodles, 1 Veg<br><br><a class="zs-link" href="catering.html#packages-section">Book Now</a>';
        if (/package\s*2|signature/.test(q) || raw === 'View Package 2') return '<strong>SIGNATURE (Package 2)</strong><br>  For 9-12 guests<br>  £900<br>  Includes: 3 Starters, 3 Mains, 2 Rice/Noodles, 2 Veg, 1 Dessert<br><br><a class="zs-link" href="catering.html#packages-section">Book Now</a>';
        if (/package\s*3|celebration/.test(q) || raw === 'View Package 3') return '<strong>CELEBRATION (Package 3)</strong><br>  For 13-15 guests<br>  £1,050<br>  Includes: 4 Starters, 3 Mains, 3 Rice/Noodles, 2 Veg, 1 Dessert<br><br><a class="zs-link" href="catering.html#packages-section">Book Now</a>';
        if (/price|cost|how much/.test(q)) return 'Prices:<br>• Catering Packages: £500 - £1,050+<br>• Signature Box: £14 - £25 (Crispy Pork Belly)<br>For exact quotes, please contact us directly.';
        if (/contact|admin|email/.test(q) || raw === 'Contact Us' || raw === 'ติดต่อเรา') return `You can reach our team at:<br>Email: <a class="zs-link" href="mailto:${C.contactEmail}">${C.contactEmail}</a><br>Or fill out the form on our Contact page.`;
        if (/hello|hi|hey|greetings/.test(q)) return 'Hello! 😊 How can we help make your dining experience special today? Feel free to ask a question or select from the options below.';
        
        return `I'm sorry, I didn't quite catch that. Please select an option from the menu below, or type "Signature Box", "Meeting Meals", "Coffee Break", or "Catering".<br><br><a class="zs-link" href="mailto:${C.contactEmail}">Contact Support</a>`;
    }

    async function send(t) {
        if (!t.trim()) return;
        addMessage(esc(t), 'user');
        
        const typing = addMessage('<span class="zs-typing">Typing...</span>', 'bot');
        
        // Fake latency for realistic feel
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        
        typing.remove();
        const response = localLogic(t);
        if (response !== null) {
            addMessage(response, 'bot');
        }
    }

    // Events
    root.querySelector('.zs-launch').onclick = () => {
        p.classList.toggle('open');
        if (p.classList.contains('open')) i.focus();
    };
    root.querySelector('.zs-close').onclick = () => p.classList.remove('open');
    root.querySelector('.zs-form').onsubmit = e => {
        e.preventDefault();
        const t = i.value;
        i.value = '';
        send(t);
    };
    root.querySelectorAll('.zs-chip').forEach(b => {
        b.onclick = () => send(b.textContent);
    });

    // Init welcome message
    setTimeout(() => {
        addMessage(C.welcomeMessage, 'bot');
    }, 500);

})();
