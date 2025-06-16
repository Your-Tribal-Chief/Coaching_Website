// // Mobile Optimization and Touch Support

// class MobileOptimizer {
//     constructor() {
//         this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//         this.isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
//         this.touchDevice = 'ontouchstart' in window;
//         this.init();
//     }
    
//     init() {
//         if (this.isMobile || this.touchDevice) {
//             this.optimizeForMobile();
//             this.setupTouchEvents();
//             this.setupSwipeGestures();
//             this.optimizeFormInputs();
//             this.setupViewportOptimization();
//         }
        
//         this.setupResponsiveImages();
//         this.setupOrientationHandling();
//     }
    
//     optimizeForMobile() {
//         // Add mobile-specific classes
//         document.body.classList.add('mobile-optimized');
        
//         // Prevent zoom on input focus
//         const inputs = document.querySelectorAll('input, textarea, select');
//         inputs.forEach(input => {
//             input.addEventListener('focus', () => {
//                 if (this.isMobile) {
//                     const viewport = document.querySelector('meta[name=viewport]');
//                     if (viewport) {
//                         viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
//                     }
//                 }
//             });
            
//             input.addEventListener('blur', () => {
//                 if (this.isMobile) {
//                     const viewport = document.querySelector('meta[name=viewport]');
//                     if (viewport) {
//                         viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=yes');
//                     }
//                 }
//             });
//         });
        
//         // Optimize touch targets
//         this.optimizeTouchTargets();
//     }
    
//     optimizeTouchTargets() {
//         const buttons = document.querySelectorAll('button, .btn, .nav-link, .game-card');
//         buttons.forEach(button => {
//             const rect = button.getBoundingClientRect();
//             if (rect.height < 44 || rect.width < 44) {
//                 button.style.minHeight = '44px';
//                 button.style.minWidth = '44px';
//                 button.style.display = 'flex';
//                 button.style.alignItems = 'center';
//                 button.style.justifyContent = 'center';
//             }
//         });
//     }
    
//     setupTouchEvents() {
//         // Enhanced touch feedback
//         const touchElements = document.querySelectorAll('button, .btn, .nav-link, .course-card, .game-card');
        
//         touchElements.forEach(element => {
//             element.addEventListener('touchstart', (e) => {
//                 element.classList.add('touch-active');
                
//                 // Haptic feedback if available
//                 if (navigator.vibrate) {
//                     navigator.vibrate(10);
//                 }
//             });
            
//             element.addEventListener('touchend', (e) => {
//                 setTimeout(() => {
//                     element.classList.remove('touch-active');
//                 }, 150);
//             });
            
//             element.addEventListener('touchcancel', (e) => {
//                 element.classList.remove('touch-active');
//             });
//         });
//     }
    
//     setupSwipeGestures() {
//         // Swipe gestures for carousel
//         const carousel = document.querySelector('.carousel');
//         if (carousel) {
//             let startX = 0;
//             let startY = 0;
//             let distX = 0;
//             let distY = 0;
//             let threshold = 100;
//             let restraint = 100;
            
//             carousel.addEventListener('touchstart', (e) => {
//                 const touch = e.changedTouches[0];
//                 startX = touch.pageX;
//                 startY = touch.pageY;
//             });
            
//             carousel.addEventListener('touchmove', (e) => {
//                 e.preventDefault(); // Prevent scrolling
//             });
            
//             carousel.addEventListener('touchend', (e) => {
//                 const touch = e.changedTouches[0];
//                 distX = touch.pageX - startX;
//                 distY = touch.pageY - startY;
                
//                 if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
//                     if (distX > 0) {
//                         // Swipe right - previous slide
//                         if (typeof moveSlide === 'function') {
//                             moveSlide(-1);
//                         }
//                     } else {
//                         // Swipe left - next slide
//                         if (typeof moveSlide === 'function') {
//                             moveSlide(1);
//                         }
//                     }
//                 }
//             });
//         }
        
//         // Swipe gestures for chat
//         this.setupChatSwipeGestures();
//     }
    
