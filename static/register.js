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

    // bank
    const bankContractAddress = "0x41B373BE3C13fBe0Fc599082c35fF4A93bDA022B"; // Bank.sol合约地址
    const bankAbi = [
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
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
        }
    ];

    // 页面加载时自动填充钱包地址
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
        walletAddressInput.value = savedWalletAddress;
        messageDiv.textContent = "钱包地址已自动填充，正在检查是否已注册...";
        messageDiv.style.color = "blue";

        try {
            // 发送请求到 Flask 服务器，检查是否已注册
            const response = await fetch(`/check_user?address=${savedWalletAddress}`);
            const data = await response.json();

            if (data.registered) {
                // **用户已注册，显示跳转到 Dashboard 的按钮**
                messageDiv.textContent = "您已注册，即将前往Dashboard。";
                messageDiv.style.color = "green";
                console.log("User check response:", data);

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000); // **2 秒后跳转**
            } else {
                messageDiv.textContent = "未注册，请填写信息进行注册。";
                messageDiv.style.color = "red";
            }
        } catch (error) {
            console.error("Error checking user registration:", error);
            messageDiv.textContent = "检查用户状态失败，请稍后重试。";
            messageDiv.style.color = "red";
        }
    } else {
        messageDiv.textContent = "未检测到钱包连接，请先在首页连接钱包。";
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
        console.error("请安装 MetaMask 或其他以太坊钱包插件！");
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
            messageDiv.textContent = "请先连接钱包再注册。";
            messageDiv.style.color = "red";
            return;
        }
        try {
            // 调用智能合约的 register 方法
            messageDiv.textContent = "正在提交注册，请稍候...";
            messageDiv.style.color = "blue";

            const tx = await contract.register(passport, singPass, addressInfo);
            console.log("注册已提交，等待确认:", tx);
            await tx.wait();
            console.log("交易已确认，交易哈希:", tx.hash);

            // 开始每 5s 轮询 checkRegistrationStatus 方法
            const userAccount = data.wallet_address;  // 当前用户钱包地址
            const pollInterval = 5000;  // 30 秒
            let register_status = false;
            const pollRegistrationStatus = async () => {
                try {
                    const status = await contract.checkRegistrationStatus(userAccount);
                    console.log("当前注册状态:", status);
                    if (status === "User successfully registered.") {
                        register_status = true;
                        // 当状态满足条件后，更新前端显示注册成功，并停止轮询
                        messageDiv.textContent = "注册成功！交易哈希：" + tx.hash;
                        messageDiv.style.color = "green";
                        clearInterval(pollIntervalId);
                    }
                } catch (pollError) {
                    console.error("检查注册状态时出错:", pollError);
                }
            };
            const pollIntervalId = setInterval(pollRegistrationStatus, pollInterval);

            // **监听轮询状态，等待成功后调用数据库**
            const waitForRegistration = async () => {
                while (!register_status) {
                    console.log("等待注册成功...");
                    await new Promise(resolve => setTimeout(resolve, 1000)); // **等待 1 秒再检查**
                }

                console.log("注册成功，开始写入数据库...");

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
                            const bankContract = new ethers.Contract(bankContractAddress, bankAbi, signer);

                            // **定义新用户的奖励数量**
                            const rewardAmount = "0.0005"; // 赠送
                            const tx = await bankContract.deposit({ value: ethers.utils.parseEther(rewardAmount) });
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
                        } catch (error) {
                            console.error("Minting failed:", error);
                            alert("Failed to mint SFR tokens.");
                        }
                    } else {
                        alert("Please install MetaMask to use Web3 features.");
                    }
                    setTimeout(() => window.location.href = "/dashboard", 2000);
                } else {
                    messageDiv.textContent = "数据库写入失败：" + result.error;
                    messageDiv.style.color = "red";
                }
            };

            waitForRegistration();
        } catch (error) {
            console.error("提交注册失败:", error);
            messageDiv.textContent = "提交注册失败：" + (error.message || "请重试。");
            messageDiv.style.color = "red";
        }
    });
});
