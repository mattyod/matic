# Matic Changelog

### 09 January 2012, 0.2.0
* Sub schemas no longer assumed to have a parent key. This is a significant
change if you have been including sub-schema's with Matic.
Previously it was incorrectly assumed that a sub schema would have a parent key
the same as the the key containing the $ref.

So a master schema such as:

    {
      "id": "master",
      "properties": {
        "things": {
          "$ref": "/things.json"
        }
      }
    }

Would expect the sub schema 'things.json' to take the following format:

    {
      "things": {
        "id": "theThings",
        "properties": {...}
      }
    }

This is no longer the case and sub schema's are expected now to look like:

    {
      "id": "theThings",
      "properties": {...}
    }

### 05 September 2012, 0.1.4
* Renamed test for build.js

### 31 August 2012, 0.1.3
* Literacy issues in README
* Added links to both simple and very simple examples

### 29 August 2012, 0.1.2
* Works in Windows
* Tests passing in Windows
* Changelog (this file) added