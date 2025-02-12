document.addEventListener('DOMContentLoaded', function () {
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
    const contractAddress = '0xca9D5d268A61e0Eb9c0E8BAac3dD0138812Fdb58';

    // 页面加载时自动填充钱包地址
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
        walletAddressInput.value = savedWalletAddress;
        messageDiv.textContent = "钱包地址已自动填充。";
        messageDiv.style.color = "green";
    } else {
        messageDiv.textContent = "未检测到钱包连接，请先在首页连接钱包。";
        messageDiv.style.color = "red";
    }

    // 初始化合约实例
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // 注册表单提交逻辑
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 获取表单数据
        const passport = document.getElementById('passport').value;
        const singPass = document.getElementById('singpass').value;
        const addressInfo = document.getElementById('address').value;

        // const formData = new FormData(registerForm);
        // const data = Object.fromEntries(formData.entries());

        if (!data.wallet_address) {
            messageDiv.textContent = "请先连接钱包再注册。";
            messageDiv.style.color = "red";
            return;
        }
        try {
            // 调用智能合约的 register 方法
            messageDiv.textContent = "正在提交注册，请稍候...";
            messageDiv.style.color = "blue";

            const tx = await contract.methods.register(passport, singPass, addressInfo)
                .send({ from: userAccount });

            console.log("交易成功:", tx);
            messageDiv.textContent = "注册成功！交易哈希：" + tx.transactionHash;
            messageDiv.style.color = "green";
        } catch (error) {
            console.error("提交注册失败:", error);
            messageDiv.textContent = "提交注册失败：" + (error.message || "请重试。");
            messageDiv.style.color = "red";
        }
        // try {
        //     const response = await fetch('/register', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });

        //     const result = await response.json();
        //     if (result.success) {
        //         messageDiv.textContent = "注册成功！正在跳转到 Dashboard...";
        //         messageDiv.style.color = "green";
        //         setTimeout(() => window.location.href = '/dashboard', 1500);
        //     } 
        //     // 检测钱包已注册的情况，并自动跳转
        //     else if (result.message === "该钱包地址已注册，请直接登录。") {
        //         messageDiv.textContent = "该钱包地址已注册，正在跳转到 Dashboard...";
        //         messageDiv.style.color = "green";
        //         setTimeout(() => window.location.href = '/dashboard', 1500);
        //     } 
        //     else {
        //         messageDiv.textContent = result.message || "注册失败，请重试。";
        //     }
            
        // } catch (error) {
        //     console.error("提交注册失败:", error);
        //     messageDiv.textContent = "提交注册失败，请重试。";
        // }
    });
});
