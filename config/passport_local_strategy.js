const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Employee = require('../models/Employee');

passport.use(new LocalStrategy(
    {usernameField: 'ADID'},
    function(ADID, password, done){
        Employee.findOne({ADID: ADID}, function(err, employee){
            if(err){
                console.log(`Error in finding employee in db: ${err}`);
                return done(err);
            }
            if(!employee || employee.password != password){
                console.log('Invalid credentials');
                return done(null, false);
            }
            return done(null, employee);
        })
    }
));

passport.serializeUser(function(employee, done){
    done(null, employee.id);
});

passport.deserializeUser(function(id, done){
    Employee.findById(id, function(err, employee){
        if(err){
            console.log(`Error in deserializing: ${err}`);
            return done(err);
        }
        return done(null, employee);
    })
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;