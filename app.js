const express         = require('express');

const fileUpload      = require('express-fileupload');
const bodyParser      = require('body-parser');
const mysql           = require('mysql');

const knex = require('./knex/knex.js');

const path            = require('path');
const passport        = require('passport');
var cookieParser      = require('cookie-parser');
var session           = require('express-session');
var flash             = require('connect-flash');
var morgan            = require('morgan');


require('./config/passport.js')(passport); 

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const app = express();

const port = 2000;
const {searchPage} = require('./routes/noauth');

app.use(morgan('dev')); 
app.use(cookieParser()); 

app.set('port', process.env.port || port); 
app.set('views', __dirname + '/views'); 
app.set('public', __dirname + '/public'); 

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload()); 

app.use(session({secret:'max',saveUninitialized:false,resave:false}))
app.use(passport.initialize());
app.use(passport.session()); 

app.use(flash()); 


// app.get('/list', getHomePage);
app.get('/search', searchPage);

app.get('/type_search', function(req,res){
	let term 	=  req.query.search
	knex('books')
    .where('isbn_number','rlike',term)
    .then(rows => {
    	return res.json(rows);
    });
	
});


require('./routes/index.js')(app,passport);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});