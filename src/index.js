import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic"
import { lanes, edges, gameDetails} from "../game-nodes/game-functions"


const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

export const canWidth = 1024
export const canHeight = 576
export const middle = canWidth/2


canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")


// Player car
const player = new Player(middle)
let score = 0;
let lives = 5;
let fuel = 100;


// Render map;
let on = false;
const carsInPlay = [new NpcCar()]
const carsStart = []
let timer = 0

//Fuel timer
setInterval(() => {
    if (on) fuel -= 5
}, 5000); 
   



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    edges(c);
    lanes(c);
    gameDetails(c, score, lives, fuel)

    player.draw(c);
    carsInPlay.forEach(car => {
        let carIdx = carsInPlay.indexOf(car);
        if (car.passedGate() && carsInPlay.length != 8) carsInPlay.push(new NpcCar());
        car.draw(c);
        if (on) car.move();
        if (player.playerCollision(car)) {
            carsInPlay.splice(carIdx, 1)
            lives -= 1
        }
        if (car.end(canHeight)) {
            score += 1
            car.respawn()
        }
    });

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

