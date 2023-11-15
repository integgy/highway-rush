const { randomXPos } = require("./game-functions")


class FuelTank {
    constructor(img){
        this.l = 40
        this.h = 50
        this.x = randomXPos(this.l)
        this.y = -200
        this.color = "black"
        this.image = img
    }

    draw(cxt) {
        // cxt.fillStyle = this.color
        // cxt.fillRect(this.x, this.y, this.l, this.h)
        cxt.drawImage(
            this.image,
            this.x-4,
            this.y,
            50,
            50
        )
    }

    move(vel){
        this.y += vel
    }
    
    end(height){        
        if (this.y > height) return true
        
    }

    respawn(){
        this.x = randomXPos(this.l)
        this.y = -100
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
        const FrontSide = this.y + (this.h + 25) >= obj.y
        const BackSide = this.y <= obj.y + (obj.h + 25)
        
        if (RightSide && LeftSide && FrontSide && BackSide) {
            return true
        } else {
            return false
        }
    }



}

module.exports = FuelTank