var drums;
var baw;
var tink;
var r = 0;
var z = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //mini.playMode('restart');
  
  var t = 10
  let text = createP("projects");
  
  text.position(80, 50);
  text.style("font-family", "gill sans");
  text.style("background-color", "#f70787");
  text.style("color", "#FFFFFF");
  text.style("font-size", "18pt");
  text.style("padding", "12px");
  
  let texty = createP("<a href='https://www.gary-martin.world/culdesac'>cul-de-sac festival</a>");      
          
  texty.position(84, 140);
  //texty.style("background-color", "#FFFFFF");
  texty.style("font-family", "gill sans");
  texty.style("color", "#f70787");
  texty.style("font-size", "18pt");
  texty.style("linkColor", "#FFFFFF");
  
  
  
  
  
  x = width / 2;
  y = height;
  f = width;
  
  
}



function draw() {
  background(255);
  
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}