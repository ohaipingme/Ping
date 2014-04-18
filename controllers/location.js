/*
 * Accounts Controller Class
 */

var LocationController = function(){
    //TODO - make this call app.service
    var $Service = require('../services');
    var _locationService = $Service.location;

    this.setUserLocation = function(req, res){
        if(req.param('user_name') && req.param('lat') && req.param('long')){
            var userName = req.param('user_name');
            var position = [parseFloat(req.param('long')), parseFloat(req.param('lat'))];
            _locationService.setUserLocation(userName, position, function(e, o){
                if (e){
                    res.send(e, 400);
                } else {
                    res.render('index', { title: 'Main', user: o });
                }
            });
        }
    };

    this.getUserLocations = function(req, res){
        var lat1 = parseFloat(req.query.lat1);
        var lon1 = parseFloat(req.query.lon1);
        var lat2 = parseFloat(req.query.lat2);
        var lon2 = parseFloat(req.query.lon2);

        _locationService.getUserLocations(lat1, lon1, lat2, lon2, function(e, o){
            if (e){
                res.send(e, 400);
            } else {
                res.header("Content-Type:","application/json");
                res.end(JSON.stringify(o));
            }
        });
    };

};


module.exports = LocationController;