const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restart');
const playerXScore = document.getElementById('playerXScore');
const playerOScore = document.getElementById('playerOScore');
const draws = document.getElementById('draws');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scores = { X: 0, O: 0, Draws: 0 };

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index] || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    updateScore(currentPlayer);
    gameStatus.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    updateScore('Draws');
    gameStatus.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;

  if (currentPlayer === 'O') aiMove();
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function updateScore(winner) {
  scores[winner]++;
  playerXScore.textContent = scores.X;
  playerOScore.textContent = scores.O;
  draws.textContent = scores.Draws;
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

function aiMove() {
  let emptyCells = board.map((val, index) => (val === '' ? index : null)).filter(val => val !== null);
  if (emptyCells.length === 0) return;

  const aiChoice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[aiChoice] = 'O';
  cells[aiChoice].textContent = 'O';

  if (checkWin()) {
    updateScore('O');
    gameStatus.textContent = `Player O wins!`;
    isGameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    updateScore('Draws');
    gameStatus.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
