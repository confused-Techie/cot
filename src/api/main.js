const express = require("express");
const endpoints = require("./controllers/_endpoints.js");
const parameters = require("./parameters.js");

const app = express();

// Set express defaults
app.set("trust proxy", true);

const endpointHandler = async function (node, req, res) {

  if (typeof node.preLogic === "function") {
    await node.preLogic(req, res);
  }

  let params = parameters.verifyParam(req);

  let obj;

  try {
    if (node.endpoint.endpointKind === "raw") {
      await node.logic(req, res);
      return;
    } else {
      obj = await node.logic(params);
    }
  } catch(err) {
    console.error(err);
  }

  if (typeof node.postLogic === "function") {
    await node.postLogic(req, res);
  }

  if (obj) {
    obj.addGoodStatus(node.endpoint.successStatus);

    obj.handleReturnHTTP(req, res);

    if (typeof node.postReturnHTTP === "function") {
      await node.postReturnHTTP(req, res, obj);
    }
  }

  return;
};

for (const node of endpoints) {

  switch(node.endpoint.method) {
    case "GET":
      app.get(node.endpoint.path, async (req, res) => {
        await endpointHandler(node, req, res);
      });
      break;
    case "POST":
      app.post(node.endpoint.path, async (req, res) => {
        await endpointHandler(node, req, res);
      });
      break;
    case "DELETE":
      app.delete(node.endpoint.path, async (req, res) => {
        await endpointHandler(node, req, res);
      });
      break;
    default:
      console.log(`Unsupported HTTP method: ${node.endpoint.method} for ${node.endpoint.path}`);
  }
}

app.use(async (err, req, res, next) => {
  // Keeping last position allows this to act as an error handler
  if (err) {
    console.error(`An error was encountered handling the request: ${err.toString()}`);
    // todo return error
    return;
  }
});

module.exports = app;
