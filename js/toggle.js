let storedColor = sessionStorage.getItem('toggledColor');
let checked = sessionStorage.getItem('checkbox');
checkbox = document.getElementById('checkbox');

let theme = sessionStorage.getItem('theme');
if (theme === 'dark'){
    document.body.classList.toggle('dark');
    checkbox.checked = checked;
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

checkbox.addEventListener('change', ()=>{
var color = document.getElementById('title').style.color;

document.body.classList.toggle('dark');

var toggledColor = color==='white'?'black':'white';

sessionStorage.setItem('toggledColor', toggledColor);
sessionStorage.setItem('theme', document.body.classList.value);
sessionStorage.setItem('checkbox', checkbox.checked);
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