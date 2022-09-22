const loginButton = document.getElementById('btn-login');
const userAdd = document.getElementById('user');
const userImage = document.getElementById('user-image');
const slideout = document.getElementById('notif');
const dropdown = document.querySelector('.dropdown');
const drop_name = document.getElementById('drop-name')
const usernameButton = document.getElementById('btn-username');
const usernameText = document.getElementById('username-change');
let accounts, username;
const isMetaMaskConnected = () => accounts && accounts.length > 0
let session = sessionStorage.getItem('session')
let source = "https://ui-avatars.com/api/?background=282c34&color=fff&rounded=true&size=33&name=";
let usernamesContract = "0xeC3B1733fbF131058846764cD2beBAac47168b0c";
const red = "#db1a17";
const wrongchainnotif = "CipherShastra runs on Goerli. Kindly switch to it!";
const wrongusernamenotif = "Username should be less than 16 characters";
async function loadButtons(){
    preload();
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
        username = null;
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
    if(slideout.classList.contains('visible')){
    
        slideout.classList.remove('visible');
    }
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
    slideout.innerText = wrongchainnotif;
    slideout.style.background = red;
    slideout.classList.remove('visible');
    slideout.offsetWidth;
    slideout.classList.add('visible');
    userImage.style.display = "none"
    username = null

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
    slideout.innerText = 'Disconnected';
	slideout.style.background = red;
	slideout.classList.remove('visible');
	slideout.offsetWidth;
	slideout.classList.add('visible');
    loginButton.innerText = 'Login'
    userAdd.style.display = "none"
    userImage.style.display = "none"
    username = null
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
            username = null
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
            slideout.innerText = wrongchainnotif;
            slideout.style.background = red;
            slideout.classList.remove('visible');
            slideout.offsetWidth;
            slideout.classList.add('visible');
            userImage.style.display = "none"
            username = null
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

            if(dropdown.classList.contains('showDrop')){
        
                dropdown.classList.remove('showDrop');
            }
            slideout.innerText = wrongchainnotif;
            slideout.style.background = red;
            slideout.classList.remove('visible');
            slideout.offsetWidth;
            slideout.classList.add('visible');
            userImage.style.display = "none"
            username = null
        }

    });
}
catch(error)
{
    console.error(error);
}

userImage.addEventListener('click', () => {
    drop_name.innerText = username
    dropdown.classList.toggle('showDrop');
});

window.onclick = function(event) {
    // console.log(event.target)
    if(
        !event.target.matches('#user-image') &&
        !event.target.matches('#username-change') &&
        !event.target.matches('.dropdown') &&
        !event.target.matches('#drop-name') &&
        !event.target.matches('.dropRow') &&
        !event.target.matches('#btn-username')){
        if(dropdown.classList.contains('showDrop')){
        
            dropdown.classList.remove('showDrop');
        }
    }

}

usernameButton.addEventListener('click', async () => {
    try{
        let usernameToChange = usernameText.value;
        if(usernameToChange.length > 15){
            slideout.innerText = wrongusernamenotif;
            slideout.style.background = red;
            slideout.classList.remove('visible');
            slideout.offsetWidth;
            slideout.classList.add('visible');
            return false;
        }
        else{
            await window.contract.methods.setUsername(usernameToChange).call();
            usernameButton.nextElementSibling.style.display = "block";

            await window.contract.methods.setUsername(usernameToChange).send({from: accounts.toString()});

            fetchedUsername = await window.contract.methods.usernames(String(accounts)).call();
            userImage.setAttribute('src', source + fetchedUsername) 
            drop_name.innerText = fetchedUsername

            usernameButton.nextElementSibling.style.display = "none";

        }
    }
    catch(error){
        if(error.message.includes("Invalid Username")){
            slideout.innerText = "Invalid Username";
            slideout.style.background = red;
            slideout.classList.remove('visible');
            slideout.offsetWidth;
            slideout.classList.add('visible');
        }
        else if(error.message.includes("Username Already Taken")){
            slideout.innerText = "Username Already Taken";
            slideout.style.background = red;
            slideout.classList.remove('visible');
            slideout.offsetWidth;
            slideout.classList.add('visible');
        }
        else{
            console.log(error);
        }
    }

    finally{
        usernameButton.nextElementSibling.style.display = "none";

    }
});


window.addEventListener('load', () => {
    loadButtons()
  });

  async function preload(){
    
    try{
        usernameText.disabled = true;
        usernameText.placeholder = "In Development";
        usernameButton.disabled = true;
        stat = await fetch(document.querySelector('#chip img').src);
        if (stat.status == 404){
            document.querySelector('#chip img').src = 'https://cdn-icons-png.flaticon.com/512/924/924915.png';
        }


    }
    catch(error){
        console.log(error);
    }


  }

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
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_username",
                    "type": "string"
                }
            ],
            "name": "setUsername",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ], usernamesContract);

}
