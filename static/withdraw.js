// withdraw.js - 取款逻辑
const sfrTokenAddress = "0x638a42c5f6f16fa3ee53985d9bf10704b19379b5"; // SFRToken合约地址
const sfrAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
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
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
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
				"name": "value",
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
	}
];

const bankContractAddress = "0xcc5c4b00d51e7236d69a06149a9b9e264760c542"; // Bank.sol合约地址
const bankAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sfrToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBankBalance",
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
		"name": "sfrToken",
		"outputs": [
			{
				"internalType": "contract SFRToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

async function getBalances() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const sfrContract = new ethers.Contract(sfrTokenAddress, sfrAbi, provider);

        // 获取 SFR 余额
        let sfrBalance = await sfrContract.balanceOf(address);
        sfrBalance = ethers.utils.formatEther(sfrBalance);

        // 获取 ETH 余额
        let ethBalance = await provider.getBalance(address);
        ethBalance = ethers.utils.formatEther(ethBalance);

        // 更新 UI
        document.getElementById("sfrBalance").innerText = sfrBalance + " SFR";
        document.getElementById("ethBalance").innerText = ethBalance + " ETH";
    }
}

async function withdrawETH() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const sfrContract = new ethers.Contract(sfrTokenAddress, sfrAbi, signer);
        const bankContract = new ethers.Contract(bankContractAddress, bankAbi, signer);

        let withdrawAmount = document.getElementById("withdrawAmount").value;
        if (!withdrawAmount || withdrawAmount <= 0) {
            alert("Please enter a valid withdrawal amount.");
            return;
        }

        try {
            // 1. First, authorize Bank.sol to transfer SFR tokens from the user's wallet
            let approveTx = await sfrContract.approve(bankContractAddress, ethers.utils.parseEther(withdrawAmount));
            await approveTx.wait();

            // 2. Call the withdraw method from Bank.sol
            let tx = await bankContract.withdraw(ethers.utils.parseEther(withdrawAmount));
            await tx.wait();
            alert(`You have withdrawn ${withdrawAmount} your ETH successfully.\nAn equal amount of your SFR tokens have been destroyed!`);

            // **取款成功后更新余额**
            getBalances();

			// **调用后端 API 记录交易**
			await fetch("/record_transaction", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					wallet_address: localStorage.getItem('walletAddress'),
					transaction_type: "Withdraw",
					amount: withdrawAmount,
				})
			});
        } catch (error) {
            console.error("Withdrawal failed:", error);
            alert("Withdrawal failed. Please check your SFR balance or MetaMask connection!");
        }
    } else {
        alert("请安装 MetaMask 以使用 Web3 功能");
    }
}

// **页面加载时自动获取余额**
window.onload = getBalances;

// async function withdrawETH() {
//     if (typeof window.ethereum !== "undefined") {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const sfrContract = new ethers.Contract(sfrTokenAddress, sfrAbi, signer);
//         const bankContract = new ethers.Contract(bankContractAddress, bankAbi, signer);

//         let withdrawAmount = document.getElementById("withdrawAmount").value;
//         if (!withdrawAmount || withdrawAmount <= 0) {
//             alert("请输入有效的取款金额");
//             return;
//         }

//         try {
//             // 1. 先授权 Bank.sol 从用户钱包转走 SFR 代币
//             let approveTx = await sfrContract.approve(bankContractAddress, ethers.utils.parseEther(withdrawAmount));
//             await approveTx.wait();

//             // 2. 调用 Bank.sol 的 withdraw 方法
//             let tx = await bankContract.withdraw(ethers.utils.parseEther(withdrawAmount));
//             await tx.wait();
//             alert(`成功取款 ${withdrawAmount} ETH，已销毁等量 SFR！`);
//         } catch (error) {
//             console.error("取款失败:", error);
//             alert("取款失败，请检查 SFR 余额或 MetaMask 连接！");
//         }
//     } else {
//         alert("请安装 MetaMask 以使用 Web3 功能");
//     }
// }
