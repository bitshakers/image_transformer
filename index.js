// launch from here per package.json
var headerData = require(__dirname + '/lib/header_data');
var file = process.argv[2];
var transform = process.argv[3];

headerData.run(file, transform);
