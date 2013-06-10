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

		describe('strictNotEqual', function () {
			it('should pass if acutal and expected are strictly not equal', function () {
				try {
					ristretto.strictNotEqual(1, 2);
				} catch (e) {
					assert(false, 'ristretto.strictNotEqual() should pass if actual and expected are strictly not equal');
				}
			});

			it('should pass if actual and expected are equal, but not strictly equal', function () {
				try {
					ristretto.strictNotEqual(1, '1');
				} catch (e) {
					assert(false, 'ristretto.strictNotEqual() should pass if actual and expected are equal, but strictly not equal');
				}
			});

			it('should fail if actual and expected are strictly equal', function () {
				try {
					ristretto.strictNotEqual(1, 1);
				} catch (e) {
					return;
				}

				assert(false, 'ristretto.strictNotEqual() should fail if actual and expected are strictly equal');
			});
		});

		describe('deepEqual', function () {
			var proto = { a: 1 },
				a = Object.create(proto),
				b = Object.create(proto),
				c = Object.create(proto);

			a.b = 1;
			b.b = 1;
			c.b = 2;

			it('should pass if primitives are equivalent', function () {
				try {
					ristretto.deepEqual(1, 1);
					ristretto.deepEqual(null, null);
					ristretto.deepEqual(undefined, undefined);
				} catch (e) {
					assert(false, 'ristretto.deepEqual() should pass if actual and expected primitives are equal');
				}
			});

			it('should pass if objects are equivalent', function () {
				try {
					ristretto.deepEqual(a, b);
					ristretto.deepEqual(b, a);
				} catch (e) {
					assert(false, 'ristretto.deepEqual() should pass if actual and expected objects are deeply equal');
				}
			});

			it('should pass if arrays are equivalent', function () {
				try {
					ristretto.deepEqual([], []);
					ristretto.deepEqual([1, 2, 3], [1, 2, 3]);
				} catch (e) {
					assert(false, 'ristretto.deepEqual() should pass if actual and expected arrays are deeply equal');
				}
			});
		});

		describe('deepNotEqual', function () {
			var proto = { a: 1 },
				a = Object.create(proto),
				b = Object.create(proto),
				c = Object.create(proto),
				d = { b: 1 };

			a.b = 1;
			b.b = 1;
			c.b = 2;

			it('should fail if primitives are equivalent', function () {
				try {
					ristretto.deepNotEqual(1, 2);
					ristretto.deepNotEqual(null, undefined);
					ristretto.deepNotEqual(undefined, null);
				} catch (e) {
					assert(false, 'ristretto.deepNotEqual() should failt if actual and expected are equal');
				}
			});

			it('should fail if objects are equivalent', function () {
				try {
					ristretto.deepNotEqual(a, c);
					ristretto.deepNotEqual(a, d);
					ristretto.deepNotEqual(b, c);
					ristretto.deepNotEqual(b, d);
				} catch (e) {
					assert(false, 'ristretto.deepNotEqual() should fail if actual and expected objects are deeply equal');
				}
			});

			it('should fail if arrays are equivalent', function () {
				try {
					ristretto.deepNotEqual([], { length: 0, splice: function () {} });
					ristretto.deepNotEqual([1, 2, 3], [1, 2, 3, 4]);
				} catch (e) {
					assert(false, 'ristretto.deepNotEqual() should fail if actual and expected arrays are deeply equal');
				}
			});
		});
	});
});
