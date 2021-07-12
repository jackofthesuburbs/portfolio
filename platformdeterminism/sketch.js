let bg;



function preload() {
  fontRegular = loadFont('Honiton-Regular.otf');
  fontBold = loadFont('Honiton-Bold.otf');
}
  
function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage('gradient.jpeg');
  
  textFont(fontRegular);
  textFont(fontBold);
  

  let text = createP("<b>Platform Determinism</b>");
  
  text.position(120, 60);
  //text.style("font-family", "times");
  //text.style("background-color", "#FFC4AB");
  text.style("color", "#FFFFFF");
  text.style("font-size", "62pt");
  text.style("padding", "12px");
  
  
  let texty = createP("The Role of Space in Understanding Post-Internet Music. ");
  
  texty.position(120, 200);
  //texty.style("font-family", "times")
  //texty.style("background-color", "#FFC4AB");
  texty.style("color", "#FFFFFF");
  texty.style("font-size", "24pt");
  texty.style("padding", "12px");
  
  
  let textz = createP("<a href='https://gary-martin.world/platformdeterminism/platformdeterminism.pdf'>📖 Download PDF</a>");      
          
  textz.position(134, 300);
  //textz.style("background-color", "#FFC4AB");
  //textz.style("font-family", "times");
  textz.style("color", "#FFFFFF");
  textz.style("font-size", "14pt");
  textz.style("linkColor", "#FFFFFF");
  
  
  
}

function draw() {
  
  background(bg);
  

}







