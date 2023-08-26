const connectButton = document.getElementById('btn-connect');
const inform = document.getElementById('info');
const tickerButton = document.getElementById('btn-ticker');
const faucetButton = document.getElementById('btn-faucet');
const stakeButton = document.getElementById('btn-stake');
const approveButton = document.getElementById('btn-approve');
const verifyButton = document.getElementById('btn-verify');
// const smartCheck = document.getElementById('smart');
const tokenNumber = document.getElementById('inputToken')
const loginButton = document.getElementById('btn-login');
const chainSwitchButton = document.getElementById('btn-chain');
const userAdd = document.getElementById('user');
const userImage = document.getElementById('user-image');
const slideout = document.getElementById('notif');
const dropdown = document.querySelector('.dropdown');
const drop_name = document.getElementById('drop-name')
const usernameButton = document.getElementById('btn-username');
const usernameText = document.getElementById('username-change');
const tokenAddress = '0xA64f44993AdBaC9b47A527770F2A657c2194F565';
const tokenSymbol = 'RAZ';
const tokenDecimals = 18;
const tokenImage = 'https://pbs.twimg.com/profile_images/1293919155108773892/zal_RiVs_200x200.jpg';

const tokenCalc = 10**tokenDecimals;
const maxApproval = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
let accounts;
const isMetaMaskConnected = () => accounts && accounts.length > 0
let session = sessionStorage.getItem('session')
let source = "https://ui-avatars.com/api/?background=282c34&color=fff&rounded=true&size=33&name=";
let usernamesContract = "0xeC3B1733fbF131058846764cD2beBAac47168b0c";
const wrongchainnotif = "CipherShastra runs on Goerli. Kindly switch to it!";
const wrongusernamenotif = "Username should be less than 16 characters";
const red = "#db1a17";
async function loadUsernameContract(){
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

async function loadTokenContract(){
	return await new window.web3.eth.Contract([
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "subtractedValue",
					"type": "uint256"
				}
			],
			"name": "decreaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "faucet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "faucetOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "addedValue",
					"type": "uint256"
				}
			],
			"name": "increaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
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
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
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
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "waitTime",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	], tokenAddress);
}

async function updateButtons(){
	preload();
tickerButton.disabled = true;
faucetButton.disabled = true;
approveButton.disabled = true;
verifyButton.disabled = true;
stakeButton.disabled = true;
if (!window.ethereum) {
	loginButton.innerText = 'Metamask Not Found ';
	loginButton.setAttribute("style", "color: red");
	alertSign = document.createElement('span');
	alertSign.setAttribute("class", "fas fa-exclamation-triangle faa-flash animated");
	loginButton.append(alertSign);
	return false
}
else{
	window.web3 = new Web3(window.ethereum);
	window.contract = await loadTokenContract();
	window.usernameContract = await loadUsernameContract();
}
	if(session==='loggedIn'){
		accounts = (await ethereum.request({ method: 'eth_requestAccounts' }))[0];
	}
    if (isMetaMaskConnected()) {
    	connectButton.innerText = "Connected";
        connectButton.disabled = true;
		tickerButton.disabled = false;
    	faucetButton.disabled = false;
		approveButton.disabled = false;
		verifyButton.disabled = false;
		stakeButton.disabled = false;
		let goerli = (ethereum.chainId == "0x5");

		if(!goerli){
			tickerButton.disabled = true;
    		faucetButton.disabled = true;
			approveButton.disabled = true;
			verifyButton.disabled = true;
			stakeButton.disabled = true;
			inform.innerText = "The Contract is deployed on Goerli.";
			chainSwitchButton.style.display = "inline-block";
			slideout.innerText = wrongchainnotif;
			slideout.style.background = red;
			slideout.classList.remove('visible');
			slideout.offsetWidth;
			slideout.classList.add('visible');
			userImage.style.display = "none";
			username = null;

		}
		else{
			fetchedUsername = await window.usernameContract.methods.usernames(String(accounts)).call();
			if(fetchedUsername == ''){
				username = "Anonymous"
			}
			else{
				username = fetchedUsername
			}

			userImage.setAttribute('src', source + username) 
			userImage.style.display = "block"
		}
		userAdd.innerText = String(accounts).substring(0,7) + "..." + String(accounts).substring(37,43);
		userAdd.style.display = "block"

		loginButton.innerText = 'Logout'
		loginButton.removeEventListener('click', login)
		setTimeout(() => {
			loginButton.addEventListener('click', logout)
		  }, 200)

    }
    else{
    		tickerButton.disabled = true;
    		faucetButton.disabled = true;
			approveButton.disabled = true;
			verifyButton.disabled = true;
			stakeButton.disabled = true;
			userAdd.style.display = "none"
			userImage.style.display = "none"
			username = null;
			loginButton.addEventListener('click', login)
    }

}


