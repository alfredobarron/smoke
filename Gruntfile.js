'use strict';

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // you run `grunt`
        uglify: {
            js: {
                files: {
                    'dist/js/smoke.min.js': ['dist/js/smoke.js']
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'dist/css/smoke.min.css': ['dist/css/smoke.css']
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['dist/**'], dest: 'docs/'},
                ],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);

};