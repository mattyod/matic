# Matic [![Build Status](https://secure.travis-ci.org/mattyod/matic.png?branch=master)](http://travis-ci.org/mattyod/matic)
A Node.js build tool for generating HTML documentation from JSON schemas.

Matic is currently in Alpha state and whilst usable for most use cases still lots of work remain as development continues. You are encouraged to fork the repo should you wish to contribute to the code and bug reports or suggestions will be attended to in the issue queue.

Current development was based on the [draft JSON schema 03](http://tools.ietf.org/html/draft-zyp-json-schema-03) specification and support for any follow up specifications will be ported as they become available.

## Installation
Use NPM to install globally:

    $ npm install -g

A sure indication that matic is installed and operational, which also retrieves the current version number, is to run the command:

    $ matic -v

## Building documentation
From the root of your project folder simply run:

    $ matic

### Example projects
There are currently two example projects available, which are full project folders not yet built with Matic, to aid as examples of how to structure your project folder to work with Matic: 

  * [very simple example](https://github.com/mattyod/matic-very-simple-example). Which contains one schema file and one template file.
  * [simple example](https://github.com/mattyod/matic-simple-example). Which contains one schema file and a more structured template set-up with includes and mixins.

A more complex example which includes sub schema support is currently underway and will be available shortly.

A typical layout using default settings:

```
|____config.json
|____schemas
| |____my-awesome-schema.json
|____templates
| |____default.jade
|____web
```

Essentially you will need 
 * a folder with at least one schema document 
 * a folder with at least one template file
 * an optional config file for custom settings

The default global configuration looks for a main template with filename `default.jade` which can be customized with a project level config file, [see below](#setting-config-options).

By default Matic will use your template(s) and schema(s) to generate a set of HTML files into a folder named `web`, this can also be modified through the local config file.

## Setting config options
Various default settings are configured through Matic's global config file. These settings can be modified on a per project basis by providing a custom `config.json` file located at the root of the project folder.

The following parameters are configurable, default values in brackets:

### Source [./schemas/]
The source folder is where Matic will look for JSON schema documents. These files can have any name with the `.json` extension.

Example:
```json
{"source": "./schemas/"}
```

### Target [./web/]
This is the output folder where Matic will generate the resulting HTML files. This folder will be created automatically, if it does not exist.

Example:
```json
{"target": "./web/"}
```

### Template
This is an object containing details of the templating language which you intend Matic to use to generate the HTML output. Please note only support for Jade has been tested to date, although it should work equally well with other libraries which implement the `compile()` and `render()` methods. If you do happen to have the opportunity to test Matic with an alternative provider, please report back with your findings.

The template configuration object has the following settings:

#### Path [./templates/]
The path to your template files.

#### File [default]
The name of your primary template file.

#### Lib [jade]
Name of the template library to use. **Note:** Matic will assume that the template files have the same extension. i.e. default.jade

Example:
```json
"template": {
  "path": "./templates/",
  "file": "default",
  "lib": "jade"
}
```

In this example Matic will expect to find a file named default.jade located in the templates folder at the root of your project.

### Assets [ ]
An array of files or folders to be copied into the target build folder. There are no resources referenced by default, you will need to add your own config.json file to the project root if you want Matic to copy additional files and/or folders during build. The original resources will remain unchanged.

Example:
```json
{"assets": ["css", "js"]}
```

This example instructs Matic to copy two folders named `css` and `js` into the target build folder. Copying is done recursively which includes all files and sub folders.

## Licence

[MIT](https://raw.github.com/mattyod/matic/master/LICENSE)
