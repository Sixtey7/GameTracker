angular.module('scores').factory('RangeScores', ['$resource', '$http',
  function($resource, $http) {
    var rangeScore = $resource('/api/rangeScores/:rangeScoreId', {
      rangeScoreId : '@_id'
    }, {
      update : {
        method : 'PUT'
      }
  });

  rangeScore.scoresForGame = function(gameId) {
    $http.get('/api/rangeScores/game/' + gameId)
      .success(function(data) {
        return data;
      });
  };

  return rangeScore;
}]);
