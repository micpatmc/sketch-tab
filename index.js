// Pick random background color
var background_colors = ["#87bdff", "#ffa0a0", "#b0ffc5", "#fb87ff", "#87f3ff" ];
var background_bottom_colors = ["#1f3c61", "#611f1f", "#1f6129", "#5e1f61", "#1f5d61"];
var ran = Math.floor(Math.random() * background_colors.length);

document.getElementById("background_ID").style.backgroundColor = background_colors[ran];
document.getElementById("background_bottom_ID").style.backgroundColor = background_bottom_colors[ran];

// Draw
const canvas = document.getElementById("drawing-board");
toolBtns = document.querySelectorAll(".tool");
const ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRect = (e) => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}
const drawing = (e) => {
    if (!isDrawing) return;

    if (selectedTool === "brush") 
    {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    else if (selectedTool === "rectangle")
    {
        drawRect(e);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        var element = document.querySelector(".options .active")
        
        if (element !== null)
        {
            element.classList.remove("active");
        }

        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);