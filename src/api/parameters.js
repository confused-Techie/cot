const validateAgainstMetaschema = require("../metaschema/_export.js").validateAgainst;

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

function paramToArray(item) {
  if (typeof item !== "string") {
    return [];
  }

  return item.split(/\./g);
}

module.exports = {
  verifyParam,
  paramToArray,
};
