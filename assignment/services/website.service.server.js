/**
 * Created by vyshaalnarayanam on 3/31/17.
 */

module.exports = function (app) {
    var count = 1000;
    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesforUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function createWebsite(req,res) {
        var w = req.body;
        w._id = count++;
        w.developerId = req.params.userId;
        websites.push(w);
        res.send(w);
    }

    function findAllWebsitesforUser(req,res) {
        var userId = req.params.userId;
        var result = [];
        for(var w in websites){
            if(websites[w].developerId==userId){
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id==websiteId){
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWebsite(req,res){
        var website = req.body;
        website._id = req.params.websiteId;;
        for(var w in websites){
            if(websites[w]._id==website._id){
                websites[w] = website;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id==websiteId){
                websites.splice(w,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
}