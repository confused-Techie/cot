# Final Notice on Metaschema

Alright, in the process of creating this application, I fell in love with the ideas of metaschemas, wanted to use succinct syntax to express them, started creating an ABNF parser to support this, got stuff wanting to build on robust enough for the entire ABNF syntax. Stopped that and returned here for an MVP solution. But at this point the complexity has gone a bit high for something so simple, and the format has gotten messy with to many parts being modified in too many locations.

At this point, I think it's best to scrape all current metaschema work and start it over again for simplicity.

While the extensible system will require lots of different datatypes and values, realistically the data we are reading is already structured, (as it exists in a `package.json`) so there is no reason to reinvent the wheel here. Instead I should focus on making a format that works for now, and figure out best practices at expanding it in the future.

So lets do exactly that, and get to work on the other few aspects that must exists for this application to work.
