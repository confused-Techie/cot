// Takes a schema and returns the SQL statement to generate such text.
const determineHandler = require("./determine_handler.js");

module.exports =
function sqlify(schema) {
  const handler = determineHandler(schema);

  return handler.sql(schema);
}
