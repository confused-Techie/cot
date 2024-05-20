// This module is what is used to validate all metaschemas.
// It should not only translate any differences in versions of the metaschema
// format, but also provides a robust enough object to be used anywhere.

module.exports =
function validate(metaschema) {

  let convertedSchema;

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
  if (!"reference" in convertedSchema) {
    convertedSchema.reference = "core.uuid";
  }

  for (const property in convertedSchema) {

    if (!"default" in convertedSchema[property]) {
      switch(convertedSchema[property].type) {
        case "uuid":
          convertedSchema[property].default = "random_uuid";
          break;
      }
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
