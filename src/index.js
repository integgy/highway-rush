import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic"



const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const canWidth = 1024
const canHeight = 576
const middle = canWidth/2
let on = false;

canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")










// Player car
const player = new Player(middle)
let score = 0


function spawnPattern(car){
    function randomInt()  {return Math.floor(Math.random() * 9)}
    const laneOne = [middle - 200, -100]
    const laneTwo = [middle - 100, -100]
    const laneThree = [middle, -100]
    const laneFour = [middle + 100, -100]
    const laneFive = [middle + 200, -100]
    const rowOne = -100
    const rowTwo = -200

    const pattern = {
        0: [laneThree, laneFour, laneFive],
        1: [laneFour, laneFive, laneOne],
        2: [laneThree, laneFour, laneTwo],
        3: [laneThree, laneFour, laneFive],
        4: [laneThree, laneFour, laneOne],
        5: [laneOne, laneThree, laneFour],
        6: [laneOne, laneFour, laneFive],
        7: [laneOne, laneTwo, laneThree],
        8: [laneOne, laneTwo, laneFour],
        9: [laneOne, laneTwo, laneFive]
    }


    let randIdx = randomInt()
    console.log(randIdx)
    for (let i = 0; i < 3; i++){
        let x = pattern[randIdx][i][0]
        let y = pattern[randIdx][i][1]
        car[i].x = x
        car[i].y = y
    }

    // return pattern[randIdx].length

}

function edges(){
    c.beginPath();
    c.moveTo(middle - 225,0)
    c.lineTo(middle - 225,canHeight);
    c.stroke();

    c.beginPath();
    c.moveTo(middle + 275,0)
    c.lineTo(middle + 275,canHeight);
    c.stroke();

    c.beginPath();
    c.moveTo(middle + 275, 100)
    c.lineTo(287, 100);
    c.stroke();

    c.font = "48px serif";
    c.fillText(`Score: ${score}`, 10, 50);


}



function passedGate(car) {
   if (car.y === 100){
    return true
   } else {
    return false
   }
}

// Render map;
const carsInPlay = [new NpcCar()]
const carsStart = []
function animate() {
    requestAnimationFrame(animate);    
    c.clearRect(0, 0, canWidth, canHeight);
    edges()
    player.draw(c)
    carsInPlay.forEach(car => {
        let carIdx = carsInPlay.indexOf(car)
        if (passedGate(car) && carsInPlay.length != 9) carsInPlay.push(new NpcCar())
        car.draw(c)
        if (on) car.move()
        if (player.playerCollision(car)) carsInPlay.splice(carIdx, 1)
        if (car.end(canHeight)) {
            score += 1
            car.respawn()
        }
    });
    


    // if (carsStart.length > 2) {
    //     spawnPattern(carsStart)
    //     carsStart.slice(0, 3)
    // }

    
}

animate()


window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowLeft":
            console.log("left")
            player.x -= 10
            break
        case "ArrowRight":
            console.log("right")
            player.x += 10
            break
    }

})

window.addEventListener("click", e => {
    console.log(e)
})

const startButton = document.querySelector('#start')
startButton.addEventListener("click", e =>{
    if (e.target.value) on = !on
})


// old patterns may use later
// 0: [[laneOne, -100],[laneTwo, -100], [laneThree, -100], [laneFour, -200],[laneFive, -200]],
// 1: [[laneOne, -100],[laneTwo, -100],[laneTwo, -200], [laneFour, -100],[laneFour, -200]],
// 2: [[laneOne, -100], [laneTwo, -100], [laneTwo, -200], [laneOne, -200], [laneFour, -100]],
// 3: [[laneTwo, -100],[laneFour, -100],[laneFour, -200],[laneFive, -100], [laneFive, -200]],
// 4: [[laneOne,-100],[laneOne,-200],[laneFour,-100],[laneFour,-200],[laneFive,-100]]