import { ballImage } from "./assets.js";

export class Ball {
    constructor({ canvasDimensions }) {
        this.image = ballImage;
        this.canvasDimensions = canvasDimensions;
        this.scalingFactor = 0.15;

        this.position = { x: this.canvasDimensions.width / 2.2, y: this.canvasDimensions.height / 2.2 };
        this.velocity = {
            x: 7,
            y: 7,
        }
        this.angle = Math.random() * 360;
    }

    update(keys) {
        this.position.x += Math.cos(this.angle * Math.PI / 180) * this.velocity.x;
        this.position.y -= Math.sin(this.angle * Math.PI / 180) * this.velocity.y;

        this.collisions();
    }

    collisions() {
        if (this.position.x < 0 || this.position.x + this.image.width * this.scalingFactor > this.canvasDimensions.width) {

            this.velocity.x = -this.velocity.x;
        }

        if (this.position.y + this.image.height * this.scalingFactor > this.canvasDimensions.height || this.position.y < 0) {
            this.velocity.y = -this.velocity.y
        }
    }


    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width * this.scalingFactor, this.image.height * this.scalingFactor);
    }
}