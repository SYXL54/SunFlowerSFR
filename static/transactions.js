document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const transactionsTableBody = document.querySelector('#transactionsTable tbody');

    // 提交查询表单
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const walletAddress = document.getElementById('walletAddress').value.trim();
        if (!walletAddress) {
            alert("请输入钱包地址！");
            return;
        }

        try {
            const response = await fetch(`/get_transactions?wallet_address=${encodeURIComponent(walletAddress)}`);
            const data = await response.json();

            // 清空表格
            transactionsTableBody.innerHTML = '';

            if (data.success && data.transactions.length > 0) {
                data.transactions.forEach(transaction => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${transaction.transaction_type}</td>
                        <td>${transaction.amount}</td>
                        <td>${transaction.transaction_hash}</td>
                        <td>${new Date(transaction.created_at).toLocaleString()}</td>
                    `;

                    transactionsTableBody.appendChild(row);
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="4">没有找到相关交易记录。</td>`;
                transactionsTableBody.appendChild(row);
            }
        } catch (error) {
            console.error("查询交易历史失败:", error);
            alert("查询失败，请稍后再试。");
        }
    });
});
