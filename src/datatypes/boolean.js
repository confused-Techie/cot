
module.exports = {
  is: (value) => {
    let tmp = value;
    if (typeof tmp === "string") {
      tmp = tmp.toLowerCase();
      if (tmp == "false") {
        tmp = false;
      } else if (tmp == "true") {
        tmp = true;
      }
    }

    if (typeof tmp === "boolean") {
      return true;
    } else {
      return false;
    }
  },
  cast: (value) => {
    let tmp = value;
    if (typeof tmp === "string") {
      tmp = tmp.toLowerCase();
      if (tmp == "false") {
        return false;
      } else if (tmp == "true") {
        return true;
      }
    }
    if (typeof tmp === "boolean") {
      return tmp;
    }
    return Boolean(tmp);
  },
  sql: (_metaschema) => {
    return "BOOLEAN";
  },
  ui: () => {

  }
};
