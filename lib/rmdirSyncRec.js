var fs    = require('fs'),
    path  = require('path');

module.exports = function (dir) {

  var rmdirSyncRec = function (dir) {
    // Does the passed directory path exist?
    if (fs.existsSync(dir)) {
      
      // Read it's contents (files and folders)
      var items = fs.readdirSync(dir);

      // Itterate through the folder contents
      items.forEach(function (name) {
        
        // Build up new path to the item
        var newPath = dir + path.sep + name;

        if (fs.statSync(newPath).isDirectory()) {
          
          // Itterate on down into the next folder
          rmdirSyncRec(newPath);
        
        } else {

          // It's a file or symbolic link so unlink it.
          fs.unlinkSync(newPath);
        
        }

      });

      // Finally delete the containing folder.
      fs.rmdirSync(dir);

    }
  
  };

  // Call the method within, allowing for safe recursion.
  rmdirSyncRec(dir);

};