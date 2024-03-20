require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const L1RPC = process.env['L1RPC'];
const L2RPC = process.env['L2RPC'];
const DEVNET_PRIVKEY = process.env[DEVNET_PRIVKEY];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      gas: 'auto'
    },
    l1: {
      gasLimit: 0,
      gas: 'auto',
      url: L1RPC || "",
      accounts: DEVNET_PRIVKEY ? [DEVNET_PRIVKEY] : []
    },
    l2: {
      url: L2RPC || "",
      accounts: DEVNET_PRIVKEY
                ? [DEVNET_PRIVKEY]
                : [],
    }
  }
};
