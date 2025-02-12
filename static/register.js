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

            // 开始每 30s 轮询 checkRegistrationStatus 方法
            const userAccount = data.wallet_address;  // 当前用户钱包地址
            const pollInterval = 30000;  // 30 秒
            const pollRegistrationStatus = async () => {
                try {
                    const status = await contract.checkRegistrationStatus(userAccount);
                    console.log("当前注册状态:", status);
                    if (status === "User successfully registered.") {
                        // 当状态满足条件后，更新前端显示注册成功，并停止轮询
                        messageDiv.textContent = "注册成功！交易哈希：" + tx.hash;
                        messageDiv.style.color = "green";
                        clearInterval(pollIntervalId);
                        setTimeout(() => window.location.href = '/dashboard', 1500);
                        //todo:写入数据库？
                    }
                } catch (pollError) {
                    console.error("检查注册状态时出错:", pollError);
                }
            };
            const pollIntervalId = setInterval(pollRegistrationStatus, pollInterval);

        } catch (error) {
            console.error("提交注册失败:", error);
            messageDiv.textContent = "提交注册失败：" + (error.message || "请重试。");
            messageDiv.style.color = "red";
        }
    });
});
