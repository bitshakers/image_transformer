//reads off data from image header
const fs = require('fs');
const os = require('os');
const EE = require('events');
const transforms = require(__dirname + '/transforms');

var ee = new EE();
var header_data = module.exports = exports = {};

header_data.bitmapHeaders = {};
header_data.run = function() {
  ee.on('file_read', (file) => {
    fs.readFile(file, (err, data) => {
      if (err) return console.log(err);
      ee.emit('headers', data);
    });
  });

  ee.on('headers', (data) => {
    bitmapHeaders.header = data.toString('ascii', 0, 2);
    bitmapHeaders.fileSize = data.readUInt32LE(2);
    bitmapHeaders.pixelOffsetArray = data.readUInt32LE(10);
    bitmapHeaders.numColors = data.readUInt32LE(46);

    transforms(data, bitmapHeaders);
    return data;
  });

  ee.emit('file_read', __dirname + '/../images/pikachu.bmp');
};
