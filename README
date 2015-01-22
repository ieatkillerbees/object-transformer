#object-transformer
Makes objectes more differenter.

Inspired by https://github.com/aol/transformers and my spirit animal https://twitter.com/jakeasmith.

Usage
```
var Transformer = require('transformer');

var myTransformer = new Transformer();
myTransformer.registerKey('foo', 'new_foo', function (value) { return value.toUpperCase(); });  // Change foo to new_foo and uppercase that biz

var transformed = myTransformer.transform({ foo: 'bar'});

console.log(transformed);

>> { new_foo: 'BAR' }
```

Life changing stuff, right there.
