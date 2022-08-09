let storedColor = sessionStorage.getItem('toggledColor');

let theme = sessionStorage.getItem('theme');
if (theme === 'dark'){
    document.body.classList.toggle('dark');
}
if (storedColor != null && storedColor === 'white' ){
    try{
        document.getElementById('title').style.color = storedColor;
        document.getElementById('contract-title').style.color = storedColor;
        document.getElementById('diff-title').style.color = storedColor;
        document.getElementById('writeups').style.color = storedColor;
        // document.getElementsById('chip').style.color = storedColor;

    }
    catch(err){}

}
checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', ()=>{
var color = document.getElementById('title').style.color;

document.body.classList.toggle('dark');

var toggledColor = color==='white'?'black':'white';

sessionStorage.setItem('toggledColor', toggledColor);
sessionStorage.setItem('theme', document.body.classList.value);
try{
    document.getElementById('title').style.color = toggledColor;
    document.getElementById('contract-title').style.color = toggledColor;
    document.getElementById('diff-title').style.color = toggledColor;
    document.getElementById('writeups').style.color = toggledColor;
    // document.getElementsById('chip').style.color = black;

}
catch(err) {

}

});