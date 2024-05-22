
module.exports = {
  is: (value) => {
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
  },
  cast: (value) => {
    return parseInt(value, 10);
  },
  sql: (_metaschema) => {
    return "INTEGER";
  },
  ui: () => {

  }
};
