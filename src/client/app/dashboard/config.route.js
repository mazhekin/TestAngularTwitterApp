(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/tweet/:id',
                config: {
                    templateUrl: 'app/dashboard/tweet.html',
                    controller: 'Tweet',
                    controllerAs: 'vm',
                    title: 'tweet',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'vm',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    // appRun.$inject = ['routehelper'];
    /* @ngInject */
    /*function configDashboard($routeProvider) {
        alert('route');
        $routeProvider.
            when('/da', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'Dashboard'
            })
            .otherwise({
                redirectTo: '/'
            });

    }*/
})();