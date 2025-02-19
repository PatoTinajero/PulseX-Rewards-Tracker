document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('walletAddress').innerText = `Wallet: ${accounts[0]}`;
            // Aquí se puede agregar la lógica para analizar la liquidez en PulseX
        } catch (error) {
            console.error("Error al conectar la wallet", error);
        }
    } else {
        alert('MetaMask no está instalado. Por favor instale MetaMask.');
    }
});
