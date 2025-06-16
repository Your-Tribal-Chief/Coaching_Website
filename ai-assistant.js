// Advanced AI Assistant with Natural Language Processing

class AIAssistant {
    constructor() {
        this.name = 'EduBot';
        this.personality = 'helpful';
        this.context = [];
        this.responses = this.initializeResponses();
        this.isTyping = false;
        this.init();
    }
    
    init() {
        console.log(`${this.name} AI Assistant initialized`);
    }
    
    initializeResponses() {
        return {
            // Greeting responses
            greetings: [
                "Hello! I'm EduBot, your AI study assistant. How can I help you today?",
                "Hi there! Ready to learn something new? I'm here to help!",
                "Greetings! I'm your AI tutor. What would you like to explore today?",
                "Welcome! I'm here to assist you with your educational journey. What can I help you with?"
            ],
            
            // Course-related responses
            courses: {
                science: {
                    physics: "Our Physics course covers mechanics, thermodynamics, electromagnetism, and quantum physics. We use AI-powered simulations to help visualize complex concepts like wave functions and electromagnetic fields.",
                    chemistry: "Chemistry becomes exciting with our virtual labs! Learn molecular structures, chemical reactions, and organic chemistry through 3D molecular modeling and AI-guided experiments.",
                    biology: "Explore the wonders of life through our Biology course. From cellular processes to ecosystem dynamics, our AI helps you understand complex biological systems through interactive models."
                },
                mathematics: {
                    algebra: "Master algebra with step-by-step AI guidance. Our system adapts to your learning pace and provides personalized practice problems.",
                    calculus: "Calculus made simple! Our AI breaks down complex derivatives and integrals into manageable steps with visual representations.",
                    geometry: "Visualize geometric concepts with our 3D modeling system. Learn about shapes, angles, and spatial relationships through interactive AI tutoring.",
                    statistics: "Understand data analysis and probability through real-world examples. Our AI helps you interpret statistical results and create meaningful visualizations."
                },
                english: {
                    grammar: "Improve your grammar with AI-powered analysis. Get instant feedback on sentence structure, punctuation, and style.",
                    vocabulary: "Expand your vocabulary with personalized word lists and context-based learning powered by AI.",
                    writing: "Enhance your writing skills with AI feedback on clarity, coherence, and style. Perfect for essays, reports, and creative writing.",
                    speaking: "Practice pronunciation and fluency with our AI speech recognition system. Get real-time feedback on your speaking skills."
                }
            },
            
            // Study tips
            studyTips: [
                "Try the Pomodoro Technique: Study for 25 minutes, then take a 5-minute break. This helps maintain focus and retention.",
                "Create mind maps to visualize connections between concepts. Our AI can help you identify key relationships in your study material.",
                "Practice active recall by testing yourself without looking at notes. This strengthens memory more than passive reading.",
                "Use spaced repetition to review material at increasing intervals. Our AI can create a personalized review schedule for you.",
                "Teach concepts to others (or explain them aloud). This reveals gaps in your understanding.",
                "Connect new information to what you already know. Building these bridges helps with long-term retention.",
                "Use multiple senses: read aloud, draw diagrams, or create physical models when possible."
            ],
            
            // Motivational responses
            motivation: [
                "Remember, every expert was once a beginner. Keep practicing and you'll see improvement!",
                "Learning is a journey, not a destination. Celebrate small victories along the way!",
                "Challenges are opportunities to grow. Embrace them with curiosity!",
                "Your brain is like a muscle - the more you use it, the stronger it gets!",
                "Persistence is key. Even if you don't understand something today, keep trying. Tomorrow it might click!",
                "Everyone learns at their own pace. Focus on your progress, not comparing yourself to others."
            ],
            
            // AI capabilities
            aiFeatures: [
                "I can provide personalized study plans based on your learning style and goals.",
                "I offer real-time feedback on your work and suggest improvements.",
                "I can create practice problems tailored to your skill level.",
                "I adapt my teaching methods based on how you learn best.",
                "I can help you visualize complex concepts through interactive demonstrations.",
                "I track your progress and identify areas that need more attention."
            ],
            
            // Games and fun learning
            games: {
                chainReaction: "Chain Reaction is a strategic game that develops logical thinking and planning skills. It's great for understanding cause-and-effect relationships and strategic planning.",
                ticTacToe: "Tic Tac Toe might seem simple, but it teaches important concepts like game theory, pattern recognition, and strategic thinking.",
                benefits: "Educational games make learning fun and engaging. They help develop problem-solving skills, critical thinking, and strategic planning while keeping you motivated to learn."
            },
            
            // Default and fallback responses
            defaults: [
                "That's an interesting question! Could you provide more specific details so I can give you a better answer?",
                "I'd love to help you with that. Can you tell me more about what you're looking for?",
                "Let me think about that... Could you rephrase your question or provide more context?",
                "I'm here to help with your educational needs. What specific topic would you like to explore?",
                "That's a great question! I can help you with courses, study tips, or specific subject questions. What interests you most?"
            ]
        };
    }
    
