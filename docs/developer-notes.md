# Developer notes

These notes are written for people wishing to understand how Inky Compose works under the hood. If you just want to use Inky Compose in your day to day work, see [Getting started](/getting-started.md).

# Architecture

The Inky Compose extension makes use of the civinky javascript library to allow you to compose emails using Inky and Pug and have these emails 'compiled' to email friendly HTML.

## Data model

All data is stored in existing CiviCRM tables. This extension does not create any new tables or columns.

A new CivMail template type `Civinky` is created, which defines two template options:

* `pug` stores inky markup written in either HTML or (recommended) Pug.
* `css` expects a URL to CSS stylesheet that will be applied when the Pug is converted to HTML

# User interface

The standard CiviCRM HTML and plain text boxes are replaced by two side by side boxes that are used for inputting Pug and previewing the output.

The Pug is converted to HTML in realtime (debounced by 500ms).

# Workflow

 HTML is autosaved as normal.

# Development builds

```
npm install
gulp build
```
