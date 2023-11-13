
class Fuel {
    constructor(){
        const middle = 512
        const xArr = [middle - 200, middle - 100, middle, middle + 100, middle + 200]
        function randomInt()  {return Math.floor(Math.random() * 5)}

        this.x = xArr[randomInt()]
        this.y = -100
        this.l = 50
        this.h = 50
        this.color = "black"
    }

}