const fs = require("fs");
const path = require("path");

module.exports =
class PackageManager {
  constructor() {

    this.metaschema = {};
    this.packageList = [];
    this.packages = {};
  }

  initialize() {
    const defaultPackageList = [
      "dimensions"
    ];

    for (let i = 0; i < defaultPackageList.length; i++) {
      this.loadPackage(defaultPackageList[i]);
    }
  }

  loadPackage(location, packageJson = false) {
    if (!packageJson) {
      packageJson = readPackageJson(path.join(location, "package.json"));
    }

    let packageName = packageJson.name;

    this.packages[packageName] = {
      packageJson: packageJson,
      instance: require(location)
    };

    // Now to add it's elements to the database, and metadata 
  }

  readPackageJson(location) {
    let file = fs.readFileSync(location);
    let json = JSON.parse(file);
    return json;
  }
}
