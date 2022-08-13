export default class Paddle{

    constructor(game) {
        this.gamewidth = game.gamewidth;
        this.alive = true;

        this.maxSpeed = 10;
        this.speed = 0;

        this.height = 30;
        this.width = 100;

        this.position = {
            x: game.gamewidth / 2 - this.width / 2,
            y: game.gameheight - this.height - 10,
        }
        
    }

    update(deltaTime) {
        this.position.x += this.speed;

        if (this.position.x < 0) this.position.x = 0;

        if (this.position.x + this.width > this.gamewidth)
            this.position.x = this.gamewidth - this.width;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;

    }

    stop() {
        this.speed = 0;
    }


    draw(ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
         
    }
}