
const canWidth = 1024
const canHeight = 576
const middle = canWidth/2

function randomInt(max)  {
    return Math.floor(Math.random() * max)
}

function randomXPos(){
    const xArr = [middle - 200, middle - 100, middle, middle + 100, middle + 200]
    return xArr[randomInt(xArr.length)]
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


    //Car spawn gate
    // c.beginPath();
    // c.setLineDash([]);
    // c.moveTo(middle + 275, 100)
    // c.lineTo(287, 100);
    // c.stroke();

}

function gameDetails(cxt, score, lives, fuel){
    cxt.font = "48px serif";
    cxt.fillStyle = "black"
    cxt.fillText(`Score: ${score}`, 10, 50);

    cxt.font = "48px serif";
    cxt.fillStyle = "black"
    cxt.fillText(`Lives: ${lives}`, 10, 100);

    cxt.font = "48px serif";
    cxt.fillStyle = "black"
    cxt.fillText(`Fuel: ${fuel}%`, 10, 150);
}

module.exports = {
    canHeight,
    canWidth,
    middle,
    edges,
    lanes,
    randomXPos,
    gameDetails,
    randomInt
}