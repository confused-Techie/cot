// This module is in charge of handling a single item

module.exports =
class Item {
  constructor() {
    this.uuid = null;
    this.hash = null;
    this.file = null;
    this.metadata = {};
  }

  save() {
    // method to handle saving the item to the database. Could be first time save
    // or an update to existing records
  }
}
