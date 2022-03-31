document.getElementById("left").href = "geometric_a.html";
document.getElementById("right").href = "algebra.html";

//******************info part***********************//
gvt_T = 'Fg'; boy_T = "Fb" ; vis_T = "f'"
const el = document.getElementById("infor");

function remov() 
{
  
  el.innerHTML="";
}
count_g = true; count_b = true; count_v = true;

//notes on gravity
function gnote()
{
  count_g = !count_g;
  if (count_g==false) 
  {
  el.innerHTML = '<text>The trivial and easly understood force acting on the bob is gravity itself. Gravitational force is directed towards the center of earth.</text><button onclick="gnote1()">ok</button>';
  }
  else { remov();}
}
function gnote1()
{
  el.innerHTML = '<text>So the direction is downwards and the magnitude is the weight of bob.<br> Hence <b>F<sub>g</sub> = mg</b><br>We can represent this force by a downward arrow in the above sketch. </text><button onclick="remov()">got it</button>';
  gvt_T = "mg";
}

//notes on buoyancy
function bnote()
{
  count_b = !count_b;
  if (count_b==false) 
  {
  el.innerHTML = '<text>Now we want to investigate the buoyant force <b>F<sub>b</sub></b>. It is the net upward force on any object immersed in a fluid. From Archimedes principle, the buoyant force on a body is equal to the weight of fluid displaced by that body.</text><button onclick="bnote1()">ok</button>';
  }
  else { remov();}
}
function bnote1()
{
  el.innerHTML = '<text>So if <b> ρ </b>is the density of fluid and <b> V </b> is the volume of the bob, <b> ρV </b> is the mass of fluid displaced and <b> ρVg </b> is the corresponding weight.</text><button onclick="bnote2()">ok</button>';
}
function bnote2()
{
  el.innerHTML = '<text>We will represent the buoyant force by an upward arrow in the sketch.The magnitude is given by <b>F<sub>b</sub> = ρVg </b></text><button onclick="remov()">got it</button>';
  boy_T = "ρVg";
}

//notes on viscous drag
function vnote()
{
  count_v = !count_v;
  if (count_v==false) 
  { 
  el.innerHTML = '<text>An object moving through a fluid experiences a frictional force. This fluid friction is called the viscous drag force.</text><button onclick="vnote1()">ok</button>';
  }
  else { remov();}
}
function vnote1()
{
  el.innerHTML = '<text>Viscous drag force on an object depends upon factors like surface area of the object itself,density of fluid,velocity of motion etc. The direction of viscous force is such that it always opposes the motion. </text><button onclick="vnote2()">ok</button>';
}
function vnote2()
{
  el.innerHTML = '<text>In a simpler picture we can say that viscous drag force is preportional to velocity,<b>v</b>. All other factors can be composed into a constant <b>a</b> .</text><button onclick="vnote3()">ok</button>';
}
function vnote3()
{
  el.innerHTML = '<text>Then we have <b> f = -av </b>. The negative sign indicates that viscous force always opposes motion. Increse the density using the slider so that viscous drag will have a non-zero value ! Viscousity also causes the system to damp. Then you can drag and drop the bob anytime!!  </text><button onclick="remov()">got it</button>';
  vis_T = "-av";
}


// ************** PENDULUM PART************** //

// volume of bob = 1
length = 0.7;
gravity = 9.8;
mass = 50;
density = 0;
c = 0;
let theta = Math.PI/4;
acc = 0;
w = 0 ;
bob_r = 0.05;

dt = 0.01;
function timeChanger(value)
{
    dt =value*0.01;
}
function densityChanger(i)
{
  density = i;
  c = 3*i;
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
  frameRate(50);
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
  drawArrow(v1,v2,gvt_T);

//buoyancy(blu)
  v2 = createVector(x,y-q/8);
  stroke (0,0,150,boy[1]);
  fill(0,0,150,boy[1])
  drawArrow(v1,v2,boy_T);

//vis(green) 
  v2 = createVector(x-w*c*cos(theta),y+w*c*sin(theta));
  stroke (0,150,0,vis[1]);
  fill(0,150,0,vis[1])
  drawArrow(v1,v2,vis_T);

//fluid effect
push();
noStroke();
if (density!=0){stroke(150,150,250);}
strokeWeight(2);
for(let p1 =0;p1<p;p1=p1+100-density*10)
{
  for(let q1 = 0;q1<q;q1=q1+100-density*10)
  {
    point(p1+random(-1,1),q1+random(-1,1));
  }
}
pop();

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