// reads off data from image header
const fs = require('fs');
const EE = require('events');
const bmpTransformer = require(__dirname + '/transforms');

var ee = new EE();
var headerData = module.exports = exports = {};

headerData.bitmapHeaders = {};
headerData.run = function(file, transform) {
  ee.on('file_read', (file) => {
    fs.readFile(file, (err, data) => {
      if (err) return console.log(err);
      ee.emit('headers', data);
    });
  });

  ee.on('headers', (data) => {
    headerData.bitmapHeaders.header = data.toString('ascii', 0, 2);
    headerData.bitmapHeaders.fileSize = data.readUInt32LE(2);
    headerData.bitmapHeaders.pixelOffsetArray = data.readUInt32LE(10);
    headerData.bitmapHeaders.bmpWidth = data.readUInt32LE(18);
    headerData.bitmapHeaders.bmpHeight = data.readUInt32LE(22);
    headerData.bitmapHeaders.bitPerPx = data.readUInt32LE(28);
    headerData.bitmapHeaders.numColors = data.readUInt32LE(46); // bonus- non-palette colors

    bmpTransformer(data, headerData.bitmapHeaders, transform);
  });
  if (process.argv[3]) {
    ee.emit('file_read', __dirname + '/../images/' + process.argv[3]);
    process.stdout.write('Check the \/images folder for your transformed image!');
  } else {
    ee.emit('file_read', __dirname + '/../images/pikachu.bmp');
    process.stdout.write('Check your images file for your new pikachu!');
  }
};
