
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var Application = new function(){
    var _app = null;
    var _routes = null;
    var _services = null;

    function _initAppConfig(){
        // all environments
        _app.set('port', process.env.PORT || 3000);
        _app.set('views', path.join(__dirname, 'views'));
        _app.set('view engine', 'ejs');
        _app.use(express.favicon());
        _app.use(express.logger('dev'));
        _app.use(express.json());
        _app.use(express.urlencoded());
        _app.use(express.methodOverride());
        _app.use(express.cookieParser('your secret here'));
        _app.use(express.session());
        _app.use(_app.router);
        _app.use(require('less-middleware')(path.join(__dirname, 'public')));
        _app.use(express.static(path.join(__dirname, 'public')));

        // development only
        if ('development' == _app.get('env')) {
            _app.use(express.errorHandler());
        }
    };

    function _init(){
        if(!_app){
            _app = express();
            _initAppConfig();
            _initRoutes();
            _initServices();
        }
    };

    function _initRoutes(){
        _routes = require('./routes');
        _routes(_app);
    };

    function _initServices(){
        _services = require('./services');
        _services.init();
    }

    function _startServer(){
        http.createServer(_app).listen(_app.get('port'), function(){
            console.log('Express server listening on port ' + _app.get('port'));
        });
    };

    this.startServer = function(){
        _init();
        _startServer();
    };

};

Application.startServer();