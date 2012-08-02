/*
  
  copy.js
  
  Accepts: config - config object

*/

var path          = require('path'),
    fs            = require('fs')
    rmdirSyncRec  = require('./rmdirSyncRec');

module.exports = function(config) {
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
        
          // Then make a new fresh one.
          fs.mkdirSync(config.target + val);
        
      } else {

        // It's a file so copy it to the target location.
        fs.writeFileSync(config.target + val, fs.readFileSync(itemPath));
      
      }
      
      var stats = fs.statSync(itemPath).isDirectory();
      console.log('stats ', stats);
      //console.log('is dir? ', stats.isDirectory());

    } else {

      console.log('Item does not exist...');
    
    }
    console.log(currentDir + path.sep + val);
  });  
};