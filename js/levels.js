export default class Levels{

    constructor() {
        this.speed = 7;
        this.spawnTime = 500;
    }

    easy() {
        return {speed:this.speed, spawnTime: this.spawnTime, type: "easy"};
    }

    medium() {
        this.spawnTime /= 2;
        this.speed = 8;
        return {speed:this.speed, spawnTime: this.spawnTime, type: "medium"};
    }

    hard() {
        this.speed = 10;
        this.spawnTime = 200;
        return {speed:this.speed, spawnTime: this.spawnTime, type: "hard"};
    }

    survival() {
        this.speed = 7;
        this.spawnTime = 500;
         return {speed:this.speed, spawnTime: this.spawnTime, type: "survival"};
    }
}