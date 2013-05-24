/*global window */
(function (global) {
	'use strict';

	var ristretto = function (expression, message) {
		if (!expression) {
			throw {
				message: message || 'expected expression to be truthy'
			};
		}
	};

	ristretto.fail = function (message) {
		throw {
			message: message || 'explicit failure'
		};
	};

	ristretto.equal = function (actual, expected, message) {
		if (actual != expected) {
			throw {
				message: message || actual + ' does not equal ' + expected
			};
		}
	};

	ristretto.strictEqual = function (actual, expected, message) {
		if (actual !== expected) {
			throw {
				message: message || actual + ' does not equal ' + expected
			};
		}
	};

	ristretto.isTrue = function (value, message) {
		if (value !== true) {
			throw {
				message: message || value + ' is not true'
			};
		}
	};

	ristretto.isFalse = function (value, message) {
		if (value !== false) {
			throw {
				message: message || value + ' is not false`'
			};
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
