//image transform bucket
'use strict'
const fs = require('fs');
const os = require('os');
const endianness = os.endianness();
var startOffset;
var endOffset;
var pixel;


var newBuffer = module.exports = function(buffer) {
  let offset = buffer['readUInt32' + endianness](10);
  if (offset === 54) {
    //non-palette: check every pixel for RGB
    startOffset = 54;
    endOffset = buffer.length;
    pixel = 3;
  }
  //palette: check every byte between 54 and the first image pixel
  startOffset = 54;
  endOffset = offset;
  pixel = 4;
console.log(newBuffer);
  return newBuffer;
}

const transforms = module.exports = exports = function(data, bitmapHeaders, transform) {
  switch (transform) {
    case '-r':
    case 'red':
      redscale(data, bitmapHeaders);
      break;
    case '-b':
    case 'blue':
      bluescale(data, bitmapHeaders);
      break;
    case '-g':
    case 'green':
      greenscale(data, bitmapHeaders);
      break;
    case '-i':
    case 'invert':
      invert(data, bitmapHeaders);
      break;
    default:
      invert(data, bitmapHeaders);
      break;
  }
  //do some transforms, then write new file
  // invert(data, bitmapHeaders.pixelOffsetArray, bitmapHeaders.fileSize);

  var unique = Date.now();
  fs.writeFile(__dirname + '/../images/' + unique + '.bmp', data);
};

function invert(data, bitmapHeaders) {
  var startOffset = bitmapHeaders.pixelOffsetArray;
  var endOffset = bitmapHeaders.fileSize;
  for (var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(255 - data.readUInt8(i), i); //B
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1); //G
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2); //R
    data.writeUInt8(data.readUInt8(i + 3), i + 3); //A
  }
};

function greenscale(data, bitmapHeaders) {
  var startOffset = bitmapHeaders.pixelOffsetArray;
  var endOffset = bitmapHeaders.fileSize;
  for (var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(0 * data.readUInt8(i), i);
    data.writeUInt8(data.readUInt8(i + 1), i + 1);
    data.writeUInt8(0 * data.readUInt8(i + 2), i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};
function redscale(data, bitmapHeaders) {
  var startOffset = bitmapHeaders.pixelOffsetArray;
  var endOffset = bitmapHeaders.fileSize;
  for (var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(0 * data.readUInt8(i), i);
    data.writeUInt8(0 * data.readUInt8(i + 1), i + 1);
    data.writeUInt8(data.readUInt8(i + 2), i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};
function bluescale(data, bitmapHeaders) {
  var startOffset = bitmapHeaders.pixelOffsetArray;
  var endOffset = bitmapHeaders.fileSize;
  for (var i = startOffset; i < endOffset; i += 4) {
    data.writeUInt8(data.readUInt8(i), i);
    data.writeUInt8(0 * data.readUInt8(i + 1), i + 1);
    data.writeUInt8(0 * data.readUInt8(i + 2), i + 2);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
};
