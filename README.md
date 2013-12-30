# Introduction

Ristretto is a browser friendly assertion library for [Mocha](http://visionmedia.github.io/mocha/).

The library exists mainly because Chai's `assert` API [doesn't work in older versions of Internet Explorer](https://github.com/chaijs/chai/issues/117). If you want to use an `assert`-style assertion API with Mocha and you want to run your tests in IE 8 or older then Ristretto is for you.

# Using Ristretto

Ristretto is intended to be used as an AMD module in conjuction with an AMD loader like [RequireJS](http://www.requirejs.org/) or [curl](https://github.com/cujojs/curl), e.g.

    require(['ristretto', 'something'], function (assert, something) {
    	describe('something', function () {
    		describe('method', function () {
	    		it('should work', function () {
	    			var actual = something.method();

	    			assert.isTrue(actual);
	    		});
    		});
    	});
    });

Whilst using modules is highly recommended, it is possible to use Ristretto without using AMD modules. If AMD support is not detected `ristretto` is attached to the `window` object, e.g.

	(function () {
	    var assert = window.ristretto;

    	describe('something', function () {
    		describe('method', function () {
	    		it('should work', function () {
	    			var actual = something.method();

	    			assert.isTrue(actual);
	    		});
    		});
    	});
	} ());

# Package Manager Support

Ristretto is available as a [JamJS](http://jamjs.org/) [package](http://jamjs.org/packages/#/details/ristretto). To install Ristretto via Jam first install Jam:

    npm install -g jamjs

Then install Ristretto in your project directory:

    jam install ristretto

Ristretto is also available as a [Bower](http://bower.io/) package. To install Ristretto via Bower first install Bower:

	npm install -g bower

Then install Ristretto in your project directory:

	bower install ristretto

# API

## Testing Truthiness

    require(['ristretto'], function (assert) {
    	describe('something', function () {
    		it('should be truthy', function () {
    			var actual = 1;

    			assert.isTruthy(actual);
    			// you could also express this as
    			assert.truthy(actual);
    			// or
    			assert(actual);
    		});

    		it('should be falsey', function () {
    			var actual = 0;

    			assert.isFalsey(actual);
    			// you could also express this as
    			assert.falsey(actual);
    			// or
    			assert(!actual);
    		});
    	});
    });

# Equality

    require(['ristretto', 'something'], function (assert, something) {
    	describe('something', function () {
    		describe('method', function () {
	    		it('should equal 1', function () {
	    			var expected = 1,
	    				actual = something.method();

	    			assert.strictEqual(actual, expected);
	    			// you could also express this as
	    			assert(actual === expected);
	    			// or, although things can be equal that aren't strictEqual
	    			assert.equal(actual, expected);
	    		});

	    		it('should not equal 2', function () {
	    			var expected = 2,
	    				actual = something.method();

	    			assert.strictNotEqual(actual, expected);
	    			// you could also express this as
	    			assert(actual !== expected);
	    			// or, although things can be strictNotEqual that aren't notEqual
	    			assert.notEqual(actual, expected);
	    		});
    		});
    	});
    });

# Deep Equality

	requre(['ristretto'], function (assert) {
		describe('something', function () {
			var actual = [1, 2, 3],
				expected = [1, 2, 3];

			assert.deepEqual(actual, expected);
		});
	});

# Failure

    require(['ristretto', 'testable'], function (assert, Testable) {
    	describe('testable', function () {
    		describe('method', function () {
	    		it('should not fire an "invoked" event', function () {
					var testable = new Testable();

					testable.on('invoked', function () {
						assert.fail('"invoked" event should not be fired');
					});

					testable.method();
				});
    		});
    	});
    });

