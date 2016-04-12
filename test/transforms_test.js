'use strict';
const fs = require('fs');
require(__dirname + '/../lib/transforms.js');
var headerData = require(__dirname + '/../lib/header_data.js');
const chai = require('chai');
const expect = chai.expect;

describe('image conversion to buffer, new file creation', function() {
  var file = __dirname + '/../images/pikachu.bmp';
  var transform = 'red';
  var oldCount;
  var newCount;
  before(function(done) {
    var oldlist = fs.readdirSync(__dirname + '/../images');
    oldCount = oldlist.length;
    done();
  });

  it('should show a new buffer was created', function() {
    headerData.run(file, transform, (data) => {
      expect(Buffer.isBuffer(data)).to.eql(true);
    });
  });
  it('should show we have a new file made', function() {
    var newList = fs.readdirSync(__dirname + '/../images');
    newCount = newList.length;
    expect(newCount).to.eql(oldCount + 1);
  });
});

describe('buffer conversion to object', function() {
  it('will convert buffer header data into a Javascript Object', function() {
    expect(typeof headerData.bitmapHeaders === 'object').to.eql(true);
  });
});
