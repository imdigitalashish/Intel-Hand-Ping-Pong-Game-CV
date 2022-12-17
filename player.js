import { canvasDimensions } from "./constants.js";

export class PongPaddle {
    constructor({ position, name }) {
        this.position = position // Vector;
        this.velocity = { x: 10, y: 10 }
        this.dimensions = {
            width: 20,
            height: 120,
        }
        this.name = name;
        this.color = "red";
    }


    update(keys) {
        switch (this.name) {
            case "player1":
                this.color = "blue";
                if (keys.w) {
                    this.position.y = this.position.y - this.velocity.y;
                }

                if (keys.s) {
                    this.position.y += this.velocity.y;
                }
                break;
            case "player2":
                this.color = "red";
                if (keys.ArrowUp) {
                    this.position.y = this.position.y - this.velocity.y;

                }
                if (keys.ArrowDown) {
                    this.position.y += this.velocity.y;

                }
                break;
        }
        this.collisionDetections();



    }


    collisionDetections() {
        if (this.position.y + this.dimensions.height >= canvasDimensions.height) {
            this.position.y = canvasDimensions.height - this.dimensions.height;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        }
    }





    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
}