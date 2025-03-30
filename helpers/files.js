const fs = require('fs');
const path = require('path');
const fn = require('./functions');

class Files {
  constructor(baseDir = path.join(__dirname, '..', 'data')) {
    this.baseDir = baseDir;
  }

  ensureDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  readKey(network, filename, name) {
    const filePath = path.join(this.baseDir, network, filename);
    if (!fs.existsSync(filePath)) return null;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data?.[name] || null;
  }

  readAll(network, filename) {
    console.log(this.baseDir, network, filename);
    const filePath = path.join(this.baseDir, network, filename);
    if (!fs.existsSync(filePath)) return null;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
  }

  writeKey(network, filename, name, value) {

    const dir = path.join(this.baseDir, network);
    this.ensureDirExists(dir);
    const filePath = path.join(dir, filename);

    if (value === undefined) {
      console.error(`Error: Attempted to write undefined value for ${name} in ${filePath}`);
      return;
    }

    let data = {};
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    data[name] = value;
    fs.writeFileSync(filePath, fn.stringifyWithBigInt(data));
    console.log('\nGeniData - Saved to', filePath);
    console.log(name, '=', value, '\n');
  }

  overwriteData(network, filename, data){
    const dir = path.join(this.baseDir, network);
    this.ensureDirExists(dir);
    const filePath = path.join(dir, filename);

    fs.writeFileSync(filePath, fn.stringifyWithBigInt(data));
    console.log('\nGeniData.overwriteData:', filePath);
  }

}

module.exports = new Files();