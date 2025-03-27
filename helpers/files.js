const fs = require('fs');
const path = require('path');

class Files {
  constructor(baseDir = path.join(__dirname, '..', 'data')) {
    this.baseDir = baseDir;
  }

  ensureDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  read(network, filename, name) {
    const filePath = path.join(this.baseDir, network, filename);
    if (!fs.existsSync(filePath)) return null;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data?.[name] || null;
  }

  write(network, filename, name, value) {

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
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('\nGeniData - Saved to', filePath);
    console.log(name, '=', value, '\n');
  }
}

module.exports = new Files();