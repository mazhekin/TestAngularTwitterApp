(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Tweet', Tweet);

    Tweet.$inject = ['twitterService', '$location', '$routeParams'];

    function Tweet(twitterService, $location, $routeParams) {

        /*jshint validthis: true */
        var vm = this;
        vm.backToTweets = backToTweets;

        activate();

        ////////////////////////

        function activate() {
            var auth = twitterService.getAuthorization();
            if (!auth) {
                $location.path('/');
                return;
            }

            if ($routeParams.id){
                twitterService.getTweet($routeParams.id)
                    .then(function(tweet) {
                        vm.tweet = tweet;
                    });
            }
        }

        function backToTweets(){
            $location.path('/');
        }
    }

})();
