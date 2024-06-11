const datatypes = require("../src/datatypes/_export.js");

describe("datatypeObject can decode strings", () => {
  test("'audio/*; q=0.2, audio/basic'", () => {
    const dataObj = datatypes.datatypeObject("audio/*; q=0.2; v=5, audio/basic");

    const obj = [
      {
        raw: "audio/*; q=0.2; v=5,",
        mediaType: {
          raw: "audio/*",
          type: "audio",
          subtype: "*",
          parameters: {
            raw: "; q=0.2; v=5",
            pairs: [
              {
                key: "q",
                value: "0.2"
              },
              {
                key: "v",
                value: "5"
              }
            ]
          }
        }
      },
      {
        raw: "audio/basic",
        mediaType: {
          raw: "audio/basic",
          type: "audio",
          subtype: "basic",
          parameters: { raw: "", pairs: [] }
        }
      }
    ];

    expect(dataObj).toMatchObject(obj);
  });

  test("'audio/*'", () => {
    const dataObj = datatypes.datatypeObject("audio/*");

    const obj = [
      {
        raw: "audio/*",
        mediaType: {
          raw: "audio/*",
          type: "audio",
          subtype: "*",
          parameters: { raw: "", pairs: [] }
        }
      }
    ]

    expect(dataObj).toMatchObject(obj);
    expect(dataObj.length).toBe(1);
  });

  test("'text/plain; q=0.5, text/html, text/x-dvi; q=0.8, text/x-c'", () => {
    const dataObj = datatypes.datatypeObject("text/plain; q=0.5, text/html, text/x-dvi; q=0.8, text/x-c");

    const obj = [
      {
        raw: "text/plain; q=0.5,",
        mediaType: {
          raw: "text/plain",
          type: "text",
          subtype: "plain",
          parameters: {
            raw: "; q=0.5",
            pairs: [
              {
                key: "q",
                value: "0.5"
              }
            ]
          }
        }
      },
      {
        raw: "text/html,",
        mediaType: {
          raw: "text/html",
          type: "text",
          subtype: "html",
          parameters: { raw: "", pairs: [] }
        }
      },
      {
        raw: "text/x-dvi; q=0.8,",
        mediaType: {
          raw: "text/x-dvi",
          type: "text",
          subtype: "x-dvi",
          parameters: {
            raw: "; q=0.8",
            pairs: [
              {
                key: "q",
                value: "0.8"
              }
            ]
          }
        }
      },
      {
        raw: "text/x-c",
        mediaType: {
          raw: "text/x-c",
          type: "text",
          subtype: "x-c",
          parameters: { raw: "", pairs: [] }
        }
      }
    ];

    expect(dataObj).toMatchObject(obj);
  });
});

describe("datatypeHandler can identify the correct type", () => {
  test("'number/integer' =>", () => {
    const classForDatatype = datatypes.handler("number/integer", "TODO");

    expect(classForDatatype).toBe("number_integer");
  });
});
