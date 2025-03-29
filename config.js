

const env = require('./helpers/env');
env.loadEnvFile();

module.exports = {
    networks: {
        geni: {
            chainId: 31339,
            url: "https://rpc.genidex.net"
        },
        op_sepolia: {
            chainId: 11155420,
            url: 'https://sepolia.optimism.io',
            accounts: [
                env.get('SEPOLIA_PRIVATE_KEY'),
                '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', //acount 0 - npx hardhat node
                '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d' //acount 1 - npx hardhat node
            ]
        }
    }
}