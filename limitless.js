const connectButton = document.getElementById('btn-connect');
const accountStatus = document.getElementById('account-stat');
const chainStatus = document.getElementById('chain-stat');
const inform = document.getElementById('info');
const tickerButton = document.getElementById('btn-ticker');
const faucetButton = document.getElementById('btn-faucet');
const stakeButton = document.getElementById('btn-stake');
const approveButton = document.getElementById('btn-approve');
const verifyButton = document.getElementById('btn-verify');
const smartCheck = document.getElementById('smart');
const tokenNumber = document.getElementById('inputToken')
const loginButton = document.getElementById('btn-login');
const userAdd = document.getElementById('user');
const tokenAddress = '0x1472560646bd05578a383Ae3bb014FE33b0F9Dd3';
const tokenSymbol = 'RAZ';
const tokenDecimals = 18;
const tokenImage = 'https://pbs.twimg.com/profile_images/1293919155108773892/zal_RiVs_200x200.jpg';

const tokenCalc = 10**tokenDecimals;
const maxApproval = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
let accounts;
const isMetaMaskConnected = () => accounts && accounts.length > 0
let session = sessionStorage.getItem('session')


async function loadContract(){
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
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "puller",
				"type": "address"
			}
		],
		"name": "rugPull",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
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
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
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
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastAccessTime",
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
		"name": "MAX_REQUEST",
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
		"name": "TOKEN_AMOUNT",
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
		"inputs": [],
		"name": "WAIT_TIME",
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

tickerButton.disabled = true;
faucetButton.disabled = true;
accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (isMetaMaskConnected() && session==='loggedIn') {
    	connectButton.innerText = "Connected";
        connectButton.disabled = true;
		accountStatus.innerHTML = accounts;
		tickerButton.disabled = false;
    	faucetButton.disabled = false;
		let rinkeby = (ethereum.chainId == "0x4");
		chainStatus.innerHTML = ethereum.chainId;
		window.web3 = new Web3(window.ethereum);
		window.contract = await loadContract();
		if(!rinkeby){
			tickerButton.disabled = true;
    		faucetButton.disabled = true;
			inform.innerHTML = "The Contract is deployed on Rinkeby. Kindly Switch to Rinkeby";
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
			userAdd.style.display = "none"
			loginButton.addEventListener('click', login)
    }

}


connectButton.addEventListener('click', async() => {

try{
      let newAccounts = await ethereum.request({ method: 'eth_requestAccounts' });
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

try{
	  let sender = accounts.toString();
      await window.contract.methods.faucet().send({ from: sender });

  }

catch(error)
{ 
	console.error(error);
}

});

approveButton.addEventListener('click', async() => {

try{
	  
	  let sender = accounts.toString();
	  await window.contract.methods.approve(tokenAddress, maxApproval).send({ from: sender });

  }


catch(error)
{ 
	console.error(error);
}

});

stakeButton.addEventListener('click', async() => {

try{
	  if(tokenNumber.value){
		let tokenAmountToStake = web3.utils.toWei(tokenNumber.value);
		let sender = accounts.toString();
		await window.contract.methods.transferFrom(sender, tokenAddress, tokenAmountToStake.toString()).send({ from: sender }); 
	  }
	  else{
		console.log("Invalid Token Number")
		return
	  }
	  
  }



catch(error)
{ 
	console.error(error);
}

});

verifyButton.addEventListener('click', async() => {

try{
	  
	  
	  let sender = accounts.toString();
	  let allowance = await window.contract.methods.allowance(sender, tokenAddress).call();
	  let accountBal = await window.contract.methods.balanceOf(sender).call();
      if(allowance>accountBal){
      	smartCheck.innerHTML = "Not So Smart, my friend";
      }
      else{
      	smartCheck.innerHTML = "Very Smart";
      }

  }



catch(error)
{ 
	console.error(error);
}

});
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
	handleNewAccounts(newAccount);
}

async function logout(){
	tickerButton.disabled = true;
	faucetButton.disabled = true;
	userAdd.style.display = "none"
	connectButton.innerText = "Connect Wallet"
	connectButton.disabled = false;
    loginButton.innerText = 'Login'
    userAdd.style.display = "none"
    accounts = null
    sessionStorage.setItem('session', 'loggedOut')
    loginButton.removeEventListener('click', logout)
    setTimeout(() => {
        loginButton.addEventListener('click', login)
      }, 200)
}


  function handleNewAccounts (newAccounts) {
    accounts = newAccounts;
    accountStatus.innerHTML = accounts;
        if (isMetaMaskConnected()) {
        connectButton.innerText = "Connected";
        connectButton.disabled = true;
        tickerButton.disabled = false;
    	faucetButton.disabled = false;

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

ethereum.on('accountsChanged', (newAccount) => {
		accounts = newAccount;
		accountStatus.innerHTML = newAccount;
		userAdd.innerHTML = String(accounts).substring(0,7) + "..." + String(accounts).substring(37,43);
		if(!newAccount.length){
			inform.innerHTML = "Disconnected";
			connectButton.disabled = false;
			connectButton.innerHTML = "Connect Wallet";
			tickerButton.disabled = true;
    		faucetButton.disabled = true;
		}
});

ethereum.on('chainChanged', (chainId) => {
chainStatus.innerHTML = chainId;
let rinkeby = (ethereum.chainId == "0x4");
		if(!rinkeby){
			tickerButton.disabled = true;
    		faucetButton.disabled = true;
			inform.innerHTML = "The Contract is deployed on Rinkeby. Kindly Switch to Rinkeby";
		}
		else{
			inform.innerHTML = "";
			tickerButton.disabled = false;
    		faucetButton.disabled = false;
		}
});


window.addEventListener('load', updateButtons);