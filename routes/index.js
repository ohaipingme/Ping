/*
 * Main page routes
 */

//TODO - make this app.controller
var $Controller = require('../controllers');

var Routes = function(app){
    var _accountsController = $Controller.accounts;
    var _locationController = $Controller.location;

    //Main Page
    app.get('/', function(req, res){
        res.render('index', { title: 'Test' });
    });

    //Login Page
    app.get('/login', function(req, res){
        //TODO - auto login
        res.render('login', { title: 'Login'});
    });

    app.post('/login', _accountsController.authenticate);

    //Signup Page
    app.get('/signup', function(req, res){
        res.render('signup', { title: 'Signup' });
    });

    //TODO - intercept and add pass params directly into controller
    app.post('/signup', _accountsController.add);

    //Location Update Page
    app.get('/updateLocation', function(req, res){
        res.render('updateLocation', { title: 'Update Location' });
    });

    //TODO - intercept and add pass params directly into controller
    app.post('/updateLocation', _locationController.setUserLocation);

    app.get('/getUserLocations', _locationController.getUserLocations);

    app.get('/map', function(req, res){
        res.render('map', { title: 'Map' });
    });
}

module.exports = Routes;