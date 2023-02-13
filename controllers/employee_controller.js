const Employee = require('../models/Employee');
const Review = require('../models/Review');
const crypto = require('crypto');

//display home screen and pass all employees list as well as pending reviews for the signed in employee
module.exports.home = async function(req, res){
    const employeesList = await Employee.find({}).populate('reviews');
    const currentEmployee = await Employee.findOne({ADID: req.user.ADID}).populate(('pendingReviews'));
    return res.render('home', {
        employeesList: employeesList,
        pendingReviews: currentEmployee.pendingReviews
    });
}

//display login screen
module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('login');
}

//display signup screen
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signup');
}

//create an employee according to the form data
module.exports.createEmployee = async function(req, res){
    const employee = await Employee.findOne({ADID: req.body.ADID});
    if(employee){
        console.log('Employee already exists!');
        return res.redirect('/');
    }
    if(!req.body.password){
        req.body.password = crypto.randomBytes(5).toString('hex');
    }
    Employee.create(req.body);
    return res.redirect('/');
}

//create a session for a user
module.exports.createSession = function(req, res){
    return res.redirect('/home');
}

//logout the current user
module.exports.logout = function(req, res){
    if(req.isAuthenticated()){
        req.logout(() => {});
    }
    return res.redirect('/');
}

//update the selected user
module.exports.updateUser = async function(req, res){
    await Employee.findOneAndUpdate({ADID: req.body.ADID}, req.body);
    return res.redirect('back')
}

//delete a selected user
module.exports.destroyUser = async function(req, res){
    const emp = await Employee.findOne({ADID: req.body.ADID});
    await Review.findByIdAndDelete(emp.id);
    emp.remove();
    return res.redirect('back');
}

//add employee object id's to pending reviews
module.exports.addPendingReviews = async function(req, res){
    const employee = await Employee.findOne({ADID: req.body.employeeID});
    if(typeof(req.body.pendingReviews) === 'string'){
        employee.pendingReviews.push(req.body.pendingReviews);
    }else{
        for(let i of req.body.pendingReviews){
            employee.pendingReviews.push(i);
        }
    }
    
    employee.save();
    return res.redirect('back')
}

//submit a review
module.exports.submitReview = async function(req, res){
    // req.body.employee is the employee that is reviewed
    const review = await Review.create(req.body);
    const employee = await Employee.findById(req.body.employee);
    employee.reviews.push(review);
    employee.save();

    const reviewingEmployee = await Employee.findById(req.user.id);
    const index = reviewingEmployee.pendingReviews.indexOf(req.body.employee);
    reviewingEmployee.pendingReviews.splice(index, 1);
    reviewingEmployee.save();

    return res.redirect('back');
}

//update a review
module.exports.updateReview = async function(req, res){
    const review = await Review.findByIdAndUpdate(req.body.reviewId, {content: req.body.content});
    return res.redirect('back')
}