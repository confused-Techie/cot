
const metaSchema = {
  core: {
    version: "v0.0.1",
    reference: false,
    uuid: {
      type: "uuid",
      description: "Universally Unique Identifier. Identifies every item."
    },
    location: {
      type: "string",
      description: "Location of the item on the filesystem."
    }
  }
};

module.exports = metaSchema;
