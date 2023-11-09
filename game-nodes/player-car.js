class Car {
    constructor({pos, vel, color, size}){
        this.pos = pos
        this.vel = vel
        this.color = color
        this.l = size.l
        this.h = size.h
    }

    draw(cxt) {
        cxt.fillStyle = this.color
        cxt.fillRect(this.pos.x, this.pos.y, this.l, this.h)
    }

    move() {
        const randomMove = [.1,.2,.3,.4,.5]
        function randomInt() { return Math.floor(Math.random() * randomMove.length)}

        // this.pos.y += randomMove[randomInt()]
        this.pos.y += 1
    }

    // rest()


}

module.exports = Car