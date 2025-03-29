const { ethers } = require("ethers");
const files = require("./files");
const config = require("../config");

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
];

class Tokens {
    async getTokenInfo(network, tokenAddress) {
        const tokenAddressLC = tokenAddress.toLowerCase();

        // Check if already cached
        const cached = files.read(network, "tokens.json", tokenAddressLC);
        if (cached) {
            console.log(`[Cache] Loaded token info for ${tokenAddress} on ${network}`);
            return cached;
        }

        const rpcUrl = config.networks[network]?.url;
        if (!rpcUrl) {
            throw new Error(`Missing RPC URL for network: ${network}`);
        }

        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

        const [name, symbol, decimals] = await Promise.all([
            token.name(),
            token.symbol(),
            token.decimals()
        ]);

        const tokenInfo = {
            address: tokenAddress,
            name,
            symbol,
            decimals: decimals.toString()
        };

        files.write(network, "tokens.json", tokenAddressLC, tokenInfo);
        console.log(`[Fetch] Saved token info for ${tokenAddress} on ${network}`);
        return tokenInfo;
    }

    async getTokensInfo(network, tokenAddresses) {
        const results = {};
        for (const address of tokenAddresses) {
            const info = await this.getTokenInfo(network, address);
            const addressLC = address.toLowerCase();
            results[addressLC] = info;
        }
        return results;
    }
}

module.exports = new Tokens();