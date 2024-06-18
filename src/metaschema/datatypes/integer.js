
module.exports = {
  sql: (schema) => {
    // TODO constraints
    return "INTEGER";
  },
  validate: (value, schema) => {
    // TODO constraints

    let int = parseInt(value, 10);
    // parseInt parses until it finds invalid data, such as decimal or even strings.
    // So we compare it to a number of itself
    let num = Number(value);

    if (typeof int !== "number") {
      return null;
    }
    if (isNaN(int)) {
      return null;
    }
    if (int !== num) {
      return null;
    }

    return int;
  }
};
