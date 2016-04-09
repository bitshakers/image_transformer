//bonus point: command line interface that allows selecting of filters
//command_line.js
exports.tokenizeArgs = function (){
  var commLine = [];
  for (var i = 0; i < process.argv.length; i++){
    commLine[i] = process.argv[i];
  }
  return commLine;
};


exports.findArgPairs = function (tArgs){
  var commLine = tArgs;
  /*eslint-disable */ //because it seems eslint hates switches

  for (var j = 0; j < commLine.length; j++){
    switch(commLine[j]){
    case '-i':
    config.inputFile = commLine[j + 1].toString();
    //console.log(config.inputFile);
    break;
    case '-o':
    config.outputFile = commLine[j + 1].toString();
    //console.log(config.outputFile);
    break;
    case '-t':
    if(commLine[j + 1] && (tObj.hasOwnProperty(commLine[j + 1]))) {
      config.transformSelect = tObj[commLine[j + 1]];
      break;
    }
    config.transformSelect = tObj.blueify; // if -t exists, default to blueify
    break;
    case '-h':
    case '/?':
    case '-h':
    case '-?':
    case '-help':
    console.log('Options are -i for input, -o for output, and -t for transformation.');
    process.exit(0);
    break; //I'm just here so I don't get linted.
    default:
    break;
    }
  }
  /*eslint-enable */
  //if user has not used the -i and -o, try using the number 3 and 4 arguments
  if(!config.inputFile){
    config.inputFile = process.argv[2];
  }
  if(!config.outputFile){
    config.outputFile = process.argv[3];
  }
  return config;
};

exports.run = function(){
  var tArgs = exports.tokenizeArgs();
  config = exports.findArgPairs(tArgs);
