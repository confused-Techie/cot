
const metaSchema = {
  core: {
    version: "v0.0.1",
    reference: false,
    uuid: {
      type: "uuid",
      default: "GEN_RANDOM_UUID()",
      description: "Universally Unique Identifier. Identifies every item.",
      primary: true
    },
    location: {
      type: "text",
      description: "Location of the item on the filesystem."
    }
  }
};

module.exports = metaSchema;
