

const env = require('./helpers/env');
env.loadEnvFile();

module.exports = {
    networks: {
        hardhat: {
            hardfork: "cancun"
        },
        geni: {
            chainId: 31339,
            url: "https://rpc.genidex.net"
        },
        op_sepolia: {
            chainId: 11155420,
            url: 'https://sepolia.optimism.io',
            // url: 'https://optimism-sepolia.infura.io/v3/' + env.get('INFURA_API_KEY'),
            accounts: [
                env.get('PRIVATE_KEY_0'),
                env.get('PRIVATE_KEY_1'),
                env.get('PRIVATE_KEY_2'),
            ]
        },
        sepolia: {
            url: 'https://sepolia.infura.io/v3/' + env.get('INFURA_API_KEY'),
            accounts: [
                env.get('PRIVATE_KEY_0'),
                env.get('PRIVATE_KEY_1'),
                env.get('PRIVATE_KEY_2'),
            ]
        },
    },
    etherscan: {
        apiKey: {
            op_sepolia: env.get('ETHERSCAN_OP_API_KEY'),
            sepolia: env.get('ETHERSCAN_API_KEY')
        },
        customChains: [
            {
              network: "op_sepolia",
              chainId: 11155420,
              urls: {
                apiURL: "https://api-sepolia-optimism.etherscan.io/api",
                browserURL: "https://sepolia-optimism.etherscan.io/"
              }
            }
          ]
    },
    privateKeys: [
        env.get('PRIVATE_KEY_0'),
        env.get('PRIVATE_KEY_1'),
        env.get('PRIVATE_KEY_2'),
    ]
}