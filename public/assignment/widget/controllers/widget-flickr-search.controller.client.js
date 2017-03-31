/**
 * Created by vyshaalnarayanam on 3/31/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);
    
    function FlickrImageSearchController($routeParams,$location,FlickrService,WidgetService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.wgid = parseInt($routeParams.wgid);
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {};
            widget.widgetType = "IMAGE";
            widget.pageId = vm.pid;
            widget._id = vm.wgid;
            widget.url = url;
            widget.width = "100%";

            WidgetService.updateWidget(vm.wgid, widget)
                .then(function (response) {
                    $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page/'+vm.pid+'/widget');
                });
        }


    }
})();