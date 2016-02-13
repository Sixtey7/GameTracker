console.log('Aboout to create the scores route');
angular.module('scores').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/scores', {
        templateUrl : 'scores/views/scores.list.client.view.html'
      }).
      when('scores/game/:gameId', {
        templateUrl : 'scores/view/game-scores.list.client.view.html'
      });
  }
]);
