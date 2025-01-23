const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset');
const gameContainer = document.querySelector('.game-container');
const modeButtons = document.querySelector('.mode-selection');
const multiplayerButton = document.getElementById('multiplayer-mode');
const computerButton = document.getElementById('computer-mode');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'multiplayer'; // Default mode

// Function to check the winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.includes('') ? null : 'Draw';
}

// Function to make the computer's move
function computerMove() {
    let emptyCells = board
        .map((val, index) => (val === '' ? index : null))
        .filter((val) => val !== null);

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        const winner = checkWinner();
        if (winner) {
            displayResult(winner);
        } else {
            currentPlayer = 'X';
        }
    }
}

// Function to handle the cell click
function handleClick(e) {
    const index = e.target.dataset.index;

    if (!board[index]) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWinner();

        if (winner) {
            displayResult(winner);
            return;
        }

        if (gameMode === 'computer' && currentPlayer === 'X') {
            currentPlayer = 'O';
            setTimeout(computerMove, 500); // Delay for better UX
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to display the result
function displayResult(winner) {
    resultDisplay.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
    cells.forEach((cell) => cell.removeEventListener('click', handleClick));
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    resultDisplay.textContent = '';
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    });
}

// Function to start the game
function startGame(mode) {
    gameMode = mode;
    modeButtons.style.display = 'none';
    gameContainer.style.display = 'flex';
    resetGame();
}

// Add event listeners
cells.forEach((cell) => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
multiplayerButton.addEventListener('click', () => startGame('multiplayer'));
computerButton.addEventListener('click', () => startGame('computer'));