
const configSchema = {
  application: {
    type: "object",
    properties: {
      port: {
        type: "integer",
        default: 8080,
        description: "Port to expose the web interface on.",
        title: "Web Interface Port"
      },
      itemExpiration: {
        type: "integer",
        default: 60000,
        description: "Milliseconds until an item in the Item Registry expires."
      }
    }
  },
  database: {
    type: "object",
    properties: {
      host: {
        type: "text",
      },
      username: {
        type: "text"
      },
      database: {
        type: "text"
      },
      port: {
        type: "integer"
      },
      password: {
        type: "text",
        hidden: true
      }
    }
  }
};

module.exports = configSchema;
