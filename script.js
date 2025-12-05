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

  // ✅ 落子時加上彈跳動畫的 class
  e.target.classList.add("played");

  checkWinner();

  // 換人（尚未結束才換）
  if (!gameEnded) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnSpan.textContent = currentPlayer;
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      // ✅ 把「哪一條線贏了」一起傳進去
      endGame(board[a], pattern);
      return;
    }
  }

  // 平手
  if (!board.includes("")) {
    endGame("draw");
  }
}

// result: "X" / "O" / "draw"
// pattern: 勝利時的那一組 [a,b,c]（平手為 undefined）
function endGame(result, pattern) {
  gameEnded = true;
  stateSpan.style.color = "red";

  // 先鎖定棋盤
  cells.forEach(cell => (cell.disabled = true));

  if (result === "draw") {
    stateSpan.textContent = "平手！";
    scoreDraw.textContent = Number(scoreDraw.textContent) + 1;
    return;
  }

  stateSpan.textContent = `${result} 玩家獲勝！`;

  // ✅ 勝利的那三格加上 .win 做閃爍動畫
  if (pattern) {
    for (let i of pattern) {
      cells[i].classList.add("win");
    }
  }

  if (result === "X") {
    scoreX.textContent = Number(scoreX.textContent) + 1;
  }
  if (result === "O") {
    scoreO.textContent = Number(scoreO.textContent) + 1;
  }
}

// 重開一局
resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(c => {
    c.textContent = "";
    c.disabled = false;
    // ✅ 把動畫相關 class 清掉，避免新的一局還在閃
    c.classList.remove("played", "win");
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
  resetBtn.click(); // 同時重新開局});

});

// 重置計分
resetAllBtn.addEventListener("click", () => {
  scoreX.textContent = "0";
  scoreO.textContent = "0";
  scoreDraw.textContent = "0";
  resetBtn.click(); // 同時重新開局
});