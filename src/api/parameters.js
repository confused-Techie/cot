const datatypes = require("../datatypes/_export.js");

// Takes any key value pair of parameters
function verifyParam(req) {
  console.log(req.query);
  const queryObj = {};

  for (const param in req.query) {
    let namespace = paramToArray(param);
    let selected;

    if (cot.packageManager.metaschema[namespace[0]]) {
      selected = cot.packageManager.metaschema[namespace[0]];
      let namespaceItem = namespace.shift();
      let selector = namespace;

      for (let i = 0; i < selector.length; i++) {
        selected = selected[selector[i]];
      }
      queryObj[param] = validateAgainstMetaschema(req.query[param], selected);
    }
    // TODO this only supports metaschema
    // it should be made to support configuration schema, and excluding an item if invalid
  }

  console.log(queryObj);
  return queryObj;
}

function validateAgainstMetaschema(parameter, metaschema) {
  let returnValue = metaschema.default;
  console.log(`Default: ${returnValue}; Type: ${metaschema.type}`);
  switch(metaschema.type) {
    case "boolean":
      if (datatypes.boolean.is(parameter)) {
        returnValue = datatypes.boolean.cast(parameter);
      }
      break;
    case "integer":
      if (datatypes.integer.is(parameter)) {
        returnValue = datatypes.integer.cast(parameter);
      }
      break;
    case "string":
      if (datatypes.string.is(parameter, metaschema.length)) {
        returnValue = datatypes.string.cast(parameter);
      }
      break;
    case "uuid":
      if (datatypes.uuid.is(parameter)) {
        returnValue = datatypes.uuid.cast(parameter);
      }
      break;
    default:
      if (datatypes.string.is(parameter, 60)) {
        returnValue = datatypes.string.cast(parameter);
      }
      break;
  }

  return returnValue;
}

function paramToArray(item) {
  if (typeof item !== "string") {
    return [];
  }

  return item.split(/\./g);
}

module.exports = {
  verifyParam,
  validateAgainstMetaschema,
  paramToArray,
};
