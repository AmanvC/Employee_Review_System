const express = require('express');
const port = 5000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo')(session);
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({extended: true}));

const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.static('assets'));

app.use(session({
    name: 'ers',
    secret: 'employeeReviewSystem',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(`Error in mongo store: ${err}`);
        return;
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in starting the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})