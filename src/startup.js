const Cot = require("./cot/main.js");
let serve, dbTeardown;

(async () => {
  if (process.env.PROD_STATUS === "dev") {
    // setup dev env

    // We must complete dev setup steps prior to the rest of our requires
    const dbSetup = require("../node_modules/@databases/pg-test/jest/globalSetup");
    dbTeardown = require("../node_modules/@databases/pg-test/jest/globalTeardown");

    console.log("Server is in Development Mode!");

    await dbSetup();

    // lets take the value made by the test runner databse, and put it where the api server exects.
    const dbUrl = process.env.DATABASE_URL;
    console.log(`Database available at: ${dbUrl}`);
    // This gives us something like postgres://test-user@localhost:5432/test-db
    // We then need to map these values to where the API server expects
    const dbUrlReg = /postgres:\/\/([\/\S]+)@([\/\S]+):(\d+)\/([\/\S]+)/;
    const dbUrlParsed = dbUrlReg.exec(dbUrl);

    // set the parsed URl as proper env
    process.env.DATABASE_HOST = dbUrlParsed[2];
    process.env.DATABASE_USERNAME = dbUrlParsed[1];
    process.env.DATABASE_DATABASE = dbUrlParsed[4];
    process.env.DATABASE_PORT = dbUrlParsed[3];
  }

  global.cot = new Cot();

  await cot.initialize();

  console.log(cot.packageManager.packages);
  console.log(cot.packageManager.metaschema);

  const api = require("./api/main.js");

  serve = api.listen(cot.config.get("application.port"), () => {
    console.log(`Server Listening on port ${cot.config.get("application.port")}`);
  });

})();

process.on("SIGTERM", async () => {
  await exterminate("SIGTERM");
});

process.on("SIGINT", async () => {
  await exterminate("SIGINT");
});

async function exterminate(callee) {
  console.log(`${callee} signal received: Shutting down Server.`);

  // misc shutdown steps
  await cot.exterminate();

  console.log("Exiting...");
  serve.close(() => {
    console.log("HTTP Server Closed");
  });

  process.exit(1);
}
