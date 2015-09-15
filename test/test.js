//force travis build

var should = require('should');
var tv = require('term-vector');
var tf = require('../lib/term-frequency.js');

describe('Does term-frequency play nice?', function(){

  it('simple raw term frequency', function(){
    var vec = tv.getVector('This is a really, really cool vector. I like this VeCTor');
    var freq = tf.getTermFrequency(vec);
    freq.should.eql([ [ 'cool', 1 ], [ 'really', 2 ], [ 'vector', 2 ] ]);
  })

  it('term frequency using logNormalization', function(){
    var vec = tv.getVector('This is a really, really cool vector. I like this VeCTor');
    var freq = tf.getTermFrequency(vec, {scheme: 'logNormalization'});
    freq.should.eql([
      [ 'cool', 0.6931471805599453 ],
      [ 'really', 1.0986122886681098 ],
      [ 'vector', 1.0986122886681098 ]
    ]);
  })

  it('term frequency using double log normalization 0.5', function(){
    var vec = tv.getVector('This is a really, really cool vector. I like this VeCTor');
    var freq = tf.getTermFrequency(vec, {scheme: 'doubleLogNormalization0.5'});
    freq.should.eql([
      [ 'cool', 0.7027325540540822 ],
      [ 'really', 0.9581453659370776 ],
      [ 'vector', 0.9581453659370776 ] 
    ]);
  })


})
