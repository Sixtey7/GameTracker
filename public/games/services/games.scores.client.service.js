angular.module('games').service('ScoresService', ['$http',
  function($http) {
    this.findScoresForGame = function(gameId, successCallback) {
      $http.get('/api/scores/game/' + gameId)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
          successCallback(response.data);
        });
    };
  }]);
