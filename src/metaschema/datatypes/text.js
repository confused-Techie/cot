
module.exports = {
  sql: (schema) => {
    // TODO handle constraints
    return "TEXT";
  },
  validate: (value, schema) => {
    let tmp = null;

    if (typeof value === "string") {
      tmp = value;
    }

    // TODO enforce constraints
    return tmp;
  }
};
