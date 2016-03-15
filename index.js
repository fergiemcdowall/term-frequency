var _ = require('lodash')

exports.getTermFrequency = function (docVector, options) {
  options = _.defaults(options || {}, {
    scheme: 'raw',
    weight: 0
  })
  if (options.scheme === 'logNormalization') {
    return docVector.map(function (item) {
      return [item[0], +options.weight + Math.log(1 + (+item[1]))]
    })
  } else if (options.scheme === 'doubleLogNormalization0.5') {
    var maxFreq = _(docVector).sortBy(function (n) {
      return n[1]
    }).last()[1]
    return docVector.map(function (item) {
      return [item[0], +options.weight + 0.5 + ((Math.log((0.5 + (+item[1])))) / maxFreq)]
    })
  } else if (options.scheme === 'raw') {
    return docVector.map(function (item) {
      return [item[0], +options.weight + item[1]]
    })
  }
}
