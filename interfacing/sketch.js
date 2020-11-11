let img;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 196, 171)
  img = loadImage('interfacing.png');
  

  let text = createP("<b>interfacing</b>");
  
  text.position(120, 60);
  text.style("font-family", "times");
  //text.style("background-color", "#FFC4AB");
  text.style("color", "#004D80");
  text.style("font-size", "62pt");
  text.style("padding", "12px");
  
  
  let texty = createP("On working together<br>while being apart.");
  
  texty.position(120, 200);
  texty.style("font-family", "times")
  //texty.style("background-color", "#FFC4AB");
  texty.style("color", "#004D80");
  texty.style("font-size", "24pt");
  texty.style("padding", "12px");
  
  
  let textz = createP("<a href='/Interfacing.pdf'>Download PDF</a><br><a href='https//gary-martin.world/tools+resources'>Tools and resources.</a>");      
          
  textz.position(134, 350);
  //textz.style("background-color", "#FFC4AB");
  textz.style("font-family", "times");
  textz.style("color", "#004D80");
  textz.style("font-size", "14pt");
  textz.style("linkColor", "#FFFFFF");
  
  
  
}

function draw() {
  
  if(mouseX <=0 && mouseY <=0) return;
  image(img, mouseX-120, mouseY-72, 240, 135);
}


function mousePressed() {
  clear();
  background(255, 196, 171);

}






