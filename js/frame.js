
document.getElementById('page_thumbnails_container').innerHTML = '<a class="thumbnail" href="reality.html"><img src="images/pendulum_clock.webp"></a><a class="thumbnail" href="idealisation.html"><img  src="images/swinging_pendulum.webp"></a><a class="thumbnail" href="geometric_a.html"><img  src="images/geometric.webp"></a><a class="thumbnail" href="algebra.html"><img  src="images/algebra.webp"></a><a class="thumbnail" href="graphic.html"><img  src="images/graphic.webp"></a>';

document.getElementById('page_names').innerHTML ='<text>Reality</text><text>Idealisation</text><text>Geometric</text><text>Algebra</text><text>Graphic</text>'

document.getElementById('navigator').innerHTML='<a id="left" class="nav" ><img src="images/nav_icon.webp"></a><a id="right" class="nav"><img src="images/nav_icon.webp"></a>'

const wide = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const tall = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

window.addEventListener('resize', trans);

function trans(){
    bt = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    ht = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const docx = document.documentElement;
    docx.style.setProperty('--dim1',Math.min(1,bt/wide));
    docx.style.setProperty('--dim2',Math.min(1,ht/tall));
 
}