//     setupChatSwipeGestures() {
//         const chatContainer = document.getElementById('ai-chat-container');
//         if (chatContainer) {
//             let startY = 0;
//             let currentY = 0;
//             let isDragging = false;
            
//             chatContainer.addEventListener('touchstart', (e) => {
//                 startY = e.touches[0].clientY;
//                 isDragging = true;
//             });
            
//             chatContainer.addEventListener('touchmove', (e) => {
//                 if (!isDragging) return;
                
//                 currentY = e.touches[0].clientY;
//                 const deltaY = currentY - startY;
                
//                 // Only allow swipe down to close
//                 if (deltaY > 0) {
//                     chatContainer.style.transform = `translateY(${deltaY}px)`;
//                     chatContainer.style.opacity = 1 - (deltaY / 200);
//                 }
//             });
            
//             chatContainer.addEventListener('touchend', (e) => {
//                 if (!isDragging) return;
//                 isDragging = false;
                
//                 const deltaY = currentY - startY;
                
//                 if (deltaY > 100) {
//                     // Close chat
//                     if (typeof closeChat === 'function') {
//                         closeChat();
//                     }
//                 } else {
//                     // Snap back
//                     chatContainer.style.transform = '';
//                     chatContainer.style.opacity = '';
//                 }
//             });
//         }
//     }
    
//     optimizeFormInputs() {
//         const inputs = document.querySelectorAll('input, textarea');
        
//         inputs.forEach(input => {
//             // Add appropriate input types for mobile keyboards
//             if (input.name === 'email') {
//                 input.type = 'email';
//             } else if (input.name === 'phone') {
//                 input.type = 'tel';
//             } else if (input.name === 'website') {
//                 input.type = 'url';
//             }
            
//             // Add autocomplete attributes
//             if (input.name === 'name') {
//                 input.setAttribute('autocomplete', 'name');
//             } else if (input.name === 'email') {
//                 input.setAttribute('autocomplete', 'email');
//             }
            
//             // Optimize textarea for mobile
//             if (input.tagName === 'TEXTAREA') {
//                 input.style.resize = 'vertical';
//                 input.style.minHeight = '100px';
//             }
//         });
//     }
    
//     setupViewportOptimization() {
//         // Dynamic viewport height for mobile browsers
//         const setViewportHeight = () => {
//             const vh = window.innerHeight * 0.01;
//             document.documentElement.style.setProperty('--vh', `${vh}px`);
//         };
        
//         setViewportHeight();
//         window.addEventListener('resize', setViewportHeight);
//         window.addEventListener('orientationchange', () => {
//             setTimeout(setViewportHeight, 100);
//         });
//     }
    
//     setupResponsiveImages() {
//         // Lazy loading for images
//         const images = document.querySelectorAll('img');
        
//         if ('IntersectionObserver' in window) {
//             const imageObserver = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         const img = entry.target;
                        
//                         // Optimize image loading for mobile
//                         if (this.isMobile) {
//                             // Load smaller images on mobile
//                             const src = img.src;
//                             if (src.includes('?')) {
//                                 img.src = src + '&w=400';
//                             } else {
//                                 img.src = src + '?w=400';
//                             }
//                         }
                        
//                         imageObserver.unobserve(img);
//                     }
//                 });
//             });
            
//             images.forEach(img => imageObserver.observe(img));
//         }
//     }
    
//     setupOrientationHandling() {
//         const handleOrientationChange = () => {
//             const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
//             document.body.setAttribute('data-orientation', orientation);
            
//             // Adjust layout for orientation
//             if (orientation === 'landscape' && this.isMobile) {
//                 // Hide certain elements in landscape mode
//                 const clock = document.getElementById('clock');
//                 if (clock) {
//                     clock.style.display = 'none';
//                 }
//             } else {
//                 const clock = document.getElementById('clock');
//                 if (clock) {
//                     clock.style.display = 'block';
//                 }
//             }
            
//             // Trigger custom event
//             window.dispatchEvent(new CustomEvent('orientationChanged', {
//                 detail: { orientation }
//             }));
//         };
        
