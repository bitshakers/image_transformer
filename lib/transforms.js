//image transform bucket
const fs = require('fs');

const transforms = module.exports = exports = function(data) {
  //do some transforms, then write new file
  fs.writeFile(__dirname + '/../images/newFile.bmp', data);
};
