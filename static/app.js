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

function showModal(message, showRegisterButton) {
    document.getElementById("statusMessage").innerText = message;
    let registerBtn = document.getElementById("registerRedirect");

    if (showRegisterButton) {
        registerBtn.style.display = "block";
        registerBtn.onclick = function() {
            window.location.href = "{{ url_for('register_page') }}"; // 直接赋值跳转
        };
    } else {
        registerBtn.style.display = "none";
    }

    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

async function login() {
    const walletAddress = document.getElementById("walletAddress").innerText.trim();
    if (!walletAddress) {
        showModal("No wallet address detected.", false);
        return;
    }

    try {
        const response = await fetch(`/check_user?address=${walletAddress}`);
        const result = await response.json();

        if (result.registered) {
            window.location.href = "{{ url_for('main_page') }}"; // 直接跳转到主界面
        } else {
            showModal("User not registered, please register first!", true);
        }
    } catch (error) {
        console.error("Error checking user:", error);
        showModal("An error occurred. Please try again.", false);
    }
}

// 绑定按钮事件
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
document.getElementById('loginBtn').addEventListener('click', login);
