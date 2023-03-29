var background_colors = ['#4A98F7', '#f74a4a', '#4af778'];
var background_bottom_colors = ['#1f3c61', '#611f1f', '#1f6129'];
var ran = Math.floor(Math.random() * background_colors.length);

// document.getElementByClassName("background").style.backgroundColor = "blue";
document.getElementById("background_ID").style.backgroundColor = background_colors[ran];
document.getElementById("background_bottom_ID").style.backgroundColor = background_bottom_colors[ran];