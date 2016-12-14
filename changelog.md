# Matic Changelog

### 14 December 2016, 0.5.2
* Couple of minor fixes to tests running in windows environments

### 26 August 2014, 0.5.1
* Added link to rendered example
* Fixed typos in readme and changed tone a little

### 10 August 2014, 0.5.0
* Support for draft 4 (allOf, anyOf, oneOf, enum etcetera)
* Improved $ref support
* Support for index pages
* Now uses .maticrc file instead of config.json
* Copies schemas to project if specified

### 03 March 2014, 0.4.0
* No longer attempt to itterate null 'objects'
* Updated dependencies
* Added lint script, ignore file and dependency

### 23 November 2013, 0.3.7
* Added .jshintrc rule set and linted accordingly

### 03 August 2013, 0.3.6
* Updated readme example to reflect defaults for version 0.3.x

### 30 July 2013, 0.3.5
* Swithched from binary to utf8 encoding for file reads

### 24 May 2013, 0.3.4
* Engine version syntax corrected in package.json

### 24 May 2013, 0.3.3
* Added 'preferGlobal' to package.json so that non '-g' npm installs offer a
warning
* Typo in build.js comments corrected

### 15 May 2013, 0.3.2
* Updated readme with links to matic-example. A more complete example repo with
sub schema and template includes/mixins

### 14 May 2013, 0.3.1
* Updated readme install instructions for npm

### 13 May 2013, 0.3.0
* Suffix attribute added to the config object allowing the generation of file
formats other than .html
* Folder attribute added to the template object within the config object. If set
to true Matic will attempt to map identically named schemas to templates. If it
fails to find a match it will fall back to the default template if named in
the file attribute of the template object
* Edited 0.2.0 changelog entry for clarity
* Dev dependencies versions updated

### 16 April 2013, 0.2.7
* Fixed failing tests

### 16 April 2013, 0.2.6
* Added suffix to config file so files other than .html can be output
* Removed copy of config from lib

### 15 April 2013, 0.2.5
* Schema merging properly determines between object literals and arrays for
entries such as enum

### 11 April 2013, 0.2.4
* Fixed critical issue introduced in 0.2.3 around template engine checking

### 10 April 2013, 0.2.3
* Graceful checking and failure of template engine requirement
* Updated Node versions in package.json

### 23 March 2013, 0.2.2
* Added links to generated examples in README

### 31 January 2013, 0.2.1
* Indentation on bin files

### 09 January 2013, 0.2.0
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

Would have expected the sub schema 'things.json' to take the following format:

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

README updated thanks to [Nick Lombard](https://github.com/nickl-)

### 05 September 2012, 0.1.4
* Renamed test for build.js

### 31 August 2012, 0.1.3
* Literacy issues in README
* Added links to both simple and very simple examples

### 29 August 2012, 0.1.2
* Works in Windows
* Tests passing in Windows
* Changelog (this file) added