connectButton.addEventListener('click', async() => {

try{
      let newAccounts = (await ethereum.request({ method: 'eth_requestAccounts' }))[0];
handleNewAccounts(newAccounts);
}

catch(error)
{
	console.error(error);
}

});

tickerButton.addEventListener('click', async() => {
try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}


});

faucetButton.addEventListener('click', async() => {
	inform.innerText="";
	chainSwitchButton.style.display = "none";

try{  		
	faucetButton.firstElementChild.style.display = "inline-block";
	let sender = accounts.toString();
	await window.contract.methods.faucet().call({from: accounts.toString()})
    await window.contract.methods.faucet().send({ from: sender });
	faucetButton.firstElementChild.style.display = "none";

  }

catch(error)
{ 	if(error.message.includes('Max token request exceeded')){
    slideout.innerText = 'Max token request exceeded';
	slideout.style.background = red;
    slideout.classList.remove('visible');
    slideout.offsetWidth;
    slideout.classList.add('visible');
	}
	else{
		console.error(error);
	}
}
finally{
	faucetButton.firstElementChild.style.display = "none";

}

});

approveButton.addEventListener('click', async() => {
	inform.innerText="";
	chainSwitchButton.style.display = "none";


try{
	if(isMetaMaskConnected()){
		approveButton.firstElementChild.style.display = "inline-block";

		let sender = accounts.toString();
		await window.contract.methods.approve(tokenAddress, maxApproval).send({ from: sender });
		approveButton.firstElementChild.style.display = "none";

	}  

	else{
		slideout.innerText = 'Disconnected';
		slideout.style.background = red;
		slideout.classList.remove('visible');
		slideout.offsetWidth;
		slideout.classList.add('visible');
		chainSwitchButton.style.display = "none";
		return
	}
  }


catch(error)
{ 
	console.error(error);
}

finally{
	approveButton.firstElementChild.style.display = "none";

}

});

stakeButton.addEventListener('click', async() => {
inform.innerText="";
chainSwitchButton.style.display = "none";

try{
	if(isMetaMaskConnected()){
	  if(tokenNumber.value){
		stakeButton.firstElementChild.style.display = "inline-block";

		let tokenAmountToStake = web3.utils.toWei(tokenNumber.value);
		let sender = accounts.toString();
		await window.contract.methods.transferFrom(sender, tokenAddress, tokenAmountToStake.toString()).send({ from: sender }); 
		stakeButton.firstElementChild.style.display = "none";

	  }
	  else{
		
		slideout.innerText = 'Invalid Token Value';
		slideout.style.background = red;
		slideout.classList.remove('visible');
		slideout.offsetWidth;
		slideout.classList.add('visible');
	
		chainSwitchButton.style.display = "none";

		return
	  }
	}
	else{
		slideout.innerText = 'Disconnected';
		slideout.style.background = red;
		slideout.classList.remove('visible');
		slideout.offsetWidth;
		slideout.classList.add('visible');
		chainSwitchButton.style.display = "none";

		return
	}
	  
  }

catch(error)
{ 
	console.error(error);
}
finally{
	stakeButton.firstElementChild.style.display = "none";

}

});

