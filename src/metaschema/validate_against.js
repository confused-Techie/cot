// Helps to validate a value against a provided metaschema item.
const determineHandler = require("./determine_handler.js");

module.exports =
function validateAgainst(value, schema) {
  const handler = determineHandler(schema);

  return handler.validate(value, schema);
}
