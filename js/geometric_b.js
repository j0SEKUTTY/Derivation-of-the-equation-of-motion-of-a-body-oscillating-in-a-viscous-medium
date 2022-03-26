
document.getElementById("left").href = "geometric_a.html";
document.getElementById("right").href = "geometric_c.html";

// *********************** PENDULUM PART************** //

// volume of bob = 1
length = 0.7;
gravity = 9.8;
mass = 50;
density = 0;
c = 10;
let theta = Math.PI/4;
acc = 0;
w = 0 ;
bob_r = 0.05;

dt = 0.01;
function timeChanger(value)
{
    dt =value*0.01;
}

let x;
let y;


cord=["cord",0];
ankle=["ankle",0]; legth=["legth",0]; amp=["amp",0];
function mark(s)
{   
    window[s[0]][1] = 255-window[s[0]][1]; 
}


factor =300 ;

  hist = [];
function draw()
{
  /***Create a canvas aka setup***/
  const wide = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const tall = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  p = wide*0.5;
  q = tall*0.65
  var canvas =createCanvas(p,q);
  canvas.parent('section_2');
  frameRate(100);
  o = createVector(p/2,0);

  /***Usual Draw function***/
  background(255,255,255);
  f = -mass*gravity + density*gravity ;
  let torq = f*sin(theta)/length - c*w*length*length;
  acc = torq/mass;
  w += acc*dt;
  theta += w*dt;
 
  hist.push(theta);
  hist=hist.splice(-p*0.02/dt);

  x = factor*length*sin(theta) + o.x;
  y = factor*length*cos(theta) + o.y;


//string and bob(darkblue)
  stroke(100,100,100);
  line(o.x,o.y,x,y);
  fill(180,180,200); 
  ellipse(x,y,factor*2*bob_r);
  noStroke();


//bottom graph text
  fill(0,0,0,cord[1])
  textSize(10);
  text('  90 deg',0,q*0.8 - 62.83);
  text(' -90 deg',0,q*0.8 + 62.83);

// bottom graph baseline(gray)
  drawingContext.setLineDash([5, 5]);
  stroke(127,127,127,cord[1]);
  line(0,q*0.8,p,q*0.8);
  
//coordinate (gray)
  stroke(190,190,190,cord[1]);
  drawingContext.setLineDash([2,2]);
  line(o.x,o.y,o.x,length*factor+50);
  drawingContext.setLineDash([0]);

// angle(green)
  noFill();
  stroke(100,200,100,min(ankle[1],cord[1]));
  if(theta<0)
  {
    arc(o.x,o.y,50,50,PI/2,PI/2-theta);
    noStroke();
    fill(100,200,100,min(ankle[1],cord[1]));
    text('θ',o.x+20*sin(theta),o.y+20+30*cos(theta));
  }
  else
  {
    arc(o.x,o.y,50,50,PI/2-theta,PI/2);
    noStroke();
    fill(100,200,100,min(ankle[1],cord[1]));
    text('θ',o.x+20*sin(theta),o.y+20+30*cos(theta));   
  }
 
 
//length(red)
  noFill();
  stroke(200,100,100,min(legth[1],cord[1]));
  line(o.x,o.y,x,y);
  line(o.x-5*cos(theta),o.y+5*sin(theta),o.x+5*cos(theta),o.y-5*sin(theta));
  line(x-5*cos(theta),y+5*sin(theta),x+5*cos(theta),y-5*sin(theta));
  noStroke();
  fill(200,100,100,min(legth[1],cord[1]));
  text(' length',o.x+length*factor*sin(theta)/2,length*factor*cos(theta)/2);

// amplitude(blue)
  noFill();
  drawingContext.setLineDash([1]);
  if(theta<0)
  {
    stroke(150,0,150,min(amp[1],cord[1]));
    arc(o.x,o.y,2*length*factor,2*length*factor,PI/2,PI/2-theta);
    noStroke();
    fill(150,0,150,min(amp[1],cord[1]));
    text('A',o.x-10,length*factor+10);
  }
  else
  {
    stroke(150,0,150,min(amp[1],cord[1]));
    arc(o.x,o.y,2*length*factor,2*length*factor,PI/2-theta,PI/2);
    noStroke();
    fill(150,0,150,min(amp[1],cord[1]));
    text('A',o.x+10,length*factor+10);   
  }
  drawingContext.setLineDash([0]);

//graph sin wave(green)
  noFill();
  beginShape();
  stroke(150,250,150,min(ankle[1],cord[1]));
  for (i =0;i<hist.length;i++)
  {
      vertex(i*dt/0.02,-hist[i]*40 + q*0.8)
  }
  endShape();
  
}

function mousePressed()
{
    if(abs(mouseX-o.x)<width/2 && mouseY<height && mouseY>0)
    { noLoop();  }
}
function mouseReleased()
{
    loop()
}

function mouseDragged()
{
    if(abs(mouseX-o.x)<width/2 && mouseY<height && mouseY>0)
    {
        length = dist(mouseX,mouseY,o.x,o.y)/300;
        theta = atan((mouseX-o.x)/(mouseY-o.y));
        w = 0;
        redraw();   
    }
}