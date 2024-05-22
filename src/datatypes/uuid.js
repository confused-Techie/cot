
module.exports = {
  is: (value) => {
    let s = "" + value;

    s = s.match("^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$");
    if (s === null) {
      return false;
    }
    return true;
  },
  cast: (value) => {
    // JavaScript has no UUID datatype, so we will just ensure we are working with a String.
    return String(value);
  },
  sql: (_metaschema) => {
    return "UUID";
  },
  ui: () => {

  }
};