    async processMessage(message) {
        // Add to context
        this.context.push({ role: 'user', content: message });
        
        // Analyze message intent
        const intent = this.analyzeIntent(message);
        
        // Generate response
        const response = await this.generateResponse(intent, message);
        
        // Add to context
        this.context.push({ role: 'assistant', content: response });
        
        // Keep context manageable
        if (this.context.length > 20) {
            this.context = this.context.slice(-20);
        }
        
        return response;
    }
    
    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting detection
        if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'])) {
            return { type: 'greeting', confidence: 0.9 };
        }
        
        // Course inquiries
        if (this.containsAny(lowerMessage, ['course', 'subject', 'class', 'learn', 'study', 'teach'])) {
            const subject = this.detectSubject(lowerMessage);
            return { type: 'course', subject: subject, confidence: 0.8 };
        }
        
        // Study help
        if (this.containsAny(lowerMessage, ['help', 'stuck', 'difficult', 'hard', 'confused', 'don\'t understand'])) {
            return { type: 'help', confidence: 0.8 };
        }
        
        // Study tips
        if (this.containsAny(lowerMessage, ['tip', 'advice', 'how to study', 'study method', 'improve'])) {
            return { type: 'study_tips', confidence: 0.8 };
        }
        
        // Motivation
        if (this.containsAny(lowerMessage, ['motivation', 'encourage', 'give up', 'frustrated', 'difficult', 'inspire'])) {
            return { type: 'motivation', confidence: 0.8 };
        }
        
        // Games
        if (this.containsAny(lowerMessage, ['game', 'play', 'fun', 'chain reaction', 'tic tac toe'])) {
            return { type: 'games', confidence: 0.8 };
        }
        
        // AI capabilities
        if (this.containsAny(lowerMessage, ['what can you do', 'capabilities', 'features', 'how do you work'])) {
            return { type: 'ai_features', confidence: 0.8 };
        }
        
        // Default
        return { type: 'default', confidence: 0.5 };
    }
    
    detectSubject(message) {
        if (this.containsAny(message, ['physics', 'mechanics', 'quantum', 'electromagnetic'])) return 'physics';
        if (this.containsAny(message, ['chemistry', 'chemical', 'molecule', 'reaction', 'organic'])) return 'chemistry';
        if (this.containsAny(message, ['biology', 'biological', 'cell', 'ecosystem', 'organism'])) return 'biology';
        if (this.containsAny(message, ['math', 'mathematics', 'algebra', 'calculus', 'geometry', 'statistics'])) return 'mathematics';
        if (this.containsAny(message, ['english', 'grammar', 'vocabulary', 'writing', 'speaking'])) return 'english';
        if (this.containsAny(message, ['science'])) return 'science';
        return null;
    }
    
    async generateResponse(intent, message) {
        switch (intent.type) {
            case 'greeting':
                return this.getRandomResponse(this.responses.greetings);
                
            case 'course':
                return this.generateCourseResponse(intent.subject, message);
                
            case 'help':
                return this.generateHelpResponse(message);
                
            case 'study_tips':
                return this.getRandomResponse(this.responses.studyTips);
                
            case 'motivation':
                return this.getRandomResponse(this.responses.motivation);
                
            case 'games':
                return this.generateGameResponse(message);
                
            case 'ai_features':
                return this.getRandomResponse(this.responses.aiFeatures);
                
            default:
                return this.getRandomResponse(this.responses.defaults);
        }
    }
    
    generateCourseResponse(subject, message) {
        if (!subject) {
            return "We offer AI-enhanced courses in Science (Physics, Chemistry, Biology), Mathematics (Algebra, Calculus, Geometry, Statistics), and English (Grammar, Vocabulary, Writing, Speaking). Each course includes personalized learning paths, interactive demonstrations, and real-time AI feedback. Which subject interests you most?";
        }
        
        const courseInfo = this.responses.courses[subject];
        if (courseInfo) {
            if (typeof courseInfo === 'string') {
                return courseInfo;
            } else {
                // Multiple subcategories
                const subcategories = Object.keys(courseInfo);
                return `Our ${subject.charAt(0).toUpperCase() + subject.slice(1)} courses include: ${subcategories.join(', ')}. ${courseInfo[subcategories[0]]} Would you like to know more about any specific area?`;
            }
        }
        
        return `I'd love to help you with ${subject}! Could you be more specific about what aspect you'd like to learn about?`;
    }
    
    generateHelpResponse(message) {
        const helpResponses = [
            "I'm here to help! What specific topic or concept are you struggling with? I can break it down into simpler steps.",
            "Don't worry, everyone gets stuck sometimes! Can you tell me what subject you're working on and where exactly you're facing difficulties?",
            "Let's work through this together! What's the specific problem or concept you're finding challenging?",
            "I can definitely help you understand this better. What subject are you studying, and what part is confusing you?"
        ];
        
        return this.getRandomResponse(helpResponses);
    }
    
    generateGameResponse(message) {
        if (message.toLowerCase().includes('chain reaction')) {
            return this.responses.games.chainReaction;
        } else if (message.toLowerCase().includes('tic tac toe')) {
            return this.responses.games.ticTacToe;
        } else {
            return this.responses.games.benefits + " Would you like to try Chain Reaction or Tic Tac Toe?";
        }
    }
    
    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Simulate typing delay for more natural interaction
    async simulateTyping(text) {
        const typingDelay = Math.min(text.length * 20, 2000); // Max 2 seconds
        await new Promise(resolve => setTimeout(resolve, typingDelay));
        return text;
    }
    
    // Get conversation history
    getContext() {
        return this.context;
    }
    
    // Clear conversation history
    clearContext() {
        this.context = [];
    }
    
    // Add custom response pattern
    addCustomResponse(pattern, response) {
        if (!this.responses.custom) {
            this.responses.custom = {};
        }
        this.responses.custom[pattern] = response;
    }
    
    // Get AI statistics
    getStats() {
        return {
            conversationLength: this.context.length,
            messagesProcessed: this.context.filter(msg => msg.role === 'user').length,
            responsesGenerated: this.context.filter(msg => msg.role === 'assistant').length
        };
    }
}

