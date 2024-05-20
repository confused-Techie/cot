
module.exports =
function metaschemaTypeToSQL(type) {
  let value;

  switch(type) {
    case "integer":
      value = "BIGINT NOT NULL";
      break;
    case "string.500":
      value = "VARCHAR(500)";
      break;
    case "string.256":
      value = "VARCHAR(256)";
      break;
    case "uuid":
      value = "UUID";
      break;
    default:
      value = "VARCHAR(60)";
  }

  return value;
}
