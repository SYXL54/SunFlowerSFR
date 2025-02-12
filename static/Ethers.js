//实现认证账户对认证事件的监听
const { useEffect, useState } = require('react');
const { ethers } = require('ethers');

const passportVerifier = '0xBe9d8ED4B2D98dB55EaC4fB79D6526A9193ead49';
const singPassVerifier = '0xd427aD728154c6cE616B1f9E22DEB3a995478eEB';
const addressVerifier = '0x9Fe3C923CCdb28bCEEf34EA7f181e49e23b1a3f1';

// 检查钱包是否已连接
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


// 获取钱包地址
const walletAddress = signer;
console.log('当前钱包地址:', walletAddress);


if (walletAddress.toLowerCase() === passportVerifier.toLowerCase() || walletAddress.toLowerCase() === singPassVerifier.toLowerCase() || walletAddress.toLowerCase() === addressVerifier.toLowerCase()) {
    // 连接到以太坊网络
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/00b67674343c40d6954ff70657904f68');

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

    // 创建合约实例
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log('1:');

    monitor(contract);


}

async function monitor(contract) {
    console.log('2:');
    //监听 VerificationRequested 事件
    contract.on('VerificationRequested', async (userAddress, dataType, event) => {
        console.log(`Verification requested for user: ${userAddress}, data type: ${dataType}`);

        // 用户确认后，调用合约的 confirmVerification 方法
        await contract.confirmVerification(userAddress, dataType);

    });
}


