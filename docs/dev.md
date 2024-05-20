# CoT

If the major purpose of the application is to catalog items and their metadata
then we need to determine the major points of the file.

Obviously ingest is hugely important, once a file is ingested we would want to:
  * Get OCR data
  * Get scanned date data
  * Get facial detection data
  * Anything else possibly exposed by a package

Then the other big one may be egress, but really I don't think so.
Egress is just exporting a file, which the entire process would likely be handled
by a plugin, rather than event based.

Same with ingress being possibly handled as an action by a plugin.

So I suppose largely our actions should be structured like so:

- Core triggers an ingress task.
  * This then activates all packages that hook up to the ingress event.
  * Each package then hands off to core the item it found and whatever metadata is present.
- Core then on receiving of an individual item can store the item in the DB, then emit an event about the item being ingested
  * This event then can activate all packages that hook up to the metadata event, and begin to append metadata to the item.
  * Where each package then modifies the item in the database directly.

Then entirely separately when a user goes to export an item or range of items, that range is stored by core and each one is then called with the respective package for export methodology.


Then this may be all that's required, since really that's the purpose of the application.
Meaning we have the following events a package can hook up to:
  - ingress: When a call is made for new files to be imported
  - metadata: When a call is made to generate metadata on a specific file.
  - egress: When a call is made to convert an item to a specific format.

## Extensibility

There obviously needs to be a robust system to add extensibility into the application.

Although there are some hard parts to figure out:
  - Database changes
  - UI Updates
  - Sorting during search
    * query parameter support during search
  - Package settings

As the frontend should basically comprise of a search page with results, and a singular item page, we need multiple ways to display custom fields.

A possibility:

Every package has loads of special data they can define, most obviously their settings, similar to how it's handled in Pulsar.

Packages are also able to define custom metadata.

A defined custom metadata then has to relate to the UI on both pages, and to the database.
This means that likely we could do something like:

A metadata item defines:
  - Some JavaScript to run to validate it's usage as a query parameter
  - Details similar to how settings are defined that drive how the UI is displayed, arguably this could also be used to generate query parameter validation as well.
  - Finally some code to create a new entry in the database. This could just be some custom SQL, but that brings several issues:
    * What happens when the package is uninstalled? Is there a custom uninstall SQL script? Is the table left forever?
    * How do we ensure it's not malicious?

### Package SQL

What probably is the best thing to do is instead give every package it's own table to work with.
The package itself never defines any custom SQL instead the data provided in it's metadata definition is used to generate a new SQL table, and define it's object structure. Then on package deletion it's optional to delete the table or not. If it's not deleted we make a copy of the metadata information to ensure it's still visible to the user, and that it can continue to function, but if it is deleted then we remove all traces, and the entire table can be removed without data risk. Maybe while optionally backing it up.

What this also means is that we could define all supported metadata as a single simple file that defines the key items everything uses. Just with special support in writing to the database. Which we could surpass with using dot notation to define what table in the database we are actually writing too.

This seems like the best solution, even if maybe a little bit slow on queries, but ideally, we would rarely need additional metadata fields in the actual database.

## Metadata Definition Ideas

To define custom metadata lets look at what needs to be included:

* DataType:
  - This is used to display in the UI (multiple pages)
  - Used to do some basic validation on the query parameter probably?
  - Used to define the field on the package's table
* Description:
  - Just used on the UI side of things
* Restrictions:
  - Used to help generate the rules of the query parameter validation
* Migrations:
  - In case we want to support migrations of values, this should be built right in

# Config Precedence

Obviously copying config methodology from Pulsar. But there's no language-scoped settings so it may be unwarranted complexity.

But still wanting to give it a try, it at least helps to prioritize options from multiple levels of precedence.

Such as:
  - environ
  - config file (json, yaml, etc)
  - default

For the config file I want permissions to be awesome here, so we could do that with groups, where each section of permissions can be given ownership to a user group and only they are then allowed to edit the files.

# MetaSchema

Over the course of working on this project what started off being called `metadata` for items
was being defined via a term `metaschema` sounded about right to me.
But turns out there's actually a true `metaschema` initiative from NIST with a similar goal.

Maybe this project could follow it more closely? Maybe I ignore it?
https://pages.nist.gov/metaschema/specification/datatypes/#regular-expressions-in-schemas
