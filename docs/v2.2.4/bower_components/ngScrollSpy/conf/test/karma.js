module.exports = function(config){
  config.set({
    basePath : '../../',

    autoWatch : false,
    singleRun: true,

    frameworks: ['jasmine'],
    browsers : ['PhantomJS'],
    plugins : [
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-phantomjs-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};