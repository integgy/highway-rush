import { middle, canHeight, canWidth } from "../src";

export function randomInt(max)  {
    return Math.floor(Math.random() * max)
}

export function lanes(cxt){
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



export function edges(cxt){
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

export function gameDetails(cxt, score, lives, fuel){
    cxt.font = "48px serif";
    cxt.fillText(`Score: ${score}`, 10, 50);

    cxt.font = "48px serif";
    cxt.fillText(`Lives: ${lives}`, 10, 100);

    cxt.font = "48px serif";
    cxt.fillText(`Fuel: ${fuel}%`, 10, 150);
}