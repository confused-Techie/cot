
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
    default:
      value = "VARCHAR(60)";
  }

  return value;
}
