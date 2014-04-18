/*
 * Service Class
 */

var Services = new function(){
    var _self = this;
    var $MongoDB = require('mongodb');
    var $MongoClient = $MongoDB.MongoClient;
    var $MongoServer = $MongoDB.Server;

    //Database Class
    var $DB = new function(){
        var _config = {
            port : 27017,
            host : 'localhost',
            name : 'bishwei'
        };

        var _options = {
            db : {
                w : 1
            },
            server : {
                auto_reconnect : true
            }
        };

        var _db = null;

        var _initialized = false;

        this.init = function(){
            //set up database connection
            if(!_initialized){
                var mongoClient = new $MongoClient(new $MongoServer(_config.host, _config.port, _options.server), _options.db);
                mongoClient.open(function(err, client){
                    if(err){
                        console.log("Could not open connection to database: " + err);
                    } else {
                        _db = client.db(_config.name);
                        _initialized = true;
                    }
                });
            }
        };

        this.getConnection = function(){
            return _db;
        };

        this.getCollection = function(name){
            return _db.collection(name);
        };
    };

    //Accounts Service
    var $AccountsService = require('./accounts');
    var $LocationService = require('./location');


    this.init = function(){
        $DB.init();
    };

    this.accounts = new $AccountsService($DB);
    this.location = new $LocationService($DB, _self.accounts);
}

//expose
module.exports = Services;