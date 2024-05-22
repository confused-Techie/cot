
module.exports = {
  is: (value, length = Infinity) => {
    if (typeof value !== "string") {
      return false;
    }
    if (value?.length > length) {
      return false;
    }
    return true;
  },
  cast: (value) => {
    return String(value);
  },
  sql: (metaschema) => {
    if (metaschema.maximum) {
      return `VARCHAR(${metaschema.maximum})`;
    } else {
      return "TEXT";
    }
  },
  ui: () => {

  }
};
