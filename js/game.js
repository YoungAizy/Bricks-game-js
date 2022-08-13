import InputHandler from "./input.js";
import Paddle from "./paddle.js";
import {
    gameLoop
} from "./index.js";
import Blocks from "./blocks.js";

export const GAMESTATE = {
    PAUSED: 0,
    PLAY: 1,
    MENU: 2,
    GAMEOVER: 3,
}

export default class Game {

    constructor(GAMEHEIGHT, GAMEWIDTH) {
        this.gameheight = GAMEHEIGHT;
        this.gamewidth = GAMEWIDTH;

        this.gamestate = GAMESTATE.MENU;

    }


    start(LEVEL, menuBtn, callBack) {
        this.gamestate = GAMESTATE.PLAY;
        this.level = LEVEL;
        this.paddle = new Paddle(this);
        this.blocks = [new Blocks(this)];
        this.spawnT = this.level.spawnTime;
        this.spawn();

        new InputHandler(this);

        menuBtn.style.visibility = "visible";
        menuBtn.addEventListener("click", () => {
            this.clearSpawns()
            callBack()
        });
        if (this.level.type == "survival") this.survival();
        requestAnimationFrame(gameLoop);

    }

    survival() {
        const interval = 30 * 1000;
        this.speedUp = setInterval(() => {
            this.level.speed += 2;
            this.spawnT -= 100;
        }, interval);
    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.PLAY;
            this.spawn()
        } else {
            this.gamestate = GAMESTATE.PAUSED;
            this.clearSpawns()
        }
    }

    // Spawn a new block every half a second
    spawn() {
        this.blocksSpawn = setInterval(() => {
            const newBlock = new Blocks(this);
            this.blocks.push(newBlock);

        }, this.spawnT);

    }

    clearSpawns() {
        clearInterval(this.blocksSpawn);
        clearInterval(this.speedUp);
    }

    update(deltaTime) {
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.MENU)
            return;


        this.paddle.update(deltaTime);
        this.blocks.map(x => x.update(deltaTime))
    }

    draw(ctx) {

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gamewidth, this.gameheight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gamewidth / 2, this.gameheight / 2);
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) this.gameover(ctx);
        this.paddle.draw(ctx);
        this.blocks.map(item => item.draw(ctx));

    }

    gameover(ctx) {
        ctx.rect(0, 0, this.gamewidth, this.gameheight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAMEOVER", this.gamewidth / 2, this.gameheight / 2);
    }
}