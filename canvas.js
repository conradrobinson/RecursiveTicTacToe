
let canvasElement = document.getElementById("cnvs");
let canvas = canvasElement.getContext("2d")
let width = window.innerHeight
canvasElement.width = width
canvasElement.height = width
canvasElement.style.width = `${width}px`;
canvasElement.style.height = `${width}px`;
clickSucceeded = false
lastMousePos = {x: undefined, y: undefined}
turnTaker = "x"
cell = new Cell(3, 0, 0, 0, 0, width*3, width*3, false)
function update() {
    requestAnimationFrame(update);
    cell.update(lastMousePos, false)
}
update();

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  canvasElement.addEventListener('mousemove', function(evt) {
    lastMousePos = getMousePos(canvasElement, evt);
  }, false);
  canvasElement.addEventListener('click', function(evt) {
     cell.updateState(getMousePos(canvasElement, evt), turnTaker);
     if (clickSucceeded) {
        if (turnTaker == "x") {
            turnTaker = "o"
            document.body.style.backgroundColor = "#0000FF"
        } else {
            turnTaker = "x"
            document.body.style.backgroundColor = "#FF0000"
        }
        clickSucceeded = false
    }
  }, false);