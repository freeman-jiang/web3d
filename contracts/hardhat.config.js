require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/y5D9C_eB0aRhS4Sqa57ZdvD0EQ1HzLkO',
      accounts: ['0x461bfbae8176c7c752aa7442ecf5d5026eec4aad11f99eb225752f3e0472334c']
    },
  }
};
