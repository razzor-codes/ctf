const loginButton = document.getElementById('btn-login');
const userAdd = document.getElementById('user');
let accounts;
const isMetaMaskConnected = () => accounts && accounts.length > 0
let session = sessionStorage.getItem('session')

function loadButtons(){
    if (!window.ethereum) {
        loginButton.innerText = 'Metamask Not Found'
        return false
    }
    if(isMetaMaskConnected && session==='loggedIn'){
        login()
    }
    else{
        userAdd.style.display = "none"
        loginButton.addEventListener('click', login)
    }


}

async function login(){
    let newAccount
    try{
        newAccount = await ethereum.request({ method: 'eth_requestAccounts' });
    }
    catch(error)
    {
        console.error(error);
    }   

    if(!newAccount) {return}
    accounts = newAccount
    userAdd.innerText = String(accounts).substring(0,7) + "..." + String(accounts).substring(37,43);
    userAdd.style.display = "block"
    loginButton.innerText = 'Logout'
    sessionStorage.setItem('session', 'loggedIn')
    loginButton.removeEventListener('click', login)
    setTimeout(() => {
        loginButton.addEventListener('click', logout)
      }, 200)
}

async function logout(){
    loginButton.innerText = 'Login'
    userAdd.style.display = "none"
    accounts = null
    sessionStorage.setItem('session', 'loggedOut')
    loginButton.removeEventListener('click', logout)
    setTimeout(() => {
        loginButton.addEventListener('click', login)
      }, 200)
}

try{
    ethereum.on('accountsChanged', (newAccount) => {
		accounts = newAccount;
        userAdd.innerHTML = String(accounts).substring(0,7) + "..." + String(accounts).substring(37,43);
    });
}
catch(error)
{
    console.error(error);
}   


window.addEventListener('load', () => {
    loadButtons()
  });