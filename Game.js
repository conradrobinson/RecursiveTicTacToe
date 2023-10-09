class Game {
    constructor(depth, parentX, parentY, parentWidth, parentHeight) {
        this.cells = []
        this.depth = depth
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.cells.push(new Cell(depth-1, j, i, parentX, parentY, parentWidth, parentHeight))
                }
            }
    }
    update(lastMousePos) {
        if (lastMousePos != undefined) {
            for (let i = 0; i < this.cells.length; i++) {
                if (this.cells[i].isInBounds(lastMousePos)) {
                    this.cells[i].update(lastMousePos, true)
                } else {
                    this.cells[i].update(lastMousePos, false)
                }
            }
        }
    }

    updateState(lastMousePos, turnTaker) {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].isInBounds(lastMousePos)) {
                this.cells[i].updateState(lastMousePos, turnTaker)
            }
        }
        return this.checkWinner()
    }
    checkWinner() {
        if (this.shareOwner(0, 1, 2)) {
            return this.cells[1].owner
        }
        if (this.shareOwner(3, 4, 5)) {
            return this.cells[3].owner
        }
        if (this.shareOwner(6,7,8)) {
            return this.cells[6].owner
        }
        if (this.shareOwner(0,3,6)) {
            return this.cells[0].owner
        }
        if (this.shareOwner(1,4,7)) {
            return this.cells[1].owner
        }
        if (this.shareOwner(2,5,8)) {
            return this.cells[2].owner
        }
        if (this.shareOwner(0,4,8)) {
            return this.cells[0].owner
        }
        if (this.shareOwner(2,4,6)) {
            return this.cells[2].owner
        }
        return undefined
    }
    shareOwner(cell1, cell2, cell3) {
        if (this.cells[cell1].owner == undefined) {
            return false
        }
        return (this.cells[cell1].owner == this.cells[cell2].owner) && (this.cells[cell1].owner == this.cells[cell3].owner)
    }
}