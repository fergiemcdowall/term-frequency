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
    console.log(vec)
    freq.should.eql([ [ 'cool', 1 ], [ 'really', 2 ], [ 'vector', 2 ] ]);
  })


})
