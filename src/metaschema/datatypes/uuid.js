
module.exports = {
  sql: (_schema) => {
    return "UUID";
  },
  validate: (value, schema) => {
    let s = "" + value;

    s = s.match("^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$");

    if (s === null) {
      return null;
    }

    return value;
  }
};
