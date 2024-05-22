const metaschemaTypeToSQL = require("./_metaschemaTypeToSQL.js");
const metaschemaDefaults = require("./_metaschemaDefaults.js");

module.exports = {
  safe: true,
  exec: async (sql, name, metaschema) => {
    // We first need to turn a metaschema into a SQL statement to create the table

    let lines = [];

    lines.push(`CREATE TABLE IF NOT EXISTS ${name} (`);
    // TODO maybe add an initial primary key to link to actual item uuid's
    if (metaschema.reference) {
      if (metaschema.reference === "core.uuid") {
        lines.push(`uuid UUID NOT NULL REFERENCES core(uuid) PRIMARY KEY`);
      }
      // TODO support the reference value less egocentrically
    }

    for (const property in metaschema) {

      if (property === "version") {
        // We want to skip the version key
        break;
      }
      let line = `${property} ${metaschemaTypeToSQL(metaschema[property])}`;

      if (metaschema[property].hasOwnProperty("default")) {
        line += ` DEFAULT ${metaschemaDefaults(metaschema[property].default)}`;
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
