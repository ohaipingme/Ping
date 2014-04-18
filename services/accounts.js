/*
 * Accounts Service Class
 */

var AccountsService = function(db){
    var $BCrypt = require("bcrypt");
    var _accounts = null;
    var _initialized = false;

    function _init(){
        if(!_initialized){
            _accounts = db.getCollection("users");
            _initialized = true;
        }
    }

    function _encrypt(value){
        var salt = $BCrypt.genSaltSync(10);
        return $BCrypt.hashSync(value, salt);
    }

    function _validatePassword(password, hashedPassword){
        return $BCrypt.compareSync(password, hashedPassword);
    }

    function _getAccountByUserName(userName, cb){
        if(userName){
            _accounts.findOne({userName : userName}, cb);
        }
    }

    function _getAccountByEmail(email, cb){
        if(email){
            _accounts.findOne({email : email}, cb);
        }
    }

    this.addAccount = function(account, cb){
        _init();
        if(account){
            //check for existence of user name
            _getAccountByUserName(account.userName, function(e, o){
                if(e || o){
                    e = e || "User Name Taken";
                    console.log(e);
                    cb(e);
                } else {
                    //check for existence of email address
                    _getAccountByEmail(account.email, function(e, o){
                        if(e || o){
                            e = e || "Email Address Taken";
                            console.log(e);
                            cb(e);
                        } else {
                            var hashedPass = _encrypt(account.password);
                            var newUser = {
                                userName : account.userName,
                                name : account.name,
                                password : hashedPass,
                                email : account.email,
                                gender: account.gender,
                                creationDate : new Date()
                            };
                            _accounts.insert(newUser, {safe:true}, cb);
                        }
                    });
                }
            })
        }
    }

    this.authenticate = function(email, password, cb){
        _init();
        if(email && password){
            _getAccountByEmail(email, function(e, o){
                if(e || !o){
                    e = e || "User Not Found";
                    console.log(e);
                    cb(e);
                } else {
                    //validate password
                    if(_validatePassword(password, o.password)){
                        cb(e, o);
                    } else {
                        e = "Invalid Password!";
                        console.log(e);
                        cb(e);
                    }
                }
            });
        }
    }
}


module.exports = AccountsService;