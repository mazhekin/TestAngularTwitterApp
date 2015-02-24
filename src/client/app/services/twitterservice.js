(function() {
    'use strict';

    angular
        .module('app.data')
        .factory('twitterService', twitterService);

    twitterService.$inject = ['$q', 'logger'];

    function twitterService($q, logger) {

        var authorizationResult = false;

        var service = {
            connectTwitter: connectTwitter,
            getLatestTweets: getLatestTweets,
            getAuthorization: function() { return authorizationResult; },
            clearCache: clearCache,
            getTweet: getTweet,
            newTweet: newTweet
        };
        return service;

        /////////////////////////////////////////////////////

        function connectTwitter() {
            var deferred = $q.defer();

            OAuth.initialize('WZfd3FGBLcM8nBS080yhtki57Xg', {cache: true});

            OAuth.popup('twitter', {cache:true})
                .done(function(result) {
                    logger.success('Twitter connected successfully');
                    authorizationResult = result;
                    deferred.resolve();
                })
                .fail(function (err) {
                    logger.error('Twitter connect failed. ' + err);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function getLatestTweets() {
            var deferred = $q.defer();

            //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            authorizationResult.get('/1.1/statuses/home_timeline.json?count=' + 10)
                .done(function(data) {
                    deferred.resolve(data);
                })
                .fail(function (data) {
                    logger.error('GetLatestTweets failed. ' + data.responseText);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function getTweet(id) {
            var deferred = $q.defer();

            //https://dev.twitter.com/rest/reference/get/statuses/show/%3Aid
            authorizationResult.get('/1.1/statuses/show.json?id=' + id)
                .done(function(data) {
                    deferred.resolve(data);
                })
                .fail(function (data) {
                    logger.error('getTweet failed. ' + data.responseText);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function clearCache() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        }

        //https://dev.twitter.com/rest/reference/post/statuses/update
        function newTweet(newTweet){
            var deferred = $q.defer();

            authorizationResult.post('/1.1/statuses/update.json?status=' + encodeURI(newTweet))
                .done(function(data) {
                    deferred.resolve(data);
                })
                .fail(function (data) {
                    logger.error('newTweet failed. ' + data.responseText);
                    deferred.reject();
                });

            return deferred.promise;
        }
    }

})();
