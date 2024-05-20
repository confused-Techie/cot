const fs = require("fs");
const path = require("path");
const metaschemaValidator = require("./metaschema_validator.js");
const defaultMetaschema = require("../default_metaschema.js");

module.exports =
class PackageManager {
  constructor() {
    this.metaschema = {};
    this.packageList = [];
    this.packages = {};
  }

  async initialize() {
    const defaultPackageList = [
      "dimensions",
      "description"
    ];

    // Load the default metaschema first
    for (const namespace in defaultMetaschema) {
      await this.loadMetaschema(namespace, defaultMetaschema[namespace]);
    }

    for (let i = 0; i < defaultPackageList.length; i++) {
      await this.loadPackage(defaultPackageList[i], this.readPackageJson(path.join(`packages/${defaultPackageList[i]}/package.json`)));
    }
  }

  async loadPackage(location, packageJson = false) {
    if (!packageJson) {
      packageJson = this.readPackageJson(path.join(location, "package.json"));
    }

    let packageName = packageJson.name;

    this.packages[packageName] = {
      packageJson: packageJson,
      instance: require(location)
    };

    // Now to add it's elements to the database, and metadata
    if ("metaschema" in packageJson.cot) {
      await this.loadMetaschema(packageName, packageJson.cot.metaschema);
    }
  }

  async loadMetaschema(namespace, metaschema) {
    let validatedMetaschema = metaschemaValidator(metaschema);

    await cot.database.createTable(namespace, validatedMetaschema);
    this.metaschema[namespace] = validatedMetaschema;
  }

  readPackageJson(location) {
    let file = fs.readFileSync(location);
    let json = JSON.parse(file);
    return json;
  }

  triggerMetaschema(data) {
    for (const pack in this.packages) {
      if (typeof this.packages[pack].packageJson.cot.triggers.metaschema == "function") {
        this.packages[pack].instance[this.packages[pack].packageJson.cot.triggers.metaschema](data);
      }
    }
  }
}
