import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic.js"
import {uniqueInt, randomInt, gameOver, gameDetails} from "../game-nodes/game-functions"
import { canHeight, canWidth, middle } from "../game-nodes/game-functions"
import FuelTank from "../game-nodes/fuel.js"



const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")


canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")

// const background = new Image()
// background.src = "../game_imgs/highway_img.png"

function background(start, cxt){
    const bg = new Image()
    if (start) {
        bg.src = "../game_imgs/start-screen.png"
    } else {
        bg.src = "../game_imgs/highway_img.png"
    }
    cxt.drawImage(bg, 0, 0, canWidth, canHeight);
}


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

const blackCar = new Image()
blackCar.src = "../game_imgs/Black_viper.png"

const gasTank = new Image()
gasTank.src = "../game_imgs/gas_tank.png"

const carImgs = [
    blackCar,
    redCar,
    semiTruck,
    truck,
    police,
    taxi,
]

function makeRandomCar(){
    const randomImg = carImgs[randomInt(carImgs.length)]
    return new NpcCar(randomImg)
}

// Player car
const carImg = new Image()
carImg.src = "../game_imgs/Car.png"
const player = new Player(middle, canHeight - 125, carImg)


//Fuel timer
setInterval(() => {
    if (paused) {
        fuel -= 1
        if (vel > 4) fuel -= 1
        if (vel > 6) fuel -= 1
    }
}, 1000);

const levels = {
    8: 1.5,
    15: 2,
    20: 2.5,
    30: 3,
    40: 3.5,
    50: 4,
    60: 4.5,
    70: 5,
    100: 5.5,
    120: 6,
    150: 7,
    200: 7.5,
    300: 8,
    350: 9

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
let carsInPlay = [makeRandomCar()]
let fuelTanks = []
let score = 0;
let lives = 5;
let fuel = 100;
let vel = 1

function newGame(){
    carsInPlay = [makeRandomCar()]
    fuelTanks = []
    score = 0;
    lives = 5;
    fuel = 100;
    vel = 1
}

let paused = false;
let running = true;
let firstStart = true;
let gatePasses = null;




function animate() {
    if (lives < 1 || fuel < 1) running = false
    if (running) requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    background(firstStart, c)
    if (!running) {
        gameOver(c, score);
    } else {
        if (!firstStart) gameDetails(c, score, lives, fuel);
    }
   

    if (fuel < 90 && fuelTanks.length < 1) fuelTanks.push(new FuelTank(gasTank));

    if (keys.left.pressed) {
        if (player.x > middle - 290) player.x -= 5
    }
    if (keys.right.pressed) {
        if (player.x < middle + 240)player.x += 5
    }
    player.draw(c);
    for (let i = 0; i < carsInPlay.length; i++){
        const car = carsInPlay[i];
        car.draw(c);
        if (paused) car.move(vel)
        if (car.passedGate(vel)) {
            gatePasses++;
            if (carsInPlay.length < 8) {
                if (carsInPlay.length > 6){
                    if (gatePasses % 3 === 0) carsInPlay.push(makeRandomCar())
                } else {
                    carsInPlay.push(new NpcCar(carImgs[i]))
                }
            }

            if (gatePasses % 4 === 0)   {
                if (fuelTanks.length < 4) fuelTanks.push(new FuelTank(gasTank));
            }
        }

        

        let overLapCheck = carsInPlay.filter(ele => ele !== car)
        if (carsInPlay.length > 2){
            for (let i = 0; i < overLapCheck.length; i++) {
            if (car.collision(overLapCheck[i])) {
                car.respawn();
                break
            }
        }
        }
        
    
        if (player.playerCollision(car)) {
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
        if (paused) tank.move(vel);

        for (let i = 0; i < carsInPlay.length; i++){
            const car = carsInPlay[i]
            if (tank.collision(car)) {
                fuelTanks.splice(tankIdx, 1)
                break
            }
        };

        if (player.playerCollision(tank)) {
            fuelTanks.splice(tankIdx, 1)
            if (fuel < 95) fuel += 5;
        }

        if (tank.end(canHeight)) {
            tank.respawn();
        }

    })
}

animate()


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
    if (e.target.value) { 
        paused = !paused
        firstStart = false
        e.target.innerHTML = "Pause"
    }
})

