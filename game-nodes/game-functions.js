
const canWidth = 1024
const canHeight = 700
const middle = canWidth/2



function randomInt(max)  {
    return Math.floor(Math.random() * max)
}

function randomXPos(item){
    const xArr = [
        middle - (item/2) - 235,
        middle - (item/2) - 120, 
        middle - (item/2), 
        middle - (item/2) + 120, 
        middle - (item/2) + 235
    ]
    return xArr[randomInt(xArr.length)]
}

function uniqueInt(max, previous) {
    let randomNum;
    
    do {
        randomNum = Math.floor(Math.random() * max);
    } while (randomNum === previous);

    return randomNum;
}


function gameDetails(cxt, score, lives, fuel){
    cxt.font = "48px Bebas Neue";
    cxt.fillStyle = "white"
    cxt.fillText(`Score: ${score}`, 10, 50);
}

function gameOver(cxt, score){
    cxt.font = "48px Bebas Neue";
    cxt.fillStyle = "white"
    cxt.fillText("Game Over", middle - 120, 300);

    cxt.font = "48px Bebas Neue";
    cxt.fillStyle = "white"
    cxt.fillText(`Your Score: ${score}`, middle - 140, 350);
}


module.exports = {
    canHeight,
    canWidth,
    middle,
    randomXPos,
    gameDetails,
    randomInt,
    gameOver,
    uniqueInt
}