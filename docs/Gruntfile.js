module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // you run `grunt wiredep`
        wiredep: {
          task: {
            // Point to the files that should be updated when
            src: [
                'index.html'
              // 'app/views/**/*.html',   // .html support...
              // 'app/views/**/*.jade',   // .jade support...
              // 'app/styles/main.scss',  // .scss & .sass support...
              // 'app/config.yml'         // and .yml & .yaml support out of the box!
            ],
            options: {
              // See wiredep's configuration documentation for the options
              // you may pass:

              // https://github.com/taptapship/wiredep#configuration
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('default', ['wiredep']);

};