document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            document.getElementById('walletAddress').innerText = `Wallet: ${userAddress}`;
            
            // Obtener las posiciones de liquidez de PulseX
            getLiquidityPositions(userAddress, web3);
        } catch (error) {
            console.error("Error al conectar la wallet", error);
        }
    } else {
        alert('MetaMask no está instalado. Por favor instale MetaMask.');
    }
});

const pulseXContractAddress = '0x95B303987A60C71504D99Aa1b13B4DA07b0790ab';
const pulseXContractABI = [
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

async function getLiquidityPositions(userAddress, web3) {
    try {
        const pulseXContract = new web3.eth.Contract(pulseXContractABI, pulseXContractAddress);
        
        // Obtener el balance de liquidez del usuario en PulseX
        const liquidityBalance = await pulseXContract.methods.balanceOf(userAddress).call();
        
        // Mostrar la información en la interfaz
        displayLiquidityPositions(liquidityBalance);
    } catch (error) {
        console.error('Error al obtener las posiciones de liquidez:', error);
    }
}

function displayLiquidityPositions(balance) {
    const liquidityDataDiv = document.getElementById('liquidityData');
    liquidityDataDiv.innerHTML = '';

    if (balance == 0) {
        liquidityDataDiv.innerText = 'No se encontraron posiciones de liquidez.';
    } else {
        liquidityDataDiv.innerHTML = `<p>Balance de Liquidez en PulseX: ${balance} tokens</p>`;
    }
}