//         handleOrientationChange();
//         window.addEventListener('resize', handleOrientationChange);
//         window.addEventListener('orientationchange', () => {
//             setTimeout(handleOrientationChange, 100);
//         });
//     }
    
//     // Performance optimization for mobile
//     optimizePerformance() {
//         // Reduce particle count on mobile
//         if (this.isMobile && window.particlesJS) {
//             const particleConfig = {
//                 particles: {
//                     number: {
//                         value: 30, // Reduced from 100
//                         density: {
//                             enable: true,
//                             value_area: 800
//                         }
//                     }
//                 }
//             };
            
//             particlesJS('particles-js', particleConfig);
//         }
        
//         // Disable expensive animations on low-end devices
//         if (this.isLowEndDevice()) {
//             document.body.classList.add('reduced-motion');
//         }
//     }
    
//     isLowEndDevice() {
//         // Simple heuristic for low-end device detection
//         const memory = navigator.deviceMemory || 4; // Default to 4GB if unknown
//         const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores if unknown
        
//         return memory <= 2 || cores <= 2;
//     }
    
//     // Accessibility improvements for mobile
//     improveAccessibility() {
//         // Add skip links for mobile navigation
//         const skipLink = document.createElement('a');
//         skipLink.href = '#main-content';
//         skipLink.textContent = 'Skip to main content';
//         skipLink.className = 'skip-link';
//         skipLink.style.cssText = `
//             position: absolute;
//             top: -40px;
//             left: 6px;
//             background: #000;
//             color: white;
//             padding: 8px;
//             text-decoration: none;
//             z-index: 10000;
//             border-radius: 4px;
//         `;
        
//         skipLink.addEventListener('focus', () => {
//             skipLink.style.top = '6px';
//         });
        
//         skipLink.addEventListener('blur', () => {
//             skipLink.style.top = '-40px';
//         });
        
//         document.body.insertBefore(skipLink, document.body.firstChild);
        
//         // Improve focus indicators for touch devices
//         if (this.touchDevice) {
//             const style = document.createElement('style');
//             style.textContent = `
//                 .touch-active {
//                     transform: scale(0.95);
//                     opacity: 0.8;
//                     transition: all 0.1s ease;
//                 }
                
//                 @media (hover: none) {
//                     *:hover {
//                         background-color: initial !important;
//                     }
//                 }
                
//                 .mobile-optimized .btn:focus,
//                 .mobile-optimized button:focus,
//                 .mobile-optimized .nav-link:focus {
//                     outline: 3px solid #00d4aa;
//                     outline-offset: 2px;
//                 }
//             `;
//             document.head.appendChild(style);
//         }
//     }
// }

// // Touch Gesture Handler
// class TouchGestureHandler {
//     constructor(element) {
//         this.element = element;
//         this.gestures = {
//             tap: [],
//             swipe: [],
//             pinch: [],
//             rotate: []
//         };
//         this.init();
//     }
    
//     init() {
//         this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));
//         this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
//         this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
//     }
    
//     handleTouchStart(e) {
//         this.touches = Array.from(e.touches);
//         this.startTime = Date.now();
//         this.startPositions = this.touches.map(touch => ({
//             x: touch.clientX,
//             y: touch.clientY
//         }));
//     }
    
//     handleTouchMove(e) {
//         e.preventDefault();
//         this.currentTouches = Array.from(e.touches);
//     }
    
//     handleTouchEnd(e) {
//         const endTime = Date.now();
//         const duration = endTime - this.startTime;
        
//         if (this.touches.length === 1 && duration < 300) {
//             // Tap gesture
//             this.triggerGesture('tap', {
//                 x: this.touches[0].clientX,
//                 y: this.touches[0].clientY,
//                 duration
//             });
//         } else if (this.touches.length === 1 && duration < 1000) {
//             // Swipe gesture
//             const deltaX = this.touches[0].clientX - this.startPositions[0].x;
//             const deltaY = this.touches[0].clientY - this.startPositions[0].y;
            
