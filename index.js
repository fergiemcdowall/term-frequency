var _defaults = require('lodash.defaults')

exports.getTermFrequency = function (docVector, options) {
  options = _defaults(options || {}, {
    scheme: 'raw',
    weight: 0
  })
  //handle empty docVector
  if (!docVector) {
    return []
  }
  if (docVector.length == 0) {
    return []
  }
  if (options.scheme === 'logNormalization') {
    return docVector.map(function (item) {
      return [item[0], +options.weight + Math.log(1 + (+item[1]))]
    })
  } else if (options.scheme === 'doubleLogNormalization0.5') {
    var maxFreq = docVector.sort(function (a, b) {
      a[1] - b[1]
    })[docVector.length - 1][1]
    return docVector.map(function (item) {
      return [item[0], +options.weight + 0.5 + ((Math.log((0.5 + (+item[1])))) / maxFreq)]
    })
  } else if (options.scheme === 'raw') {
    return docVector.map(function (item) {
      return [item[0], +options.weight + item[1]]
    })
  }
}
