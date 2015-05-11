# Matic [![NPM version](http://img.shields.io/npm/v/matic.svg)](https://www.npmjs.org/package/matic) [![Build status](http://img.shields.io/travis/mattyod/matic.svg)](http://travis-ci.org/mattyod/matic)

Build tool for generating HTML documentation from JSON schemas. Use Jade templates to create clear and easy to read schema documentation for your schemas.

Supports [JSON schema draft 3](http://tools.ietf.org/html/draft-zyp-json-schema-03) and [JSON schema draft 4](http://tools.ietf.org/html/draft-zyp-json-schema-04).

## Installation

```sh
npm install -g matic
```

## Usage

Matic is designed to be highly configurable through a ```.maticrc``` file at the root of your project but is configured for a basic set up by defult.

A typical project layout using default settings.

```
|____.maticrc [optional]
|____schemas
| |____my-schema.json
|____templates
  |____default.jade
```

Essentially you will need:

* A folder with at least one schema document.
* A folder with at least one template file.
* an optional .maticrc file for custom settings.

By default Matic will use your schema(s) and template(s) to generate a set of HTML files into a folder called ```web```. However there are many ways in which this can be customised through the .maticrc file.

Then to build your documenation; from the route of your project, run:

```sh
matic
```

## Configuration

Matic can be configured throught the use of a ```.maticrc``` file to the specific demands of your project. The following options can be set:

### Target

An object relating to the target output for your build. By default this is configured as:

```json
{
  "target": {
    "path": "web",
    "suffix": "html"
  }
}
```

It contains the following options:

#### Path

**default** _web_

Target output folder for your rendered output files and associated assets.

#### Suffix

**default** _html_

Suffix to be appended to your rendered output files. This can be overwritten to be ```md``` or whatever you choose.

### Schemas

An object relating to your schemas and _if_ you intend to include them in your project output allows you to dictate the way in which they will be rendered. By default this is configured as:

```json
{
  "schemas": {
    "path": "schemas",
    "suffix": "json",
    "indent": 2
  }
}
```

It contains the following options:

#### Path

**default** _schemas_

Path from which Matic should locate schema files.

#### Suffix

**default** _json_

Suffix that your schema files use and also the suffix that will be used _if_ your schemas are to be included in your project output.

#### Indent

**default** _2_

Indentation to use for schema files if you choose to include them in your output files.

### Templates

An object relating to your templates and how they should be handled.

**N.B.** only tested with Jade.

By default this is configured as:

```json
{
  "templates": {
    "folder": true,
    "path": "templates",
    "file": "default",
    "lib": "jade",
    "suffix": "jade"
  }
}
```

It contains the following options:

#### Folder

**default** _true_

Boolean flag that indicates whether Matic should map multiple template files to corresponding schemas. This allows for a greater verbosity when documenting more than one schema as each template can contain any extra explanations or examples specific to the relevant schema.

So for example, when set to true, a folder structure such as:

```
|____templates
| |____one.jade
| |____two.jade
|____schemas
| |____one.json
| |____two.json
```

Will generate an output folder such as:

```
|____web
| |____one.html
| |____two.html
```

Where both schemas have been rendered through their corresponding templates.

**N.B.** It is not necessary to specify a [file attribute](#user-content-file) within the templates object if mapping a folder like this. However, if there are schemas that do not map directly to template file, (have the same name), Matic will attempt to use the file specified by the file attribute as a default template.

If the folder attribute is set to false Matic will map all schemas to the file specified by the 'file' attribute, which is 'default' by default. Each generated file will take the name of it's schema so a starting structure such as:

```
|____templates
| |____default.jade
|____schemas
| |____one.json
| |____two.json
```

Will generate the same output web folder as above but both output files will have been passed through default.jade schema.

#### Path

**default** _templates_

Path from which Matic should locate template files.

#### File

The name of your primary or default template file which should be at the top level of the templates folder specified in the 'path' attribute.

This will be used as a fallback when "folder" is set to true and a direct mapping between schemas and templates cannot be found.

#### Lib

**default** _jade_

The library which Matic should require to compile and render your templates.

**N.B.** only tested with Jade.

#### Suffix

**default** _jade_

Suffix that Matic will expect your template files to have.

### Assets

**default** _n/a_

An array of asset folders to be copied into your output folder. You will need to add this to your `.maticrc` file if you wish to include assets such as JS, CSS or images into your final build. Add any folder paths you wish to be copied over, such as:

```json
{
  "assets": ["js", "css", "img"]
}
```

Copying is done recursively and includes all files and subfolders.

### Index

**default** _n/a_

A boolean or object that indicates you wish to add an index page to your build output. If present, Matic will build an index page for your project and link to all of your generated schema documentation files.

Matic will look for a template called `index.jade` (or whatever suffix you have chosen) in order to render this page.

To do this add a property such as:

```json
{
  "index": true
}
```

#### Additional indexing

However, you may for example also wish to add raw schemas to your index file, change the index property to an object and list the folders you wish to be indexed.

This could be:

```json
{
  "index": {
    "schemas": true
  }
}
```

## Example

For an example project with a config, CSS & JS, that you can use for your own project, please take a look at: [Matic-draft4-example](https://github.com/mattyod/matic-draft4-example) and its [rendered output](http://mattyod.github.io/matic-draft4-example/).

## Licence

[MIT](https://raw.github.com/mattyod/matic/master/LICENSE)

