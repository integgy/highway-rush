class Player {
    constructor(x){
        this.color = "black"
        this.x = x
        this.y = 500
        this.l = 50
        this.h = 70

    }

    draw(cxt) {
        cxt.fillStyle = this.color
        cxt.fillRect(this.x, this.y, this.l, this.h)
    }

    move(m) {

    }

    playerCollision(obj){
        const playerRightSide = this.x + this.l >= obj.x
        const playerLeftSide = this.x <= obj.x + obj.l
        const playerFrontSide = this.y + this.h >= obj.y
        const playerBackSide = this.y <= obj.y + obj.h

        if (playerRightSide && playerLeftSide && playerFrontSide && playerBackSide) {
            console.log("hit")
            obj.color = "red";
            return true
        } else {
            obj.color = "black";
        }
    }
}

module.exports = Player