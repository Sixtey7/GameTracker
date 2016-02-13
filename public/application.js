var mainApplicationModuleName = "GameTracker";

var mainApplicationModule = angular.module(mainApplicationModuleName,
['ngResource', 'ngRoute', 'games']);

console.log('Inside applicationJS');

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

//uncomment this if we choose to use facebook's OAuth (this solves a bug)
/*
if (window.location.hash === '#_=_') {
  window.location.hash = '#!';
}
*/

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
