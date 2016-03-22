(function(){
  'use strict';

  angular
  .module('appSmoke', [
    'ui.router',
    'ngSanitize',
    'pascalprecht.translate',
    'angularSmoothscroll',
    'hljs'
  ])
  .config(configure)
  .run(run)
  .controller('MainCtrl', MainCtrl)
  .directive('fullScreen', fullScreen)
  .directive('panel1', panel1)
  .directive('panel2', panel2)
  .directive('showPass', showPass);

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider', '$locationProvider'];
  function configure($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider) {

    $translateProvider.useStaticFilesLoader({prefix: 'locales/', suffix: '.json'});
    $translateProvider.preferredLanguage('en');

    //$locationProvider.html5Mode({enabled: true});

    $urlRouterProvider.otherwise("/");


    $stateProvider
    .state('404', {
      url: "/404",
      templateUrl: "404.html"
    })
    .state('home', {
      url: "/",
      templateUrl: "home.html"
    })
    .state('validate', {
      url: "/validate",
      templateUrl: 'validate.html'
    })
    .state('getting-started', {
      url: "/getting-started",
      templateUrl: 'getting-started.html'
    })
    .state('components', {
      url: "/components",
      templateUrl: 'components.html'
    })
    .state('helpers', {
      url: "/helpers",
      templateUrl: 'helpers.html'
    });

  }
  run.$inject = ['$rootScope'];
  function run($rootScope){

    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Loading
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $(window).bind("load", function() {
      $('body').removeClass('load');
      $('.loading').fadeOut();
    });

    $rootScope.$on('$stateChangeStart', function(){
      $.smkProgressBar({element:'body', status:'start'});
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      $.smkProgressBar({element:'body', status:'end'});
    });
  }
  MainCtrl.$inject = ['$scope', '$translate', '$sanitize'];
  function MainCtrl($scope, $translate, $sanitize){

    $scope.version = 'v3.1.1';
    $scope.lang = 'English';

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      if(langKey == 'en'){
        $scope.lang = 'English';
      }else if(langKey == 'es'){
        $scope.lang = 'Español';
      }else if(langKey == 'de'){
        $scope.lang = 'Deutsch';
      }else if(langKey == 'pt_br'){
        $scope.lang = 'Português Brasileiro';
      }else if(langKey == 'fr'){
        $scope.lang = 'French';
      }
    };

    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Analytis Events
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.download = function(){
      ga('send', 'event', 'button', 'click', 'download');
    };
    $scope.github = function(){
      ga('send', 'event', 'button', 'click', 'github');
    };
    $scope.gettingStarted = function(){
      ga('send', 'event', 'button', 'click', 'getting-started');
    };
    $scope.validate = function(){
      ga('send', 'event', 'button', 'click', 'validate');
    };
    $scope.components = function(){
      ga('send', 'event', 'button', 'click', 'components');
    };
    $scope.helpers = function(){
      ga('send', 'event', 'button', 'click', 'helpers');
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Validate
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    // Validate Empty
    $scope.validateEmpty = function(){
      if($('#formEmpty').smkValidate()){
        $.smkAlert({text: 'Validate!!' , type: 'success'});
      }
    };
    // Validate Email
    $scope.validateEmail = function(){
      if($('#formEmail').smkValidate()){
        $.smkAlert({text: $('#formEmail input').val(), type: 'success'});
      }
    };
    // Validate Alphanumeric
    $scope.validateAlphanumeric = function(){
      if($('#formAlphanumeric').smkValidate()){
        $.smkAlert({text: $('#formAlphanumeric input').val(), type: 'success'});
      }
    };
    // Validate Number
    $scope.validateNumber = function(){
      if($('#formNumber').smkValidate()){
        $.smkAlert({text: $('#formNumber input').val(), type: 'success'});
      }
    };
    // Validate Number Range
    $scope.validateNumberRange = function(){
      if($('#formNumberRange').smkValidate()){
        $.smkAlert({text: $('#formNumberRange input').val(), type: 'success'});
      }
    };
    // Validate Decimal
    $scope.validateDecimal = function(){
      if($('#formDecimal').smkValidate()){
        $.smkAlert({text: $('#formDecimal input').val(), type: 'success'});
      }
    };
    // Validate Currency
    $scope.validateCurrency = function(){
      if($('#formCurrency').smkValidate()){
        $.smkAlert({text: $('#formCurrency input').val(), type: 'success'});
      }
    };
    // Validate Number Character
    $scope.validateNumberChar = function(){
      if($('#formNumberChar').smkValidate()){
        $.smkAlert({text: $('#formNumberChar input').val(), type: 'success'});
      }
    };
    // Validate Range character
    $scope.validateRangeChar = function(){
      if($('#formRangeChar').smkValidate()){
        $.smkAlert({text: $('#formRangeChar input').val(), type: 'success'});
      }
    };
    // Validate Url
    $scope.validateUrl = function(){
      if($('#formUrl').smkValidate()){
        $.smkAlert({text: $('#formUrl input').val(), type: 'success'});
      }
    };
    // Validate Tel
    $scope.validateTel = function(){
      if($('#formTel').smkValidate()){
        $.smkAlert({text: $('#formTel input').val(), type: 'success'});
      }
    };
    // Validate Color
    $scope.validateColor = function(){
      if($('#formColor').smkValidate()){
        $.smkAlert({text: $('#formColor input').val(), type: 'success'});
      }
    };
    // Validate Date
    $scope.validateDate = function(){
      if($('#formDate').smkValidate()){
        $.smkAlert({text: $('#formDate input').val(), type: 'success'});
      }
    };
    // Validate Datetime
    $scope.validateDatetime = function(){
      if($('#formDatetime').smkValidate()){
        $.smkAlert({text: $('#formDatetime input').val(), type: 'success'});
      }
    };
    // Validate Time
    $scope.validateTime = function(){
      if($('#formTime').smkValidate()){
        $.smkAlert({text: $('#formTime input').val(), type: 'success'});
      }
    };
    // Validate Month
    $scope.validateMonth = function(){
      if($('#formMonth').smkValidate()){
        $.smkAlert({text: $('#formMonth input').val(), type: 'success'});
      }
    };
    // Validate Week
    $scope.validateWeek = function(){
      if($('#formWeek').smkValidate()){
        $.smkAlert({text: $('#formWeek input').val(), type: 'success'});
      }
    };
    // Validate Pattern
    $scope.validatePattern = function(){
      if($('#formPattern').smkValidate()){
        $.smkAlert({text: $('#formPattern input').val(), type: 'success'});
      }
    };
    // Validate Strong password
    $scope.validateStrongPass = function(){
      if($('#formStrongPass').smkValidate()){
        $.smkAlert({text: $('#formStrongPass input').val(), type: 'success'});
      }
    };
    // Validate Equal password
    $scope.validateEqualPass = function(){
      if($('#formEqualPass').smkValidate()){
        if($.smkEqualPass('#formEqualPass #pass1', '#formEqualPass #pass2')){
          $.smkAlert({text: $('#formEqualPass #pass1').val(), type: 'success'});
        }
      }
    };
    // Validate Equal password vs var
    var smkPassword = 'Smoke3';
    $scope.validateEqualPassVar = function(){
      if($('#formEqualPassVar').smkValidate()){
        if($.smkEqualPass(smkPassword, '#formEqualPassVar #pass')){
          $.smkAlert({text: $('#formEqualPassVar #pass').val(), type: 'success'});
        }
      }
    };
    // Clear form
    $scope.clear = function(){
      $('#formClear').smkClear();
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Alert
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    // Alert Warning
    $scope.alertWarning = function(){
      $.smkAlert({text:'Alert type "warning"', type:'warning'});
    };
    // Alert Success
    $scope.alertSuccess = function(){
      $.smkAlert({text:'Alert type "success"', type:'success', position:'top-left'});
    };
    // Alert Danger 10 seconds
    $scope.alertDanger = function(){
      $.smkAlert({text:'Alert type "danger" time 10 seconds', type:'danger', position:'top-center', time: 10});
    };
    // Alert Info permanent
    $scope.alertInfo = function(){
      $.smkAlert({text:'Alert type "info" permanent', type:'info', position:'bottom-right', icon: 'glyphicon-time', permanent: true});
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Confirmation
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.confirm = function(){
      $.smkConfirm({text:'Estas seguro?', accept:'Aceptar', cancel:'Cancelar'}, function(e){if(e){
        $.smkAlert({text: 'Confirmado!!', type:'success'});
      }});
    };



    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Prompt
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.prompt = function(){
      $.smkPrompt({text:'Estas seguro?', accept:'Aceptar', cancel:'Cancelar'}, function(res){
        if (res) {
          $.smkAlert({
              text: 'Respuesta ' + res,
              type: 'success'
          });
        } else {
          $.smkAlert({
              text: 'No hubo respuesta',
              type: 'info'
          });
        }
      });
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Progressbar
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.progressbar = function(){
      $.smkProgressBar({element:'body', status:'start', content: 'Loading...', bgColor: '#000', barColor: '#fff'});
      setTimeout(function(){ $.smkProgressBar({status:'end'}); }, 1000);
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Fullscreen
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    // $('#fullscreenExample').smkFullscreen();




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Panel
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    //$('#panelExample').smkPanel();




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Float
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.float = function(){
      if($('#formFloat').smkValidate()){
        var float = $.smkFloat($('#formFloat input').val());
        $.smkAlert({text: float, type:'success'});
      }
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Currency
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.currency = function(){
      if($('#formCurrency').smkValidate()){
        var currency = $.smkCurrency($('#formCurrency input').val(), '$');
        $.smkAlert({text: currency, type:'success'});
      }
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Hide Email
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.hideEmail = function(){
      if($('#formHideEmail').smkValidate()){
        var email = $.smkHideEmail($('#formHideEmail input').val());
        $.smkAlert({text: email, type:'success'});
      }
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   GetURL
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.getUrl = function(){
      var url = $.smkGetURL();
      $.smkAlert({text: url, type:'success'});
    };





    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Date
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.date = function(){
      var date = $.smkDate({
        date: $('#formDate #date').val(),
        format: $('#formDate #format').val()
      });
      $.smkAlert({text: date, type:'success'});
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Date Diff
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.dateDiff = function(){
      var date = $.smkDateDiff({
        fromDate: $('#formDateDiff #date1').val(),
        toDate: $('#formDateDiff #date2').val(),
        interval: $('#formDateDiff #interval').val()
      });
      $.smkAlert({text: date + ' ' + $('#formDateDiff #interval').val(), type:'success'});
    };
  }




  /*
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  |   Fullscreen
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  function fullScreen() {
    return function($scope, elem, attrs) {
      $(elem).smkFullscreen();
    };
  }




  /*
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  |   Panel
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  function panel1() {
    return function($scope, elem, attrs) {
      $(elem).smkPanel();
    };
  }
  function panel2() {
    return function($scope, elem, attrs) {
      $(elem).smkPanel({hide: 'min,remove'});
    };
  }




  /*
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  |   showPassword
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  function showPass() {
    return function($scope, elem, attrs) {
      $(elem).smkShowPass();
    };
  }

}());
