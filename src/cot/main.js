// Creates the Cot Global API instance.
// Should manage and handle interfacing with community packages, and it's various
//  resources

const EventEmitter = require("node:events");
const Config = require("./config.js");
const PackageManager = require("./package_manager.js");
const ItemRegistry = require("./item_registry.js");
const Item = require("./item.js");

module.exports =
class Cot {
  constructor() {

    this.emitter = new EventEmitter();
    this.config = new Config();
    this.database = require("./database/_export.js");
    this.packageManager = new PackageManager();
    this.itemRegistry = new ItemRegistry();
    this.Item = Item;
  }

  async initialize() {
    this.itemRegistry.initialize();
    await this.packageManager.initialize();
  }

  triggerIngress() {
    this.emitter.emit("ingress");
  }

  triggerMetadata(data) {
    this.emitter.emit("metadata", data);
  }

  triggerEgress(data) {
    this.emitter.emit("egress", data);
  }

  async exterminate() {
    // Handle all shutdown tasks
  }

}
