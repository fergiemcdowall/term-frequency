# term-frequency
A simple [term frequency](https://en.wikipedia.org/wiki/Tf%E2%80%93idf#Term_frequency_2 ) library.

You could do:

```javascript
var freq = tf.getTermFrequency(vec);
// freq is now
// [ [ 'cool', 1 ], [ 'really', 2 ], [ 'vector', 2 ] ];
```

Or you can specify a TF scheme like so:

```javascript
var freq = tf.getTermFrequency(vec, {scheme: 'logNormalization'});
// freq is now:
// [
//   [ 'cool', 0.6931471805599453 ],
//   [ 'really', 1.0986122886681098 ],
//   [ 'vector', 1.0986122886681098 ]
// ]);
```

Currently supported schemes are `raw`, `logNormalization`, and
`doubleLogNormalization0.5`. See the [Wikipedia page](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) for more info
