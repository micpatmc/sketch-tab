// DRAWING LOGIC
// References
const canvas = document.getElementById("drawing-board");
toolBtns = document.querySelectorAll(".tool");
fillColor = document.querySelector("#fill-color");
sizeSlider = document.querySelector("#brush-slider");
sizeOutput = document.querySelector("#size-output");
colorBtns = document.querySelectorAll(".colors .option");
colorPicker = document.querySelector("#color-picker");
clearCanvas = document.querySelector("#clear-canvas");
saveImg = document.querySelector("#save-image");
const ctx = canvas.getContext("2d");

// Variables to determine mouse position, whether the user is drawing,
// and then the tool, brush width, and draw color
let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "#000";

// Set the canvas background to white
const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
}

// Set the canvas background when page first loads
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

// Draw a rectangle
const drawRect = (e) => {
    if (!fillColor.checked)
    {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

// Draw a circle
const drawCircle = (e) => {
    ctx.beginPath();

    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

// Draw a triangle
const drawTriangle = (e) => {
    ctx.beginPath();

    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

// Draw a line
const drawLine = (e) => {
    ctx.beginPath();

    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke();
}

// Start drawing
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

// What happens during drawing based off the selected tool
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
    else if (selectedTool === "line")
    {
        drawLine(e);
    }
}

// Determine which tool is active
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

// Determine which color is active
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        var element = document.querySelector(".options .selected")
        
        if (element !== null)
        {
            element.classList.remove("selected");
        }

        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("color");
    });
});

// Change the brush width based off UI element
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

// Update the slider value each time it is changed
sizeSlider.addEventListener("input", () => sizeOutput.value = sizeSlider.value);

// Clear the canvas and make it all white
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

// Save the current image to the local drive
saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
});

// Change the current color to the color selected in the color picker
colorPicker.addEventListener("change", () => {
    colorPicker.style.backgroundColor = colorPicker.value;
    colorPicker.style.color = colorPicker.value;
    colorPicker.click();
});

// Listeners for mouse movement
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);


// SELECT COLOR LOGIC
// Pick random background color
var background_colors = ["#bedcff", "#ffc4c4", "#c9ffd8", "#fdbcff", "#bcf8ff" ];
var background_bottom_colors = ["#1f3c61", "#611f1f", "#1f6129", "#5e1f61", "#1f5d61"];
var ran = Math.floor(Math.random() * background_colors.length);

document.getElementById("background-ID").style.backgroundColor = background_colors[ran];

document.getElementById("background-bottom-ID-1").style.backgroundColor = background_bottom_colors[ran];
document.getElementById("background-bottom-ID-2").style.backgroundColor = background_bottom_colors[ran];
document.getElementById("background-bottom-ID-3").style.backgroundColor = background_bottom_colors[ran];

// SWITCH SCREENS LOGIC
// Switch between searching and drawing
const checkbox = document.getElementById("switch-input");

const drawingBackground = document.getElementById("drawing-background");
const searchingBackground = document.getElementById("searching-background");
const switchText = document.getElementById("switch-text");

window.onload = setScreen = () => {
    switchText.innerHTML = "search mode";
    drawingBackground.style.display = "none";
    searchingBackground.style.display = "flex"; 

    drawingBackground.style.zIndex = 0; 
    searchingBackground.style.zIndex = 1; 
};

checkbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    drawingBackground.style.display = "flex";
    drawingBackground.style.opacity = 1; 
    searchingBackground.style.display = "none"; 

    drawingBackground.style.zIndex = 0; 
    searchingBackground.style.zIndex = 1; 

    switchText.innerHTML = "draw mode";
  } else {
    drawingBackground.style.display = "none"; 
    searchingBackground.style.display = "flex"; 

    drawingBackground.style.zIndex = 0; 
    searchingBackground.style.zIndex = 1; 

    switchText.innerHTML = "search mode";
  }
});

// CHANGE TIME LOGIC
function displayime() {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById("session");

    if (hrs >= 12)
    {
        session.innerHTML = "PM";
    }
    else
    {
        session.innerHTML = "AM";
    }

    if (hrs > 12)
    {
        hrs = hrs - 12;
    }

    if (min < 10)
    {
        min = "0" + dateTime.getMinutes();
    }

    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = min;
    document.getElementById("seconds").innerHTML = sec;
}

setInterval(displayime, 10);
    

