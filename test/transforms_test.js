'use strict';
var bitmap = require(__dirname + '/../lib/transforms.js');
var headerOutput = require(__dirname + '/../lib/header_data.js');
var expect = require('chai').expect;


describe('image conversion to buffer', function () => {
  it('should show a new buffer was created', function () => {
    expect(Buffer.isBuffer(headerOutput)).to.eql(true);
  });
});
// describe('bitmap.darken unit', function(){
//   it('should return a buffer', function(){
//     // if config exists, use it, otherwise set to null
//     var config = config ? config : {};
//     config.startPixel = 0;
//     config.bpp = 32;
//     var testbuffer = new Buffer('22222222', 'hex');
//     var resultbuffer = new Buffer('11111111', 'hex');
//     expect(bitmap.darken.call(config, testbuffer)).to.eql(resultbuffer);
//   });
// });


describe('buffer conversion to object', function () => {
  it('will convert buffer header data into a Javascript Object', function () => {
    expect(typeof headerOutput.bitmapHeaders === 'object').to.eql(true);
  });
});

// test for transforming a non-pallette bitmap
describe('a non-pallette bitmap conversion', function() => {
  it('transform a non-pallette', function(){
    var flipbuf = new Buffer('FFFFFF00', 'hex');
    var highbuffer = new Buffer('00000000', 'hex');
    var config = config ? config : {};
    config.startPixel = 0;
    config.bpp = 32;
    expect(bitmap.flip.call(config, highbuffer)).to.eql(flipbuf);
  });
});

describe('writing the transform to a new file', function () => {
  var oldCount;
  var newCount;
  before(function(done) {
    var oldlist = fs.readdirSync(__dirname + '/../images');
    oldCount = oldlist.length;
    done();
  });
  it('should show we have a new file made', function () => {
    var newList = fs.readdirSync(__dirname + '/../images');
    newCount = newList.length;
    expect(newCount).to.eql(oldCount + 1);
  });
});
//2 bonus points, bonus test using CLI, plus transform select feature
it('will run from a command line interface that can select the transform')



//bonus test, running a transform on Tyler's pallete bitmap
describe('bitmap.flip using a pallette bitmap', function() => {
  it('will run a color transform on a pallette bitmap', function() => {
    expect();
  });
});

//bonus test, running a transform on a non-bm image
describe('bitmap.flip using a non-bm image', function() => {
  it('will run a color transform on a non-bm image', function() => {
    expect();
  });
});





it ('will run from a command line interface')//bonus



  it ('can handle various sized bitmaps')
