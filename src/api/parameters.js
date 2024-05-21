
// Takes any key value pair of parameters
module.exports =
function verifyParam(req) {
  console.log(req.query);

  for (const param of req.query) {
    let namespace = paramToArray(param);

    if (cot.packageManager.metaschema[namespace[0]]) {
      let selected = cot.packageManager.metaschema[namespace[0]];
      let namespaceItem = namespace.shift();
      let selector = namespace;

    }
  }
}

function paramToArray(item) {
  if (typeof item !== "string") {
    return [];
  }

  return item.split(/\./g);
}
