const Config = require("./config.js");
let serve;

(async () => {
  if (process.env.PROD_STATUS === "dev") {
    // setup dev env
  }

  const api = require("./api.js");

  serve = api.listen(Config.get("port"), () => {
    console.log(`Server Listening on port ${Config.get("port")}`);
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

  console.log("Exiting...");
  serve.close(() => {
    console.log("HTTP Server Closed");
  });

  process.exit(1);
}
