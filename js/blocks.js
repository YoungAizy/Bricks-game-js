import {
    GAMESTATE
} from "./game";

export default class Blocks {

    constructor(gameObj) {
        this.speed = gameObj.level.speed;
        this.game = gameObj;
        this.level = gameObj.level;
        this.gameheight = gameObj.gameheight;
        this.position = {
            x: Math.floor(Math.random() * 750),
            y: 0,
        }
    }

    collision() {
        const brick = this.position.y + 50;
        const paddle = this.game.paddle.position.y;
        const paddleRightEdge = this.game.paddle.position.x + this.game.paddle.width;
        const paddleLeftEdge = this.game.paddle.position.x;

        if (brick >= paddle && this.position.x < paddleRightEdge && this.position.x + 50 > paddleLeftEdge) {
            this.game.gamestate = GAMESTATE.GAMEOVER;
            this.game.clearSpawns();
        }

    }

    update(deltaTime) {
        //Check for collision
        this.collision();

        //cleanup the blocks that fall off screen for memory
        if (this.position.y > this.gameheight) this.game.blocks.shift();
        //update position of block
        this.position.y += this.speed;

    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, 50, 50);
    }
}