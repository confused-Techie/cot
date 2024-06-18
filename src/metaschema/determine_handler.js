// Returns the module that handles any given datatype.
module.exports =
function determineHandler(metaschema) {
  switch(metaschema.type) {
    case "boolean":
      return require("./datatypes/boolean.js");
    case "text":
      return require("./datatypes/text.js");
    case "integer":
      return require("./datatypes/integer.js");
    case "uuid":
      return require("./datatypes/uuid.js");
    default:
      throw new Error(`Unrecognized datatype of '${metaschema.type}' provided!`);
  }
}
