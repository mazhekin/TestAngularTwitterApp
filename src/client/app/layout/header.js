(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Header', Header);

    Header.$inject = ['twitterService', '$scope', '$route'];

    function Header(twitterService, $scope, $route) {
        /*jshint validthis: true */
        var vm = this;
        vm.connectTwitter = connectTwitter;
        vm.disconnectTwitter = disconnectTwitter;
        vm.currentUser = false;

        ////////////////////////////

        activate();

        function activate() {
            var auth = twitterService.getAuthorization();
            if (auth) {
                auth.me()
                    .then(function(user) {
                        vm.currentUser = user;
                        $scope.$apply();

                      //  var currentPageTemplate = $route.current.templateUrl;
                      //  $templateCache.remove(currentPageTemplate);

                        $route.reload();
                    });
            }
        }

        function connectTwitter() {
            twitterService.connectTwitter()
                .then(function() {
                    activate();
                });
        }

        function disconnectTwitter()
        {
            twitterService.clearCache();
            vm.currentUser = false;
            $route.reload();
        }

    }
})();

