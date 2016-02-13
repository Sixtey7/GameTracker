angular('scores').controller('ScoresController', ['$scope', '$routeParams', '$location', 'RangeScores',
  function ($scope, $routeParams, $location, RangeScores) {

    /**
    * Create
    **/
    //TODO

    /**
    * Read
    **/
    $scope.find = function() {
      var rangeScores = RangeScores.query();

      $scope.scores = rangeScores;
    };

    $scope.findForGame = function(gameId) {
      var rangeScores = RangeScores.scoresForGame(gameId);

      $scope.scores = rangeScores;
    };
  }
])
