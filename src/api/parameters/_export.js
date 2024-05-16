
const exportObj = {
  query: {},
  schema: {}
};

const keys = [];

for (const key of keys) {
  let tmp = require(`./${key}.js`);
  exportObj.query[key] = tmp.query;
  exportObj.schema[key] = tmp.schema;
}

module.exports = exportObj;
