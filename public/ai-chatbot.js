// AI Chatbot UI Injector
document.addEventListener('DOMContentLoaded', () => {
    // Inject HTML structure
    const chatContainer = document.createElement('div');
    chatContainer.className = 'ai-chatbot-widget';
    chatContainer.innerHTML = `
        <div class="ai-chatbot-btn" id="ai-chat-toggle" title="Chat with Admin Ravity">
            <img src="images/admin_ravity.png" alt="Chat" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
        </div>
        <div class="ai-chat-window" id="ai-chat-window">
            <div class="ai-chat-header">
                <span style="display: flex; align-items: center; gap: 10px;">
                    <img src="images/admin_ravity.png" alt="Admin" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold);"> 
                    Admin Ravity
                </span>
                <i class="fas fa-times ai-chat-close" id="ai-chat-close"></i>
            </div>
            <div class="ai-chat-messages" id="ai-chat-messages">
                <div class="chat-msg ai">สวัสดีค่ะ! ยินดีต้อนรับสู่ Khrua Thai London Admin Ravity ยินดีให้บริการค่ะ / Hello! Welcome to Khrua Thai London. Admin Ravity is here to help!</div>
            </div>
            <div class="typing-indicator" id="ai-typing">กำลังพิมพ์... / Typing...</div>
            <div class="ai-chat-input-area">
                <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="พิมพ์ข้อความ... / Type a message...">
                <button class="ai-chat-send" id="ai-chat-send"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // Elements
    const toggleBtn = document.getElementById('ai-chat-toggle');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeBtn = document.getElementById('ai-chat-close');
    const inputField = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const messagesBox = document.getElementById('ai-chat-messages');
    const typingIndicator = document.getElementById('ai-typing');

    // Toggle Chat
    toggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            inputField.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Send Message
    const sendMessage = async () => {
        const text = inputField.value.trim();
        if (!text) return;

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user';
        userMsg.textContent = text;
        messagesBox.appendChild(userMsg);
        
        inputField.value = '';
        messagesBox.scrollTop = messagesBox.scrollHeight;
        
        // Show typing indicator
        typingIndicator.style.display = 'block';

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await response.json();
            
            typingIndicator.style.display = 'none';

            // Add AI response
            const aiMsg = document.createElement('div');
            aiMsg.className = 'chat-msg ai';
            aiMsg.textContent = data.reply || 'ขออภัยค่ะ เกิดข้อผิดพลาดในการเชื่อมต่อ / Sorry, connection error.';
            messagesBox.appendChild(aiMsg);
            messagesBox.scrollTop = messagesBox.scrollHeight;

        } catch (error) {
            console.error('Chat Error:', error);
            typingIndicator.style.display = 'none';
            const aiMsg = document.createElement('div');
            aiMsg.className = 'chat-msg ai';
            aiMsg.textContent = 'ขออภัยค่ะ ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ / Cannot connect to server.';
            messagesBox.appendChild(aiMsg);
            messagesBox.scrollTop = messagesBox.scrollHeight;
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
