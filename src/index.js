import Player from "../game-nodes/player-car"

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const cTwo = canvas.getContext("2d")

const canWidth = 1024
const canHeight = 576

canvas.width = canWidth
canvas.height = canHeight
console.log("Webpack is running :)")

// Player car
const player = new Player({
    pos: {
        x: canWidth/2,
        y: 500
    }
})


// Render map
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canWidth, canHeight)
    player.draw(c)
}
animate()



window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            console.log("up")
            player.pos.y -= 10
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