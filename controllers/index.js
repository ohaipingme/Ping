/*
 * Controller Class
 */

var Controllers = new function(){
    //Accounts Controller
    var $AccountsController = require('./accounts');
    var $LocationController = require('./location');
    this.accounts = new $AccountsController();
    this.location = new $LocationController();
};

//expose
module.exports = Controllers;