verifyButton.addEventListener('click', async() => {

try{
	  
	  if(isMetaMaskConnected()){

	  verifyButton.firstElementChild.style.display = "inline-block";
	  let sender = accounts.toString();
	  let allowance = await window.contract.methods.allowance(sender, tokenAddress).call();
	  let accountBal = await window.contract.methods.balanceOf(sender).call();
	  verifyButton.firstElementChild.style.display = "none";
      if(BigInt(allowance)>BigInt(accountBal)){
		slideout.innerText = "Not So Smart, my friend";
		slideout.style.background = red;
		slideout.classList.remove('visible');
		slideout.offsetWidth;
		slideout.classList.add('visible');
      	// smartCheck.innerText = "Not So Smart, my friend";
      }
      else{
		slideout.innerText = "Very Smart";
		slideout.style.background = "green";
		slideout.classList.remove('visible');
		slideout.offsetWidth;
		slideout.classList.add('visible');
      	// smartCheck.innerText = "Very Smart";
      }
	}
	  else{
		slideout.innerText = 'Disconnected';
		slideout.style.background = red;
		slideout.classList.remove('visible');
		slideout.offsetWidth;
		slideout.classList.add('visible');
		chainSwitchButton.style.display = "none";

		return
	}

  }



catch(error)
{ 
	console.error(error);
}

finally {
	
	verifyButton.firstElementChild.style.display = "none";

}



});

chainSwitchButton.addEventListener('click', async() => {
	try{
		await ethereum.request({method: 'wallet_switchEthereumChain',params: [{ chainId: '0x5' }]});
	}
	catch(error){
		console.log(error)
	}

});

async function login(){
    let newAccount
    try{
        newAccount = (await ethereum.request({ method: 'eth_requestAccounts' }))[0];
    }
    catch(error)
    {
        console.error(error);
    }   

    if(!newAccount) {return}
	handleNewAccounts(newAccount);
}

