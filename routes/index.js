const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeeController = require('../controllers/employee_controller');

router.get('/', employeeController.login);
router.get('/sign-up', employeeController.signUp);
router.get('/home', passport.checkAuthentication, employeeController.home);
router.post('/create-employee', employeeController.createEmployee);
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/'}), employeeController.createSession);
router.get('/logout', passport.checkAuthentication, employeeController.logout);

router.get('/profile/:ADID', passport.checkAuthentication, employeeController.profile);


router.post('/update-user', passport.checkAuthentication, employeeController.updateUser)
router.post('/destroy-user', passport.checkAuthentication, employeeController.destroyUser);
router.post('/add-pending-reviews', passport.checkAuthentication, employeeController.addPendingReviews);
router.post('/submit-employee-review', passport.checkAuthentication, employeeController.submitReview)

module.exports = router;