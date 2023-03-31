// Pick random background color
var background_colors = ["#bedcff", "#ffc4c4", "#c9ffd8", "#fdbcff", "#bcf8ff" ];
var background_bottom_colors = ["#1f3c61", "#611f1f", "#1f6129", "#5e1f61", "#1f5d61"];
var ran = Math.floor(Math.random() * background_colors.length);

document.getElementById("background-ID").style.backgroundColor = background_colors[ran];

document.getElementById("background-bottom-ID-1").style.backgroundColor = background_bottom_colors[ran];
document.getElementById("background-bottom-ID-2").style.backgroundColor = background_bottom_colors[ran];
document.getElementById("background-bottom-ID-3").style.backgroundColor = background_bottom_colors[ran];

// Draw
const canvas = document.getElementById("drawing-board");
toolBtns = document.querySelectorAll(".tool");
fillColor = document.querySelector("#fill-color");
sizeSlider = document.querySelector("#brush-slider");
colorBtns = document.querySelectorAll(".colors .option");
colorPicker = document.querySelector("#color-picker");
clearCanvas = document.querySelector("#clear-canvas");
saveImg = document.querySelector("#save-image");
toggle = document.querySelector("#toggle");
const ctx = canvas.getContext("2d");


let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "#000";

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    
    if (!fillColor.checked)
    {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath();

    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

// line tool
// const drawTriangle = (e) => {
//     ctx.beginPath();

//     ctx.moveTo(prevMouseX, prevMouseY);
//     ctx.lineTo(e.offsetX, e.offsetY);
//     ctx.stroke();
// }

const drawTriangle = (e) => {
    ctx.beginPath();

    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();

    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}
const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === "brush" || selectedTool === "eraser") 
    {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    else if (selectedTool === "rectangle")
    {
        drawRect(e);
    }
    else if (selectedTool === "circle")
    {
        drawCircle(e);
    }
    else if (selectedTool === "triangle")
    {
        drawTriangle(e);
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

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);


colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        var element = document.querySelector(".options .selected")
        
        if (element !== null)
        {
            element.classList.remove("selected");
        }

        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
});

colorPicker.addEventListener("change", () => {
    colorPicker.style.background = colorPicker.value;
    colorPicker.click();
});

if (!toggle.checked)
{
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", () => isDrawing = false);
}
