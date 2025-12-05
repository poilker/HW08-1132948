const cells = document.querySelectorAll(".cell");
const turnSpan = document.getElementById("turn");
const stateSpan = document.getElementById("state");

const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreDraw = document.getElementById("score-draw");

const resetBtn = document.getElementById("reset");
const resetAllBtn = document.getElementById("reset-all");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameEnded = false;

// 所有可能勝利情況
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// 點擊事件
cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  if (gameEnded) return;

  const idx = e.target.dataset.idx;

  // 已有棋子不能點
  if (board[idx] !== "") return;

  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  // 換人
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnSpan.textContent = currentPlayer;
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      endGame(board[a]);
      return;
    }
  }

  // 平手
  if (!board.includes("")) {
    endGame("draw");
  }
}

function endGame(result) {
  gameEnded = true;
  stateSpan.style.color = "red";

  cells.forEach(cell => (cell.disabled = true));

  if (result === "draw") {
    stateSpan.textContent = "平手！";
    scoreDraw.textContent = Number(scoreDraw.textContent) + 1;
    return;
  }

  stateSpan.textContent = `${result} 玩家獲勝！`;

  if (result === "X") scoreX.textContent = Number(scoreX.textContent) + 1;
  if (result === "O") scoreO.textContent = Number(scoreO.textContent) + 1;
}

// 重開一局
resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(c => {
    c.textContent = "";
    c.disabled = false;
  });
  stateSpan.textContent = "";
  gameEnded = false;
  currentPlayer = "X";
  turnSpan.textContent = currentPlayer;
});

// 重置計分
resetAllBtn.addEventListener("click", () => {
  scoreX.textContent = "0";
  scoreO.textContent = "0";
  scoreDraw.textContent = "0";
  resetBtn.click(); // 同時重新開局
});
