// Displays the settings UI
module.exports = {
  docs: {

  },
  endpoint: {
    method: "GET",
    path: "/settings",
    rateLimit: "generic"
  },

  async logic(params, req, res) {
    // setup our response
    res.set("Content-Type", "text/html");
    res.status(200);

    let content = "<p>Hello World!</p>";

    return content;
  }
};
