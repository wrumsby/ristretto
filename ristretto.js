/*global window */
(function (global) {
	'use strict';

	function AssertionError(message) {
		this.name = 'AssertionError';
		this.message = message || '';
	}

	AssertionError.prototype = new Error();
	AssertionError.prototype.constructor = AssertionError;


	var ristretto = function (expression, message) {
		if (!expression) {
			throw new AssertionError(message || 'expected expression to be truthy');
		}
	};

	ristretto.fail = function (message) {
		throw {
			message: message || 'explicit failure'
		};
	};

	ristretto.equal = function (actual, expected, message) {
		if (actual != expected) {
			throw new AssertionError(message || actual + ' does not equal ' + expected);
		}
	};

	ristretto.strictEqual = function (actual, expected, message) {
		if (actual !== expected) {
			throw new AssertionError(message || actual + ' does not equal ' + expected);
		}
	};

	ristretto.isTrue = function (value, message) {
		if (value !== true) {
			throw new AssertionError(message || value + ' is not true');
		}
	};

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
