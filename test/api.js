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

		describe('notEqual', function () {
			it('should fail if the values are equal', function () {
				try {
					ristretto.notEqual(2, '2');
				} catch (e) {
					return;
				}

				assert(false, 'ristretto.notEqual() should fail if values are equal');
			});

			it('should fail if the values are strictly equal', function () {
				try {
					ristretto.notEqual(2, 2);
				} catch (e) {
					return;
				}

				assert(false, 'ristretto.notEqual() should fail if values are strictly equal');
			});

			it('should pass if the values are not equal', function () {
				try {
					ristretto.notEqual(3, 4);
				} catch (e) {
					assert(false, 'ristretto.notEqual() should pass if values are not equal');
				}

			});
		});

		describe('falsey', function () {
			it('should pass if the value is false', function () {
				try {
					ristretto.falsey(false);
				} catch (e) {
					assert(false, 'ristretto.falsey() should pass if value is false');
				}
			});

			it('should pass if the value is falsey', function () {
				var falsey;

				try {
					ristretto.falsey(falsey);
				} catch (e) {
					assert(false, 'ristretto.falsey() should pass if value is falsey');
				}
			});

			it('should fail if the value is true', function () {
				try {
					ristretto.falsey(true);
				} catch (e) {
					return;
				}

				assert(false, 'ristretto.falsey() should fail if value is true');
			});

			it('should pass if the value is truthy', function () {
				var truthy = 1;

				try {
					ristretto.falsey(truthy);
				} catch (e) {
					return;
				}

				assert(false, 'ristretto.falsey() should fail if value is truthy');
			});
		});
	});
});
