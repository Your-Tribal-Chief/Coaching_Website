// // const carouselContainer = document.querySelector('.carousel-container');
// // const images = carouselContainer.querySelectorAll('img');
// // const prevBtn = document.getElementById('prev');
// // const nextBtn = document.getElementById('next');

// // let currentIndex = 0;

// // function showImage(index) {
// //     const width = images[0].clientWidth;
// //     carouselContainer.style.transform = `translateX(-${index * width}px)`;
// // }

// // prevBtn.addEventListener('click', () => {
// //     currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
// //     showImage(currentIndex);
// // });

// // nextBtn.addEventListener('click', () => {
// //     currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
// //     showImage(currentIndex);
// // });

// // // Initialize
// // showImage(currentIndex);

// let currentSlide = 0;

// function moveSlide(direction) {
//     const carouselInner = document.querySelector('.carousel-inner');
//     const totalSlides = carouselInner.children.length;

//     currentSlide += direction;

//     if (currentSlide < 0) {
//         currentSlide = totalSlides - 1;
//     } else if (currentSlide >= totalSlides) {
//         currentSlide = 0;
//     }

//     const offset = -currentSlide * 100;
//     carouselInner.style.transform = `translateX(${offset}%)`;
// }





// let currentSlide = 0;

// // Function to update carousel position
// function updateCarousel() {
//     const carouselInner = document.querySelector('.carousel-inner');
//     const totalSlides = document.querySelectorAll('.carousel-item').length;

//     // Move to the calculated position
//     const offset = -currentSlide * 100;
//     carouselInner.style.transform = `translateX(${offset}%)`;

//     // Wrap around logic
//     if (currentSlide >= totalSlides) {
//         currentSlide = 0;
//     } else if (currentSlide < 0) {
//         currentSlide = totalSlides - 1;
//     }
// }

// // Function to handle manual navigation
// function moveSlide(direction) {
//     const totalSlides = document.querySelectorAll('.carousel-item').length;

//     currentSlide += direction;

//     if (currentSlide >= totalSlides) {
//         currentSlide = 0;
//     } else if (currentSlide < 0) {
//         currentSlide = totalSlides - 1;
//     }

//     updateCarousel();
// }

// // Auto-slide functionality
// setInterval(() => {
//     currentSlide++;
//     updateCarousel();
// }, 2000);

// // Initial setup
// updateCarousel();
// // Live Clock
// function updateClock() {
//     const clock = document.getElementById('clock');
//     const now = new Date();

//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     const date = now.toLocaleDateString();

//     clock.textContent = `${date} | ${hours}:${minutes}:${seconds}`;
// }

// setInterval(updateClock, 1000);
// updateClock();





// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize particles
    initParticles();
    
    // Initialize carousel
    initCarousel();
    
    // Initialize AI features
    initAIFeatures();
    
    // Initialize animations
    initAnimations();
    
    // Initialize responsive features
    initResponsive();
    
    // Initialize clock
    initClock();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize form handling
    initFormHandling();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
}

// Particle System
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: ['#00d4aa', '#00a8ff', '#ff6b6b', '#ffa500']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.3,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d4aa',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Enhanced Carousel
let currentSlide = 0;
let carouselTimer;
const carouselAutoSlideInterval = 5000;

function initCarousel() {
    const carouselInner = document.getElementById('carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    if (!carouselInner || carouselItems.length === 0) return;
    
    // Create indicators
    carouselItems.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    // Start auto-slide
    startCarouselAutoSlide();
    
    // Pause on hover
    carouselInner.addEventListener('mouseenter', stopCarouselAutoSlide);
    carouselInner.addEventListener('mouseleave', startCarouselAutoSlide);
}

function updateCarousel() {
    const carouselInner = document.getElementById('carousel-inner');
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselInner) return;
    
    // Wrap around logic
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Move carousel
    const offset = -currentSlide * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Update active carousel item
    document.querySelectorAll('.carousel-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    currentSlide += direction;
    updateCarousel();
    restartCarouselAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    restartCarouselAutoSlide();
}

function startCarouselAutoSlide() {
    carouselTimer = setInterval(() => {
        currentSlide++;
        updateCarousel();
    }, carouselAutoSlideInterval);
}

function stopCarouselAutoSlide() {
    if (carouselTimer) {
        clearInterval(carouselTimer);
    }
}

function restartCarouselAutoSlide() {
    stopCarouselAutoSlide();
    startCarouselAutoSlide();
}

// AI Chat Assistant
function initAIFeatures() {
    const chatToggle = document.getElementById('ai-chat-toggle');
    const chatContainer = document.getElementById('ai-chat-container');
    const closeChat = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatContainer.style.display = 'none';
        });
    }
    
    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendAIMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
}

function sendAIMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'ai-message user-message';
    userMessage.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="ai-avatar">👤</div>
    `;
    chatMessages.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = getAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message';
        aiMessage.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="message-content">${aiResponse}</div>
        `;
        chatMessages.appendChild(aiMessage);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(message) {
    const responses = {
        'hello': 'Hello! How can I help you with your studies today?',
        'courses': 'We offer AI-enhanced courses in Science, Mathematics, and English. Each course includes personalized learning paths and AI tutoring.',
        'science': 'Our Science courses cover Physics, Chemistry, and Biology with virtual labs and 3D molecular models powered by AI.',
        'math': 'Our Mathematics program uses AI to provide step-by-step solutions and adaptive practice problems tailored to your skill level.',
        'english': 'Our English courses feature AI-powered speech recognition, grammar checking, and pronunciation training.',
        'games': 'We have educational games like Chain Reaction and Tic Tac Toe that help develop strategic thinking skills.',
        'help': 'I can help you with information about our courses, study tips, or answer questions about our AI-powered learning platform.',
        'admission': 'To enroll, please fill out the contact form or visit our center. We offer flexible scheduling and personalized learning plans.',
        'default': 'I understand you\'re asking about education. Could you be more specific? I can help with courses, study tips, or general information about our AI-powered learning platform.'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}

// Live Clock
function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    
    const now = new Date();
    const options = {
        timeZone: 'Asia/Dhaka',
        hour12: true,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const timeString = now.toLocaleString('en-US', options);
    clock.textContent = timeString;
}

// Smooth Scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, ${type === 'success' ? '#00d4aa' : '#00a8ff'}, ${type === 'success' ? '#00a8ff' : '#667eea'});
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-up');
    });
}

// Responsive Features
function initResponsive() {
    // Handle mobile menu
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 1001;
    `;
    
    const header = document.querySelector('.futuristic-header');
    const nav = document.querySelector('.rainbow-nav');
    
    if (header && nav) {
        header.appendChild(navToggle);
        
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });
    }
    
    // Handle responsive layout changes
    const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        
        if (navToggle) {
            navToggle.style.display = isMobile ? 'block' : 'none';
        }
        
        if (nav) {
            if (!isMobile) {
                nav.classList.remove('mobile-open');
            }
        }
        
        // Adjust carousel for mobile
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.style.margin = isMobile ? '20px 10px' : '20px auto';
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

// Game Functions
function openChainReaction() {
    const gameModal = document.getElementById('game-modal');
    const gameContainer = document.getElementById('game-container');
    
    if (gameModal && gameContainer) {
        gameModal.style.display = 'flex';
        
        // Load Chain Reaction game
        gameContainer.innerHTML = `
            <div id="chain-reaction-game">
                <div class="game-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading Chain Reaction Game...</p>
                </div>
            </div>
        `;
        
        // Initialize Chain Reaction game
        setTimeout(() => {
            if (typeof initChainReactionGame === 'function') {
                initChainReactionGame();
            } else {
                gameContainer.innerHTML = `
                    <div style="text-align: center; color: white;">
                        <h3>Chain Reaction Game</h3>
                        <p>Game will be available soon!</p>
                        <div style="width: 400px; height: 300px; background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 10px; margin: 20px auto; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-gamepad" style="font-size: 48px; color: #00d4aa;"></i>
                        </div>
                    </div>
                `;
            }
        }, 1000);
    }
}

function openTicTacToe() {
    const gameModal = document.getElementById('game-modal');
    const gameContainer = document.getElementById('game-container');
    
    if (gameModal && gameContainer) {
        gameModal.style.display = 'flex';
        gameContainer.innerHTML = `
            <div id="tic-tac-toe-game">
                <div style="text-align: center; color: white;">
                    <h3>Tic Tac Toe</h3>
                    <p>Play against AI!</p>
                    <div id="tic-tac-toe-board" style="display: grid; grid-template-columns: repeat(3, 100px); grid-gap: 5px; margin: 20px auto; width: fit-content;">
                        ${Array(9).fill().map((_, i) => `
                            <div class="tic-tac-toe-cell" onclick="makeTicTacToeMove(${i})" style="
                                width: 100px;
                                height: 100px;
                                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                                border: 2px solid rgba(0, 212, 170, 0.3);
                                border-radius: 10px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 36px;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background='linear-gradient(135deg, rgba(0, 212, 170, 0.2), rgba(0, 168, 255, 0.2))'" onmouseout="this.style.background='linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'">
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 20px;">
                        <button onclick="resetTicTacToe()" style="
                            background: linear-gradient(135deg, #00d4aa, #00a8ff);
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: bold;
                        ">Reset Game</button>
                    </div>
                    <div id="tic-tac-toe-status" style="margin-top: 15px; font-size: 18px; color: #00d4aa;">Your turn (X)</div>
                </div>
            </div>
        `;
        
        // Initialize Tic Tac Toe game state
        window.ticTacToeBoard = Array(9).fill('');
        window.currentPlayer = 'X';
        window.gameActive = true;
    }
}

function closeGame() {
    const gameModal = document.getElementById('game-modal');
    if (gameModal) {
        gameModal.style.display = 'none';
    }
}

// Tic Tac Toe Game Logic
function makeTicTacToeMove(index) {
    if (!window.gameActive || window.ticTacToeBoard[index] !== '' || window.currentPlayer !== 'X') {
        return;
    }
    
    // Player move
    window.ticTacToeBoard[index] = 'X';
    updateTicTacToeBoard();
    
    if (checkTicTacToeWinner()) {
        return;
    }
    
    // AI move
    window.currentPlayer = 'O';
    document.getElementById('tic-tac-toe-status').textContent = 'AI thinking...';
    
    setTimeout(() => {
        const aiMove = getBestTicTacToeMove();
        if (aiMove !== -1) {
            window.ticTacToeBoard[aiMove] = 'O';
            updateTicTacToeBoard();
            
            if (checkTicTacToeWinner()) {
                return;
            }
        }
        
        window.currentPlayer = 'X';
        document.getElementById('tic-tac-toe-status').textContent = 'Your turn (X)';
    }, 500);
}

function updateTicTacToeBoard() {
    const cells = document.querySelectorAll('.tic-tac-toe-cell');
    cells.forEach((cell, index) => {
        cell.textContent = window.ticTacToeBoard[index];
        cell.style.color = window.ticTacToeBoard[index] === 'X' ? '#ff6b6b' : '#00d4aa';
    });
}

function checkTicTacToeWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (window.ticTacToeBoard[a] && 
            window.ticTacToeBoard[a] === window.ticTacToeBoard[b] && 
            window.ticTacToeBoard[a] === window.ticTacToeBoard[c]) {
            
            window.gameActive = false;
            const winner = window.ticTacToeBoard[a] === 'X' ? 'You win!' : 'AI wins!';
            document.getElementById('tic-tac-toe-status').textContent = winner;
            return true;
        }
    }
    
    if (!window.ticTacToeBoard.includes('')) {
        window.gameActive = false;
        document.getElementById('tic-tac-toe-status').textContent = "It's a draw!";
        return true;
    }
    
    return false;
}

