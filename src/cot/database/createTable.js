const sqlify = require("../../metaschema/_export.js").sqlify;

module.exports = {
  safe: true,
  exec: async (sql, name, metaschema) => {
    // We first need to turn a metaschema into a SQL statement to create the table

    let lines = [];

    lines.push(`CREATE TABLE IF NOT EXISTS ${name} (`);
    // TODO maybe add an initial primary key to link to actual item uuid's
    if (metaschema.reference) {
      if (metaschema.reference === "core.uuid") {
        lines.push(`uuid UUID PRIMARY KEY REFERENCES core (uuid),`);
      }
      // TODO support the reference value less egocentrically
    }

    for (const property in metaschema) {

      if (property === "version" || property === "reference") {
        // We want to skip the version key
        continue;
      }

      let line = `${property} ${sqlify(metaschema[property])}`;

      if (metaschema[property].hasOwnProperty("default")) {
        let defaultValue = metaschema[property].default;

        if (defaultValue == "GEN_RANDOM_UUID()") {
          lines.unshift("CREATE EXTENSION pgcrypto;"); // add to beginning
        }
        line += ` DEFAULT ${metaschema[property].default}`;
      }

      if (metaschema[property].hasOwnProperty("primary") && metaschema[property].primary) {
        // If "primary" exists and is true
        line += " PRIMARY KEY";
      }

      line += ",";

      lines.push(line);
    }

    // remove last comma
    lines[lines.length - 1] = lines[lines.length - 1].replace(",", "");
    lines.push(");");

    let script = lines.join("\n");
    console.log("database.createTable() Running:");
    console.log(script);

    const command = await sql.unsafe(script);
    console.log(command);

    return command.count !== 0
      ? { ok: true, content: command[0] }
      : {
          ok: false,
          content: command,
          short: "server_error"
        };
  }
};
