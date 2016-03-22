module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'docs/src/', src: ['**'], dest: 'dist'},
        ],
      },
    },
    uglify: {
      js: {
        files: {
          'dist/js/smoke.min.js': ['dist/js/smoke.js'],
          'docs/js/scripts.min.js': ['docs/js/scripts.js']
        }
      },
      languaje: {
        files: [{
          expand: true,
          cwd: 'dist/lang/',
          src: '**/*.js',
          dest: 'dist/lang/',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      css: {
        files: {
          'dist/css/smoke.min.css': ['dist/css/smoke.css'],
          'docs/css/styles.min.css': ['docs/css/styles.css']
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'smoke-v3.1.1.zip'
        },
        files: [
          //{src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
          //{src: ['path/**'], dest: 'internal_folder2/'}, // includes files in path and its subdirs
          {expand: true, cwd: 'dist/', src: ['**'], dest: ''}, // makes all src relative to cwd
          //{flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level
        ]
      }
    },
    wiredep: {
      task: {
        directory: 'docs/bower_components',
        src: ['docs/index.html']
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
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', ['copy', 'uglify', 'cssmin', 'compress']);
  grunt.registerTask('wire', ['wiredep']);

};
