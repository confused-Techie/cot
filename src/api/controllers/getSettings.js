// Displays the settings UI
module.exports = {
  docs: {

  },
  endpoint: {
    method: "GET",
    path: "/settings",
    rateLimit: "generic",
    successStatus: 200,
    options: {
      Allow: "GET"
    },
    mode: "normal"
  },

  async logic(params) {

  }
};
