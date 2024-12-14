// #region Drawing logic
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
let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5,
  selectedColor = "#000";

// Set the canvas background to white
const setCanvasBackground = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
};

// Set the canvas background when page first loads
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setCanvasBackground();
});

// Draw a rectangle
const drawRect = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

// Draw a circle
const drawCircle = (e) => {
  ctx.beginPath();

  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

// Draw a triangle
const drawTriangle = (e) => {
  ctx.beginPath();

  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

// Draw a line
const drawLine = (e) => {
  ctx.beginPath();

  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.closePath();
  ctx.stroke();
};

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
};

// What happens during drawing based off the selected tool
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else if (selectedTool === "triangle") {
    drawTriangle(e);
  } else if (selectedTool === "line") {
    drawLine(e);
  }
};

// Determine which tool is active
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    var element = document.querySelector(".options .active");

    if (element !== null) {
      element.classList.remove("active");
    }

    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});

// Determine which color is active
colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    var element = document.querySelector(".options .selected");

    if (element !== null) {
      element.classList.remove("selected");
    }

    btn.classList.add("selected");
    selectedColor = window.getComputedStyle(btn).getPropertyValue("color");
  });
});

// Change the brush width based off UI element
sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value));

// Update the slider value each time it is changed
sizeSlider.addEventListener(
  "input",
  () => (sizeOutput.value = sizeSlider.value)
);

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
canvas.addEventListener("mouseup", () => (isDrawing = false));

// #endregion

// #region Pick random background color
var background_colors = ["#bedcff", "#ffc4c4", "#c9ffd8", "#fdbcff", "#bcf8ff"];
var background_bottom_colors = [
  "#1f3c61",
  "#611f1f",
  "#1f6129",
  "#5e1f61",
  "#1f5d61",
];
var ran = Math.floor(Math.random() * background_colors.length);

document.getElementById("background-ID").style.backgroundColor =
  background_colors[ran];

document.getElementById("background-bottom-ID-1").style.backgroundColor =
  background_bottom_colors[ran];
document.getElementById("background-bottom-ID-2").style.backgroundColor =
  background_bottom_colors[ran];
document.getElementById("background-bottom-ID-3").style.backgroundColor =
  background_bottom_colors[ran];

// #endregion

// #region Switch between searching and drawing
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

// #endregion

// #region Change time logic
function displayime() {
  var dateTime = new Date();
  var hrs = dateTime.getHours();
  var min = dateTime.getMinutes();
  var sec = dateTime.getSeconds();
  var session = document.getElementById("session");

  if (hrs >= 12) {
    session.innerHTML = "PM";
  } else {
    session.innerHTML = "AM";
  }

  if (hrs > 12) {
    hrs = hrs - 12;
  }

  if (hrs == 0) hrs = 12;

  if (min < 10) {
    min = "0" + dateTime.getMinutes();
  }

  document.getElementById("hours").innerHTML = hrs;
  document.getElementById("minutes").innerHTML = min;
  document.getElementById("seconds").innerHTML = sec;
}

setInterval(displayime, 10);

// #endregion

// #region Change background photo
let backgroundPic = document.getElementById("background-ID");
let inputFile = document.getElementById("input-file");

let bgButton1 = document.getElementById("saved-background-1");

var savedBG1 = document.getElementById("saved-background-img-1");
var savedBG2 = document.getElementById("saved-background-img-2");
var savedBG3 = document.getElementById("saved-background-img-3");

var savedCounter = 1;

inputFile.onchange = function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("recent-image", reader.result);
  });

  reader.readAsDataURL(this.files[0]);
  backgroundPic.style.backgroundImage =
    "url(" + URL.createObjectURL(inputFile.files[0]) + ")";

  savedBG1.src = savedBG2.src;
  savedBG2.src = savedBG3.src;
  savedBG3.src = URL.createObjectURL(inputFile.files[0]);

  localStorage.setItem("saved-image-1", savedBG1.src);
  localStorage.setItem("saved-image-2", savedBG2.src);
  localStorage.setItem("saved-image-3", savedBG3.src);
};

document.addEventListener("DOMContentLoaded", () => {
  const recentImageDataUrl = localStorage.getItem("recent-image");
  const savedBG1Data = localStorage.getItem("saved-image-1");
  const savedBG2Data = localStorage.getItem("saved-image-2");
  const savedBG3Data = localStorage.getItem("saved-image-3");

  if (recentImageDataUrl) {
    backgroundPic.style.backgroundImage = "url(" + recentImageDataUrl + ")";
  } else {
    backgroundPic.style.backgroundImage = "url(./images/background-2.jpg)";
  }

  if (savedBG1Data) savedBG1.src = localStorage.getItem("saved-image-1");

  if (savedBG2Data) savedBG2.src = localStorage.getItem("saved-image-2");

  if (savedBG3Data) savedBG3.src = localStorage.getItem("saved-image-3");
});

// #endregion

// #region Change text color
settings_ColorBtns = document.querySelectorAll(".colors-section .option");

