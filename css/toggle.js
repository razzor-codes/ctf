checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', ()=>{
document.body.classList.toggle('dark');
var color = document.getElementById('title').style.color;
var toggledColor = color==='white'?'black':'white';
document.getElementById('title').style.color = toggledColor;
document.getElementById('contract-title').style.color = toggledColor;
document.getElementById('diff-title').style.color = toggledColor;
});