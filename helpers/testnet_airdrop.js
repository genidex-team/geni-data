
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const files = require('./files');

class TestnetAirdrop {

    setAddress(network, address){
        files.writeKey(network, 'addresses.json', 'TestnetAirdrop', address);
    }

    getAddress(network){
        return files.readKey(network, 'addresses.json', 'TestnetAirdrop');
    }

    getRewardsInput() {
        return files.readAll('testnet_airdrop', 'rewards.input.json');
    }

    getReferralInput() {
        return files.readAll('testnet_airdrop', 'referral.input.json');
    }

    setRewardsInput(data) {
        files.overwriteData('testnet_airdrop', 'rewards.input.json', data);
    }

    setReferralInput(data) {
        files.overwriteData('testnet_airdrop', 'referral.input.json', data);
    }

    setRewardTree(data) {
        files.overwriteData('testnet_airdrop', 'reward.tree.json', data);
    }
    getRewardTree() {
        return files.readAll('testnet_airdrop', 'reward.tree.json',);
    }

    setReferralTree(data) {
        files.overwriteData('testnet_airdrop', 'referral.tree.json', data);
    }
    getReferralTree() {
        return files.readAll('testnet_airdrop', 'referral.tree.json',);
    }

    getRewardProof(address) {
        const tree = StandardMerkleTree.load(this.getRewardTree());
        var proof;
        for (const [i, v] of tree.entries()) {
            if (v[0] === address.toLowerCase()) {
                proof = tree.getProof(i);
                break;
            }
        }
        return proof;
    }

    getReferralProof(address) {
        const tree = StandardMerkleTree.load(this.getReferralTree());
        var proof;
        for (const [i, v] of tree.entries()) {
            if (v[0] === address.toLowerCase()) {
                proof = tree.getProof(i);
                break;
            }
        }
        return proof;
    }

    getReferees(address) {
        const tree = StandardMerkleTree.load(this.getReferralTree());
        var referees;
        for (const [i, v] of tree.entries()) {
            if (v[0] === address.toLowerCase()) {
                referees = v[1];
                break;
            }
        }
        return referees;
    }

    getRewardAmount(address) {
        const tree = StandardMerkleTree.load(this.getRewardTree());
        var amount;
        for (const [i, v] of tree.entries()) {
            if (v[0] === address.toLowerCase()) {
                amount = v[1];
                break;
            }
        }
        return amount;
    }

    getRewardSalt(address) {
        const tree = StandardMerkleTree.load(this.getRewardTree());
        var amount;
        for (const [i, v] of tree.entries()) {
            if (v[0] === address.toLowerCase()) {
                amount = v[2];
                break;
            }
        }
        return amount;
    }

    getRewardRoot() {
        const tree = StandardMerkleTree.load(this.getRewardTree());
        return tree.root;
    }

    getReferralRoot() {
        const tree = StandardMerkleTree.load(this.getReferralTree());
        return tree.root;
    }
}

module.exports = new TestnetAirdrop();