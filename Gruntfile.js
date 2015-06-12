module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // you run `grunt`
        uglify: {
            js: {
                files: {
                    'docs/dist/js/smoke.min.js': ['docs/dist/js/smoke.js'],
                    'docs/js/scripts.min.js': ['docs/js/scripts.js']
                    //'docs/dist/lang/smoke.es.min.js': ['docs/dist/lang/smoke.es.js']
                }
            },
            languaje: {
                files: [{
                    expand: true,
                    cwd: 'docs/dist/lang/',
                    src: '**/*.js',
                    dest: 'docs/dist/lang/',
                    ext: '.min.js'
                }]
            }
        },
        cssmin: {
            css: {
                files: {
                    'docs/dist/css/smoke.min.css': ['docs/dist/css/smoke.css'],
                    'docs/css/styles.min.css': ['docs/css/styles.css']
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, cwd: 'docs/dist/', src: ['**'], dest: 'dist'},
                ],
            },
        },
        compress: {
          main: {
            options: {
              archive: 'smoke-v2.2.3.zip'
            },
            files: [
              //{src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
              //{src: ['path/**'], dest: 'internal_folder2/'}, // includes files in path and its subdirs
              {expand: true, cwd: 'dist/', src: ['**'], dest: ''}, // makes all src relative to cwd
              //{flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level
            ]
          }
        },
        // Se empujan los archivos de la carpeta docs dentro del repositorio gh-pages en Github
        'gh-pages': {
            options: {
                base: 'docs'
            },
            src: ['**']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['uglify', 'cssmin', 'copy', 'compress']);

};