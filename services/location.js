/*
 * Accounts Service Class
 */

var LocationService = function(db){
    var _accounts = null;
    var _initialized = false;

    function _init(){
        if(!_initialized){
            _accounts = db.getCollection("users");
            _initialized = true;
        }
    }

    function _setPositionForUser(userName, position, cb){
        if(userName && position){
            _accounts.update({userName : userName}, {$set: {pos : position}}, {multi:false}, cb);
        }
    }

    this.setUserLocation = function(userName, position, cb){
        _init();
        if(userName && position){
            _setPositionForUser(userName, position, function(e, o) {
                if(e){
                    console.log(e);
                    cb(e);
                } else {
                    cb(e, o);
                }
            });
        }
    };

    this.getUserLocations = function(lat1, lon1, lat2, lon2, cb){
        _init();
        _accounts.find({"pos" : { $geoWithin : { $box: [[lon2,lat2], [lon1,lat1]]}}}).toArray(function(e,o){
            if(e){
                console.log(e);
                cb(e);
            } else {
                cb(e, o);
            }
        });
    };
};


module.exports = LocationService;