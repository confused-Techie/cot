// This module is what is used to validate all metaschemas.
// It should not only translate any differences in versions of the metaschema
// format, but also provides a robust enough object to be used anywhere.

module.exports =
function validate(metaschema) {

  let convertedSchema;
  // namespace validation
  switch(metaschema.version) {
    case "v0.0.1":
      convertedSchema = convert_001(metaschema);
      break;
    default:
      metaschema.version = "v0.0.1";
      convertedSchema = convert_001(metaschema);
      break;
  }


  // Now to preform the actual validation on a known format.
  if (!convertedSchema.hasOwnProperty("reference")) {
    convertedSchema.reference = "core.uuid";
  }

  for (const property in convertedSchema) {
    // object validation

    if (!convertedSchema[property].hasOwnProperty("default")) {
      switch(convertedSchema[property].type) {
        case "boolean":
        case "string":
          convertedSchema[property].default = "NULL";
          break;
        case "integer":
          convertedSchema[property].default = 0;
          break;
        case "uuid":
          convertedSchema[property].default = "random_uuid";
          break;
      }
    }

    if (!convertedSchema[property].hasOwnProperty("type")) {
      convertedSchema[property].type = "string";
    }
  }

  return convertedSchema;
}

function convert_001(metaschema) {
  // This function will be eventually used to convert a metaschema formatted as
  // v0.0.1 into whatever the latest format is.
  // Or alternatively this will convert it into v0.0.2 and we can continually convert
  // an object from whatever version it was to the latest. Which would be nifty
  // but risky.
  // Anyways, as no other versions yet exist, we will just directly return whatever
  // we have, since we have no conversions to preform.
  return metaschema;
}
