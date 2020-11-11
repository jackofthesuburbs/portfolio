let img;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255)
  img = loadImage('interfacing.png');
  

  let text = createP("<b>Rectangular space as a portal.</b>");
  
  text.position(120, 60);
  text.style("font-family", "times");
  //text.style("background-color", "#FFC4AB");
  text.style("color", "#004D80");
  text.style("font-size", "36pt");
  text.style("padding", "12px");
  
  
  let texty = createP("Online collaboration is different to that in the physical world. <br> We move from face-to-face to inter-face.<br><br>We see and hear each other in… rectangular space.<br><br>In 3D space there are natural pauses when socialising.<br><br>In rectangular space how do we:<br>Make a joke with the person next to us?<br>Nip to the toilet?<br>Have thinking silences?");
  
  texty.position(120, 170);
  texty.style("font-family", "times")
  //texty.style("background-color", "#FFC4AB");
  texty.style("color", "#004D80");
  texty.style("font-size", "18pt");
  texty.style("padding", "12px");
  
  
//  let textz = createP("Click <a href='headlines/heading1.js'>here</a> to enter.");      
          
//  textz.position(134, 350);
  //textz.style("background-color", "#FFC4AB");
//  textz.style("font-family", "times");
//  textz.style("color", "#004D80");
//  textz.style("font-size", "14pt");
//  textz.style("linkColor", "#FFFFFF");
  
  
  
}

function draw(){
  if (mouseX <=0 && mouseY <=0) return;
  image(img, mouseX-120, mouseY-72, 240, 135);
}


function mousePressed() {

  clear();
  background(255, 255, 255);

}






