const { randomXPos } = require("./game-functions")

class NpcCar {
    constructor(){
        this.x = randomXPos()
        this.y = -100
        this.l = 50
        this.h = 70
        this.color = "black"
    }

    draw(cxt) {
        cxt.fillStyle = this.color
        cxt.fillRect(this.x, this.y, this.l, this.h)
    }

    move(){
        this.y += 1
    }

    end(height){        
        if (this.y > height) return true
        
    }

    respawn(){
        this.x = randomXPos()
        this.y = -100
    }

    passedGate() {
        if (this.y === 100){
         return true
        } else {
         return false
        }
     }


}

module.exports = NpcCar


















// function spawnPattern(car){
//     function randomInt()  {return Math.floor(Math.random() * 9)}
//     const laneOne = [middle - 200, -100]
//     const laneTwo = [middle - 100, -100]
//     const laneThree = [middle, -100]
//     const laneFour = [middle + 100, -100]
//     const laneFive = [middle + 200, -100]
//     const rowOne = -100
//     const rowTwo = -200

//     const pattern = {
//         0: [laneThree, laneFour, laneFive],
//         1: [laneFour, laneFive, laneOne],
//         2: [laneThree, laneFour, laneTwo],
//         3: [laneThree, laneFour, laneFive],
//         4: [laneThree, laneFour, laneOne],
//         5: [laneOne, laneThree, laneFour],
//         6: [laneOne, laneFour, laneFive],
//         7: [laneOne, laneTwo, laneThree],
//         8: [laneOne, laneTwo, laneFour],
//         9: [laneOne, laneTwo, laneFive]
//     }


//     let randIdx = randomInt()
//     console.log(randIdx)
//     for (let i = 0; i < 3; i++){
//         let x = pattern[randIdx][i][0]
//         let y = pattern[randIdx][i][1]
//         car[i].x = x
//         car[i].y = y
//     }

//     // return pattern[randIdx].length

// }