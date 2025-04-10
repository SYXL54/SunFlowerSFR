document.addEventListener('DOMContentLoaded', async function () {
    const walletAddressInput = document.getElementById('walletAddress');
    const messageDiv = document.getElementById('message');

    // 合约 ABI
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_dataType",
                    "type": "string"
                }
            ],
            "name": "confirmVerification",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_passport",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_singPass",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_addressInfo",
                    "type": "string"
                }
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_passportVerifier",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_singPassVerifier",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_addressVerifier",
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
                    "internalType": "string",
                    "name": "reason",
                    "type": "string"
                }
            ],
            "name": "RegistrationFailed",
            "type": "event"
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
                    "internalType": "string",
                    "name": "passport",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "singPass",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "addressInfo",
                    "type": "string"
                }
            ],
            "name": "UserRegistered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "verifier",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "dataType",
                    "type": "string"
                }
            ],
            "name": "VerificationConfirmed",
            "type": "event"
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
                    "internalType": "string",
                    "name": "dataType",
                    "type": "string"
                }
            ],
            "name": "VerificationRequested",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "addressVerifier",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "checkRegistrationStatus",
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
            "name": "passportVerifier",
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
            "name": "singPassVerifier",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "passport",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "singPass",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "addressInfo",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "passportVerified",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "singPassVerified",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "addressVerified",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "registrationTime",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isRegistered",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "verificationTimeout",
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
    ];

    // 合约地址
    const contractAddress = '0x3E84490CE80D946915Ce61e6A882Ea5552ff67Ea';

    // sfr
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

    // 页面加载时自动填充钱包地址
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
        walletAddressInput.value = savedWalletAddress;
        messageDiv.textContent = "The wallet address has been automatically filled in, checking whether it is registered...";
        messageDiv.style.color = "blue";

        try {
            // 发送请求到 Flask 服务器，检查是否已注册
            const response = await fetch(`/check_user?address=${savedWalletAddress}`);
            const data = await response.json();

            if (data.registered) {
                // **用户已注册，显示跳转到 Dashboard 的按钮**
                messageDiv.textContent = "You have registered and will be redirected to the Dashboard.";
                messageDiv.style.color = "green";
                console.log("User check response:", data);

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000); // **2 秒后跳转**
            } else {
                messageDiv.textContent = "Not registered, please fill in the information to register.";
                messageDiv.style.color = "red";
            }
        } catch (error) {
            console.error("Error checking user registration:", error);
            messageDiv.textContent = "Failed to check user status, please try again later.";
            messageDiv.style.color = "red";
        }
    } else {
        messageDiv.textContent = "No wallet connection detected, please connect your wallet on the home page first.";
        messageDiv.style.color = "red";
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // 初始化合约实例
    let contract;
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        console.error("Please install MetaMask or other Ethereum wallet plugin!");
    }



    // 注册表单提交逻辑
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 获取表单数据
        const passport = document.getElementById('passport').value;
        const singPass = document.getElementById('singpass').value;
        const addressInfo = document.getElementById('address').value;

        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        if (!data.wallet_address) {
            messageDiv.textContent = "Please connect your wallet before registering.";
            messageDiv.style.color = "red";
            return;
        }
        try {
            // 调用智能合约的 register 方法
            messageDiv.textContent = "Submitting registration, please wait...";
            messageDiv.style.color = "blue";

            const tx = await contract.register(passport, singPass, addressInfo);
            console.log("Registration submitted, awaiting confirmation:", tx);
            await tx.wait();
            console.log("Transaction confirmed, transaction hash:", tx.hash);

            // 开始每 5s 轮询 checkRegistrationStatus 方法
            const userAccount = data.wallet_address;  // 当前用户钱包地址
            const pollInterval = 5000;  // 30 秒
            let register_status = false;
            const pollRegistrationStatus = async () => {
                try {
                    const status = await contract.checkRegistrationStatus(userAccount);
                    console.log("Current registration status:", status);
                    if (status === "User successfully registered.") {
                        register_status = true;
                        // 当状态满足条件后，更新前端显示注册成功，并停止轮询
                        messageDiv.textContent = "Registration successful! Transaction hash:" + tx.hash;
                        messageDiv.style.color = "green";
                        clearInterval(pollIntervalId);
                    }
                } catch (pollError) {
                    console.error("Error checking registration status:", pollError);
                }
            };
            const pollIntervalId = setInterval(pollRegistrationStatus, pollInterval);

            // **监听轮询状态，等待成功后调用数据库**
            const waitForRegistration = async () => {
                while (!register_status) {
                    console.log("Waiting for registration to succeed...");
                    await new Promise(resolve => setTimeout(resolve, 1000)); // **等待 1 秒再检查**
                }

                console.log("Registration is successful, start writing to the database...");

                // **注册成功后，调用后端 API 将数据存入数据库**
                const response = await fetch("/register_user", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            wallet_address: savedWalletAddress,
                            passport: passport,
                            singpass: singPass,
                            address: addressInfo
                        })
                    });

                const result = await response.json();
                console.log("Database response:", result);

                if (result.success) {
                    // **自动给新用户发 SFR 代币**
                    if (typeof window.ethereum !== "undefined") {
                        try {
                            await window.ethereum.request({ method: "eth_requestAccounts" });
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const signer = provider.getSigner();
                            const sfrContract = new ethers.Contract(sfrTokenAddress, sfrAbi, signer);

                            // **定义新用户的奖励数量**
                            const rewardAmount = 0.0005;  // 50 SFR

                            // **调用 `mint()` 方法，直接给用户铸造 SFR 代币**
                            // const tx = await await bankContract.rewardUser(savedWalletAddress);
                            console.log(savedWalletAddress);
                            const tx = await sfrContract.mint(savedWalletAddress, ethers.utils.parseEther(rewardAmount.toString()));
                            await tx.wait();
                
                            console.log(`Minted ${rewardAmount} SFR to ${savedWalletAddress}`);
                
                            // **调用后端 API 记录交易**
                            await fetch("/record_transaction", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    wallet_address: savedWalletAddress,
                                    transaction_type: "Reward",
                                    amount: rewardAmount,
                                })
                            });
                
                            console.log("Transaction recorded successfully.");
                            setTimeout(() => window.location.href = "/dashboard", 2000);
                        } catch (error) {
                            console.error("Minting failed:", error);
                            alert("Failed to mint SFR tokens.");
                        }
                    } else {
                        alert("Please install MetaMask to use Web3 features.");
                    }
                } else {
                    messageDiv.textContent = "Database write failed:" + result.error;
                    messageDiv.style.color = "red";
                }
            };

            waitForRegistration();
        } catch (error) {
            console.error("Submit registration failed:", error);
            messageDiv.textContent = "Submit registration failed:" + (error.message || "Please try again.");
            messageDiv.style.color = "red";
        }
    });
});
