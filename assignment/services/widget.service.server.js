/**
 * Created by vyshaalnarayanam on 3/31/17.
 */

module.exports = function (app) {

    var count = 1000;
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname+'/../../public/uploads'});

    app.post('/api/page/:pageId/widget',createWidget);
    app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
    app.get('/api/widget/:widgetId',findWidgetById);
    app.put('/api/widget/:widgetId',updateWidget);
    app.delete('/api/widget/:widgetId',deleteWidget);
    app.post ("/api/uploads",upload.single('myFile'),uploadImage);

    function createWidget(req,res) {
        var widget = req.body;
        widget._id = count++;
        widget.pageId = req.params.pageId;
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;
        var result = [];
        for(var wg in widgets){
            if(widgets[wg].pageId==pageId){
                result.push(widgets[wg]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        for(var wg in widgets){
            if(widgets[wg]._id==widgetId){
                res.json(widgets[wg]);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWidget(req,res){
        var widget = req.body;
        widget._id = req.params.widgetId;
        for(var wg in widgets){
            if(widgets[wg]._id==widget._id){
                widgets[wg] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for(var wg in widgets){
            if(widgets[wg]._id==widgetId){
                widgets.splice(wg,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var wg in widgets){
            if(widgets[wg]._id==widgetId){
                widgets[wg].url = '/uploads/'+filename;
            }
        }


        var callbackUrl = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
        res.redirect(callbackUrl);

    }

}