/*global window */
(function (global) {
	'use strict';

	function AssertionError(message) {
		this.name = 'AssertionError';
		this.message = message || '';
	}

	AssertionError.prototype = new Error();
	AssertionError.prototype.constructor = AssertionError;

	/**
	 * Ristretto is a lightweight assertion library for Mocha
	 * that is typically used as an AMD module.
	 *
	 * Ristretto can also be used without AMD.
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

	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return ristretto;
		});
	} else {
		global.ristretto = ristretto;
	}
}(window));
