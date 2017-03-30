/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService() {
        var count = 1000;
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        
        return api;
    
        function createPage(websiteId,page) {
            page._id = count++;
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }
        
        function findPageByWebsiteId(websiteId) {
            var result = []
            for(var p in pages){
                if(pages[p].websiteId == websiteId)
                    result.push(pages[p]);
            }
            return result;
        }

        function findPageById(pageId){
            for(var p in pages){
                if(pages[p]._id==pageId)
                    return pages[p];
            }
            return null;
        }
        
        function updatePage(pageId,page) {
            for(var p in pages){
                if(pages[p]._id==pageId){
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return pages;
                }
            }
            return null;
        }

        function deletePage(pageId){
            for(var p in pages){
                if(pages[p]._id==pageId){
                    pages.splice(p,1);
                    return true;
                }
            }
            return false;
        }
    }
})();