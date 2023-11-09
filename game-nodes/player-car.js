class Player {
    constructor({pos, vel}){
        this.pos = pos
        this.vel = vel
    }

    draw(cxt) {
        cxt.fillRect(this.pos.x, this.pos.y, 50, 70)
    }


}

module.exports = Player