// Utility Functions for Enhanced Website

// Performance Utilities
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0,
            interactionTime: 0,
            memoryUsage: 0
        };
        this.init();
    }
    
    init() {
        // Monitor page load
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            this.logMetrics();
        });
        
        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = performance.memory.usedJSHeapSize;
            }, 5000);
        }
    }
    
    logMetrics() {
        console.log('Performance Metrics:', this.metrics);
    }
}

// Image Lazy Loading
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.imageObserver = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            });
            
            this.images.forEach(img => this.imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => this.loadImage(img));
        }
    }
    
    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
    }
    
    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.className = 'theme-toggle';
        toggle.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #00d4aa, #00a8ff);
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1500;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        
        toggle.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(toggle);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        if (theme === 'light') {
            document.body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            // Add more light theme styles as needed
        } else {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }
}

// Local Storage Manager
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Failed to read from localStorage:', e);
            return defaultValue;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Failed to remove from localStorage:', e);
        }
    }
}

// Animation Utilities
class AnimationUtils {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const start = performance.now();
        
        const animate = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    static fadeOut(element, duration = 300) {
        const start = performance.now();
        const startOpacity = parseFloat(getComputedStyle(element).opacity);
        
        const animate = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = startOpacity * (1 - progress);
            
            if (progress >= 1) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    static slideIn(element, direction = 'left', duration = 300) {
        const directions = {
            left: 'translateX(-100%)',
            right: 'translateX(100%)',
            up: 'translateY(-100%)',
            down: 'translateY(100%)'
        };
        
        element.style.transform = directions[direction];
        element.style.display = 'block';
        
        const start = performance.now();
        
        const animate = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            element.style.transform = `${directions[direction].replace('100%', `${100 * (1 - easeOut)}%`)}`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.transform = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Math Utilities
class MathUtils {
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    
    static randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    static angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }
}

// Color Utilities
class ColorUtils {
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    static interpolateColor(color1, color2, factor) {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        
        if (!c1 || !c2) return color1;
        
        const r = Math.round(MathUtils.lerp(c1.r, c2.r, factor));
        const g = Math.round(MathUtils.lerp(c1.g, c2.g, factor));
        const b = Math.round(MathUtils.lerp(c1.b, c2.b, factor));
        
        return this.rgbToHex(r, g, b);
    }
    
    static getRandomColor() {
        const colors = ['#ff6b6b', '#00d4aa', '#00a8ff', '#ffa500', '#8000ff', '#ff00ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Particle System
class ParticleSystem {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.isRunning = false;
    }
    
    addParticle(x, y, options = {}) {
        const particle = {
            x: x,
            y: y,
            vx: options.vx || MathUtils.randomRange(-2, 2),
            vy: options.vy || MathUtils.randomRange(-2, 2),
            life: options.life || 60,
            maxLife: options.life || 60,
            size: options.size || MathUtils.randomRange(2, 6),
            color: options.color || ColorUtils.getRandomColor(),
            gravity: options.gravity || 0.1,
            decay: options.decay || 0.98
        };
        
        this.particles.push(particle);
    }
    
    update() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.vx *= particle.decay;
            particle.vy *= particle.decay;
            particle.life--;
            
            return particle.life > 0;
        });
    }
    
    render() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life / particle.maxLife;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    explode(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = MathUtils.randomRange(2, 8);
            
            this.addParticle(x, y, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: MathUtils.randomInt(30, 60),
                size: MathUtils.randomRange(3, 8),
                color: ColorUtils.getRandomColor()
            });
        }
    }
    
    start() {
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.update();
        this.render();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Sound Manager
class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.5;
    }
    
    loadSound(name, url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.addEventListener('canplaythrough', () => {
                this.sounds[name] = audio;
                resolve(audio);
            });
            audio.addEventListener('error', reject);
        });
    }
    
    play(name, options = {}) {
        if (!this.enabled || !this.sounds[name]) return;
        
        const sound = this.sounds[name].cloneNode();
        sound.volume = options.volume || this.volume;
        sound.loop = options.loop || false;
        
        sound.play().catch(e => console.warn('Sound play failed:', e));
        return sound;
    }
    
    stop(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }
    
    setVolume(volume) {
        this.volume = MathUtils.clamp(volume, 0, 1);
    }
    
    toggle() {
        this.enabled = !this.enabled;
    }
}

// Device Detection
class DeviceDetector {
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    static isTablet() {
        return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    }
    
