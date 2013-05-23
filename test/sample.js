define(['ristretto'], function (assert) {
	'use strict';

	describe('assert', function () {
		it('should accept truthy expressions', function () {
			assert(true);
		});

		it('should reject falsy expressions', function () {
			try {
				assert(false);
			} catch (e) {
				return;
			}

			assert.fail();
		});
	});
});