
const config = require('../config');

class RPC {
    constructor(){
        this.SEP = config.networks.sepolia.url;
        this.OP_SEP = config.networks.op_sepolia.url;
    }
}

module.exports = new RPC();