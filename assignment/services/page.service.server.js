/**
 * Created by vyshaalnarayanam on 3/31/17.
 */

module.exports = function (app) {
    var count = 1000;
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post('/api/website/:websiteId/page',createPage);
    app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
    app.get('/api/page/:pageId',findPageById);
    app.put('/api/page/:pageId',updatePage);
    app.delete('/api/page/:pageId',deletePage);

    function createPage(req,res) {
        var page = req.body;
        page._id = count++;
        page.websiteId = req.params.websiteId;
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for(var p in pages){
            if(pages[p].websiteId==websiteId){
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id==pageId){
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updatePage(req,res){
        var page = req.body;
        page._id = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id==page._id){
                pages[p] = page;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage(req,res){
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id==pageId){
                pages.splice(p,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

}