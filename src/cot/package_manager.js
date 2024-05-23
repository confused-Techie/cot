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
    this.ingressSubscribers = [];
    this.metadataSubscribers = [];
    this.egressSubscribers = [];
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

    // Setup event listeners
    cot.emitter.on("ingress", async (event) => {
      for (let i = 0; i < this.ingressSubscribers.length; i++) {
        let packageName = this.ingressSubscribers[i];
        let funcName = this.packages[packageName].packageJson.cot.triggers.ingress;

        await this.packages[packageName].instance[funcName](event);
      }
    });

    cot.emitter.on("metadata", async (event) => {
      for (let i = 0; i < this.metadataSubscribers.length; i++) {
        let packageName = this.metadataSubscribers[i];
        let funcName = this.packages[packageName].packageJson.cot.triggers.metadata;

        await this.packages[packageName].instance[funcName](event);
      }
    });

    cot.emitter.on("egress", async (event) => {
      for (let i = 0; i < this.egressSubscribers.length; i++) {
        let packageName = this.egressSubscribers[i];
        let funcName = this.packages[packageName].packageJson.cot.triggers.egress;

        await this.packages[packageName].instance[funcName](event);
      }
    });
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

    if ("triggers" in packageJson.cot) {
      this.loadTriggers(packageName, packageJson.cot.triggers);
    }
  }

  async loadMetaschema(namespace, metaschema) {
    console.log(`Namespace: ${namespace}`);
    let validatedMetaschema = metaschemaValidator(metaschema);
    console.log(validatedMetaschema);

    await cot.database.createTable(namespace, validatedMetaschema);
    this.metaschema[namespace] = validatedMetaschema;
  }

  loadTriggers(packageName, triggers) {

    for (const trigger in triggers) {
      if (trigger == "ingress") {
        this.ingressSubscribers.push(packageName)
      }
      if (trigger == "metadata") {
        this.metadataSubscribers.push(packageName);
      }
      if (trigger == "egress") {
        this.egressSubscribers.push(pacakgeName);
      }
    }

  }

  readPackageJson(location) {
    let file = fs.readFileSync(location);
    let json = JSON.parse(file);
    return json;
  }

}
