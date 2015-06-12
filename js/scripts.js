(function(){
'use strict';

angular
    .module('appSmoke', [
        'ui.router',
        'pascalprecht.translate',
        'angularSmoothscroll',
        'gist',
        'ngScrollSpy',
        'ngSanitize'
    ])
    .config(configure)
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .directive('fullScreen', fullScreen)
    .directive('panel', panel);

configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
function configure($stateProvider, $urlRouterProvider, $translateProvider) {

    $translateProvider.useStaticFilesLoader({prefix: 'locales/', suffix: '.json'});
    $translateProvider.preferredLanguage('en');

    $urlRouterProvider.otherwise("/404");

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
        .state('notifications', {
            url: "/notifications",
            templateUrl: 'notifications.html'
        })
        .state('progressbar', {
            url: "/progressbar",
            templateUrl: 'progressbar.html'
        })
        .state('fullscreen', {
            url: "/fullscreen",
            templateUrl: 'fullscreen.html'
        })
        .state('panel', {
            url: "/panel",
            templateUrl: 'panel.html'
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

    $scope.version = 'v2.2.3';
    $scope.lang = 'English';

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        if(langKey == 'en'){
            $scope.lang = 'English';
        }else if(langKey == 'es'){
            $scope.lang = 'Español';
        }else if(langKey == 'de'){
            $scope.lang = 'Deutsch';
        }else {
			$scope.lang = 'Português Brasileiro';
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
    $scope.notifications = function(){
        ga('send', 'event', 'button', 'click', 'notifications');
    };
    $scope.btnProgressbar = function(){
        ga('send', 'event', 'button', 'click', 'progressbar');
    };
    $scope.fullscreen = function(){
        ga('send', 'event', 'button', 'click', 'fullscreen');
    };
    $scope.panel = function(){
        ga('send', 'event', 'button', 'click', 'panel');
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
    var smkPassword = 'Smoke1';
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
        $.smkAlert({text:'Alert type "success"', type:'success'});
    };
    // Alert Danger 10 seconds
    $scope.alertDanger = function(){
        $.smkAlert({text:'Alert type "danger" time 10 seconds', type:'danger', time: 10});
    };
    // Alert Info permanent
    $scope.alertInfo = function(){
        $.smkAlert({text:'Alert type "info" permanent', type:'info', permanent: true});
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Confirmation
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.confirm = function(){
        $.smkConfirm({text:'Are you sure?', accept:'Accept', cancel:'Cancel'}, function(e){if(e){
            $.smkAlert({text: 'Confirm!!', type:'success'});
        }});
    };



    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Progressbar
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.progressbar = function(){
        $.smkProgressBar({element:'body', status:'start'});
        setTimeout(function(){ $.smkProgressBar({element:'body', status:'end'}); }, 1000);
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
        if($('#formFloatConv').smkValidate()){
            var mumber = $.smkFloat($('#formFloatConv input').val());
            $.smkAlert({text: mumber, type:'success'});
        }
    };





    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Currency
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.currency = function(){
        if($('#formCurrencyConv').smkValidate()){
            var currency = $.smkCurrency($('#formCurrencyConv input').val(), '$');
            $.smkAlert({text: currency, type:'success'});
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
    // Date Get
    $scope.date = function(){
        var date = $.smkDate();
        $.smkAlert({text: date, type:'success'});
    };

    // Date Customize
    $scope.dateCustomize = function(){
        var date = $.smkDate({
            date: $('#formDateCustomize #date').val(),
            format: $('#formDateCustomize #format').val(),
            lang: $('#formDateCustomize #lang').val()
        });
        $.smkAlert({text: date, type:'success'});
    };




    /*
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    |   Date Diff
    |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    $scope.dateDiff = function(){
        var interval = $('#formDateDiff #interval').val();
        var date = $.smkDateDiff({
            fromDate: $('#formDateDiff #date1').val(),
            toDate: $('#formDateDiff #date2').val(),
            interval: interval
        });
        $.smkAlert({text: date + ' ' + interval, type:'success'});
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
function panel() {
    return function($scope, elem, attrs) {
        $(elem).smkPanel();
    };
}

// function stateLoadingIndicator($rootScope) {
//   return {
//     restrict: 'E',
//     template: "<div ng-show='isStateLoading' class='loading'>" +
//     "<p class='loading-title'>Loading...</p>" +
//     "<div class='spinner'><chasing-dots-spinner></chasing-dots-spinner></div>" +
//     "</div>",
//     replace: true,
//     link: function(scope, elem, attrs) {
//       scope.isStateLoading = false;

//       $rootScope.$on('$stateChangeStart', function() {
//         scope.isStateLoading = true;
//       });
//       $rootScope.$on('$stateChangeSuccess', function() {
//         scope.isStateLoading = false;
//       });
//     }
//   };
// }

}());