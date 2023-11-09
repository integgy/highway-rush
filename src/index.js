import Car from "../game-nodes/player-car"

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const canWidth = 1024
const canHeight = 576

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

const npcCar = new Car({
    pos: {
        x: canWidth/2,
        y: 200
    },
    size: {
        l: 50,
        h:70
    },
    color: "black"
    
})
let carsArr = new Array(5)

// function boxCollision(obj1, obj2){
//     if (obj1.pos.x + 50 >= canvas.width / 2 - 50)
// }

for (let i = 0; i < 5; i++){
    carsArr[i] = new Car({
        pos: {
            x: canWidth/2,
            y: 300
        },
        size: {
            l: 50,
            h:70
        },
        color: "black"
    })
}



carsArr[0].draw(c)



// Render map
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canWidth, canHeight);
    carsArr[0].draw(c);
    npcCar.draw(c);
    player.draw(c);
    if (player.pos.x + 50 >= npcCar.pos.x && 
        player.pos.x <= npcCar.pos.x + 50 &&
        player.pos.y + 70 >= npcCar.pos.y &&
        player.pos.y <= npcCar.pos.y + 70) {
        console.log("hit")
        npcCar.color = "red"
    } else {
        npcCar.color = "black"
    }
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