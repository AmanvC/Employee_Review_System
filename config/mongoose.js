const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/employee_review_system');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to database'));

db.once('open', function(){
    console.log('Connection to database is successful');
});

module.exports = db;