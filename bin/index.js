#!/usr/bin/env node
// launch from here per package.json
var headerData = require(__dirname + '/../lib/header_data');
var file = process.argv[3];
var transform = process.argv[2];

headerData.run(file, transform);