settings_hours = document.getElementById("hours");
settings_minutes = document.getElementById("minutes");
settings_separation = document.getElementById("time-separation");
settings_session = document.getElementById("session");
settings_upload = document.getElementById("input-file-text");
settings_switchText = document.getElementById("switch-text");
settings_textColor = document.getElementById("text-color");
settings_textBackground = document.getElementById("text-background");
settings_textTime = document.getElementById("text-time");

// settings_toolbar = document.getElementById("toolbar-text");
// settings_shapes = document.getElementById("shapes-text");
// settings_other = document.getElementById("other-text");

settings_colorpicker = document.getElementById("settings-color-picker");

settings_ColorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    var element = document.querySelector(".options .selected");

    if (element !== null) {
      element.classList.remove("selected");
    }

    btn.classList.add("selected");
    settings_hours.style.color = window
      .getComputedStyle(btn)
      .getPropertyValue("color");
    settings_minutes.style.color = window
      .getComputedStyle(btn)
      .getPropertyValue("color");
    settings_separation.style.color = window
      .getComputedStyle(btn)
      .getPropertyValue("color");
    settings_session.style.color = window
      .getComputedStyle(btn)
      .getPropertyValue("color");
    settings_upload.style.color = window
      .getComputedStyle(btn)
      .getPropertyValue("color");
    settings_switchText.style.color = window
      .getComputedStyle(btn)
      .getPropertyValue("color");
    // settings_textColor.style.color = window.getComputedStyle(btn).getPropertyValue("color");
    // settings_toolbar.style.color = window.getComputedStyle(btn).getPropertyValue("color");
    // settings_shapes.style.color = window.getComputedStyle(btn).getPropertyValue("color");
    // settings_other.style.color = window.getComputedStyle(btn).getPropertyValue("color");
    // settings_textBackground.style.color = window.getComputedStyle(btn).getPropertyValue("color");

    localStorage.setItem(
      "text-color",
      window.getComputedStyle(btn).getPropertyValue("color")
    );
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const recentTextColor = localStorage.getItem("text-color");

  settings_hours.style.color = recentTextColor;
  settings_minutes.style.color = recentTextColor;
  settings_separation.style.color = recentTextColor;
  settings_session.style.color = recentTextColor;
  settings_upload.style.color = recentTextColor;
  settings_switchText.style.color = recentTextColor;
  // settings_textColor.style.color = recentTextColor;
  // settings_toolbar.style.color = recentTextColor;
  // settings_shapes.style.color = recentTextColor;
  // settings_other.style.color = recentTextColor;
  // settings_textBackground.style.color = recentTextColor;
});

settings_colorpicker.addEventListener("change", () => {
  settings_colorpicker.style.backgroundColor = settings_colorpicker.value;
  settings_colorpicker.style.color = settings_colorpicker.value;

  settings_hours.style.color = settings_colorpicker.value;
  settings_minutes.style.color = settings_colorpicker.value;
  settings_separation.style.color = settings_colorpicker.value;
  settings_session.style.color = settings_colorpicker.value;
  settings_upload.style.color = settings_colorpicker.value;
  settings_switchText.style.color = settings_colorpicker.value;
  // settings_textColor.style.color = settings_colorpicker.value;
  // settings_toolbar.style.color = settings_colorpicker.value;
  // settings_shapes.style.color = settings_colorpicker.value;
  // settings_other.style.color = settings_colorpicker.value;
  // settings_textBackground.style.color = settings_colorpicker.value;
});

// #endregion

// #region Check the "display seconds" and "am/pm" checkboxes for time formatting

const secondsCheckbox = document.getElementById("display-seconds");
const amPmCheckbox = document.getElementById("display-am-pm");
const secondsText = document.getElementById("seconds-container");
const amPmText = document.getElementById("session");

secondsCheckbox.addEventListener('change', function () {
  localStorage.setItem("seconds-checkbox-status", secondsCheckbox.checked);
  
  if (secondsCheckbox.checked) {
    secondsText.style.display = "contents";
  } else {
    secondsText.style.display = "none";
  }
});

amPmCheckbox.addEventListener('change', function () {
  localStorage.setItem("ampm-checkbox-status", amPmCheckbox.checked);
  
  if (amPmCheckbox.checked) {
    amPmText.style.display = "contents";
  } else {
    amPmText.style.display = "none";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const secondsCheckboxStatus = localStorage.getItem("seconds-checkbox-status");
  const amPmCheckboxStatus = localStorage.getItem("ampm-checkbox-status");

  if (secondsCheckboxStatus !== null) {
    if (secondsCheckboxStatus === "false")
      secondsCheckbox.checked = false;
    else
    secondsCheckbox.checked = true;
  } else {
    secondsCheckbox.checked = true;
  }

  if (amPmCheckboxStatus !== null) {
    if (amPmCheckboxStatus === "false")
      amPmCheckbox.checked = false;
    else
      amPmCheckbox.checked = true;
  } else {
    amPmCheckbox.checked = true;
  }
  
  if (secondsCheckbox.checked) {
    secondsText.style.display = "contents";
  } else {
    secondsText.style.display = "none";
  }

  if (amPmCheckbox.checked) {
    amPmText.style.display = "contents";
  } else {
    amPmText.style.display = "none";
  }
});

// #endregion
