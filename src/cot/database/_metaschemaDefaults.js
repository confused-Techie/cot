// Translates the default values supported by metaschema into something usable
// by the SQL database.

module.exports =
function metaschemaDefaults(def) {
  let value = "";

  switch(def) {
    case "random_uuid":
      value = "GEN_RANDOM_UUID()";
      break;
  }

  if (def === null) {
    value = "NULL";
  }

  return value;
}
