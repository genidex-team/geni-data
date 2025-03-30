const fs = require('fs');
const path = require('path');

const files = require('./helpers/files');
const config = require('./config');
const tokenHelper = require('./helpers/tokens');
class GeniData {
  constructor() {
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
    console.log('GeniRewarder', files.readKey(network, 'addresses.json', 'GeniRewarder'))
    return files.readKey(network, 'addresses.json', 'GeniRewarder');
  }

  getNetworkConfig(){
    return config.networks;
  }

  getTokenInfo(network, tokenAddress){
    return tokenHelper.getTokenInfo(network, tokenAddress)
  }

  getTokensInfo(network, tokenAddresses){
    return tokenHelper.getTokensInfo(network, tokenAddresses)
  }

}

module.exports = new GeniData();