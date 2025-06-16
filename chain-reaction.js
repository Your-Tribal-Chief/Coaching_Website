// Chain Reaction Game Implementation
class ChainReactionGame {
    constructor(container) {
        this.container = container;
        this.rows = 9;
        this.cols = 6;
        this.cellSize = 60;
        this.board = [];
        this.currentPlayer = 1; // 1 for human (red), 2 for AI (blue)
        this.gameOver = false;
        this.winner = null;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.createBoard();
        this.createCanvas();
        this.createControls();
        this.bindEvents();
        this.gameLoop();
    }
    
    createBoard() {
        this.board = [];
        for (let row = 0; row < this.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.board[row][col] = {
                    orbs: 0,
                    player: 0,
                    maxOrbs: this.getMaxOrbs(row, col)
                };
            }
        }
    }
    
    getMaxOrbs(row, col) {
        let neighbors = 0;
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (this.isValidPosition(newRow, newCol)) {
                neighbors++;
            }
        }
        
        return neighbors;
    }
    
    isValidPosition(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.cols * this.cellSize + 100;
        this.canvas.height = this.rows * this.cellSize + 150;
        this.canvas.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
        this.canvas.style.borderRadius = '15px';
        this.canvas.style.border = '2px solid rgba(0, 212, 170, 0.3)';
        this.ctx = this.canvas.getContext('2d');
        
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
    }
    
    createControls() {
        const controlsDiv = document.createElement('div');
        controlsDiv.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
            flex-wrap: wrap;
        `;
        
        const newGameBtn = document.createElement('button');
        newGameBtn.textContent = 'New Game';
        newGameBtn.style.cssText = `
            background: linear-gradient(135deg, #00d4aa, #00a8ff);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        `;
        newGameBtn.onclick = () => this.newGame();
        
        const statusDiv = document.createElement('div');
        statusDiv.id = 'chain-reaction-status';
        statusDiv.style.cssText = `
            color: #00d4aa;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-top: 10px;
        `;
        statusDiv.textContent = 'Your turn (Red)';
        
        controlsDiv.appendChild(newGameBtn);
        this.container.appendChild(controlsDiv);
        this.container.appendChild(statusDiv);
        
        this.statusElement = statusDiv;
    }
    
    bindEvents() {
        this.canvas.addEventListener('click', (e) => {
            if (this.gameOver || this.currentPlayer !== 1) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const col = Math.floor((x - 50) / this.cellSize);
            const row = Math.floor((y - 50) / this.cellSize);
            
            if (this.isValidMove(row, col)) {
                this.makeMove(row, col);
            }
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const col = Math.floor((x - 50) / this.cellSize);
            const row = Math.floor((y - 50) / this.cellSize);
            
            this.canvas.style.cursor = (this.isValidMove(row, col) && this.currentPlayer === 1 && !this.gameOver) ? 'pointer' : 'default';
        });
    }
    
    isValidMove(row, col) {
        if (!this.isValidPosition(row, col)) return false;
        const cell = this.board[row][col];
        return cell.orbs === 0 || cell.player === this.currentPlayer;
    }
    
    makeMove(row, col) {
        if (!this.isValidMove(row, col)) return false;
        
        const cell = this.board[row][col];
        cell.orbs++;
        cell.player = this.currentPlayer;
        
        // Create particle effect
        this.createExplosionParticles(row, col);
        
        // Check for chain reactions
        this.handleChainReactions();
        
        // Check for winner
        if (this.checkWinner()) {
            this.gameOver = true;
            this.updateStatus();
            return;
        }
        
        // Switch players
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.updateStatus();
        
        // AI move
        if (this.currentPlayer === 2 && !this.gameOver) {
            setTimeout(() => this.makeAIMove(), 1000);
        }
        
        return true;
    }
    
    handleChainReactions() {
        let chainReaction = true;
        
        while (chainReaction) {
            chainReaction = false;
            
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    const cell = this.board[row][col];
                    
                    if (cell.orbs >= cell.maxOrbs && cell.orbs > 0) {
                        chainReaction = true;
                        
                        // Create explosion particles
                        this.createExplosionParticles(row, col, cell.orbs);
                        
                        // Explode
                        const player = cell.player;
                        cell.orbs = 0;
                        cell.player = 0;
                        
                        // Distribute orbs to neighbors
                        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                        for (const [dr, dc] of directions) {
                            const newRow = row + dr;
                            const newCol = col + dc;
                            
                            if (this.isValidPosition(newRow, newCol)) {
                                this.board[newRow][newCol].orbs++;
                                this.board[newRow][newCol].player = player;
                            }
                        }
                        
                        break;
                    }
                }
                
                if (chainReaction) break;
            }
        }
    }
    
    createExplosionParticles(row, col, intensity = 1) {
        const centerX = 50 + col * this.cellSize + this.cellSize / 2;
        const centerY = 50 + row * this.cellSize + this.cellSize / 2;
        
        for (let i = 0; i < intensity * 5; i++) {
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 30,
                maxLife: 30,
                color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`
            });
        }
    }
    
    makeAIMove() {
        if (this.gameOver) return;
        
        const move = this.getBestMove();
        if (move) {
            this.makeMove(move.row, move.col);
        }
    }
    
    getBestMove() {
        const validMoves = [];
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.isValidMove(row, col)) {
                    validMoves.push({ row, col, score: this.evaluateMove(row, col) });
                }
            }
        }
        
        if (validMoves.length === 0) return null;
        
        // Sort by score and add some randomness
        validMoves.sort((a, b) => b.score - a.score);
        
        // Choose from top 3 moves with some randomness
        const topMoves = validMoves.slice(0, Math.min(3, validMoves.length));
        return topMoves[Math.floor(Math.random() * topMoves.length)];
    }
    
    evaluateMove(row, col) {
        let score = 0;
        const cell = this.board[row][col];
        
        // Prefer moves that are close to explosion
        score += (cell.orbs + 1) / cell.maxOrbs * 10;
        
        // Prefer corner and edge positions
        if (cell.maxOrbs === 2) score += 5; // Corner
        if (cell.maxOrbs === 3) score += 3; // Edge
        
        // Add randomness
        score += Math.random() * 2;
        
        return score;
    }
    
    checkWinner() {
        let redCells = 0;
        let blueCells = 0;
        let totalOrbs = 0;
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.board[row][col];
                if (cell.orbs > 0) {
                    totalOrbs += cell.orbs;
                    if (cell.player === 1) redCells++;
                    else if (cell.player === 2) blueCells++;
                }
            }
        }
        
        // Only check for winner after both players have made moves
        if (totalOrbs > 2) {
            if (redCells > 0 && blueCells === 0) {
                this.winner = 1;
                return true;
            } else if (blueCells > 0 && redCells === 0) {
                this.winner = 2;
                return true;
            }
        }
        
        return false;
    }
    
    updateStatus() {
        if (!this.statusElement) return;
        
        if (this.gameOver) {
            if (this.winner === 1) {
                this.statusElement.textContent = '🎉 You Win! 🎉';
                this.statusElement.style.color = '#ff6b6b';
            } else if (this.winner === 2) {
                this.statusElement.textContent = '🤖 AI Wins! 🤖';
                this.statusElement.style.color = '#00a8ff';
            }
        } else {
            if (this.currentPlayer === 1) {
                this.statusElement.textContent = 'Your turn (Red)';
                this.statusElement.style.color = '#ff6b6b';
            } else {
                this.statusElement.textContent = 'AI thinking... (Blue)';
                this.statusElement.style.color = '#00a8ff';
            }
        }
    }
    
    newGame() {
        this.gameOver = false;
        this.winner = null;
        this.currentPlayer = 1;
        this.particles = [];
        this.createBoard();
        this.updateStatus();
    }
    
    gameLoop() {
        this.update();
        this.render();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            return particle.life > 0;
        });
    }
    
    render() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = 'rgba(0, 212, 170, 0.3)';
        this.ctx.lineWidth = 1;
        
        for (let row = 0; row <= this.rows; row++) {
            this.ctx.beginPath();
            this.ctx.moveTo(50, 50 + row * this.cellSize);
            this.ctx.lineTo(50 + this.cols * this.cellSize, 50 + row * this.cellSize);
            this.ctx.stroke();
        }
        
        for (let col = 0; col <= this.cols; col++) {
            this.ctx.beginPath();
            this.ctx.moveTo(50 + col * this.cellSize, 50);
            this.ctx.lineTo(50 + col * this.cellSize, 50 + this.rows * this.cellSize);
            this.ctx.stroke();
        }
        
        // Draw cells
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.drawCell(row, col);
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life / particle.maxLife;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw title
        this.ctx.fillStyle = '#00d4aa';
        this.ctx.font = 'bold 24px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Chain Reaction', this.canvas.width / 2, 30);
        
        // Draw critical mass indicators
        this.ctx.fillStyle = 'rgba(0, 212, 170, 0.5)';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'left';
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.board[row][col];
                const x = 50 + col * this.cellSize + 5;
                const y = 50 + row * this.cellSize + 15;
                this.ctx.fillText(cell.maxOrbs.toString(), x, y);
            }
        }
    }
    
    drawCell(row, col) {
        const cell = this.board[row][col];
        const x = 50 + col * this.cellSize;
        const y = 50 + row * this.cellSize;
        const centerX = x + this.cellSize / 2;
        const centerY = y + this.cellSize / 2;
        
        // Highlight valid moves
        if (this.isValidMove(row, col) && this.currentPlayer === 1 && !this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 212, 170, 0.1)';
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        }
        
        if (cell.orbs === 0) return;
        
        // Determine color
        const color = cell.player === 1 ? '#ff6b6b' : '#00a8ff';
        
        // Draw orbs
        this.ctx.fillStyle = color;
        
        if (cell.orbs === 1) {
            this.drawOrb(centerX, centerY, 8, color);
        } else if (cell.orbs === 2) {
            this.drawOrb(centerX - 8, centerY, 6, color);
            this.drawOrb(centerX + 8, centerY, 6, color);
        } else if (cell.orbs === 3) {
            this.drawOrb(centerX, centerY - 8, 5, color);
            this.drawOrb(centerX - 8, centerY + 4, 5, color);
            this.drawOrb(centerX + 8, centerY + 4, 5, color);
        } else {
            // For more than 3 orbs, draw in a diamond pattern
            this.drawOrb(centerX, centerY - 10, 4, color);
            this.drawOrb(centerX - 10, centerY, 4, color);
            this.drawOrb(centerX + 10, centerY, 4, color);
            this.drawOrb(centerX, centerY + 10, 4, color);
            
            // Show number for high counts
            if (cell.orbs > 4) {
                this.ctx.fillStyle = 'white';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(cell.orbs.toString(), centerX, centerY + 4);
            }
        }
    }
    
    drawOrb(x, y, radius, color) {
        // Draw orb with gradient
        const gradient = this.ctx.createRadialGradient(x - 2, y - 2, 0, x, y, radius);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.3, color);
        gradient.addColorStop(1, this.darkenColor(color, 0.3));
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.beginPath();
        this.ctx.arc(x - 2, y - 2, radius / 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    darkenColor(color, factor) {
        // Simple color darkening
        if (color === '#ff6b6b') return '#e55555';
        if (color === '#00a8ff') return '#0088cc';
        return color;
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize Chain Reaction Game
function initChainReactionGame() {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        // Clean up any existing game
        gameContainer.innerHTML = '';
        
        // Create new game
        const game = new ChainReactionGame(gameContainer);
        
        // Store reference for cleanup
        window.chainReactionGame = game;
    }
}

// Cleanup function
function cleanupChainReactionGame() {
    if (window.chainReactionGame) {
        window.chainReactionGame.destroy();
        window.chainReactionGame = null;
    }
}

// Export for global access
window.initChainReactionGame = initChainReactionGame;
window.cleanupChainReactionGame = cleanupChainReactionGame;
