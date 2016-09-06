[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

# term-frequency
A simple [term frequency](https://en.wikipedia.org/wiki/Tf%E2%80%93idf#Term_frequency_2 ) library that takes in a document vector, and compiles the frequency calculation of your choosing.

First make the necessary `require-ments`

```javascript
var sw = require('stopword')
var tf = require('term-frequency');
var tv = require('term-vector');
```


You can then do:

```javascript
var vec = tv.getVector(
  sw.removeStopwords(
    'This is a really, really cool vector. I like this VeCTor'
      .toLowerCase()
      .split(/[ ,\.]+/)
  )
)
var freq = tf.getTermFrequency(vec);
// freq is now
// [ [ [ 'cool' ], 1 ], [ [ 'really' ], 2 ], [ [ 'vector' ], 2 ] ];
```

Or you can specify a TF scheme like so:

```javascript
var vec = tv.getVector('This is a really, really cool vector. I like this VeCTor');
var freq = tf.getTermFrequency(vec, {scheme: tf.logNormalization});
// freq is now:
// [
//   [ [ 'cool' ], 0.6931471805599453 ],
//   [ [ 'really' ], 1.0986122886681098 ],
//   [ [ 'vector' ], 1.0986122886681098 ]
// ]);
```

Currently supported schemes are

* `raw`
* `logNormalization`
* `doubleNormalization0point5`
* `selfString`
* `selfNumeric`

See the [Wikipedia page](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) for more info about term frequency calculation

You can also `weight` your calculations like so. A weight is a numeric
value that will be added to the calculated score.

```javascript
var freq = tf.getTermFrequency(vec, {
  scheme: tf.doubleNormalization0point5, 
  weight: 5
});
// freq is now
// [
//   [ [ 'cool' ], 5.7027325540540822 ],
//   [ [ 'really' ], 5.9581453659370776 ],
//   [ [ 'vector' ], 5.9581453659370776 ] 
// ]);
```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/term-frequency
[npm-version-image]: http://img.shields.io/npm/v/term-frequency.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/term-frequency.svg?style=flat

[travis-url]: http://travis-ci.org/fergiemcdowall/term-frequency
[travis-image]: http://img.shields.io/travis/fergiemcdowall/term-frequency.svg?style=flat
