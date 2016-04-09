//Can handle palette and non-palette bitmaps
//Can handle multiple types of bitmaps (not just BM)
//Handle LE and BE computers with a single if statement
//make your command install-able on npm and use a "bin"
//can handle various sized bitmaps
//image transform bucket
const fs = require('fs');

const transforms = module.exports = exports = function(data, bitmapHeaders) {
  //do some transforms, then write new file
  invert(data, bitmapHeaders.pixelOffsetArray, bitmapHeaders.fileSize);

  var unique = Date.now();
  fs.writeFile(__dirname + '/../images/' + unique + '.bmp', data);
};

function invert(data, startOffset, endOffset) {
  for(var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(255 - data.readUInt8(i), i);
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1);
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};
