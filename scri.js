const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkForWinner();
}

function checkForWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && (boardState[a] === boardState[b] && boardState[a] === boardState[c])) {
            gameActive = false;
            statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
            return;
        }
    }

    if (!boardState.includes('')) {
        statusDisplay.textContent = 'It\'s a Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
