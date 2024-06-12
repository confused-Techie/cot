# Datatypes Workthrough

Due to the anticipated system of datatypes, such as being able to define a type and subtype, along with parameters that modify those types, lets go ahead and breakdown exactly what we should support and may be looking for.

Since we should try to find our datatypes on the intersection of:
  * [JavaScript datatypes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
  * [PostgreSQL datatypes](https://www.postgresql.org/docs/current/datatype.html)
  * [NISTs Metaschema Datatypes](https://pages.nist.gov/metaschema/specification/datatypes/)

## Numbers

Type: `number/`

JavaScript:
  - number
  - bigint
Metaschema:
  - decimal
  - integer
  - non-negative-integer
  - positive-integer
SQL:
  - Integer Types:
    * smallint - Alias: int2
    * integer - Alias: int, int4
    * bigint - Alias: int8
  - Arbitrary Precision Numbers:
    * numeric - Alias: decimal
  - Floating-Point Types:
    * real - Alias: float4
    * double precision - Alias: float8
  - Serial Types:
    * smallserial - Alias: serial2
    * serial - Alias: serial4
    * bigserial - Alias: serial8

Types:
  - `/decimal`: A decimal datatype, represented as a `number` in JS, and `decimal` in SQL.
  - `/integer`: Standard integer. JS = `number`; SQL = `integer`.
  - `/bigint`: JS = `bigint`; SQL = `bigint`.
  - `/smallint`: JS = `number`; SQL = `smallint`.

## Booleans

Type: `boolean/`

JavaScript:
  - boolean
Metaschema:
  - boolean
SQL:
  - boolean

Types:
  - `/boolean`: JS = `boolean`; SQL = `boolean`.

## Strings

Type: `string/`

Unlike most other types, this system will have strings occupy much more area then the strict values of
actual strings.

JavaScript:
  - string
Metaschema:
  - string
  - email-address
  - hostname
  - ip-v4-address
  - ip-v6-address
  - token
  - uri
  - uri-reference
  - uuid
SQL:
  - character
  - character varying
  - cidr
  - inet
  - macaddr
  - macaddr8
  - text
  - uuid

Types:
  - `/text`: JS = `string`; SQL = `text`. Most basic form for things like descriptions, tags, or titles.
  - `/email-address`: JS = `string`; SQL = `text`; enforced via regex.
  - `/hostname`: JS = `string`; SQL = `text`; enforced via regex.
  - `/uuid`: JS = `string`; SQL = `uuid`
  - `/ip-address`: JS = `string`; SQL = `inet`
  - `/mac-address`: JS = `string`; SQL = `macaddr`

## TODO

While the above is a great start, it doesn't begin to cover everything we need to care about.
Some notable examples:
  - Date Formats
  - Time Formats
  - Object Formats (json, xml, etc)
  - Binary Formats
  - Maybe location formats?
