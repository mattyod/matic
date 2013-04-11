/*
    check.js

    Perform a check to see if the specified template engine is available.
    If it isn't offer a friendly error message

*/

module.exports = function (config) {
  var valid = false;

  var msgs = {
        configError: "The config file does not specify a templating engine, please add one.\n",
        requireError: ""
      };

  if (config.template && config.template.lib) {

    msgs.requireError = "The config file speicifies " + config.template.lib + 
    " as the templating engine but it is not installed. \nPlease run: \n" +
    "npm install -g " + config.template.lib + "\n";

    try {
      require.resolve(config.template.lib);
      valid = true;
    } catch (error) {
      process.stdout.write(msgs.requireError);
    }
  } else {
    process.stdout.write(msgs.configError)
  }

  return valid;
};