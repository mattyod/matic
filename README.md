# Matic [![Build Status](https://secure.travis-ci.org/mattyod/matic.png?branch=master)](http://travis-ci.org/mattyod/matic)
A Node.js build tool for generating HTML documentation from JSON schemas.

Matic is currently in an Alpha state of development and whilst usable is quite far from being a complete and production ready tool.

Current development has been based on [draft JSON schema 03](http://tools.ietf.org/html/draft-zyp-json-schema-03) but as specification for draft 04 emerge in more detail the aim is to addapt as quickly as possible to any changes that may bring.

## Installation
Use NPM to install globally with:

    npm install -g

To confirm installation you should now be able to run the command:

    matic -v

Which should should output the currently installed version of Matic.

## Building documentation
From the root of your project simply type:

    matic

For an example of how to structure your project folder before you do this take a look at [as yet unbuilt example project](https://github.com/mattyod/matic-simple-example). But essentially you will need a folder with at least one schema in it and another folder with at least one template file in it. Currently Matic has only been tested with Jade templates but in theory should work with any templating language that uses the methods compile() and render().

Initially Matic's config is set to look for a main template with the filename default.jade but this can be over-ridden with a project level config file, see below.

By default Matic will then use your template(s) and schema(s) to output a set of HTML files into a new folder called 'web', again this can be over-ridden with a local config file.

## Setting config options
Various default paths and paramaters are set by default within Matic's internal config file. Any of these paramaters can be over-ridden on a project by project basis by creating your own config.json object file at the project root.

The default config contains the following paramaters:

### Source
This is the source folder that Matic will look in for JSON schema files. These files can have any name but must be of type .json.

Example:

    {"source": "./schemas/"}

### Target
This is the target folder that Matic will place generated HTML files into. The named folder does not need to exist when you run Matic as a new one will be created if an existing one cannot be found.

Example:

    {"target": "./web/"}

### Template
This is an object containing details of the templating language that you intend Matic to use to generate your HTML output with. Please note at this time no testing has been carried out with any other language than Jade. It should work for others in theory but until I test that, you have been warned.

Paramaters within the template object are:

#### Path
The path to your template files.

#### File
The name of your primary template file.

#### Lib
The template library that you are using. N.B. Matic will assume that this is the file suffix of your template files.

Example:

    "template": {
      "path": "./templates/",
      "file": "default",
      "lib": "jade"
    }

For this example Matic will expect to find a folder at the project root called 'templates', which contains a template file named default.jade.

### Assets
An array of files or folders that you want copied into your target folder. There is no assets reference by default within Matic, you will need to add your own config.json file to the project root if you want Matic to copy over any additional assets. Original assets will be left un-touched.

Example:

    {"assets": ['css', 'js']}

The above example would inform Matic that two folders 'css' and 'js', need to be copied into the target build folder. Copying is recursive so all sub folders and files within those folders will be copied across as well.

## Licence

[MIT](https://github.com/mattyod/matics/blob/master/LICENSE)