    static isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }
    
    static getTouchCapability() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    
    static getOrientation() {
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
}

// Cookie Manager
class CookieManager {
    static set(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
    
    static get(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    static remove(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

// Form Validator
class FormValidator {
    constructor(form) {
        this.form = form;
        this.rules = {};
        this.messages = {};
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validate()) {
                e.preventDefault();
            }
        });
    }
    
    addRule(fieldName, rule, message) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
            this.messages[fieldName] = [];
        }
        this.rules[fieldName].push(rule);
        this.messages[fieldName].push(message);
    }
    
    validate() {
        let isValid = true;
        
        for (const [fieldName, rules] of Object.entries(this.rules)) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;
            
            for (let i = 0; i < rules.length; i++) {
                if (!rules[i](field.value)) {
                    this.showError(field, this.messages[fieldName][i]);
                    isValid = false;
                    break;
                } else {
                    this.clearError(field);
                }
            }
        }
        
        return isValid;
    }
    
    showError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff6b6b;
            font-size: 12px;
            margin-top: 5px;
            animation: slideIn 0.3s ease;
        `;
        
        this.clearError(field);
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#ff6b6b';
    }
    
    clearError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }
    
    // Common validation rules
    static rules = {
        required: (value) => value.trim() !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        minLength: (min) => (value) => value.length >= min,
        maxLength: (max) => (value) => value.length <= max,
        numeric: (value) => /^\d+$/.test(value),
        phone: (value) => /^\+?[\d\s\-\(\)]+$/.test(value)
    };
}

// Game Statistics Tracker
class GameStats {
    constructor() {
        this.stats = StorageManager.get('gameStats', {
            chainReaction: { played: 0, won: 0, lost: 0 },
            ticTacToe: { played: 0, won: 0, lost: 0, draws: 0 },
            totalTime: 0
        });
    }
    
    recordGame(game, result, duration = 0) {
        if (!this.stats[game]) {
            this.stats[game] = { played: 0, won: 0, lost: 0, draws: 0 };
        }
        
        this.stats[game].played++;
        this.stats[game][result]++;
        this.stats.totalTime += duration;
        
        StorageManager.set('gameStats', this.stats);
    }
    
    getStats(game) {
        return this.stats[game] || { played: 0, won: 0, lost: 0, draws: 0 };
    }
    
    getAllStats() {
        return this.stats;
    }
    
    reset() {
        this.stats = {
            chainReaction: { played: 0, won: 0, lost: 0 },
            ticTacToe: { played: 0, won: 0, lost: 0, draws: 0 },
            totalTime: 0
        };
        StorageManager.set('gameStats', this.stats);
    }
}

// Initialize utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize global utilities
    window.performanceMonitor = new PerformanceMonitor();
    window.themeManager = new ThemeManager();
    window.lazyLoader = new LazyImageLoader();
    window.soundManager = new SoundManager();
    window.gameStats = new GameStats();
    
    // Add responsive classes based on device
    const deviceClass = DeviceDetector.isMobile() ? 'mobile' : 
                       DeviceDetector.isTablet() ? 'tablet' : 'desktop';
    document.body.classList.add(deviceClass);
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            document.body.classList.toggle('landscape', DeviceDetector.getOrientation() === 'landscape');
        }, 100);
    });
    
    // Initialize form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const validator = new FormValidator(contactForm);
        validator.addRule('name', FormValidator.rules.required, 'Name is required');
        validator.addRule('name', FormValidator.rules.minLength(2), 'Name must be at least 2 characters');
        validator.addRule('email', FormValidator.rules.required, 'Email is required');
        validator.addRule('email', FormValidator.rules.email, 'Please enter a valid email');
        validator.addRule('message', FormValidator.rules.required, 'Message is required');
        validator.addRule('message', FormValidator.rules.minLength(10), 'Message must be at least 10 characters');
    }
    
    // Add performance monitoring
    console.log('Utils initialized successfully');
});

// Export classes for global use
window.PerformanceMonitor = PerformanceMonitor;
window.LazyImageLoader = LazyImageLoader;
window.ThemeManager = ThemeManager;
window.StorageManager = StorageManager;
window.AnimationUtils = AnimationUtils;
window.MathUtils = MathUtils;
window.ColorUtils = ColorUtils;
window.ParticleSystem = ParticleSystem;
window.SoundManager = SoundManager;
window.DeviceDetector = DeviceDetector;
window.CookieManager = CookieManager;
window.FormValidator = FormValidator;
window.GameStats = GameStats;