//             if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
//                 let direction;
//                 if (Math.abs(deltaX) > Math.abs(deltaY)) {
//                     direction = deltaX > 0 ? 'right' : 'left';
//                 } else {
//                     direction = deltaY > 0 ? 'down' : 'up';
//                 }
                
//                 this.triggerGesture('swipe', {
//                     direction,
//                     deltaX,
//                     deltaY,
//                     distance: Math.sqrt(deltaX ** 2 + deltaY ** 2)
//                 });
//             }
//         }
//     }
    
//     triggerGesture(type, data) {
//         this.gestures[type].forEach(callback => callback(data));
//     }
    
//     on(gesture, callback) {
//         if (this.gestures[gesture]) {
//             this.gestures[gesture].push(callback);
//         }
//     }
    
//     off(gesture, callback) {
//         if (this.gestures[gesture]) {
//             const index = this.gestures[gesture].indexOf(callback);
//             if (index > -1) {
//                 this.gestures[gesture].splice(index, 1);
//             }
//         }
//     }
// }

// // Progressive Web App Features
// class PWAManager {
//     constructor() {
//         this.deferredPrompt = null;
//         this.isInstalled = false;
//         this.init();
//     }
    
//     init() {
//         this.checkInstallation();
//         this.setupInstallPrompt();
//         this.setupServiceWorker();
//     }
    
//     checkInstallation() {
//         // Check if app is already installed
//         if (window.matchMedia('(display-mode: standalone)').matches) {
//             this.isInstalled = true;
//             document.body.classList.add('pwa-installed');
//         }
//     }
    
//     setupInstallPrompt() {
//         window.addEventListener('beforeinstallprompt', (e) => {
//             e.preventDefault();
//             this.deferredPrompt = e;
//             this.showInstallButton();
//         });
        
//         window.addEventListener('appinstalled', () => {
//             this.isInstalled = true;
//             this.hideInstallButton();
//             this.showInstallSuccessMessage();
//         });
//     }
    
//     showInstallButton() {
//         const installButton = document.createElement('button');
//         installButton.textContent = '📱 Install App';
//         installButton.className = 'install-btn';
//         installButton.style.cssText = `
//             position: fixed;
//             bottom: 80px;
//             right: 20px;
//             background: linear-gradient(135deg, #00d4aa, #00a8ff);
//             color: white;
//             border: none;
//             padding: 12px 20px;
//             border-radius: 25px;
//             font-weight: bold;
//             box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
//             z-index: 1000;
//             animation: bounce 2s infinite;
//         `;
        
//         installButton.addEventListener('click', () => this.installApp());
//         document.body.appendChild(installButton);
//     }
    
//     hideInstallButton() {
//         const installButton = document.querySelector('.install-btn');
//         if (installButton) {
//             installButton.remove();
//         }
//     }
    
//     async installApp() {
//         if (this.deferredPrompt) {
//             this.deferredPrompt.prompt();
//             const { outcome } = await this.deferredPrompt.userChoice;
            
//             if (outcome === 'accepted') {
//                 console.log('User accepted the install prompt');
//             } else {
//                 console.log('User dismissed the install prompt');
//             }
            
//             this.deferredPrompt = null;
//         }
//     }
    
//     showInstallSuccessMessage() {
//         const message = document.createElement('div');
//         message.text





// Mobile Optimization and Touch Support

