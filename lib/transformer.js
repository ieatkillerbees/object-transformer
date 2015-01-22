/**
 * Transformer object
 *
 * @constructor
 */
function Transformer() {
    this._transformers = {};
}

/**
 * Sets a transformer on a key
 *
 * @param key
 * @param newKey
 * @param transformer
 */
Transformer.prototype.registerKey = function registerKey(key, newKey, transformer) {
    if (typeof newKey === 'function') {
        transformer = newKey;
        newKey = key;
    }

    if (typeof transformer !== 'function') {
        transformer = null;
    }

    this._transformers[key] = { key: newKey, transformer: transformer };
};

/**
 * Transforms an object
 *
 * @param object
 * @returns {{}}
 */
Transformer.prototype.transform = function transform(object) {
    var transformed = {};

    for (var k in object) {
        if (!object.hasOwnProperty(k)) {
            continue;
        }

        if (!this._transformers.hasOwnProperty(k)) {
            transformed[k] = object[k];
            continue;
        }

        if (typeof this._transformers[k].transformer === 'function') {
            transformed[this._transformers[k].key] = this._transformers[k].transformer(object[k]);
            continue;
        }

        transformed[this._transformers[k].key] = object[k];
    }

    return transformed;
};

module.exports = Transformer;
