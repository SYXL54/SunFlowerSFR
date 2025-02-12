document.addEventListener('DOMContentLoaded', function () {
    const walletAddressInput = document.getElementById('walletAddress');
    const messageDiv = document.getElementById('message');

    const bankContractAddress = '0x41B373BE3C13fBe0Fc599082c35fF4A93bDA022B'; // Bank.sol合约地址
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
                }
            ],
            "name": "RewardIssued",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "rewardNewUser",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "receivedReward",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
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
        messageDiv.textContent = "钱包地址已自动填充。";
        messageDiv.style.color = "green";
    } else {
        messageDiv.textContent = "未检测到钱包连接，请先在首页连接钱包。";
        messageDiv.style.color = "red";
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const bankContract = new ethers.Contract(bankContractAddress, bankAbi, signer);
    const registerContract = new ethers.Contract(contractAddress, contractABI, signer);

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
                        messageDiv.textContent = "注册成功！正在检查新用户奖励领取情况...";
                        messageDiv.style.color = "green";
                        
                        const userAddress = await signer.getAddress();
                        // 检查用户是否真的注册成功
                        const status = await registerContract.checkRegistrationStatus(userAddress);
                        if (status !== "User successfully registered.") {
                            console.log("用户注册状态异常，未能领取奖励！");
                            return;
                        }
                        // 调用 `Bank.sol` 的 `rewardNewUser()` 领取新人奖励
                        const rewardTx = await bankContract.rewardNewUser(userAddress);
                        await rewardTx.wait();
                        messageDiv.textContent = `🎉 你已注册并获得 0.005 SFR 作为新人奖励！`;

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
