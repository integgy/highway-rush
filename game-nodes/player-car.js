class Player {
    constructor(x, y){
        this.color = "blue"
        this.x = x
        this.y = y
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
            return true
        }
    }
}

module.exports = Player