/*
  
  copydirSyncRec.js

  Accepts:  source, path of folder to copy from
            target, path of filder to create and copy to

*/
var fs    = require('fs'),
    path  = require('path');

module.exports = function(source, target) {
  
  var copydirSyncRec = function(source, target) {

    // Create target folder.
    fs.mkdirSync(target);

    // Get source folder contents.
    var items = fs.readdirSync(source);

    items.forEach(function(item) {
      
      // Create path shortcuts.
      var sourcePath = source + path.sep + item;
      var targetPath = target + path.sep + item;

      // Is it a directory?
      if(fs.statSync(sourcePath).isDirectory()) {

        // Then copy down into that.
        copydirSyncRec(sourcePath, targetPath);

      } else {

        // It's a file so copy it to the target location.
        fs.writeFileSync(targetPath, fs.readFileSync(sourcePath));
      
      }
    
    });
    
  };

  // Call the method within, allowing for safe recursion.
  copydirSyncRec(source, target);

};