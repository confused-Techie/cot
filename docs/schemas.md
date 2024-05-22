# Schemas

Within CoT there are two distinct but purposefully similar schemas for very different purposes.

## Config Schema

The Configuration Schema is the system that CoT uses to store and support configuration options.

The Configuration Schema defined by a package, or the core system, sets it's own default values, and uses a specific structure to define how these values should be formed, and used.

## MetaSchema

The MetaSchema system allows for packages to define the metadata items they collect and provide to CoT.

The wonderful thing about this schema is that this single agnostic definition is used to drive and define:
  * The database table created for the package, along with it's datatypes and relationships to other tables.
  * The query parameter validation that occurs within the API.
  * The UI that's shown to the user when editing or setting the metadata.

---
## Syntax

With these types of schemas defined lets go over the actual syntax of them. What syntax they share and what's unique to each.

## Namespace

The key for the first object within each schema is the namespace of the value.
Within community packages the namespace for the config schema and for the metaschema is automatically selected as the name of your package.

## Version

The top level `version` key only applies to metaschemas, and is used to denote which version of the metaschema definition you followed when originally creating the schema. This allows for the schema of the version the user is using to change, while the schema is automatically converted to a supported one, as long as the schema is not of a newer version than the CoT version the user is using.

## `reference`

The top level `reference` key only applies to metaschemas, and generally doesn't need to be set.
This key refers to what in the database should be used as your reference and primary key for your tables. By default this value is mapped to `core.uuid` which anchors an entry in your package's table to the unique ID of an individual item.

TODO: At this time setting the reference to anything else simply means it is unmapped, as there is not yet support for mapping to alternative tables.

## Object names

Within your namespace when you define a key that represents an object, this ID is then used for a unique entry. For the metaschema this ID is the actual name of the metadata. For the config schema the same is true, although it can refer to a config object, which will be further expanded.

## Object Values

Now to dive into the values we find within each object.

### Default

The default key allows setting the default value for this item. If not present it will be set to `null`.

### Description

The description key allows providing a human readable description of the item, which will be viewable website UI.

### Type

The type key defines the actual type of data this object represents.

The table below details the supported data types.

# Data Types

The list below defines the text of every data type supported among the configuration schema and metaschema, while detailed how these values are handled internally within the database, parameter validation, and user interface.

(The list below is based off the datatypes found within NIST's metaschema definition, as well as the datatypes supported by PostGreSQL, and finally of course JavaScript itself. Trying to find a happy medium for any use case that may arise.)

* base64
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* boolean
  - Database: logical Boolean (true/false)
  - Parameter: TODO
  - UI: TODO
* date
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* date-with-timezone
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* date-time
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* date-time-with-timezone
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* date-time-duration
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* decimal
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* email-address
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* hostname
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* integer
  - Database: signed 4-byte integer.
  - Parameter: a whole number value.
  - UI: TODO
* ip-v4-address
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* ip-v6-address
  - Database: TODO
  - Parameter: TODO
  - UI: TODO
* non-negative-integer
  TODO Maybe this should be a modifier on the integer type.
* positive-integer
  TODO maybe should be a modifier
* string
  - Database: variable-length character string (text)
  - Parameter: Any text based string value.
  - UI: TODO
  - Modifiers:
    * maximum: If a maximum value is provided it will ensure the string is below that length. By default there is no limit.
      - Database: variable-length character string (character varying)
      - Parameter: Any text based string value limited to the length defined.
      - UI: TODO
    * minimum: If a minimum value is provided it will ensure the string is above that limit. By default there is no minimum.
      - Database: Has no effect.
      - Parameter: TODO
      - UI: TODO
* token
  TODO HUH?
* uri
  HUH?
* uri-reference
  HUH?
* uuid
  - Database: universally unique identifier.
  - Parameter: TODO
  - UI: TODO
* year-month-duration
  HUH?
