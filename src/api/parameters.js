
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
      if (isInteger(parameter)) {
        returnValue = parameter;
      }
      break;
    case "string":
      if (isString(parameter, metaschema.length)) {
        returnValue = parameter;
      }
      break;
    case "uuid":
      if (isUUID(parameter)) {
        returnValue = parameter;
      }
      break;
    default:
      if (isString(parameter, 60)) {
        returnValue = parameter;
      }
      break;
  }

  return returnValue;
}

function isInteger(value) {
  let int = parseInt(value, 10);
  // We use number to ensure parseInt ins't trunicating invalid values. Since `parseInt`
  // parses until it finds invalid data and returns what was successfully parsed
  let num = Number(value);

  if (typeof int !== "number") {
    return false;
  }
  if (isNaN(int)) {
    return false;
  }
  if (int !== num) {
    return false;
  }
  return true;
}

function isString(value, length = Infinity) {
  if (typeof value !== "string") {
    return false;
  }
  if (value?.length > length) {
    return false;
  }
  return true;
}

function isUUID(value) {
  let s = "" + value;

  s = s.match("^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$");
  if (s === null) {
    return false;
  }
  return true;
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
  isInteger,
  isString,
  isUUID,
  paramToArray,
};