class MobileOptimizer {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
        this.touchDevice = 'ontouchstart' in window;
        this.init();
    }
    
    init() {
        if (this.isMobile || this.touchDevice) {
            this.optimizeForMobile();
            this.setupTouchEvents();
            this.setupSwipeGestures();
            this.optimizeFormInputs();
            this.setupViewportOptimization();
        }
        
        this.setupResponsiveImages();
        this.setupOrientationHandling();
        this.optimizePerformance();
        this.improveAccessibility();
    }
    
    optimizeForMobile() {
        document.body.classList.add('mobile-optimized');
        
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (this.isMobile) {
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
                    }
                }
            });
            
            input.addEventListener('blur', () => {
                if (this.isMobile) {
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=yes');
                    }
                }
            });
        });
        
        this.optimizeTouchTargets();
    }
    
    optimizeTouchTargets() {
        const buttons = document.querySelectorAll('button, .btn, .nav-link, .game-card');
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            if (rect.height < 44 || rect.width < 44) {
                button.style.minHeight = '44px';
                button.style.minWidth = '44px';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
            }
        });
    }
    
    setupTouchEvents() {
        const touchElements = document.querySelectorAll('button, .btn, .nav-link, .course-card, .game-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                element.classList.add('touch-active');
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            });
            
            element.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            });
            
            element.addEventListener('touchcancel', (e) => {
                element.classList.remove('touch-active');
            });
        });
    }
    
    setupSwipeGestures() {
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            let startX = 0;
            let startY = 0;
            let distX = 0;
            let distY = 0;
            let threshold = 100;
            let restraint = 100;
            
            carousel.addEventListener('touchstart', (e) => {
                const touch = e.changedTouches[0];
                startX = touch.pageX;
                startY = touch.pageY;
            });
            
            carousel.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });
            
            carousel.addEventListener('touchend', (e) => {
                const touch = e.changedTouches[0];
                distX = touch.pageX - startX;
                distY = touch.pageY - startY;
                
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    if (distX > 0) {
                        if (typeof moveSlide === 'function') {
                            moveSlide(-1);
                        }
                    } else {
                        if (typeof moveSlide === 'function') {
                            moveSlide(1);
                        }
                    }
                }
            });
        }
    }
    
    optimizeFormInputs() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.name === 'email') {
                input.type = 'email';
            } else if (input.name === 'phone') {
                input.type = 'tel';
            } else if (input.name === 'website') {
                input.type = 'url';
            }
            
            if (input.name === 'name') {
                input.setAttribute('autocomplete', 'name');
            } else if (input.name === 'email') {
                input.setAttribute('autocomplete', 'email');
            }
            
            if (input.tagName === 'TEXTAREA') {
                input.style.resize = 'vertical';
                input.style.minHeight = '100px';
            }
        });
    }
    
    setupViewportOptimization() {
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }
    
    setupResponsiveImages() {
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (this.isMobile) {
                            const src = img.src;
                            if (src.includes('?')) {
                                img.src = src + '&w=400';
                            } else {
                                img.src = src + '?w=400';
                            }
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    setupOrientationHandling() {
        const handleOrientationChange = () => {
            const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            document.body.setAttribute('data-orientation', orientation);
            
            if (orientation === 'landscape' && this.isMobile) {
                const clock = document.getElementById('clock');
                if (clock) {
                    clock.style.display = 'none';
                }
            } else {
                const clock = document.getElementById('clock');
                if (clock) {
                    clock.style.display = 'block';
                }
            }
            
            window.dispatchEvent(new CustomEvent('orientationChanged', {
                detail: { orientation }
            }));
        };
        
        handleOrientationChange();
        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleOrientationChange, 100);
        });
    }
    
    optimizePerformance() {
        if (this.isMobile && window.particlesJS) {
            const particleConfig = {
                particles: {
                    number: {
                        value: 30,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    }
                }
            };
            
            particlesJS('particles-js', particleConfig);
        }
        
        if (this.isLowEndDevice()) {
            document.body.classList.add('reduced-motion');
        }
    }
    
    isLowEndDevice() {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return memory <= 2 || cores <= 2;
    }
    
    improveAccessibility() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        if (this.touchDevice) {
            const style = document.createElement('style');
            style.textContent = `
                .touch-active {
                    transform: scale(0.95);
                    opacity: 0.8;
                    transition: all 0.1s ease;
                }
                
                @media (hover: none) {
                    *:hover {
                        background-color: initial !important;
                    }
                }
                
                .mobile-optimized .btn:focus,
                .mobile-optimized button:focus,
                .mobile-optimized .nav-link:focus {
                    outline: 3px solid #00d4aa;
                    outline-offset: 2px;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize mobile optimization
document.addEventListener('DOMContentLoaded', () => {
    window.mobileOptimizer = new MobileOptimizer();
});

window.MobileOptimizer = MobileOptimizer;
