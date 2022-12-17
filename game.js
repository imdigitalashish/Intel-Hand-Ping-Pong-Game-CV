import { Ball } from "./ball.js";
import { canvasDimensions } from "./constants.js";
import { PongPaddle } from "./player.js";

class Game {

    constructor() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth - 400;
        this.canvas.height = window.innerHeight - 300;
        canvasDimensions.width = this.canvas.width;
        canvasDimensions.height = this.canvas.height;
        this.canvas.style.border = "1px solid white";

        this.ctx.fillStyle = "red";
        this.ctx.fillRect(10, 10, 10, 10)
        this.player1 = new PongPaddle({ position: { x: 40, y: this.canvas.height / 2.3 }, name: "player1" })
        this.player2 = new PongPaddle({ position: { x: this.canvas.width - 60, y: this.canvas.height / 2.3 }, name: "player2" })

        this.elements = [this.player1, this.player2]

        this.keys = [];

        this.ball = new Ball({ canvasDimensions: { width: this.canvas.width, height: this.canvas.height } });


        this.scores = {
            blue: 0,
            red: 0,
        }

        requestAnimationFrame(this.draw.bind(this));
        this.addEventListeners();
    }
    addEventListeners() {
        window.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
        })
        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
        })

    }

    collisionDetection() {
        if ((this.player1.position.x + this.player1.dimensions.width > this.ball.position.x) &&
            (this.player1.position.y < this.ball.position.y && this.player1.position.y + this.player1.dimensions.height > this.ball.position.y)) {
            console.log("COLLIDED");
            this.ball.velocity.x = -this.ball.velocity.x;
            this.scores.blue += 1;
            document.querySelector(".blue_score").innerHTML = "Score: " + this.scores.blue;
        }
        if ((this.player2.position.x < this.ball.position.x + this.ball.image.width * this.ball.scalingFactor) &&
            (this.player2.position.y < this.ball.position.y && this.player2.position.y + this.player2.dimensions.height > this.ball.position.y)) {
            console.log("COLLIDED");
            this.ball.velocity.x = -this.ball.velocity.x;
            this.scores.red += 1;
            document.querySelector(".red_score").innerHTML = "Score: " + this.scores.red;
        }
    }

    update() {

        this.ball.update(this.ctx)
        this.collisionDetection();
        this.elements.forEach((elem) => elem.update(this.keys));
    }

    lastTick = Date.now(); // 20

    draw(ts) {


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (Date.now() - this.lastTick > 14) {
            this.update();
            this.lastTick = Date.now();

        }


        this.elements.forEach((elem) => elem.draw(this.ctx))

        this.ball.draw(this.ctx)

        requestAnimationFrame(this.draw.bind(this))
    }

}


window.onload = () => {
    let game = new Game();
}