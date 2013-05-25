# Introduction

Ristretto is a browser friendly assertion library for Mocha.

The library exists mainly because Chai's `assert` API [doesn't work in older versions of Internet Explorer](https://github.com/chaijs/chai/issues/117).

## Using Ristretto

Ristretto is intended to be used as an AMD module in conjuction with an AMD loader like [RequireJS](http://www.requirejs.org/) or [curl](https://github.com/cujojs/curl), e.g.

    require(['ristretto'], function (assert) {
    	...

    	describe('something', function () {
    		it('should work', function () {
    			assert.isTrue(true);
    		});
    	});
    });

Whilst using modules is highly recommended, it is possible to use Ristretto without using AMD modules. If AMD support is not detected `ristretto` is attached to the `window` object, e.g.

    var assert = window.ristretto;

    ...

    assert.strictEqual(acutal, expected, actual + ' !== ' + expected);

## Package Manager Support

Ristretto is available as a [JamJS](http://jamjs.org/) [package](http://jamjs.org/packages/#/details/ristretto). To install Ristretto via Jam first install Jam:

    npm install -g jamjs

 Then install Ristretto in your project directory:

    jam install ristretto
