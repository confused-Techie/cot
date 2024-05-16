
module.exports =
class Config {
  constructor() {
    this.config_file_loc = null;
    this.default_config = require("../default_config.js");
  }

  // Helper Methods
  selectorToArray(item) {
    // Splits a config selector into it's multiple parts
    if (typeof item !== "string") {
      return [];
    }

    return item.split(/\./g);
  }

  selectorToEnviron(item) {
    let itemArr = this.selectorToArray(item);

    return itemArr.join("_");
  }

  // General Use Methods
  get(item) {
    return this.getEnviron(item) ?? this.getFile(item) ?? this.getDefault(item);
  }

  getEnviron(item) {
    const selector = this.selectorToEnviron(item);
    const selectorValue = process.env[selector];
    return selectorValue;
  }

  getFile(item) {
    // TODO
    return null;
  }

  getDefault(item) {
    const selector = this.selectorToArray(item);

    let selected = this.default_config;

    for (let i = 0; i < selector.length; i++) {
      // Inspect the object we are working with prior to reassigning `selected`
      // to ensure the need to inspect at this step
      if (selected.type === "object" && selected.properties) {
        selected = selected.properties;
      }

      selected = selected[selector[i]];
    }

    // TODO add handling if the default isn't present or if this is an object
    return selected?.default;
  }

  getSchema(item) {

  }

  set(item, value) {

  }

}
