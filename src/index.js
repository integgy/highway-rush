import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic.js"
import { lanes, edges, gameOver, gameDetails} from "../game-nodes/game-functions"
import { canHeight, canWidth, middle } from "../game-nodes/game-functions"
import FuelTank from "../game-nodes/fuel.js"


const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")


canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")


// Player car
const player = new Player(middle, canHeight - 100)
let score = 0;
let lives = 5;
let fuel = 100;
let vel = 1




const carsInPlay = [new NpcCar()]
const fuelTanks = []


//Fuel timer
setInterval(() => {
    if (on) {
        fuel -= 5
        if (carsInPlay.length > 7)vel += .5
    }
}, 5000); 
   


// render Map and game logic
let on = false;
let running = true;
function animate() {
    if (lives === 0 || fuel === 0) running = false
    if (running) requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    if (!running) gameOver(c, score)
    edges(c);
    lanes(c);
    gameDetails(c, score, lives, fuel)
    if (fuel === 80 && fuelTanks.length < 1) fuelTanks.push(new FuelTank());

    player.draw(c);
    carsInPlay.forEach(car => {
        let carIdx = carsInPlay.indexOf(car); 
        car.draw(c);
        if (on) car.move(vel);
        if (car.passedGate()) {
            if (carsInPlay.length < 8) carsInPlay.push(new NpcCar());
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
        if (on) tank.move(vel);
        
        if (tank.passedGate() && fuelTanks.length < 6) fuelTanks.push(new FuelTank());

        
        carsInPlay.forEach(car => {
            if (tank.collision(car)) tank.respawn()
        })

        if (player.playerCollision(tank)) {
            tank.respawn();
            if (fuel < 100) fuel += 5;
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

