module.exports = function(grunt) {
	'use strict';

	var files = ['test-suites.js', 'ristretto.js', 'test/**/*.js'];

	grunt.initConfig({
		jsdoc: {
			dist: {
				src: ['./ristretto.js'],
				options: {
					destination: 'doc'
				}
			}
		},
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
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: files,
				tasks: ['mocha', 'jshint'],
				options: {
					livereload: true
				}
			}
		},
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					ignorePaths: ['doctheme', 'jam', 'node_modules', 'test'],
					paths: '.',
					outdir: 'doc',
					themedir: 'doctheme',
					helpers: ['doctheme/helpers/helpers.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['watch']);
};
