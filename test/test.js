/* global describe */
/* global it */

var should = require('should')
var tv = require('term-vector')
var sw = require('stopword')
var tf = require('../')

describe('Does term-frequency play nice?', function () {
  it('should handle empty doc vector', function () {
    var freq = tf.getTermFrequency([])
    freq.should.eql([])
  })

  it('should handle null doc vector', function () {
    var freq = tf.getTermFrequency(null)
    freq.should.eql([])
  })

  it('should handle undefined doc vector', function () {
    var freq = tf.getTermFrequency(undefined)
    freq.should.eql([])
  })

  it('simple raw term frequency', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        'This is a really, really cool vector. I like this VeCTor'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    should.exist(vec)
    var freq = tf.getTermFrequency(vec)
    freq.should.eql([
      [ [ 'cool' ], 1 ],
      [ [ 'really' ], 2 ],
      [ [ 'vector' ], 2 ]
    ])
  })

  it('term frequency using logNormalization', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        'This is a really, really cool vector. I like this VeCTor'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {scheme: tf.logNormalization})
    freq.should.eql([
      [ [ 'cool' ], 0.6931471805599453 ],
      [ [ 'really' ], 1.0986122886681098 ],
      [ [ 'vector' ], 1.0986122886681098 ]
    ])
  })

  it('term frequency using double log normalization 0.5', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        'This is a really, really cool vector. I like this VeCTor'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {scheme: tf.doubleLogNormalization0point5})
    freq.should.eql([
      [ [ 'cool' ], 0.9054651081081644 ],
      [ [ 'really' ], 1.416290731874155 ],
      [ [ 'vector' ], 1.416290731874155 ]
    ])
  })

  it('simple raw term frequency plus weighting', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        'This is a really, really cool vector. I like this VeCTor'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {weight: 2})
    freq.should.eql([
      [ [ 'cool' ], 3 ],
      [ [ 'really' ], 4 ],
      [ [ 'vector' ], 4 ]
    ])
  })

  it('term frequency using double log normalization 0.5', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        'This is a really, really cool vector. I like this VeCTor'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {
      scheme: tf.doubleLogNormalization0point5,
      weight: 5
    })
    freq.should.eql([
      [ [ 'cool' ], 5.905465108108165 ],
      [ [ 'really' ], 6.416290731874155 ],
      [ [ 'vector' ], 6.416290731874155 ]
    ])
  })

  it('term frequency using selfString', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        'This is a really, really cool vector. I like this VeCTor'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {
      scheme: tf.selfString,
      weight: 5
    })
    freq.should.eql([
      [ [ 'cool' ], 'cool' ],
      [ [ 'really' ], 'really' ],
      [ [ 'vector' ], 'vector' ]
    ])
  })

  it('term frequency using selfString', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        'This is a really, really cool vector. I like this VeCTor'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {
      scheme: tf.selfString,
      weight: 5,
      format: tf.obj
    })
    freq.should.eql([
      [ [ 'cool' ], 'cool' ],
      [ [ 'really' ], 'really' ],
      [ [ 'vector' ], 'vector' ]
    ])
  })

  it('term frequency using selfNumeric', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        '200 20 88 822 934532 1 0 48738 29'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {
      scheme: tf.selfNumeric
    })
    freq.should.eql(
      [ [ [ '0' ], 0 ],
        [ [ '1' ], 1 ],
        [ [ '20' ], 20 ],
        [ [ '200' ], 200 ],
        [ [ '29' ], 29 ],
        [ [ '48738' ], 48738 ],
        [ [ '822' ], 822 ],
        [ [ '88' ], 88 ],
        [ [ '934532' ], 934532 ] ])
  })

  it('term frequency using selfNumeric, handle string', function () {
    var vec = tv.getVector(
      sw.removeStopwords(
        '200 20 88 822 bollocks 934532 1 0 48738 29'
          .toLowerCase()
          .split(/[ ,\.]+/)
      )
    )
    var freq = tf.getTermFrequency(vec, {
      scheme: tf.selfNumeric
    })
    freq.should.eql(
      [ [ [ '0' ], 0 ],
        [ [ '1' ], 1 ],
        [ [ '20' ], 20 ],
        [ [ '200' ], 200 ],
        [ [ '29' ], 29 ],
        [ [ '48738' ], 48738 ],
        [ [ '822' ], 822 ],
        [ [ '88' ], 88 ],
        [ [ '934532' ], 934532 ],
        [ [ 'bollocks' ], NaN ] ])
  })

  it('does proper log normalisation', function () {
    var vec = tv.getVector(
      'fruit salad fruit big big big fruit fruit'.split(' ')
    )
    should.exist(vec)
    var freq = tf.getTermFrequency(vec, {scheme: tf.doubleLogNormalization0point5})
    freq.should.eql([
      [ [ 'big' ], 0.9175876561651226 ],
      [ [ 'fruit' ], 1.001359132258758 ],
      [ [ 'salad' ], 0.6351550360360548 ]
    ])
  })
})
