const fs = require('fs');
const path = require('path');
const { hexlify, randomBytes } = require("ethers");

const env = require('./helpers/env');
const files = require('./helpers/files');
const config = require('./config');
const tokenHelper = require('./helpers/tokens');

const testnetAirdrop = require('./helpers/testnet_airdrop');
const rpc = require('./helpers/rpc');

class GeniData {
  constructor() {
    this.testnetAirdrop = testnetAirdrop;
    this.config = config;
    this.rpc = rpc;
  }

  setAccessManagerAddress(network, address){
    files.writeKey(network, 'addresses.json', 'AccessManager', address);
  }

  getAccessManagerAddress(network){
    return files.readKey(network, 'addresses.json', 'AccessManager');
  }

  setGeniDexAddress(network, address){
    files.writeKey(network, 'addresses.json', 'GeniDex', address);
  }

  getGeniDexAddress(network){
    return files.readKey(network, 'addresses.json', 'GeniDex');
  }

  setGeniTokenAddress(network, address){
    files.writeKey(network, 'addresses.json', 'GeniToken', address);
  }

  getGeniTokenAddress(network){
    return files.readKey(network, 'addresses.json', 'GeniToken');
  }

  setGeniRewarder(network, address){
    files.writeKey(network, 'addresses.json', 'GeniRewarder', address);
  }

  getGeniRewarder(network){
    return files.readKey(network, 'addresses.json', 'GeniRewarder');
  }

  setFactoryAddress(network, address){
    files.writeKey(network, 'addresses.json', 'Factory', address);
  }

  setPlaceholderUUPS(network, address){
    files.writeKey(network, 'addresses.json', 'Placeholder', address);
  }

  getFactoryAddress(network){
    return files.readKey(network, 'addresses.json', 'Factory');
  }

  getPlaceholderUUPS(network){
    return files.readKey(network, 'addresses.json', 'Placeholder');
  }

  getTokenSalt(){
    return config.tokenSalt;
  }

  getRewarderSalt(){
    return config.rewarderSalt;
  }

  getGeniDexSalt(){
    return config.geniDexSalt;
  }

  randomBytes32(){
    return hexlify(randomBytes(32));
  }

  getNetworkConfig(){
    return config.networks;
  }

  getEtherscanConfig(){
    return config.etherscan;
  }

  getTokenInfo(network, tokenAddress){
    return tokenHelper.getTokenInfo(network, tokenAddress)
  }

  getTokensInfo(network, tokenAddresses){
    return tokenHelper.getTokensInfo(network, tokenAddresses)
  }

  getL1NetworkName(networkName){
    const devNet = ['hardhat', 'localhost', 'geni'];
    const testNet = ['sepolia', 'op_sepolia', 'arb_sepolia', 'base_sepolia'];
    if(this.isTestnet(networkName)){
      return 'sepolia';
    }if(this.isDevnet(networkName)){
      return networkName;
    }else{
      return 'ethereum';
    }
  }

  isL1Network(networkName){
    const l1Net = ['hardhat', 'localhost', 'geni', 'sepolia', 'ethereum'];
    return l1Net.includes(networkName);
  }

  isDevnet(networkName){
    const devNet = ['hardhat', 'localhost', 'geni'];
    return devNet.includes(networkName);
  }

  isTestnet(networkName){
    const testNet = ['sepolia', 'op_sepolia', 'arb_sepolia', 'base_sepolia'];
    return testNet.includes(networkName);
  }

  isMainnet(networkName){
    const testNet = ['ethereum', 'arbitrum', 'optimism', 'base'];
    return testNet.includes(networkName);
  }

  allowedNetworks(allowedNetworks, networkName){
    if (!allowedNetworks.includes(networkName)) {
      throw new Error(`Deployment not allowed on network: ${networkName}`);
    }
  }

  getRPC(networkName){
    return config.networks[networkName].url;
  }

  getChainId(networkName){
    return config.networks[networkName].chainId;
  }

  getTokenName(networkName){
    return config.networks[networkName].tokenName;
  }

  getSafeAddress(){
    return config.safeAddress;
  }

  getFactoryPrivateKey(){
    return config.factoryPrivateKey;
  }

  getProposerPrivateKey(){
    return config.proposerPrivateKey;
  }

  getRoleMembers(){
    return config.roleMembers;
  }

}

module.exports = new GeniData();