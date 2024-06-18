
module.exports = {
  sql: (_schema) => {
    return "BOOLEAN";
  },
  validate: (value, schema) => {
    // Takes the schema, and a provided value, and returns the safe representation of this same value.
    // If none can be created, `null` is returned.

    let tmp = null;

    if (typeof value === "string") {
      value = value.toLowerCase();
      if (value === "false") {
        tmp = false;
      } else if (value === "true") {
        tmp = true;
      }
    }

    if (typeof value === "boolean") {
      tmp = value;
    }

    return tmp;
  }
}
