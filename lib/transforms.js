//image transform bucket
'use strict'
const fs = require('fs');
const os = require('os');
const endianness = os.endianness();
var startOffset;
var endOffset;
var pixel;

function makeNew(data){
  var unique = Date.now();
  fs.writeFile(__dirname + '/../images/' + unique + '.bmp', data);
};



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

switch(process.argv[3]){
  case '-r':
  case 'red': redscale();
  break;
  case '-b':
  case 'blue': bluescale();
  break;
  case '-g':
  case 'green': greenscale();
  break;
  case '-i':
  case 'invert': invert();
  break;
  default: invert();
  break;
}
console.log(process.argv[3]);
function invert(data, startOffset, endOffset) {
  for (var i = startOffset; i < endOffset; i += pixel) {
    data.writeUInt8(255 - data.readUInt8(i), i); //B
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1); //R
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2); //G
    data.writeUInt8(data.readUInt8(i + 3), i + 3); //A
  }
  makeNew(data);
};

function redscale(data, startOffset, endOffset) {
  for (var i = startOffset; i < endOffset; i += pixel) {
    data.writeUInt8(0);
    data.writeUInt8(data.readUInt8(i + 1), i + 1);
    data.writeUInt8(0);
    data.writeUInt8(data.readUInt8(i + 3), i + 3);
  }
  makeNew(data);
};
