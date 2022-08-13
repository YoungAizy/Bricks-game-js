// imports
import Game from './game.js';
import Levels from './levels.js';
import '../style.css'


// CONSTANTS
const canvas = document.getElementById("gameScreen");

const ctx = canvas.getContext("2d");
const GAMEWIDTH = 800;
const GAMEHEIGHT = 600;

const game = new Game(GAMEHEIGHT, GAMEWIDTH);
const level = new Levels();

let stopGameLoop = false;

const menu = document.getElementById("menu");
const levels = document.getElementById("levels");
menu.style.visibility = "visible";
const playBtn = document.getElementById("play");
const survivalBtn = document.getElementById("survival");
survivalBtn.addEventListener("click", () => {
    menu.style.visibility = "hidden";
    startGame(level.survival())
})
playBtn.addEventListener("click", (e) => {
    menu.style.visibility = "hidden";
    levels.style.visibility = "visible"

});
const menuBtn = document.getElementById("returnToMenu");
document.getElementById("easy").addEventListener("click", () => startGame(level.easy()));
document.getElementById("medium").addEventListener("click", () => startGame(level.medium()));
document.getElementById("hard").addEventListener("click", () => startGame(level.hard()));

function startGame(level) {
    levels.style.visibility = "hidden";
    stopGameLoop = false;
    game.start(level, menuBtn, clearGame);
}

function clearGame() {
    menuBtn.style.visibility = "hidden";
    menu.style.visibility = "visible";
    stopGameLoop = true;
}

let lastTime = 0;
export function gameLoop(timestamp) {
    if (stopGameLoop) return;
    let deltaTime = timestamp - lastTime;

    ctx.clearRect(0, 0, GAMEWIDTH, GAMEHEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop)
}