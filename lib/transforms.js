//image transform bucket
const fs = require('fs');

const transforms = module.exports = exports = function(data) {
  //do some transforms, then write new file
  var unique = Date.now();
  fs.writeFile(__dirname + '/../images/' + unique + '.bmp', data);
};
