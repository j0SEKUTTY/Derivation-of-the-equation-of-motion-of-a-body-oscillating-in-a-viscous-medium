

document.getElementById("left").href = "idealisation.html";
document.getElementById("right").href = "geometric_b.html";

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
bob_r = 0.045;

dt = 0.01;


c1 = 255;
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

  factor =q*.90;

  /***Usual Draw function***/
  background(c1,c1,c1);

  f = -mass*gravity + density*gravity ;
  let torq = f*sin(theta)/length - c*w*length*length;
  acc = torq/mass;
  w += acc*dt;
  theta += w*dt;
 
  x = factor*length*sin(theta) + o.x;
  y = factor*length*cos(theta) + o.y;


//string and bob(darkblue)
  stroke(100,100,100);
  line(o.x,o.y,x,y);
  fill(180,180,200); 
  ellipse(x,y,factor*2*bob_r);
}

function mousePressed()
{
    if(abs(mouseX-o.x)<width/2 && mouseY<height && mouseY>0)
    { noLoop();  }
}
function mouseReleased()
{
    loop();
    c1 = 255;
}

function mouseDragged()
{
    if(abs(mouseX-o.x)<width/2 && mouseY<height && mouseY>0)
    {
        length = dist(mouseX,mouseY,o.x,o.y)/factor;
        theta = atan((mouseX-o.x)/(mouseY-o.y));
        w = 0;
        redraw();   
        if ((abs(x-o.x)<p/2+20 && abs(x-o.x)>p/2-20 ) || (y < q+20 && y>q-20))
        { c1 = 245; }

    }
}