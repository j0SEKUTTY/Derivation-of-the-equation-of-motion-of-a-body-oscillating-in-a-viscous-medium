document.getElementById("left").href = "geometric_b.html";
document.getElementById("right").href = "algebra.html";

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

grvty=["grvty",0]; boy=["boy",0]; vis=["vis",0];
function mark(s)
{   
    window[s[0]][1] = 255-window[s[0]][1]; 
}

factor =300 ;

function drawArrow(x1, x2,string) 
{   push();
    line(x1.x, x1.y, x2.x, x2.y); 
    var angle = atan2(x1.y - x2.y, x1.x - x2.x); 
    translate(x2.x, x2.y); 
    noStroke();
    text(string,10,10);
    rotate(angle-HALF_PI); 
    size =5
    triangle(-size/2, size, size/2, size, 0, -size/2); 
    pop();
}

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


  v1 = createVector(x,y);
//Gravity(red)
  v2 = createVector(x,y+q/5);
  stroke (150,0,0,grvty[1]);
  fill(150,0,0,grvty[1])
  drawArrow(v1,v2,'mg');

//buoyancy(blu)
  v2 = createVector(x,y-q/8);
  stroke (0,0,150,boy[1]);
  fill(0,0,150,boy[1])
  drawArrow(v1,v2,'ρVg');

//vis(green) 
  v2 = createVector(x-w*15*cos(theta),y+w*15*sin(theta));
  stroke (0,150,0,vis[1]);
  fill(0,150,0,vis[1])
  drawArrow(v1,v2,'-av');
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