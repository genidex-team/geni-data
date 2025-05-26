
const path = require('path');
const env = require('./helpers/env');
env.loadEnvFile();

const envFile = path.join(__dirname, `.${env.get('NODE_ENV')}.env`);
env.loadEnvFile(envFile);

const privateKeys = [
    env.get('PRIVATE_KEY_0'),
    env.get('PRIVATE_KEY_1'),
    env.get('PRIVATE_KEY_2'),
];
// console.log(privateKeys);

module.exports = {
    dataPath: path.join(__dirname, 'data', env.get('NODE_ENV')),
    privateKeys: privateKeys,
    factoryPrivateKey: env.get('FACTORY_PRIVATE_KEY'),
    proposerPrivateKey: env.get('PROPOSER_PRIVATE_KEY'),
    safeAddress: env.get('SAFE_ADDRESS'),
    tokenSalt: env.get('TOKEN_SALT'),
    geniDexSalt: env.get('GENIDEX_SALT'),
    rewarderSalt: env.get('REWARDER_SALT'),
    networks: {
        hardhat: {
            chainId: 31337,
            hardfork: "cancun",
            tokenName: 'GeniToken'
        },
        localhost: {
            chainId: 31337,
            tokenName: 'GeniToken'
        },
        geni: {
            chainId: 31339,
            url: "https://rpc.genidex.net",
            // accounts: privateKeys,
            tokenName: 'GeniToken',
            tokenRecipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
        },
        sepolia: {
            chainId: 11155111,
            url: 'https://sepolia.infura.io/v3/' + env.get('INFURA_API_KEY'),
            accounts: privateKeys,
            tokenName: 'GeniToken',
            tokenRecipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
        },
        arb_sepolia: {
            chainId: 421614,
            url: 'https://arbitrum-sepolia.infura.io/v3/' + env.get('INFURA_API_KEY'),
            accounts: privateKeys,
            tokenName: 'GeniTokenArbitrum'
        },
        op_sepolia: {
            chainId: 11155420,
            url: 'https://sepolia.optimism.io',
            // url: 'https://optimism-sepolia.infura.io/v3/' + env.get('INFURA_API_KEY'),
            accounts: privateKeys,
            tokenName: 'GeniTokenOptimism'
        },
        base_sepolia: {
            chainId: 84532,
            url: 'https://base-sepolia.infura.io/v3/' + env.get('INFURA_API_KEY'),
            accounts: privateKeys,
            tokenName: 'GeniTokenBase'
        }
    },
    etherscan: {
        apiKey: {
            sepolia: env.get('ETHERSCAN_API_KEY'),
            op_sepolia: env.get('ETHERSCAN_OP_API_KEY'),
            arb_sepolia: env.get('ETHERSCAN_ARB_API_KEY'),
            base_sepolia: env.get('ETHERSCAN_BASE_API_KEY')
        },
        customChains: [
            {
                network: "op_sepolia",
                chainId: 11155420,
                urls: {
                    apiURL: "https://api-sepolia-optimism.etherscan.io/api",
                    browserURL: "https://sepolia-optimism.etherscan.io/"
                }
            },
            {
                network: "arb_sepolia",
                chainId: 421614,
                urls: {
                    apiURL: "https://api-sepolia.arbiscan.io/api",
                    browserURL: "https://sepolia.arbiscan.io/"
                }
            },
            {
                network: "base_sepolia",
                chainId: 84532,
                urls: {
                    apiURL: "https://api-sepolia.basescan.org/api",
                    browserURL: "https://sepolia.basescan.org/"
                }
            }
        ]
    }
}