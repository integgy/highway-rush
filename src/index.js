import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic"

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const canWidth = 1024
const canHeight = 576
const middle = canWidth/2

canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")










// Player car
const player = new Player(middle)


function spawnPattern(car){
    function randomInt()  {return Math.floor(Math.random() * 3)} 
    const patternTwoCar = {
        0: [[middle, -100], [middle + 100, -100]],
        1: [[middle, -100], [middle, -200]],
        2: [[middle, -100], [middle - 100, -100]]
    }


    let randIdx = randomInt()
    for (let i = 0; i < car.length; i++){
        let x = patternTwoCar[randIdx][i][0]
        let y = patternTwoCar[randIdx][i][1]
        car[i].x = x
        car[i].y = y
    }

}

const npcCars = []
function makeCar(n) {
    n = new NpcCar()
    return n
}
for (let i = 0; i < 2; i++){
    npcCars.push(makeCar(i))
}

// Render map;
let on = false;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    let carsEnd = []
    player.draw(c)
    npcCars.forEach(car => {
        car.draw(c)
        if (on) car.move()
        player.playerCollision(car)
        if (car.end(canHeight)) carsEnd.push(car)
    });
    if (carsEnd.length > 1){
        spawnPattern(carsEnd)
        carsEnd = []
    }
    
    player.playerCollision(npcCars[0])

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