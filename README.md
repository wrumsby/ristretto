# Introduction

Ristretto is a browser friendly assertion library for [Mocha](http://visionmedia.github.io/mocha/).

The library exists mainly because Chai's `assert` API [doesn't work in older versions of Internet Explorer](https://github.com/chaijs/chai/issues/117). If you want to use an `assert`-style assertion API with Mocha and you want to run your tests in IE 8 or older then Ristretto is for you.

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

Ristretto is also available as a [Bower](http://bower.io/) package. To install Ristretto via Bower first install Bower:

	npm install -g bower

Then install Ristretto in your project directory:

	bower install git@github.com:wrumsby/ristretto.git
