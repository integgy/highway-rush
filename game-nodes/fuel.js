const { randomXPos } = require("./game-functions")


class FuelTank {
    constructor(){
        this.x = (randomXPos() + 15)
        this.y = -300
        this.l = 25
        this.h = 25
        this.color = "red"
    }

    draw(cxt) {
        cxt.fillStyle = this.color
        cxt.fillRect(this.x, this.y, this.l, this.h)
    }

    move(vel){
        this.y += vel
    }
    
    end(height){        
        if (this.y > height) return true
        
    }

    respawn(){
        this.x = (randomXPos() + 15)
        this.y = -300
    }

    passedGate() {
        if (this.y === 225){
         return true
        } else {
         return false
        }
     }

    collision(obj){
        const RightSide = this.x + this.l >= obj.x
        const LeftSide = this.x <= obj.x + obj.l
        const FrontSide = this.y + this.h >= obj.y
        const BackSide = this.y <= obj.y + obj.h
        
        if (RightSide && LeftSide && FrontSide && BackSide) {
            return true
        } else {
            return false
        }
    }



}

module.exports = FuelTank