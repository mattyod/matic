/*
  
  copydirSyncRec.js

  Accepts:  source, path of folder to copy from
            target, path of filder to create and copy to

*/
var fs            = require('fs'),
    path          = require('path');

module.exports = function(source, target) {
  // Create target folder.
  fs.mkdirSync(target);

  // Get folder contents.
  var items = fs.readdirSync(source);

  items.forEach(function(item) {
    
    var sourcePath = source + path.sep + item;
    var targetPath = target + path.sep + item;

    if(fs.statSync(sourcePath).isDirectory()) {

      copydirSyncRec(sourcePath, targetPath);

    } else {

      // It's a file so copy it to the target location.
      fs.writeFileSync(targetPath, fs.readFileSync(sourcePath));
    
    }
  
  });

};