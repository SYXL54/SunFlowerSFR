document.addEventListener('DOMContentLoaded', function () {
    const walletAddressInput = document.getElementById('walletAddress');
    const messageDiv = document.getElementById('message');

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

    // 注册表单提交逻辑
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        if (!data.wallet_address) {
            messageDiv.textContent = "请先连接钱包再注册。";
            messageDiv.style.color = "red";
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                messageDiv.textContent = "注册成功！正在跳转到 Dashboard...";
                messageDiv.style.color = "green";
                setTimeout(() => window.location.href = '/dashboard', 1500);
            } 
            // 检测钱包已注册的情况，并自动跳转
            else if (result.message === "该钱包地址已注册，请直接登录。") {
                messageDiv.textContent = "该钱包地址已注册，正在跳转到 Dashboard...";
                messageDiv.style.color = "green";
                setTimeout(() => window.location.href = '/dashboard', 1500);
            } 
            else {
                messageDiv.textContent = result.message || "注册失败，请重试。";
            }
            
        } catch (error) {
            console.error("提交注册失败:", error);
            messageDiv.textContent = "提交注册失败，请重试。";
        }
    });
});
