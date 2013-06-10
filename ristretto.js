/*global window */
(function (global) {
	'use strict';

	function AssertionError(message) {
		this.name = 'AssertionError';
		this.message = message || '';
	}

	AssertionError.prototype = new Error();
	AssertionError.prototype.constructor = AssertionError;

	var deepEqual = (function () {
		var _toString = Object.prototype.toString;
		var hasOwn = Object.prototype.hasOwnProperty;

		var getProto = Object.getPrototypeOf || function (a) {
			/*jshint proto: true, camelcase: false, eqnull: true */
			// es5-shim has a decent shim for this
			if (a == null) {
				throw new TypeError('getPrototypeOf: '+ a + ' is not an Object');
			}

			return ('__proto__' in a) ? a.__proto__ : Object.prototype;
		};

		function type (a) {
			/*jshint eqnull: true */
			return a == null ? String(a) :
			_toString.call(a).slice(8, -1);
		}

		function isArray (a) {
			return type(a) === 'Array';
		}

		function isObject (a) {
			return type(a) === 'Object';
		}

		function isDate (a) {
			return type(a) === 'Date';
		}

		function arraysEqual (a, b) {
			// if arrays a and b have the same length
			// and all indexes a[i] `deepEqual` b[i] then
			/// a `deepEqual` b
			if (a.length !== b.length) {
				return false;
			}

			var i = a.length;

			while (i--) {
				if (!deepEqual(a[i], b[i])) {
					return false;
				}
			}

			return true;
		}

		function objectsEqual (a, b) {
			// iff objects a and b have the same prototype
			// and a[k] `deepEqual` b[k] for all
			// keys in a and b, then a `deepEqual` b
			if (getProto(a) !== getProto(b)) {
				return false;
			}

			var k;

			for (k in a) {
				if (hasOwn.call(a, k)) {
					if (!hasOwn.call(b, k) || !deepEqual(a[k], b[k])) {
						return false;
					}
				}
			}

			for (k in b) {
				if (hasOwn.call(b, k)) {
					// we should have checked that they are deepEqual
					// already, so checking for presence is enough
					if (!hasOwn.call(a, k)) {
						return false;
					}
				}
			}

			return true;
		}

		function datesEqual (a, b) {
			return a >= b && a <= b;
		}

		function deepEqual (a, b) {
			return a === b ||
				(isArray(a) && isArray(b) && arraysEqual(a, b)) ||
				(isObject(a) && isObject(b) && objectsEqual(a, b)) ||
				(isDate(a) && isDate(b) && datesEqual(a, b));
		}

		return deepEqual;
	} ());

	/**
	 * Ristretto is a lightweight assertion library for Mocha
	 * that is typically used as an AMD module, but can also be used without AMD.
	 *
	 * @module ristretto
	 * @example
	 *     // As an AMD module
	 *     require(['ristretto'], function (assert) {
	 *         ...
	 *         assert(a === b);
	 *         assert.strictEqual(a, b);
	 *     });
	 *
	 *     // Without AMD
	 *     var assert = ristretto;
	 *     ...
	 *     assert(a === b);
	 *     assert.strictEqual(a, b);
	 */

	/**
	 * Lightweight assertion library for Mocha.
	 *
	 * @class ristretto
	 * @static
	 */
	var ristretto = function (expression, message) {
		if (!expression) {
			throw new AssertionError(message || 'expected expression to be truthy');
		}
	};

	/**
	 * Assert that `value` is truthy.
	 *
	 * @method truthy
	 * @param value Value to test
	 * @param {String} [message] Failure message
	 */
	ristretto.truthy = function (value, message) {
		if (!value) {
			throw new AssertionError(message || value + ' is not truthy');
		}
	};

	/**
	 * Assert that `value` is falsey.
	 *
	 * @method falsey
	 * @param value Value to test
	 * @param {String} [message] Failure message
	 */
	ristretto.falsey = function (value, message) {
		if (!value) {
			return;
		}

		throw new AssertionError(message || value + ' is not falsey');
	},

	/**
	 * Explicitly fail.
	 *
	 * Unlike Chai this method isn't designed to have the same signature as
	 * node.js' `assert`.
	 *
	 * @method fail
	 * @param {String} [message] Failure message
	 */
	ristretto.fail = function (message) {
		throw new AssertionError(message || 'explicit failure');
	};

	/**
	 * Asserts non-strict equality of `actual` and `expected`.
	 *
	 * @method equal
	 * @param actual Actual value
	 * @param expected Expected value
	 * @param {String} [message] Failure message
	 */
	ristretto.equal = function (actual, expected, message) {
		if (actual != expected) {
			throw new AssertionError(message || actual + ' does not equal ' + expected);
		}
	};

	/**
	 * Asserts that `actual` and `expected` are not equal.
	 *
	 * @method notEqual
	 * @param actual Actual value
	 * @param expected Expected value
	 * @param {String} [message] Failure message
	 */
	ristretto.notEqual = function (actual, expected, message) {
		if (actual == expected) {
			throw new AssertionError(message || actual + ' equals ' + expected);
		}
	};

	/**
	 * Assert strict equality of `actual` and `expected`.
	 *
	 * @method strictEqual
	 * @param actual Actual value
	 * @param expected Expected value
	 * @param {String} [message] Failure message
	 */
	ristretto.strictEqual = function (actual, expected, message) {
		if (actual !== expected) {
			throw new AssertionError(message || actual + ' does not equal ' + expected);
		}
	};

	/**
	 * Assert strict inequality of `actual` and `expected`.
	 *
	 * @method strictNotEqual
	 * @param actual Actual value
	 * @param expected Expected value
	 * @param {String} [message] Failure message
	 */
	ristretto.strictNotEqual = function (actual, expected, message) {
		if (actual !== expected) {
			return;
		}

		throw new AssertionError(message || actual + ' equals ' + expected);
	},

	/**
	 * Asserts that `value` is `true`.
	 *
	 * @method isTrue
	 * @param value Value to test
	 * @param {String} [message] Failure message
	 */
	ristretto.isTrue = function (value, message) {
		if (value !== true) {
			throw new AssertionError(message || value + ' is not true');
		}
	};

	/**
	 * Asserts that `value` is `false`.
	 *
	 * @method isFalse
	 * @param value Value to test
	 * @param {String} [message] Failure message
	 */
	ristretto.isFalse = function (value, message) {
		if (value !== false) {
			throw new AssertionError(message || value + ' is not false`');
		}
	};

	/**
	 * Asserts that `actual` and `expected` are deeply-equivalent,
	 * either both values are primitive and strictly equal or they
	 * are both identical arrays or identical objects
	 *
	 * @method deepEqual
	 * @param actual
	 * @param expected
	 * @param {String} [message] Failure message
	 */
	ristretto.deepEqual = function (actual, expected, message) {
		if (!deepEqual(actual, expected)) {
			throw new AssertionError(message || actual + ' is not deeply equal to ' + expected);
		}
	};

	/**
	 * Asserts that `actual` and `expected` are NOT deeply-equivalent.
	 *
	 * @method deepNotEqual
	 * @param actual
	 * @param expected
	 * @param {String} [message] Failure message
	 */
	ristretto.deepNotEqual = function (actual, expected, message) {
		if (deepEqual(actual, expected)) {
			throw new AssertionError(message || actual + ' is deeply equal to ' + expected);
		}
	};

	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return ristretto;
		});
	} else {
		global.ristretto = ristretto;
	}
}(window));
