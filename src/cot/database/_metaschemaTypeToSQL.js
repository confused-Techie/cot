const datatypes = require("../../datatypes/_export.js");

module.exports =
function metaschemaTypeToSQL(metaschema) {
  let type = metaschema.type;
  let value;

  switch(type) {
    case "boolean":
      value = "BOOLEAN";
      break;
    case "integer":
      value = datatypes.integer.sql(metaschema);
      break;
    case "string":
      value = datatypes.string.sql(metaschema);
      break;
    case "uuid":
      value = datatypes.uuid.sql(metaschema);
      break;
    default:
      value = "TEXT";
  }

  return value;
}
