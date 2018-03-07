
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider

        .when("/",{
            templateUrl  : 'views/home.html'
        })
        .when("/matches",{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainController'
        })
        .when("/stats",{
            templateUrl     :  'views/statsView.html',
            controller      :   'statsController'
        })
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);