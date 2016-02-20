angular.module('scores').factory('Scores', ['$resource', '$http',
  function($resource, $http) {
    var rangeScore = $resource('/api/scores/:scoreId', {
      rangeScoreId : '@_id'
    }, {
      update : {
        method : 'PUT'
      }
  });

  rangeScore.scoresForGame = function(gameId) {
    $http.get('/api/scores/game/' + gameId)
      .success(function(data) {
        return data;
      });
  };

  return rangeScore;
}]);
