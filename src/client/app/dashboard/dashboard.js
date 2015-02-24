(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['twitterService', '$location', '$modal', 'logger'];

    function Dashboard(twitterService, $location, $modal, logger) {

        /*jshint validthis: true */
        var vm = this;
        vm.gotoTweet = gotoTweet;
        vm.newTweet = newTweet;
        vm.auth = false;

        activate();

        ////////////////////////

        function activate() {
            vm.auth = twitterService.getAuthorization();
            if (vm.auth) {
                getLatestTweets();
            }
        }

        function getLatestTweets() {
            twitterService.getLatestTweets()
                .then(function(tweets) {
                    vm.tweets = tweets;
                });
        }

        function gotoTweet(tweet){
            if (tweet && tweet.id) {
                $location.path('/tweet/' + tweet.id_str);
            }
        }

        function newTweet(){
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm'
            });

            modalInstance.result.then(function (newTweet) {
                twitterService.newTweet(newTweet).then(function(){
                    getLatestTweets();
                });

            }, function () {
                logger.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    angular
        .module('app.dashboard')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];

    function ModalInstanceCtrl($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close($scope.newTweet);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

})();