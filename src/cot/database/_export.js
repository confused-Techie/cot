/**
 * @desc Exposes all functions for the database, while also providing some default
 * behavior to each module
 */

const postgres = require("postgres");

let sqlStorage;

function getSqlStorageObject() {
  return (sqlStorage ??= setupSQL());
}

function setSqlStorageObject(setter) {
  sqlStorage = setter;
}

function setupSQL() {
  const postgresOpts = {
    host: cot.config.get("database.host"),
    username: cot.config.get("database.username"),
    database: cot.config.get("database.database"),
    port: cot.config.get("database.port")
  };

  if (process.env.PROD_STATUS !== "dev") {
    postgresOpts.password = cot.config.get("database.password");
  }

  return postgres(postgresOpts);
}

async function shutdownSQL() {
  if (sqlStorage !== undefined) {
    sqlStorage.end();
    logger.generic("SQL Server Shutdown!", "info");
  }
}

function wrapper(modToUse) {
  // Return this function passing all args based on what module we need to use
  return async (...args) => {
    // Wrap all function calls in a try catch with a singular error handler
    try {
      return await modToUse.exec(getSqlStorageObject(), ...args);
    } catch (err) {
      console.error(`SQL command error: ${err.toString()}`);
      console.error(`Args: ${args}`);

      return {
        ok: false,
        content: err,
        short: "server_error",
      };
    }
  };
}

const exportObj = {
  shutdownSQL: shutdownSQL,
  setupSQL: setupSQL,
  setSqlStorageObject: setSqlStorageObject,
  getSqlStorageObject: getSqlStorageObject,
};

// Add all other modules here:
//  - First require only once on startup rather than during the command
//  - Then add the function as the default export of the object key
//  - Then we add the safe value to the object key

const keys = [
  "createTable"
];

for (const key of keys) {
  let tmp = require(`./${key}.js`);
  exportObj[key] = wrapper(tmp);
  exportObj[key].safe = tmp.safe;
}

module.exports = exportObj;
