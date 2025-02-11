// 检查钱包是否已连接
window.onload = async () => {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            document.getElementById('walletAddress').innerText = walletAddress;

            // 加载账户余额
            getAccountBalance(walletAddress);
        } catch (error) {
            console.error("无法获取钱包地址:", error);
            alert("请连接钱包后重试。");
        }
    } else {
        alert("未检测到 MetaMask，请安装后刷新页面。");
    }
};

// 获取账户余额
async function getAccountBalance(walletAddress) {
    const web3 = new Web3(window.ethereum);
    const balanceWei = await web3.eth.getBalance(walletAddress);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

    document.getElementById('balance').innerText = `${balanceEth} ETH`;
}

// 页面跳转函数
function navigateTo(page) {
    window.location.href = page;
}

// 退出登录
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
