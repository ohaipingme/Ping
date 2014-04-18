/*
 * Accounts Controller Class
 */

var AccountsController = function(){
    //TODO - make this call app.service
    var $Service = require('../services');
    var _accountsService = $Service.accounts;

    this.add = function(req, res){
        //validate user
        if (req.param('user_name')) {
            var account = {
                userName : req.param("user_name"),
                name : {
                    firstName : req.param("first_name"),
                    lastName : req.param("last_name")
                },
                password : req.param("password"),
                email : req.param("email"),
                gender: req.param("gender")
            };
            _accountsService.addAccount(account, function(e, o){
                if (e){
                    res.send(e, 400);
                } else {
                    res.render('index', { title: 'Main', user: o });
                }
            });
        }
    }

    this.authenticate = function(req, res){
        var email = req.param('email');
        var password = req.param('password');
        if(email && password){
            _accountsService.authenticate(email, password, function(e, o){
                if(e){
                    res.send(e, 400);
                } else {
                    req.session.user = o;
                    res.render('index', { title: 'Main', user: o });
                }
            });
        }
    }
};


module.exports = AccountsController;