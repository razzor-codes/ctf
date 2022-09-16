const loginButton = document.getElementById('btn-login');
const userAdd = document.getElementById('user');
const userImage = document.getElementById('user-image');
const slideout = document.getElementById('notif');

let accounts, username;
const isMetaMaskConnected = () => accounts && accounts.length > 0
let session = sessionStorage.getItem('session')
let source = "https://ui-avatars.com/api/?background=282c34&color=fff&rounded=true&size=33&name=";
let usernamesContract = "0xeC3B1733fbF131058846764cD2beBAac47168b0c";

async function loadButtons(){
    if (!window.ethereum) {
        loginButton.innerText = 'Metamask Not Found ';
        loginButton.setAttribute("style", "color: red");
        alertSign = document.createElement('span');
        alertSign.setAttribute("class", "fas fa-exclamation-triangle faa-flash animated");
        loginButton.append(alertSign);
        return false
    }else{
        window.web3 = new Web3(window.ethereum);
        window.contract = await loadContract();

    }
    if(session==='loggedIn'){
        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    }
    if(isMetaMaskConnected()){
        login()
    }
    else{
        userAdd.style.display = "none";
        userImage.style.display = "none";
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
    let goerli = (ethereum.chainId == "0x5");
    if (goerli){
        fetchedUsername = await window.contract.methods.usernames(String(accounts)).call();
        if(fetchedUsername == ''){
            username = "Anonymous"
        }
        else{
            username = fetchedUsername
        }
        userImage.setAttribute('src', source + username) 
        userImage.style.display = "block"
    } else{
    slideout.classList.remove('visible');
    slideout.offsetWidth;
    slideout.classList.add('visible');
    userImage.style.display = "none"

    }

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
    userImage.style.display = "none"
    accounts = null
    sessionStorage.setItem('session', 'loggedOut')
    loginButton.removeEventListener('click', logout)
    setTimeout(() => {
        loginButton.addEventListener('click', login)
      }, 200)
}

try{
    ethereum.on('accountsChanged', async (newAccount) => {
        if(!newAccount.length){
            loginButton.innerText = 'Login'
            userAdd.style.display = "none"
            userImage.style.display = "none"
            accounts = null
            sessionStorage.setItem('session', 'loggedOut')
            loginButton.removeEventListener('click', logout)
            setTimeout(() => {
                loginButton.addEventListener('click', login)
              }, 200)
        }
        else{
		accounts = newAccount;
        userAdd.innerHTML = String(accounts).substring(0,7) + "..." + String(accounts).substring(37,43);
        let goerli = (ethereum.chainId == "0x5");
        if(goerli)
        {
        fetchedUsername = await window.contract.methods.usernames(String(accounts)).call();
        if(fetchedUsername == ''){
            username = "Anonymous"
        }
        else{
            username = fetchedUsername
        }
        userImage.setAttribute('src', source + username)
        userImage.style.display = "block"
    
    }
        else{
            slideout.classList.remove('visible');
            slideout.offsetWidth;
            slideout.classList.add('visible');
            userImage.style.display = "none"
        }
    }
    });
}
catch(error)
{
    console.error(error);
}

try{

    ethereum.on('chainChanged', async (chainId) => {

        let goerli = (ethereum.chainId == "0x5");

        if (goerli){
            fetchedUsername = await window.contract.methods.usernames(String(accounts)).call();
            if(fetchedUsername == ''){
                username = "Anonymous"
            }
            else{
                username = fetchedUsername
            }
            userImage.setAttribute('src', source + username) 
            userImage.style.display = "block"
        } else{
        slideout.classList.remove('visible');
        slideout.offsetWidth;
        slideout.classList.add('visible');
        userImage.style.display = "none"
        }

    });
}
catch(error)
{
    console.error(error);
}

userImage.addEventListener('click', () => {

    // alert(username) In Development

});

window.addEventListener('load', () => {
    loadButtons()
  });


//   Usernames

async function loadContract(){
    return await new window.web3.eth.Contract([
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "usernames",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ], usernamesContract);

}
