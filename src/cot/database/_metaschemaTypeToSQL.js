
module.exports =
function metaschemaTypeToSQL(metaschema) {
  let type = metaschema.type;
  let value;

  switch(type) {
    case "boolean":
      value = "BOOLEAN";
      break;
    case "integer":
      value = "INTEGER";
      break;
    case "string":
      if (metaschema.maximum) {
        value = `VARCHAR(${metaschema.maximum})`;
      } else {
        value = "TEXT";
      }
      break;
    case "uuid":
      value = "UUID";
      break;
    default:
      value = "VARCHAR(60)";
  }

  return value;
}
