
module.exports =
class ItemRegistry {
  constructor() {
    this.registry = new Map();
    this.births = new Map();

    // Time in milliseconds until an item expires.
    this.expiration = Infinity;
  }

  initialize() {
    this.expiration = cot.config.get("application.itemExpiration");
  }

  add(item) {
    this.registry.set(item.uuid, item);
    this.births.set(item.uuid, Date.now());
    return item;
  }

  get(uuid) {
    if (this.registry.has(uuid)) {
      return this.registry.get(uuid);
    } else {
      return null;
    }
  }

  remove(uuid) {
    if (this.registry.has(uuid)) {
      this.registry.delete(uuid);
      this.births.delete(uuid);
      return null;
    } else {
      console.log(`ItemRegistry.remove(${uuid}): Called on non-existant item.`);
      return null;
    }
  }

  expire() {
    for (let i of this.registry) {
      let birth = this.births.get(i);
      let lifetime = Date.now() - birth;

      if (lifetime > this.expiration) {
        this.registry.delete(i);
        this.birth.delete(i);
      }
    }
  }

}
