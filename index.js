var background_colors = ['#87bdff', '#ffa0a0', '#b0ffc5', '#fb87ff', '#87f3ff' ];
var background_bottom_colors = ['#1f3c61', '#611f1f', '#1f6129', '#5e1f61', '#1f5d61'];
var ran = Math.floor(Math.random() * background_colors.length);

document.getElementById("background_ID").style.backgroundColor = background_colors[ran];
document.getElementById("background_bottom_ID").style.backgroundColor = background_bottom_colors[ran];