const metaschemaTypeToSQL = require("./_metaschemaTypeToSQL.js");

module.exports = {
  safe: true,
  exec: async (sql, name, metaschema) => {
    // We first need to turn a metaschema into a SQL statement to create the table

    let lines = [];

    lines.push(`CREATE TABLE IF NOT EXISTS ${name} (`);

    for (const property in metaschema) {
      let line = `${property} ${metaschemaTypeToSQL(metaschema[property].type)}`;

      if ("default" in metaschema[property]) {
        line += ` DEFAULT ${metaschema[property].default}`;
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

    //const command = await sql`${script}`;
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
