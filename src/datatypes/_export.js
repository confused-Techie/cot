
// The datatypeObject function takes a string representation of a datatype, and
// returns an object representation.
// e.g. "audio/*; q=0.2, audio/basic"
function datatypeObject(input) {
  const regex = /(?<mediaType>(?<type>[a-zA-Z\*]+)\/(?<subtype>[a-zA-Z-\*]+))(?<parameters>(;\s*[a-zA-Z0-9.=]+)*),*/gm;

  const groupKey = {
    raw: 0,
    mediaType: {
      raw: 1,
      type: 2,
      subtype: 3,
      parameters: {
        raw: 4,
      }
    }
  };

  const ma = input.matchAll(regex);

  const output = [];

  for (const match of ma) {

    const obj = {
      raw: match[groupKey.raw],
      mediaType: {
        raw: match[groupKey.mediaType.raw],
        type: match[groupKey.mediaType.type],
        subtype: match[groupKey.mediaType.subtype],
        parameters: {
          raw: match[groupKey.mediaType.parameters.raw],
          pairs: []
        }
      }
    }

    // now to iterate parameters
    if (typeof obj.mediaType.parameters.raw === "string") {
      let parameters = obj.mediaType.parameters.raw.split(";");

      for (const param of parameters) {
        if (typeof param !== "string" || param.length < 1) {
          // skip preceeding ";" from break of subtype declaration
          continue;
        }

        let keyValuePairString = param.split("=");
        let keyValuePair = {
          key: keyValuePairString[0].trim(),
          value: keyValuePairString[1].trim()
        };
        obj.mediaType.parameters.pairs.push(keyValuePair);
      }
    }


    output.push(obj);
  }

  return output;
}

// The handler functions worries about translating raw datatypes for all other aspects
// of the system. Taking the string declaration, objectifying it, and returning the correct
// details based on what "translation" is being requested.
// Valid translations:
//  * validate: returns a function that returns false if the value provided is not
//              the type specified. Otherwise returns a safe value to work with back.
//  * sql: returns the SQL declaration of the type.
//  * ui: TODO
function handler(datatype, translation) {
  let datatypeArr = datatypeObject(datatype);

  let classForDatatype = "";
  let datatypeIdx = 0;

  while (classForDatatype.length === 0 || datatypeIdx > datatypeArr.length) {
    // lets iterate every provided identifier of datatypes to see if we can find
    // one this version of the system supports
    let dataTypeObj = datatypeArr[datatypeIdx];

    switch(dataTypeObj.mediaType.type) {
      case "boolean":
        switch(dataTypeObj.mediaType.subtype) {
          case "boolean":
            classForDatatype = "boolean";
            break;
        }
        break;
      case "number":
        switch(dataTypeObj.mediaType.subtype) {
          case "integer":
            classForDatatype = "number_integer";
            break;
        }
        break;
      case "text":
        switch(dataTypeObj.mediaType.subtype) {
          case "string":
            classForDatatype = "text_string";
            break;
          case "uuid":
            classForDatatype = "uuid";
            break;
        }
        break;
    }
  }

  if (classForDatatype.length < 1) {
    // we failed to find any valid matches
    return false;
  }

  // TODO: For testing lets return the found type
  return classForDatatype;
}


module.exports = {
  datatypeObject: (input) => { return datatypeObject(input); },
  handler: (datatype, translation) => { return handler(datatype, translation); },
  boolean: require("./boolean.js"),
  integer: require("./integer.js"),
  string: require("./string.js"),
  uuid: require("./uuid.js")
};
