
document.getElementById('page_thumbnails_container').innerHTML = '<a class="thumbnail" href="../reality/reality.html"><img src="images/pendulum_clock.svg"></a><a class="thumbnail" href="../idealisation/idealisation.html"><img  src="images/clock_ideal.png"></a><a class="thumbnail" href="../geometric/geometric.html"><img  src="images/geo_thumbnail.png"></a><a class="thumbnail"><img  src="images/algebra.png"></a><a class="thumbnail"><img  src="images/keemu.JPG"></a>';

document.getElementById('page_names').innerHTML ='<text>Reality</text><text>Idealisation</text><text>Geometric</text><text>Algebra</text><text>Graphic</text>'

document.getElementById('navigator').innerHTML='<a id="right" class="nav"><img src="images/triangle_r.png"></a><a id="left" class="nav" ><img src="images/triangle_l.png"></a>'

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