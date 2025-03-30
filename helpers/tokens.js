const { ethers } = require("ethers");
const files = require("./files");
const config = require("../config");

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
];

class Tokens {

    async fetchTokenInfo(network, tokenAddress) {
        const rpcUrl = config.networks[network]?.url;
        if (!rpcUrl) {
            throw new Error(`Missing RPC URL for network: ${network}`);
        }
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const checksumAddress = ethers.getAddress(tokenAddress);
        const [name, symbol, decimals] = await Promise.all([
            token.name(),
            token.symbol(),
            token.decimals()
        ]);

        const tokenInfo = {
            address: checksumAddress,
            name,
            symbol,
            decimals: decimals.toString()
        };
        // console.log(`[Fetch] Saved token info for ${tokenAddress} on ${network}`);
        return tokenInfo;
    }

    async getTokenInfo(network, tokenAddress) {
        const tokenAddressLC = tokenAddress.toLowerCase();
        // Check if already cached
        const cached = files.readKey(network, "tokens.json", tokenAddressLC);
        if (cached) {
            // console.log(`[Cache] Loaded token info for ${tokenAddress} on ${network}`);
            return cached;
        }else{
            const tokenInfo = await this.fetchTokenInfo(network, tokenAddress);
            const tokenAddressLC = tokenAddress.toLowerCase();
            files.write(network, "tokens.json", tokenAddressLC, tokenInfo);
            return tokenInfo;
        }
    }

    async getTokensInfo(network, tokenAddresses) {
        const data = files.readAll(network, "tokens.json") || {};
        const results = {};
        var newTokenCount = 0;

        for (const address of tokenAddresses) {
            const addressLC = address.toLowerCase();
            const checksum = ethers.getAddress(address);
            if (data[addressLC]) {
                // console.log(`[Cache] Loaded token info for ${checksum}`);
                results[addressLC] = data[addressLC];
                continue;
            }else{
                const info = await this.fetchTokenInfo(network, address);
                data[addressLC] = info;
                results[addressLC] = info;
                newTokenCount++;
            }
        }
        if(newTokenCount>0){
            files.overwriteData(network, 'tokens.json', data);
        }

        return results;
    }
}

module.exports = new Tokens();