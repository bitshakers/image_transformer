//launch from here per package.json
var header_data = require(__dirname + '/lib/header_data');
var file = process.argv[2];
var transform = process.argv[3];

header_data.run(file, transform);
