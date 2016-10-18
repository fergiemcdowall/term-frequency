exports.doubleNormalization0point5 = 'doubleNormalization0point5'
exports.logNormalization = 'logNormalization'
exports.raw = 'raw'
exports.selfString = 'selfString'
exports.selfNumeric = 'selfNumeric'

exports.getTermFrequency = function (docVector, options) {
  options = Object.assign({}, {
    scheme: 'raw',
    weight: 0
  }, options)
  // handle empty docVector
  if (!docVector) {
    return []
  }
  if (docVector.length === 0) {
    return []
  }
  if (options.scheme === 'logNormalization') {
    return docVector.map(function (item) {
      return [item[0], +options.weight + Math.log(1 + (+item[1]))]
    })
  } else if (options.scheme === 'doubleNormalization0point5') {
    var maxFreq = docVector.sort(function (a, b) {
      return b[1] - a[1]
    })[0][1]
    return docVector.map(function (item) {
      return [item[0], +options.weight + 0.5 + ((0.5 * +item[1]) / (maxFreq))]
    })
  } else if (options.scheme === 'raw') {
    return docVector.map(function (item) {
      return [item[0], +options.weight + item[1]]
    })
  } else if (options.scheme === 'selfString') {
    return docVector.map(function (item) {
      return [item[0], item[0][0] + '']
    })
  } else if (options.scheme === 'selfNumeric') {
    return docVector.map(function (item) {
      var value = item[0][0]
      // try to cast to number
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        value = +options.weight + +item[0][0]
      }
      return [item[0], value]
    })
  }
}
