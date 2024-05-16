
const metaSchema = {
  core: {
    height: {
      type: "integer",
      default: null,
      description: "Image Height in pixels."
    },
    width: {
      type: "integer",
      default: null,
      description: "Image Width in pixels."
    }
  }
};

module.exports = metaSchema;
