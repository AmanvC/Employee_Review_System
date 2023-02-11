const Employee = require('../models/Employee');

module.exports.home = function(req, res){
    return res.render('home', {
        employee: req.user
    });
}

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('login');
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signup');
}

module.exports.createEmployee = async function(req, res){
    const employee = await Employee.findOne({ADID: req.body.ADID});
    if(employee){
        console.log('Employee already exists!');
        return res.redirect('/');
    }
    Employee.create(req.body);
    return res.redirect('/');
}

module.exports.createSession = function(req, res){
    return res.redirect('/home');
}