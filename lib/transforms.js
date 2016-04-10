//image transform bucket
'use strict'
const fs = require('fs');
const os = require('os');
const endianness = os.endianness();

const transforms = module.exports = exports = function(data, bitmapHeaders) {
  //do some transforms, then write new file
  invert(data, bitmapHeaders.pixelOffsetArray, bitmapHeaders.fileSize);

  var unique = Date.now();
  fs.writeFile(__dirname + '/../images/' + unique + '.bmp', data);
};


switch(process.argv[3]){
  case 'red': redscale;
  break;
  case 'blue': bluescale;
  break;
  case 'green': greenscale;
  break;
  case 'invert': invert;
  break;
}
var newBuffer = module.exports = function(buffer) {
  let offset = buffer['readUInt32' + endianness](10);
  if (offset === 54) {
    //non-palette: check every pixel for RGB
    start = 54;
    end = buffer.length;
    pixel = 3;
  }
  //palette: check every byte between 54 and the first image pixel
  start = 54;
  end = offset;
  pixel = 4;
}

function invert(data, startOffset, endOffset) {
  for (var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(255 - data.readUInt8(i), i);
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1);
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};
function redscale(data, startOffset, endOffset) {
  for (var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(255 - data.readUInt8(i), i);
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1);
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};
