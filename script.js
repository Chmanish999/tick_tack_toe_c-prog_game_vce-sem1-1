const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningPatterns = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // column 1
  [1, 4, 7], // column 2
  [2, 5, 8], // column 3
  [0, 4, 8], // diagonal
  [2, 4, 6]  // diagonal
];

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    disableCells();
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "Game Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
  });
}

function disableCells() {
  cells.forEach(cell => {
    cell.disabled = true;
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o");
  });
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);
