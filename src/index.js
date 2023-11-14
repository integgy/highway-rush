import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic.js"
import { randomInt, gameOver, gameDetails} from "../game-nodes/game-functions"
import { canHeight, canWidth, middle } from "../game-nodes/game-functions"
import FuelTank from "../game-nodes/fuel.js"



const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")


canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")

const background = new Image()
background.src = "../game_imgs/highway_img.png"

const truck = new Image()
truck.src = "../game_imgs/Mini_truck.png"

const taxi = new Image()
taxi.src = "../game_imgs/taxi.png"

const semiTruck = new Image()
semiTruck.src = "../game_imgs/truck.png"

const police = new Image()
police.src = "../game_imgs/Police.png"

const redCar = new Image()
redCar.src = "../game_imgs/Audi.png"

const carImgs = [truck,taxi,semiTruck,police,redCar]

function makeRandomCar(){
    const randomImg = carImgs[randomInt(carImgs.length)]
    return new NpcCar(randomImg)
}
// Player car
const carImg = new Image()
carImg.src = "../game_imgs/Car.png"
const player = new Player(middle, canHeight - 125, carImg)
let score = 0;
let lives = 5;
let fuel = 100;
let vel = 1

//Fuel timer
setInterval(() => {
    if (on) {
        fuel -= 1
        if (vel > 4) fuel -= 1
    }
}, 1000);

const levels = {
    10: 1.5,
    15: 2,
    20: 2.5,
    30: 3,
    40: 3.5,
    50: 4,
    60: 4.5,
    70: 5,
    100: 5.5,
    120: 6,
    200: 7
}
   
// Movement

const keys = {
    left:{
        pressed: false
    },
    right:{
        pressed: false
    }
}

// render Map and game logic
const carsInPlay = []
const fuelTanks = []
let on = false;
let running = true;
let amountOfCars = 1
let gatePasses = 0

function animate() {
    if (carsInPlay.length < 8) carsInPlay.push(makeRandomCar())
    if (lives < 1 || fuel < 1) running = false
    if (running) requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    c.drawImage(background, 0, 0, canWidth, canHeight);
    if (!running) gameOver(c, score);
    
    gameDetails(c, score, lives, fuel)
    if (fuel === 80 && fuelTanks.length < 1) fuelTanks.push(new FuelTank());
    if (keys.left.pressed) player.x -= 5
    if (keys.right.pressed) player.x += 5
    player.draw(c);
    for (let i = 0; i < amountOfCars; i++){
        const car = carsInPlay[i]; 
        car.draw(c);
        if (on) car.move(vel);
        if (car.passedGate(vel)) {
            if (amountOfCars < 8) amountOfCars++;
            gatePasses += 1
            if (gatePasses === 3){
                if (fuelTanks.length < 3) fuelTanks.push(new FuelTank())
                gatePasses = 0
            }
            
        }
    
        if (player.playerCollision(car)) {
            amountOfCars--
            carsInPlay.splice(i, 1);
            lives -= 1;
        }

        if (car.end(canHeight)) {
            score += 1;
            car.respawn();
            if (levels[score]) vel = levels[score];
        }
                
    }


    fuelTanks.forEach(tank => {
        let tankIdx = fuelTanks.indexOf(tank);
        tank.draw(c);
        // if (tank.passedGate() && fuelTanks.length < 4) fuelTanks.push(new FuelTank());
        if (on) tank.move(vel)

        for (let i = 0; i < amountOfCars; i++){
            const car = carsInPlay[i]
            if (tank.collision(car)) {
                fuelTanks.splice(tankIdx, 1)
                console.log("overlap")
                break
            }
        };

        if (player.playerCollision(tank)) {
            fuelTanks.splice(tankIdx, 1)
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
            keys.left.pressed = true
            break
        case "ArrowRight":
            keys.right.pressed = true
            break
    }
})

window.addEventListener("keyup", e => {
    switch (e.key) {
        case "ArrowLeft":
            keys.left.pressed = false
            break
        case "ArrowRight":
            keys.right.pressed = false
            break
    }
})

window.addEventListener("click", e => {
    console.log(vel)
})

const startButton = document.querySelector('#start')
startButton.addEventListener("click", e =>{
    if (e.target.value) on = !on
})

