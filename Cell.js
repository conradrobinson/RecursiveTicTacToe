class Cell {
    constructor(depth, x, y, parentX, parentY, parentWidth, parentHeight) {
        this.x = x
        this.y = y
        this.depth = depth
        this.parentX = parentX
        this.parentY = parentY
        this.width = parentWidth/3
        this.height = parentHeight/3
        this.hovered = false;
        this.owner = undefined
        this.draw()
        if (depth != 0) {
            let pos = this.getCellPosition()
            this.game = new Game(depth, pos.x, pos.y, this.width, this.height)
        }
    }
    draw() {
        let pos = this.getCellPosition()
        let maxWidth = 5
        let lineWidth = maxWidth * 2 * (1/(1 + (2.7182818284**(-0.5*this.depth-1)))) - maxWidth
        canvas.beginPath()
        canvas.lineWidth = lineWidth
        canvas.strokeStyle = "#000000"
        if (this.owner != undefined) {
            if (this.owner == "o") {
                canvas.fillStyle = "#0000FF";
            }
            if (this.owner == "x") {
                canvas.fillStyle = "#FF0000"
            }
        } else {
            if (this.hovered) {
                if (turnTaker == "o") {
                    canvas.fillStyle = "#0000FF44";
                }
                if (turnTaker == "x") {
                    canvas.fillStyle = "#FF000044"
                }
            } else {
                if (this.depth == 0) {
                    canvas.fillStyle = "#FFFFFF" //blank 
                } else {
                    canvas.fillStyle = "#FFFFFF00" //blank, clear
                }
            }
        }
        canvas.rect(pos.x + lineWidth/2, pos.y + lineWidth/2, this.width - lineWidth, this.height - lineWidth)
        canvas.stroke()
        canvas.fill()
    }
    getCellPosition() {
        return {x: this.parentX + this.width*this.x, y: this.parentY + this.height*this.y}
    }
    isInBounds(pos) {
        let cellPos = this.getCellPosition()
        return (pos.x > cellPos.x && pos.y > cellPos.y && pos.x < cellPos.x + this.width && pos.y < cellPos.y + this.height)
    }
    update(lastMousePos, isHovered) {
        this.hovered = isHovered
        if (this.game != undefined) {
            this.game.update(lastMousePos)
        }
        this.draw()
    }
    updateState(lastMousePos, turnTaker) {
        if (this.game != undefined) {
            //we are not a root cell
            if (this.owner == undefined) {
                this.owner = this.game.updateState(lastMousePos, turnTaker)
            }
        } else {
            //we are a root cell so update the state of it
            if (this.owner == undefined) {
                this.owner = turnTaker
                clickSucceeded = true
            }
        }
        
    }

}