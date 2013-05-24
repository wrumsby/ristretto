module.exports = function(grunt) {
	'use strict';

	var files = ['test-suites.js', 'ristretto.js', 'test/**/*.js'];

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: files
		},
		mocha: {
			index: ['test-runner.html'],
			options: {
				reporter: 'Nyan'
			}
		},
		watch: {
			scripts: {
				files: files,
				tasks: ['mocha', 'jshint'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['watch']);
};
