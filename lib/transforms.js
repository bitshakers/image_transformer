//image transform bucket
'use strict'
const fs = require('fs');
const os = require('os');
const endianness = os.endianness();
var startOffset;
var endOffset;
var pixel;

var options = {};
options.startOffset = 54;
options.palette = function(data) {
  if (data['readUInt32' + endianness](46) === 0) {
    return false;
  }
  return true;
};
options.step = function(data) {
  if (options.palette(data)) {
    return 4;
  }
  return 3;
};
options.iterate = function(data) {
  if (options.palette(data)) {
    return 256;
  }
  return options.startOffset - 2 + options.step(data) * (data['readUInt32' + endianness](18) * data['readUInt32' + endianness](22));
};

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

function invert(data) {
  for (var i = options.startOffset; i < options.iterate(data); i += options.step(data)) {
    // console.log(options.startOffset);
    // console.log(i);
    // console.log(options.iterate(data));
    // console.log(options.step(data));
    data.writeUInt8(255 - data.readUInt8(i), i); //B
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1); //G
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2);
    if (options.palette(data)) { //R
      data.writeUInt8(data.readUInt8(i + 3), i + 3); //A
    }
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
