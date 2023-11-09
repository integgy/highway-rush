import Car from "../game-nodes/player-car"

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const canWidth = 1024
const canHeight = 576
const middle = canWidth/2

canvas.width = canWidth
canvas.height = canHeight

console.log("Webpack is running :)")

// Player car
const player = new Car({
    pos: {
        x: canWidth/2,
        y: 500
    },
    size: {
        l: 50,
        h:70
    },
    color: "black"
})
// Array of cars
let carsArr = new Array(5)

const carStartPos = [(middle - 200),(middle - 100),middle, (middle + 100), (middle + 200)]
for (let i = 0; i < carsArr.length; i++){
    carsArr[i] = new Car({
        pos: {
            x: carStartPos[i],
            y: 10
        },
        size: {
            l: 50,
            h:70
        },
        color: "black"
    })
}





function boxCollision(obj){
    const playerRightSide = player.pos.x + player.h >= obj.pos.x
    const playerLeftSide = player.pos.x <= obj.pos.x + obj.h
    const playerFrontSide = player.pos.y + player.h >= obj.pos.y
    const playerBackSide = player.pos.y <= obj.pos.y + obj.h

    if (playerRightSide && playerLeftSide && playerFrontSide && playerBackSide) {
        console.log("hit")
        obj.color = "red";
    } else {
        obj.color = "black";
    }
}









// Render map;
let on = false;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    carsArr.forEach(car => {
        car.draw(c);
        boxCollision(car);
        if (on) car.move();
    })
    player.draw(c);
}
animate()

window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            player.pos.y -= 10;
            break
        case "ArrowDown":
            console.log("down")
            player.pos.y += 10
            break
        case "ArrowLeft":
            console.log("left")
            player.pos.x -= 10
            break
        case "ArrowRight":
            console.log("right")
            player.pos.x += 10
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