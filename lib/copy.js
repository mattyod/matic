/*
  
  copy.js
  
  Accepts: config - config object

*/

var path            = require('path'),
    fs              = require('fs')
    rmdirSyncRec    = require('./rmdirSyncRec'),
    copydirSyncRec  = require('./copydirSyncRec');

module.exports = function(config) {
  
  if(config.assets) {

    var currentDir = path.dirname();

    config.assets.forEach(function(val, key) {
      
      // Generate full path for this file system item.
      var itemPath = currentDir + path.sep + val;

      // Check it exists.
      if(fs.existsSync(itemPath)) {

        // Is it a directory?
        if(fs.statSync(itemPath).isDirectory()) {

            // If so delete it and it's contents first.
            rmdirSyncRec(config.target + val);
          
            // Then copy the source folder to the target location.
            copydirSyncRec(itemPath, config.target + val);
          
        } else {

          // It's a file so copy it to the target location.
          fs.writeFileSync(config.target + val, fs.readFileSync(itemPath));
        
        }

      } else {

        console.log('Item ' + itemPath + ' does not exist...');
      
      }

    });
  
  }

};