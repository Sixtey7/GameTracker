angular.module('games').controller('GameScoresController', ['$scope', '$routeParams', '$location', 'ScoresService',
  function($scope, $routeParams, $location, ScoresService) {

    /**
    * Read
    **/
    $scope.findScoresForGame = function() {
      ScoresService.findScoresForGame($routeParams.gameId, function(data) {
        console.log(JSON.stringify(data));
        $scope.scores = data;
      });

    }
  }
]);
