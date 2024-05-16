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