async function logout(){
	slideout.innerText = 'Disconnected';
	slideout.style.background = red;
	slideout.classList.remove('visible');
	slideout.offsetWidth;
	slideout.classList.add('visible');

	chainSwitchButton.style.display = "none";
	connectButton.disabled = false;
	connectButton.innerText = "Connect Wallet";
	tickerButton.disabled = true;
	faucetButton.disabled = true;
	approveButton.disabled = true;
	verifyButton.disabled = true;
	stakeButton.disabled = true;
	userAdd.style.display = "none"
	userImage.style.display = "none"
	username = null
	loginButton.innerText = 'Login'
	accounts = null
	sessionStorage.setItem('session', 'loggedOut')
	loginButton.removeEventListener('click', logout)
	setTimeout(() => {
		loginButton.addEventListener('click', login)
	  }, 200)
}


  async function handleNewAccounts (newAccounts) {
    accounts = newAccounts;
        if (isMetaMaskConnected()) {

		if(slideout.classList.contains('visible')){
    
			slideout.classList.remove('visible');
		}
		inform.innerText = "";
		chainSwitchButton.style.display = "none";
        connectButton.innerText = "Connected";
        connectButton.disabled = true;
        tickerButton.disabled = false;
    	faucetButton.disabled = false;
		approveButton.disabled = false;
		verifyButton.disabled = false;
		stakeButton.disabled = false;
		let goerli = (ethereum.chainId == "0x5");

		if(!goerli){
			tickerButton.disabled = true;
    		faucetButton.disabled = true;
			approveButton.disabled = true;
			stakeButton.disabled = true;
			verifyButton.disabled = true;
			inform.innerText = "The Contract is deployed on Goerli.";
			chainSwitchButton.style.display = "inline-block";
			slideout.innerText = wrongchainnotif;
			slideout.style.background = red;
			slideout.classList.remove('visible');
			slideout.offsetWidth;
			slideout.classList.add('visible');
			userImage.style.display = "none"
			username = null

		}
		else{
			fetchedUsername = await window.usernameContract.methods.usernames(String(accounts)).call();
			if(fetchedUsername == ''){
				username = "Anonymous"
			}
			else{
				username = fetchedUsername
			}

			userImage.setAttribute('src', source + username) 
			userImage.style.display = "block"
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
  
  }

try{
	ethereum.on('accountsChanged', async (newAccount) => {

		if(!newAccount.length){
			slideout.innerText = 'Disconnected';
			slideout.style.background = red;
			slideout.classList.remove('visible');
			slideout.offsetWidth;
			slideout.classList.add('visible');
			chainSwitchButton.style.display = "none";
			connectButton.disabled = false;
			connectButton.innerText = "Connect Wallet";
			tickerButton.disabled = true;
    		faucetButton.disabled = true;
			approveButton.disabled = true;
			stakeButton.disabled = true;
			verifyButton.disabled = true;			
			userAdd.style.display = "none";
			userImage.style.display = "none";
			username = null
			loginButton.innerText = 'Login';
			accounts = null
			sessionStorage.setItem('session', 'loggedOut')
			loginButton.removeEventListener('click', logout)
			setTimeout(() => {
				loginButton.addEventListener('click', login)
			  }, 200)
		}
		else{
			if(isMetaMaskConnected()){
				inform.innerText = "";
				chainSwitchButton.style.display = "none";
				accounts = newAccount[0];
				userAdd.innerText = String(accounts).substring(0,7) + "..." + String(accounts).substring(37,43);
				let goerli = (ethereum.chainId == "0x5");
				if(goerli)
					{
					fetchedUsername = await window.usernameContract.methods.usernames(String(accounts)).call();
					if(fetchedUsername == ''){
						username = "Anonymous"
					}
					else{
						username = fetchedUsername
					}
					userImage.setAttribute('src', source + username)
					// userImage.style.display = "block"
				
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
			else{
				// Fresh Connection needs no action
				return
			}
	
		}
});

}
catch(error){
	console.error(error);

}

try{
	ethereum.on('chainChanged', async(chainId) => {
		let goerli = (ethereum.chainId == "0x5");
				if(!goerli){
					tickerButton.disabled = true;
					faucetButton.disabled = true;
					approveButton.disabled = true;
					stakeButton.disabled = true;
					verifyButton.disabled = true;
					inform.innerText = "The Contract is deployed on Goerli";
					chainSwitchButton.style.display = "inline-block";
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
				else{
					if(!accounts) return
					inform.innerText = "";
					chainSwitchButton.style.display = "none";
					tickerButton.disabled = false;
					faucetButton.disabled = false;
					approveButton.disabled = false;
					stakeButton.disabled = false;
					verifyButton.disabled = false;
					fetchedUsername = await window.usernameContract.methods.usernames(String(accounts)).call();
					if(fetchedUsername == ''){
						username = "Anonymous"
					}
					else{
						username = fetchedUsername
					}
					userImage.setAttribute('src', source + username) 
					userImage.style.display = "block"
				}
		});
}
catch(error){
	console.log(error)
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
            await window.usernameContract.methods.setUsername(usernameToChange).call();
            usernameButton.nextElementSibling.style.display = "block";

            await window.usernameContract.methods.setUsername(usernameToChange).send({from: accounts.toString()});

            fetchedUsername = await window.usernameContract.methods.usernames(String(accounts)).call();
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

window.addEventListener('load', updateButtons);

function help(){
	console.log("Function\t\t\t\tPrivilege",
	"\n---------------------------------",
	"\ntokenInfo()\t\t\t\t\tUser",
	"\nowner()\t\t\t\t\t\tUser",
	"\nfaucetOwner(user,amount)\tOwner");
}
// --------------------------Owner Function ----------------------------

async function faucetOwner(user,amount){
	try{
		let sender = accounts.toString();
		await window.contract.methods.faucetOwner(user, amount).send({ from: sender });
	}
	catch(error) {
		console.log(error);
	}
}

// --------------------------Helper Functions ----------------------------

function tokenInfo(){
	console.log(
		"Token Address: ", tokenAddress,
		"\nToken Symbol: ", tokenSymbol,
		"\nToken Decimals: ", tokenDecimals);
}

async function owner(){
	try{
		console.log(await window.contract.methods.owner().call());

	}
	catch(error){

	}
}