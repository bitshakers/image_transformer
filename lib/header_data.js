//reads off data from image header
const fs = require('fs');
const EE = require('events');

var ee = new EE();

ee.on('file_read', (file) => {
  fs.readFile(file, (err, data) => {
    if (err) return console.log(err);
    ee.emit('headers', data);
  });
});

ee.on('headers', (data) => {
  var bitmapHeaders = {};

  
});

ee.emit('file_read', __dirname + '/images/pikachu.bmp');
