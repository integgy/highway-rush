import Player from "../game-nodes/player-car"
import NpcCar from "../game-nodes/incoming-traffic.js"
import {randomInt, gameOver, gameDetails} from "../game-nodes/game-functions"
import { canHeight, canWidth, middle } from "../game-nodes/game-functions"
import FuelTank from "../game-nodes/fuel.js"


const startButton = document.querySelector('#start')
const canvas = document.querySelector("canvas")
const playerFuel = document.querySelector(".fuel-meter")
const playerLives = document.querySelector(".game-lives")
const c = canvas.getContext("2d")


canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")

function background(start, cxt){
    if (start) {
        bg.src = "./game_imgs/start-screen.png"
    } else {
        bg.src = "./game_imgs/highway_img.png"
    }
    cxt.clearRect(0, 0, canWidth, canHeight);
    cxt.drawImage(bg, 0, 0, canWidth, canHeight);
}

// Car imgs
const truck = new Image()
truck.src = "./game_imgs/Mini_truck.png"

const taxi = new Image()
taxi.src = "./game_imgs/taxi.png"

const semiTruck = new Image()
semiTruck.src = "./game_imgs/truck.png"

const police = new Image()
police.src = "./game_imgs/Police.png"

const redCar = new Image()
redCar.src = "./game_imgs/Audi.png"

const blackCar = new Image()
blackCar.src = "./game_imgs/Black_viper.png"



const gasTank = new Image()
gasTank.src = "./game_imgs/gas_tank.png"

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


const carImg = new Image()
carImg.src = "./game_imgs/Car.png"


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


function newGame(){
    setInterval(() => {
        if (paused) {
            fuel -= .5
            if (vel > 1) fuel -= .5
            if (vel > 4) fuel -= 1
            if (vel > 6) fuel -= 1
        }
    }, 1000);

    carsInPlay = [makeRandomCar()]
    fuelTanks = [];
    score = 0;
    lives = 5;
    fuel = 100;
    vel = 1;
    paused = false;
    running = true;
    gatePasses = null;
    animate()
}



// Player car and game details
const player = new Player(middle, canHeight - 125, carImg)
let carsInPlay;
let fuelTanks;
let score;
let lives;
let fuel;
let vel;


let bg = new Image()
let paused = false;
let running;
let firstStart = true;
let gatePasses;

// render Map and game logic
function animate() {
    playerFuel.style.width = `${fuel}%`
    playerLives.innerHTML = `Lives: ${lives}`
    if (lives < 1 || fuel < 1) {
        running = false
        paused = false
    }
    
    if (running) requestAnimationFrame(animate);
    background(firstStart, c)
    if (!running) {
        gameOver(c, score);
        startButton.innerHTML = "restart";
        startButton.value = "restart"
    } else if (!firstStart) {
         gameDetails(c, score, lives, fuel);
    }
   

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

            if (gatePasses % 3 === 0 || gatePasses === 1)   {
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
                tank.respawn()
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

newGame()


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



startButton.addEventListener("click", e =>{
    if (startButton.value === "restart") {
        startButton.innerHTML = "Pause"
        startButton.value = "pause"
        newGame()
        paused = true
    } else {
        paused = !paused
        firstStart = false
        if (!paused){
            startButton.innerHTML = "Continue"
            startButton.value = "continue"
        } else {
            startButton.innerHTML = "Pause"
            startButton.value = "pause"
        }

    }
    
})

