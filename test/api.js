define(['chai-amd', 'ristretto'], function (chai, ristretto) {
	'use strict';

	var assert = chai.assert;

	describe('ristretto', function () {
		it('should fail if the expression is falsy', function () {
			try {
				ristretto(false);
			} catch (e) {
				return;
			}

			assert(false, 'ristretto(false) should fail');
		});

		it('should fail with the given message if the expression is falsy and message is specified', function () {
			var expected = 'failure message',
				actual;

			try {
				ristretto(false, expected);
			} catch (e) {
				actual = e.message;
				assert.strictEqual(actual, expected);
				return;
			}

			assert(false, 'ristretto(false) should fail');
		});

		it('should fail with the default message if the expression is falsy and message is not specified', function () {
			var expected = 'expected expression to be truthy',
				actual;

			try {
				ristretto(false);
			} catch (e) {
				actual = e.message;
				assert.strictEqual(actual, expected);
				return;
			}

			assert(false, 'ristretto(false) should fail');
		});

		it('should pass if the expression is truthy', function () {
			try {
				ristretto(true);
			} catch (e) {
				assert(false, 'ristretto(true) should pass');
			}
		});

		describe('fail', function () {
			it('should fail', function () {
				try {
					ristretto.fail();
				} catch (e) {
					return;
				}

				assert(false, 'ristretto.fail() should fail');
			});
		});

		describe('fail', function () {
			it('should fail with the given message', function () {
				var expected = 'fail explicitly invoked';

				try {
					ristretto.fail(expected);
				} catch (e) {
					var actual = e.message;
					assert.strictEqual(actual, expected);
					return;
				}

				assert(false, 'ristretto.fail() should fail');
			});
		});
	});
});
