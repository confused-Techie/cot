
module.exports = {
  sql: () => {
    return "BOOLEAN";
  },
  ui: () => {
    // TODO
  },
  validate: (datatype, value) => {
    // takes the datatype, and a potential value, checks if they are equal to each other.
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
};
