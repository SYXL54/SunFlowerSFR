document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const transactionsTableBody = document.querySelector("#transactionsTable tbody");
    const transactionsContainer = document.getElementById("transactionsContainer"); // 确保获取容器

    // 确保查询前隐藏交易表格
    transactionsContainer.style.display = "none";

    // 监听查询提交事件
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const walletAddress = document.getElementById("walletAddress").value.trim();
        if (!walletAddress) {
            alert("Please enter a wallet address!");
            return;
        }

        console.log("Fetching transactions for wallet:", walletAddress);

        try {
            const response = await fetch(`/get_transactions?wallet_address=${encodeURIComponent(walletAddress)}`);
            const data = await response.json();

            console.log("API Response:", data); // Debugging API response

            // 清空表格
            transactionsTableBody.innerHTML = "";

            if (data.success && data.transactions.length > 0) {
                transactionsContainer.style.display = "block"; // 显示表格容器

                data.transactions.forEach(transaction => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${transaction.transaction_type}</td>
                        <td>${transaction.amount}</td>
                        <td>${new Date(transaction.created_at).toLocaleString()}</td>
                    `;

                    transactionsTableBody.appendChild(row);
                });
            } else {
                transactionsContainer.style.display = "block"; // 仍然显示表格，但提示无交易
                const row = document.createElement("tr");
                row.innerHTML = `<td colspan="4">No transactions found.</td>`;
                transactionsTableBody.appendChild(row);
            }
        } catch (error) {
            console.error("Failed to fetch transaction history:", error);
            alert("Failed to fetch transactions. Please try again later.");
        }
    });
});
