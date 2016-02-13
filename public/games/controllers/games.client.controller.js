angular.module('games').controller('GamesController', ['$scope', '$routeParams', '$location', 'Games',
  function ($scope, $routeParams, $location, Games) {
    //$scope.authentication = Authentication;

    /**
    * Create
    **/
    //TODO

    /**
    * Read
    **/
    $scope.find = function() {
      $scope.games = Games.query();
    };

    $scope.findOne = function() {
      $scope.game = Games.get({
        gameId : $routeParams.gameId
      })
    };

    /**
    * Update
    **/
    //TODO

    /**
    * Delete
    **/
    //TODO
  }
]);
