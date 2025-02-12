// Check if the wallet is connected
window.onload = async () => {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            document.getElementById('walletAddress').innerText = walletAddress;

            // Load account balance
            getAccountBalance(walletAddress);
        } catch (error) {
            console.error("Unable to retrieve wallet address:", error);
            alert("Please connect your wallet and try again.");
        }
    } else {
        alert("MetaMask not detected. Please install it and refresh the page.");
    }
};

// Get account balance
async function getAccountBalance(walletAddress) {
    const web3 = new Web3(window.ethereum);
    const balanceWei = await web3.eth.getBalance(walletAddress);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

    document.getElementById('balance').innerText = `${balanceEth} ETH`;
}

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
