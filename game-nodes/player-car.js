class Car {
    constructor({pos, vel, color,size}){
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
        this.pos.y += .5
    }


}

module.exports = Car