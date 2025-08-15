
const config = require('../config');

class RPC {
    constructor(){
        this.SEP = config.networks.sepolia.url;
        this.OP_SEP = config.networks.op_sepolia.url;
        this.ARB_SEP = config.networks.arb_sepolia.url;
        this.BASE_SEP = config.networks.base_sepolia.url;
    }
}

module.exports = new RPC();