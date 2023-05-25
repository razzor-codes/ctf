let storedColor = sessionStorage.getItem('toggledColor');
let checked = sessionStorage.getItem('checkbox');

let dflex = document.querySelector("#content .dynamicW");

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
    catch(err){ console.log(err)}

    document.querySelector('.dropdown').style.boxShadow = "0px 4px 8px 0px #3e64ff";

    // only for FUD
try{  replain = document.getElementById('re-plain'); //Only For FUD
  neonsign = document.getElementsByClassName('sign');
  replain.style.display = "none";
  neonsign[0].style.display=""; 
  neonsign[1].style.display=""; }
  catch(err){ console.log(err)}
    
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
catch(error) {
  console.log(error)

}

try{
  if(toggledColor === 'white') dropdown.style.boxShadow = " 0px 4px 8px 0px #3e64ff";
  else dropdown.style.boxShadow = " 0px 8px 16px 0px #212529";
}
catch(error){
  console.log(error)
}

try{
  replain = document.getElementById('re-plain'); //Only For FUD
  neonsign = document.getElementsByClassName('sign');
  if(toggledColor === 'white') {
    replain.style.display = "none";
    neonsign[0].style.display=""; 
    neonsign[1].style.display=""; 

  }
  else {
    replain.style.display = "block";
    neonsign[0].style.display="none"; 
    neonsign[1].style.display="none"; 
}
}
catch(error){
  console.log(error)
}

});




function checkWidth() {
  try{
    if (window.innerWidth < 600) {
      dflex.classList.remove('d-flex');
      dflex.children[0].classList.add('row');
      dflex.children[1].classList.remove('ml-auto');
      dflex.children[1].classList.add('row');
      dflex.children[2].classList.remove('ml-auto');
      dflex.children[2].classList.add('row');
    } else {
      dflex.classList.add('d-flex');
      dflex.children[0].classList.remove('row');
      dflex.children[1].classList.add('ml-auto');
      dflex.children[1].classList.remove('row');
      dflex.children[2].classList.add('ml-auto');
      dflex.children[2].classList.remove('row');
    }
  }
  catch(error) {
    
  }
  
}



window.addEventListener('load', () => {
  let scrollPos = sessionStorage.getItem('scrollPos');
document.querySelector(".active").scrollTop = scrollPos;
    checkWidth()
  });

  window.addEventListener('beforeunload', () => {
    console.log("being fired");
    sessionStorage.setItem('scrollPos', document.querySelector(".active").scrollTop)
    console.log(sessionStorage.getItem('scrollPos'))
  });

window.addEventListener('resize', () => {
  checkWidth()
});
