//reads off data from image header
const fs = require('fs');
const EE = require('events');
const bmpTransformer = require(__dirname + '/transforms');

var ee = new EE();
var header_data = module.exports = exports = {};

header_data.bitmapHeaders = {};
header_data.run = function(file, transform) {
  ee.on('file_read', (file) => {
    fs.readFile(file, (err, data) => {
      if (err) return console.log(err);
      ee.emit('headers', data);
    });
  });

  ee.on('headers', (data) => {
    header_data.bitmapHeaders.header = data.toString('ascii', 0, 2);
    header_data.bitmapHeaders.fileSize = data.readUInt32LE(2);
    header_data.bitmapHeaders.pixelOffsetArray = data.readUInt32LE(10);
    header_data.bitmapHeaders.bmpWidth = data.readUInt32LE(18);
    header_data.bitmapHeaders.bmpHeight = data.readUInt32LE(22);
    header_data.bitmapHeaders.bitPerPx = data.readUInt32LE(28);
    header_data.bitmapHeaders.numColors = data.readUInt32LE(46); //bonus- non-palette colors
    bmpTransformer(data, header_data.bitmapHeaders, transform);
  });

  ee.emit('file_read', __dirname + '/../images/' + process.argv[2]);
};

//LE BGRA
//BE ARGB
