import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic.js"
import Fuel from "../game-nodes/fuel.js"
import { lanes, edges, gameDetails} from "../game-nodes/game-functions"
import { canHeight, canWidth, middle } from "../game-nodes/game-functions"
import FuelTank from "../game-nodes/fuel.js"


const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

// export const canWidth = 1024
// export const canHeight = 576
// export const middle = canWidth/2


canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")


// Player car
const player = new Player(middle)
let score = 0;
let lives = 5;
let fuel = 100;



let on = false;
const carsInPlay = [new NpcCar()]
const fuelTanks = []
let timer = 0

//Fuel timer
setInterval(() => {
    if (on) fuel -= 5
}, 5000); 
   


// render Map and game logic
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    edges(c);
    lanes(c);
    gameDetails(c, score, lives, fuel)
    if (fuel === 85 && fuelTanks.length < 1) fuelTanks.push(new FuelTank());

    player.draw(c);
    carsInPlay.forEach(car => {
        let carIdx = carsInPlay.indexOf(car); 
        car.draw(c);
        if (on) car.move();
        if (car.passedGate()) {
            if (carsInPlay.length < 7) carsInPlay.push(new NpcCar());
            // if (fuelTanks.length < 1) fuelTanks.push(new FuelTank());
        }
            
    
        if (player.playerCollision(car)) {
            carsInPlay.splice(carIdx, 1);
            lives -= 1;
        }
        if (car.end(canHeight)) {
            score += 1;
            car.respawn();
        }
    });


    fuelTanks.forEach(tank => {
        let tankIdx = fuelTanks.indexOf(tank);
        tank.draw(c);
        if (on) tank.move();
        
        if (tank.passedGate() && fuelTanks.length < 5) fuelTanks.push(new FuelTank());

        carsInPlay.forEach(car => {
            if (tank.collision(car)) tank.respawn()
        })

        if (player.playerCollision(tank)) {
            fuelTanks.splice(tankIdx, 1);
            if (fuel !== 100) fuel += 5;
        }

        if (tank.end(canHeight)) {
            tank.respawn();
        }

    })
    

}

animate();


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

