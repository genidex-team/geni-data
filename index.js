const fs = require('fs');
const path = require('path');

const files = require('./helpers/files');

class GeniData {
  constructor() {
    
  }

  setGeniDexAddress(network, address){
    files.write(network, 'addresses.json', 'GeniDex', address);
  }

  getGeniDexAddress(network){
    return files.read(network, 'addresses.json', 'GeniDex');
  }

  setGeniTokenAddress(network, address){
    files.write(network, 'addresses.json', 'GeniToken', address);
  }

  getGeniTokenAddress(network){
    return files.read(network, 'addresses.json', 'GeniToken');
  }

  setGeniRewarder(network, address){
    files.write(network, 'addresses.json', 'GeniRewarder', address);
  }
  
  getGeniRewarder(network){
    console.log('GeniRewarder', files.read(network, 'addresses.json', 'GeniRewarder'))
    return files.read(network, 'addresses.json', 'GeniRewarder');
  }
  
}

module.exports = new GeniData();