// 连接钱包函数
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            
            // 显示钱包地址
            document.getElementById('walletAddress').innerText = walletAddress;
            document.getElementById('walletInfo').classList.remove('hidden');
        } catch (error) {
            console.error("连接钱包失败:", error);
            alert("连接钱包失败，请重试。");
        }
    } else {
        alert("未检测到 MetaMask，请安装后刷新页面。");
    }
}

// 页面跳转函数
function navigateTo(page) {
    window.location.href = page;
}

// 绑定按钮事件
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
