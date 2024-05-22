const datatypes = require("../datatypes/_export.js");

// Takes any key value pair of parameters
function verifyParam(req) {
  console.log(req.query);
  const queryObj = {};

  for (const param in req.query) {
    let namespace = paramToArray(param);

    if (cot.packageManager.metaschema[namespace[0]]) {
      let selected = cot.packageManager.metaschema[namespace[0]];
      let namespaceItem = namespace.shift();
      let selector = namespace;

      for (let i = 0; i < selector.length; i++) {
        selected = selected[selector[i]];
      }

      queryObj[param] = validateAgainstMetaschema(req.query[param], selected);
    }
  }

  console.log(queryObj);
  return queryObj;
}

function validateAgainstMetaschema(parameter, metaschema) {
  let returnValue = metaschema.default;
  console.log(`Default: ${returnValue}; Type: ${metaschema.type}`);
  switch(metaschema.type) {
    case "integer":
      if (datatypes.integer.is(parameter)) {
        returnValue = parameter;
      }
      break;
    case "string":
      if (datatypes.string.is(parameter, metaschema.length)) {
        returnValue = parameter;
      }
      break;
    case "uuid":
      if (datatypes.uuid.is(parameter)) {
        returnValue = parameter;
      }
      break;
    default:
      if (datatypes.string.is(parameter, 60)) {
        returnValue = parameter;
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
