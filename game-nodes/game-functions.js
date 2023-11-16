
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

function lanes(cxt){
    cxt.beginPath();
    cxt.setLineDash([10, 15]);
    cxt.moveTo(middle + 175,0);
    cxt.lineTo(middle + 175,canHeight);
    cxt.stroke();

    cxt.beginPath();
    cxt.setLineDash([10, 15]);
    cxt.moveTo(middle + 75,0);
    cxt.lineTo(middle + 75,canHeight);
    cxt.stroke();

    cxt.beginPath();
    cxt.setLineDash([10, 15]);
    cxt.moveTo(middle - 25, 0);
    cxt.lineTo(middle - 25, canHeight);
    cxt.stroke();

    cxt.beginPath();
    cxt.setLineDash([10, 15]);
    cxt.moveTo(middle - 125, 0);
    cxt.lineTo(middle - 125, canHeight);
    cxt.stroke();
}



function edges(cxt){
    //Left boundary
    cxt.beginPath();
    cxt.setLineDash([]);
    cxt.moveTo(middle - 225,0)
    cxt.lineTo(middle - 225,canHeight);
    cxt.stroke();

    //Right boundary
    cxt.beginPath();
    cxt.setLineDash([]);
    cxt.moveTo(middle + 275,0)
    cxt.lineTo(middle + 275,canHeight);
    cxt.stroke();

}

function gameDetails(cxt, score, lives, fuel){
    cxt.font = "48px serif";
    cxt.fillStyle = "black"
    cxt.fillText(`Score: ${score}`, 10, 50);

    cxt.font = "48px serif";
    cxt.fillStyle = "black"
    cxt.fillText(`Lives: ${lives}`, 10, 100);

    cxt.font = "42px serif";
    cxt.fillStyle = "black"
    cxt.fillText(`Fuel: ${fuel}%`, 10, 150);
}

function gameOver(cxt, score){
    cxt.font = "48px serif";
    cxt.fillStyle = "black"
    cxt.fillText("Game Over", middle - 80, 300);

    cxt.font = "48px serif";
    cxt.fillStyle = "black"
    cxt.fillText(`Your Score: ${score}`, middle - 100, 350);
}

function instructions(cxt){

}



module.exports = {
    canHeight,
    canWidth,
    middle,
    edges,
    lanes,
    randomXPos,
    gameDetails,
    randomInt,
    gameOver,
    uniqueInt
}