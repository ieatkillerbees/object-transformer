var assert = require('assert');
var Transformer = require('../lib/transformer');

describe('Transformer', function () {
    describe('registerKey', function () {
        it('should create a transformer entry with newKey = old key when given two arguments', function () {
            var transformer = new Transformer();
            var callable    = function (v) { return v.toUpperCase(); };
            transformer.registerKey('foo', callable);
            assert.equal(transformer._transformers['foo'].key, 'foo');
            assert.equal(transformer._transformers['foo'].transformer, callable);
        });

        it('should create a transformer entry with a newKey and transformer when given three arguments', function () {
            var transformer = new Transformer();
            var callable    = function (v) { return v.toUpperCase(); };
            transformer.registerKey('foo', 'new_foo', callable);
            assert.equal(transformer._transformers['foo'].key, 'new_foo');
            assert.equal(transformer._transformers['foo'].transformer, callable);
        });

        it('should create a null transformer with just a new key when given no callable', function () {
            var transformer = new Transformer();
            transformer.registerKey('foo', 'new_foo');
            assert.equal(transformer._transformers['foo'].key, 'new_foo');
            assert.equal(transformer._transformers['foo'].transformer, null);
        });
    });

    describe('transform', function () {
        it('should return the k/v pair unchanged when no transformer registered', function () {
            var transformer = new Transformer();
            var object = { foo: 'bar' };
            var transformed = transformer.transform(object);

            assert.equal(transformed.foo, 'bar');
        });

        it('should change just the key name when no transformer is registered', function () {
            var transformer = new Transformer();
            var object = { foo: 'bar' };

            transformer.registerKey('foo', 'new_foo');

            var transformed = transformer.transform(object);

            assert.equal(transformed.new_foo, 'bar');
            assert(!transformed.hasOwnProperty('foo'));
        });

        it('should keep the keyname and change the value when new key and transformer are given', function () {
            var transformer = new Transformer();
            var object = { foo: 'bar' };

            transformer.registerKey('foo', function (v) { return v.toUpperCase(); });

            var transformed = transformer.transform(object);

            assert.equal(transformed.foo, 'BAR');
        });

        it('should change the key and change the value when new key and transformer are given', function () {
            var transformer = new Transformer();
            var object = { foo: 'bar' };

            transformer.registerKey('foo', 'new_foo', function (v) { return v.toUpperCase(); });

            var transformed = transformer.transform(object);

            assert.equal(transformed.new_foo, 'BAR');
            assert(!transformed.hasOwnProperty('foo'));
        });
    });
});
