const size = 4;
const tileSize = 90;
let board = [];

for (let i = 0; i < 40; i++) {
    setTimeout(function () {
        const snow = document.createElement("div");
        snow.className = "snowflake";
        snow.textContent = "❄";
        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animationDuration = 6 + Math.random() * 8 + "s";
        snow.style.fontSize = 12 + Math.random() * 20 + "px";
        document.body.appendChild(snow);
    }, 100 * i)
}

function init() {
    board = [];
    for (let i = 1; i < size * size; i++) board.push(i);
    board.push(null);
    render();
}

function render() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    document.getElementById("status").textContent = "";

    board.forEach((value, index) => {
        if (value === null) return;

        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = value;

        const row = Math.floor(index / size);
        const col = index % size;
        tile.style.top = row * tileSize + "px";
        tile.style.left = col * tileSize + "px";

        tile.onclick = () => move(index);
        boardDiv.appendChild(tile);
    });

    if (isSolved()) {
        document.getElementById("status").textContent = "🎉 Puzzle solved!";
        document.getElementById("status").style.display = "block";
      }
}

function move(index) {
    const emptyIndex = board.indexOf(null);
    const row = Math.floor(index / size);
    const col = index % size;
    const erow = Math.floor(emptyIndex / size);
    const ecol = emptyIndex % size;

    const isAdjacent =
        (row === erow && Math.abs(col - ecol) === 1) ||
        (col === ecol && Math.abs(row - erow) === 1);

    if (isAdjacent) {
        [board[emptyIndex], board[index]] = [board[index], board[emptyIndex]];
        render();
    }
}

function shuffle() {
    for (let i = 0; i < 600; i++) {
        const emptyIndex = board.indexOf(null);
        const moves = [];
        if (emptyIndex % size !== 0) moves.push(emptyIndex - 1);
        if (emptyIndex % size !== size - 1) moves.push(emptyIndex + 1);
        if (emptyIndex >= size) moves.push(emptyIndex - size);
        if (emptyIndex < size * (size - 1)) moves.push(emptyIndex + size);
        const moveIndex = moves[Math.floor(Math.random() * moves.length)];
        [board[emptyIndex], board[moveIndex]] = [board[moveIndex], board[emptyIndex]];
    }
    render();

    document.getElementById("shuffle").style.display = "none";
}

function isSolved() {
    for (let i = 0; i < board.length - 1; i++) {
        if (board[i] !== i + 1) return false;
    }
    return board[board.length - 1] === null;
}

init();
shuffle();