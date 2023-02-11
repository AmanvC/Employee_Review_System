const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeeController = require('../controllers/employee_controller');

router.get('/', employeeController.login);
router.get('/sign-up', employeeController.signUp);
router.get('/home', passport.checkAuthentication, employeeController.home);
router.post('/create-employee', employeeController.createEmployee);
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/'}), employeeController.createSession)

module.exports = router;