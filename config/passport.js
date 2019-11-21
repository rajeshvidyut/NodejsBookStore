
var LocalStrategy   = require('passport-local').Strategy;
config            =     require('./config.js');
FacebookStrategy  =     require('passport-facebook').Strategy;

const knex = require('../knex/knex.js');

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use('facebook',new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret:config.facebook_api_secret ,
        callbackURL: config.callback_url
    },
        function(accessToken, refreshToken, profile, done,res) {
            // let profile = "";
            // process.nextTick(function () {
                if(config.use_database) {
                    console.log('profile',profile);
                    console.log('profile',profile.id);
                    let user_id  = profile.id;
                    if(user_id != undefined){
                        knex('cms_users')
                        .where({id:user_id})
                        .then(rows =>{
                            console.log('accessToken',accessToken);
                            console.log('rows',rows);
                            if(typeof rows != "undefined") {
                                console.log("There is no such user, adding now");
                                knex('cms_users')
                                .insert({ 
                                    name: profile.displayName,
                                    // email:profile.email,
                                    mobile_number:user_id
                                }).then(rows => {
                                    console.log(rows)
                                    res.redirect('/list');
                                });
                                //pool.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.username+"')");
                            } else {
                                console.log("User already exists in database");
                            }
                        });
                    }else{
                        console.log("No profile");
                    }  
                }
                // return done(null, profile);
            // });
        }
    ));
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 
            console.log("RUN1")
            knex('cms_users')
            .where({ email: username })
            .where({ password : password })
            .then(rows =>{
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Login Success.')); 
                }
                if (!password)
                    return done(null, true, req.flash('loginMessage', 'Password Mismatch'));
                    return done(null, rows); 
            })
        })
    );
};
