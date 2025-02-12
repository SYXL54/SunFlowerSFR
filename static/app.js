// Connect Wallet Function
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            
            // Display wallet address
            document.getElementById('walletAddress').innerText = walletAddress;
            document.getElementById('walletInfo').classList.remove('hidden');
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            alert("Failed to connect wallet. Please try again.");
        }
    } else {
        alert("MetaMask not detected. Please install it and refresh the page.");
    }
}

// Show Modal Function
function showModal(message, showRegisterButton) {
    document.getElementById("statusMessage").innerText = message;
    let registerBtn = document.getElementById("registerRedirect");

    if (showRegisterButton) {
        registerBtn.style.display = "block";
        registerBtn.onclick = function() {
            window.location.href = "{{ url_for('register_page') }}"; // Direct redirection to registration page
        };
    } else {
        registerBtn.style.display = "none";
    }

    document.getElementById("modal").style.display = "block";
}

// Close Modal Function
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Login Function
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
            window.location.href = "{{ url_for('main_page') }}"; // Redirect directly to the main page
        } else {
            showModal("User not registered. Please register first!", true);
        }
    } catch (error) {
        console.error("Error checking user:", error);
        showModal("An error occurred. Please try again.", false);
    }
}

// Bind button events
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
document.getElementById('loginBtn').addEventListener('click', login);
