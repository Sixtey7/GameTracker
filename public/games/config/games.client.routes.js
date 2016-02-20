console.log('About to create games route');
angular.module('games').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when('/games', {
            templateUrl: 'games/views/game.list.client.view.html'
        })
        .when('/games/:gameId', {
            templateUrl: 'games/views/view-game.client.view.html'
        });

    }
])
