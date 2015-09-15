var bytewise = require('bytewise');
var _ = require('lodash');

exports.getTermFrequency = function(docVector, options) {

  var defaults = {
    scheme: 'raw',
    numericEncoding: 'bytewise'
  };

  options = _.defaults(options || {}, defaults);

  //verify options

  if (options.scheme == 'logNormalization') {
    return docVector.map(function(item) {
      return [item[0], Math.log(1 + (+item[1]))];
    });
  }
  else if (options.scheme == 'doubleLogNormalization') {
    
  }
  else if (options.scheme == 'doubleLogNormalization0.5') {
  // var highestValue = _(docVector).sortBy(function(n) {
  //   return n[1];
  // }).last()[1];
  // console.log(highestValue)
    
  }
  else if (options.scheme == 'doubleLogNormalizationK') {
    
  }
  else {
    return docVector;
  }

//  return freq;
}


var encode = function(vec){
  vec = vec.map(function(item) {
    return item;
  })
};