function getBestTicTacToeMove() {
    // Simple AI: Try to win, then block, then take center, then corner, then edge
    const board = window.ticTacToeBoard;
    
    // Try to win
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWinningMove(board, 'O')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Try to block
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWinningMove(board, 'X')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Take center
    if (board[4] === '') return 4;
    
    // Take corners
    const corners = [0, 2, 6, 8];
    for (const corner of corners) {
        if (board[corner] === '') return corner;
    }
    
    // Take edges
    const edges = [1, 3, 5, 7];
    for (const edge of edges) {
        if (board[edge] === '') return edge;
    }
    
    return -1;
}

function checkWinningMove(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] === player && board[b] === player && board[c] === player;
    });
}

function resetTicTacToe() {
    window.ticTacToeBoard = Array(9).fill('');
    window.currentPlayer = 'X';
    window.gameActive = true;
    updateTicTacToeBoard();
    document.getElementById('tic-tac-toe-status').textContent = 'Your turn (X)';
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .rainbow-nav.mobile-open {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
        backdrop-filter: blur(20px);
        z-index: 1000;
        display: flex !important;
        align-items: center;
        justify-content: center;
    }
    
    .rainbow-nav.mobile-open ul {
        flex-direction: column;
        gap: 30px;
    }
    
    .game-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 200px;
        color: #00d4aa;
    }
    
    .game-loading i {
        font-size: 48px;
        margin-bottom: 20px;
    }
`;
document.head.appendChild(style);

// Performance monitoring
let performanceMetrics = {
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0
};

window.addEventListener('load', () => {
    performanceMetrics.loadTime = performance.now();
    console.log('Website loaded in:', performanceMetrics.loadTime + 'ms');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Expose global functions
window.moveSlide = moveSlide;
window.openChainReaction = openChainReaction;
window.openTicTacToe = openTicTacToe;
window.closeGame = closeGame;
window.makeTicTacToeMove = makeTicTacToeMove;
window.resetTicTacToe = resetTicTacToe;
