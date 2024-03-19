const { addDefaultLocalNetwork, getL2Network, EthBridger } = require('@arbitrum/sdk');
const { providers, Wallet, parseEther, ethers } = require('ethers');
// const { parseEther } = utils;
require('dotenv').config();


const L1RPC = process.env.L1RPC;
const L2RPC = process.env.L2RPC;
const DEVNET_PRIVKEY = process.env.DEVNET_PRIVKEY;

const l1Provider = new ethers.providers.JsonRpcProvider(L1RPC);

const l2Provider = new ethers.providers.JsonRpcProvider(L2RPC);

const l1PrivateKey = DEVNET_PRIVKEY;
// const l1PrivateKey = 0x29bf6a1f73aebec6b3d6ef7a058d9a721440ba7f39ca86a411be57194a4aac95n;

const l1Wallet = new Wallet(l1PrivateKey, l1Provider);

// l2 Address to send l1 Ethers to...
const destinationAddress = '0x84359bBa6519f0b4A5e46BdA4731D3f62ff952A4';

const amountToDeposit = '0.003';


const main = async () => {

    console.log('Starting process');

    addDefaultLocalNetwork();

    const l2Network = await getL2Network(l2Provider);

    // Use l2 network to create an Arbitrum SDK EthBridge instance.

    const ethBridger = new EthBridger(l2Network);

    // Transfer ethers from l1 to l2;
    const depositTx = await ethBridger.depositTo({
        amount: parseEther(amountToDeposit),
        l1Signer: l1Wallet,
        l2Provider: l2Provider,
        destinationAddress: destinationAddress
    })

    console.log("Waiting for l1 confirmation.")
    const depositRec = await depositTx.wait();
    
    console.log(`Deposit l1 hash/receipt is ${depositRec.transactionHash}`);
    
    // With the transaction confirmed on l1, we now wait for l2 to be done.
    
    console.log("Now let's wait for the l2 side of the transaction to be executed.");
    
    const l2Result = await depositRec.waitForL2(l2Provider);
    
    l2Result.complete ? console.log(`L2 message successful`): console.log("L2 message failed.")
};


main().then(() => 
    process.exit(0)).catch(() => {
        process.exit(1)
    })
