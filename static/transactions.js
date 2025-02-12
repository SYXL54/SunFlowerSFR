document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const transactionsTableBody = document.querySelector('#transactionsTable tbody');

    // Submit the search form
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const walletAddress = document.getElementById('walletAddress').value.trim();
        if (!walletAddress) {
            alert("Please enter a wallet address!");
            return;
        }

        try {
            const response = await fetch(`/get_transactions?wallet_address=${encodeURIComponent(walletAddress)}`);
            const data = await response.json();

            // Clear the table
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
                row.innerHTML = `<td colspan="4">No transactions found.</td>`;
                transactionsTableBody.appendChild(row);
            }
        } catch (error) {
            console.error("Failed to fetch transaction history:", error);
            alert("Failed to fetch transactions. Please try again later.");
        }
    });
});