// Enhanced Chat Interface
class ChatInterface {
    constructor(containerId, aiAssistant) {
        this.container = document.getElementById(containerId);
        this.ai = aiAssistant;
        this.isOpen = false;
        this.messageHistory = [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.addWelcomeMessage();
    }
    
    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-message');
        const chatToggle = document.getElementById('ai-chat-toggle');
        const closeButton = document.getElementById('close-chat');
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeChat());
        }
    }
    
    addWelcomeMessage() {
        const welcomeMessage = "Hello! I'm EduBot, your AI study assistant. I can help you with:\n\n• Course information and study materials\n• Study tips and learning strategies\n• Subject-specific questions\n• Educational games and activities\n• Motivation and learning support\n\nWhat would you like to explore today?";
        
        setTimeout(() => {
            this.addMessage(welcomeMessage, 'ai');
        }, 1000);
    }
    
    async sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response
            const response = await this.ai.processMessage(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response to chat
            await this.addMessage(response, 'ai');
            
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        }
    }
    
    addMessage(content, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender === 'user' ? 'user-message' : ''}`;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div class="ai-avatar">🤖</div>
                <div class="message-content">${this.formatMessage(content)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${this.formatMessage(content)}</div>
                <div class="ai-avatar">👤</div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Animate message appearance
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Store in history
        this.messageHistory.push({ content, sender, timestamp: Date.now() });
    }
    
    formatMessage(content) {
        // Convert line breaks to <br>
        content = content.replace(/\n/g, '<br>');
        
        // Format bullet points
        content = content.replace(/•/g, '&bull;');
        
        // Format bold text (basic markdown-style)
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        return content;
    }
    
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    toggleChat() {
        const chatContainer = document.getElementById('ai-chat-container');
        if (!chatContainer) return;
        
        this.isOpen = !this.isOpen;
        chatContainer.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            // Focus on input when opening
            setTimeout(() => {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) chatInput.focus();
            }, 100);
        }
    }
    
    closeChat() {
        const chatContainer = document.getElementById('ai-chat-container');
        if (chatContainer) {
            chatContainer.style.display = 'none';
            this.isOpen = false;
        }
    }
    
    clearChat() {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            this.messageHistory = [];
            this.ai.clearContext();
            this.addWelcomeMessage();
        }
    }
}

// Initialize AI Assistant when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create AI Assistant instance
    window.aiAssistant = new AIAssistant();
    
    // Create Chat Interface
    window.chatInterface = new ChatInterface('ai-chat-container', window.aiAssistant);
    
    // Add typing animation CSS
    const typingCSS = `
        .typing-dots {
            display: flex;
            gap: 4px;
            padding: 8px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #00d4aa;
            animation: typingDots 1.4s infinite;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typingDots {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.4;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = typingCSS;
    document.head.appendChild(style);
    
    console.log('AI Assistant initialized successfully!');
});

// Export for global access
window.AIAssistant = AIAssistant;
window.ChatInterface = ChatInterface;
