/**
 * Created by vyshaalnarayanam on 3/31/17.
 */
(function () {
    angular.module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    var key = "51f0aa4aabd716773e193f0963f96eab";
    var secret = "7a4bd2a6c89831f1";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        }

        return api;

        function searchPhotos(searchTerm) {
            var url
                = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }

})();