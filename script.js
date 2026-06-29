const board = document.querySelector(".board");
const startBtn = document.querySelector(".btn-start");
const restartBtn = document.querySelector(".btn-restart");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const highScoreElement = document.querySelector("#high-score");
const timeElement = document.querySelector("#time");
const scoreElement = document.querySelector("#score");

const blockheight = 50;
const blockwidth = 50;
const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);
const blocks = [];

const savedHighScore = parseInt(localStorage.getItem("highScore")) || 0;
let highScore = savedHighScore;
let time = `00:00`;
let score = 0;
let intervalId = null;
let direction = "down";

let snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
];
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
};

highScoreElement.textContent = highScore;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row},${col}`] = block;
    }
}

function render() {
    blocks[`${food.x},${food.y}`].classList.add("food");
    snake.forEach((segment) => {
        blocks[`${segment.x},${segment.y}`].classList.add("fill");
    });
}

function snakeMove() {
    let head = null;
    const tail = snake[snake.length - 1];

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    if (
        head.x < 0 ||
        head.x >= rows ||
        head.y < 0 ||
        head.y >= cols ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(intervalId);
        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        return;
    }

    blocks[`${tail.x},${tail.y}`].classList.remove("fill");
    snake.unshift(head);
    snake.pop();

    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols),
        };
        score += 10;
        scoreElement.textContent = score;
        snake.push(tail);
        if (highScore < score) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreElement.textContent = highScore;
        }
    }
}

// head is the next block in the direction of movement and tail is the last block of snake.
// We will remove tail and add head to snake array to move the snake.

function restartGame() {
    modal.style.display = "none";
    clearInterval(intervalId);

    gameOverModal.style.display = "none";
    snake = [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 },
    ];

    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
    };

    Object.values(blocks).forEach((block) => {
        block.classList.remove("fill", "food");
    });
    render();

    intervalId = setInterval(() => {
        snakeMove();
        Object.values(blocks).forEach((block) => {
            block.classList.remove("fill", "food");
        });
        render();
    }, 300);
}

function updateTime() {
    let [minutes, seconds] = time.split(":").map(Number);
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    time = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    timeElement.textContent = time;
}

startBtn.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(() => {
        snakeMove();
        Object.values(blocks).forEach((block) => {
            block.classList.remove("fill", "food");
        });
        render();
    }, 300);
});

restartBtn.addEventListener("click", () => {
    direction = "down";
    score = 0;
    time = `00:00`;
    scoreElement.textContent = score;
    restartGame();
});

addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } else if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
});

setInterval(updateTime, 1000);
