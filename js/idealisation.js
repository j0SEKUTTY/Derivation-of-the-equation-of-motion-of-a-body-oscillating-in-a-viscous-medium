
document.getElementById("left").href = "reality.html";
document.getElementById("right").href = "geometric_a.html";

function Changer(value){
    const docx = document.documentElement;
    docx.style.setProperty('--real',1-value);
    docx.style.setProperty('--ideal',value);
}
