// image transform bucket
'use strict';
const fs = require('fs');
const os = require('os');
const endianness = os.endianness();
var options = {};
options.palette = function(data) {
  if (data['readUInt32' + endianness](46) === 0) {
    return false;
  }
  return true;
};
options.startOffset = function(data) {
  if (options.palette(data)) {
    return 54;
  }
  return data['readUInt32' + endianness](10);
};

options.step = function(data) {
  if (options.palette(data)) {
    return 4;
  }
  return data['readUInt16' + endianness](28) / 8;
};
options.iterate = function(data) {
  if (options.palette(data)) {
    return 256;
  }
  return options.startOffset(data) - 2 +
    options.step(data) * (data['readUInt32' + endianness](18) * data['readUInt32' + endianness](22));
  };

const transforms = function(data, bitmapHeaders, transform) {
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
    default:
      greenscale(data, bitmapHeaders);
      break;
    case '-i':
    case 'invert':
      invert(data, bitmapHeaders);
      break;
    case '-G':
    case 'gray':
      grayscale(data, bitmapHeaders);
      break;
      case 'h':
      case 'H':
      case '?':
      case 'help':
      process.stdout.write(`From the command line \n
        node index flag file.bmp \n
        default image is pikachu.bmp \n \n
        flag options: \n \n
        -r OR red  : leave only the red channel \n
        -b OR blue : leave only the blue channel \n
        -g OR green: leave only the green channel \n
        -G OR gray : apply grayscale transform \n
        -i OR invert OR no selection (default) : inverts all color values`);
      break;
  }
  // do some transforms, then write new file

  var unique = Date.now();
  fs.writeFile(__dirname + '/../images/' + unique + '.bmp', data);
};

module.exports = exports = transforms;

function invert(data) {
  for (var i = options.startOffset(data); i < options.iterate(data); i += options.step(data)) {
    data.writeUInt8(255 - data.readUInt8(i), i); // B
    data.writeUInt8(255 - data.readUInt8(i + 1), i + 1); // G
    data.writeUInt8(255 - data.readUInt8(i + 2), i + 2); // R
    if (options.palette(data)) {
      data.writeUInt8(data.readUInt8(i + 3), i + 3); // A
    }
  }
}

function greenscale(data) {
  for (var i = options.startOffset(data); i < options.iterate(data); i += options.step(data)) {
    data.writeUInt8(0 * data.readUInt8(i), i);
    data.writeUInt8(data.readUInt8(i + 1), i + 1);
    data.writeUInt8(0 * data.readUInt8(i + 2), i + 2);
    if (options.palette(data)) {
      data.writeUInt8(data.readUInt8(i + 3), i + 3);
    }
  }
}

function redscale(data) {
  for (var i = options.startOffset(data); i < options.iterate(data); i += options.step(data)) {
    data.writeUInt8(0 * data.readUInt8(i), i);
    data.writeUInt8(0 * data.readUInt8(i + 1), i + 1);
    data.writeUInt8(data.readUInt8(i + 2), i + 2);
    if (options.palette(data)) {
      data.writeUInt8(data.readUInt8(i + 3), i + 3);
    }
  }
}

function bluescale(data) {
  for (var i = options.startOffset(data); i < options.iterate(data); i += options.step(data)) {
    data.writeUInt8(data.readUInt8(i), i);
    data.writeUInt8(0 * data.readUInt8(i + 1), i + 1);
    data.writeUInt8(0 * data.readUInt8(i + 2), i + 2);
    if (options.palette(data)) {
      data.writeUInt8(data.readUInt8(i + 3), i + 3);
    }
  }
}

function grayscale(data) {
  for (var i = options.startOffset(data); i < options.iterate(data); i += options.step(data)) {
    var greyScaleValueR = parseInt(data.readUInt8(i + 2), 10) * 0.3;
    var greyScaleValueG = parseInt(data.readUInt8(i + 1), 10) * 0.59;
    var greyScaleValueB = parseInt(data.readUInt8(i), 10) * 0.11;

    var greyScale = greyScaleValueR + greyScaleValueG + greyScaleValueB;

    data.writeUInt8(greyScale, i);
    data.writeUInt8(greyScale, i + 1);
    data.writeUInt8(greyScale, i + 2);
  }
}
