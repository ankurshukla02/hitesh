// const EventEmitter =  require('events');

// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', (arg) => {
// 	console.log('Listener called', arg);
// });

// logger.log('message');


// const http = require('http');

// const server = http.createServer((req, res)=>{
// 	if(req.url ==='/'){
// 		res.write('Hello');
// 		res.end();
// 	}

// 	if (req.url === '/api/c 
// 		res.write(JSON.stringify([1,2,3]));
// 		res.end();
// 	}

// });

// const server = http.createServer();

// server.on ('connection', (socket) => {
// 	console.log('New connection...');
// });

// server.listen(4000);

// console.log('Listening on port 4000...');


const express = require('express');
const bodyParser = require('body-Parser');
const path = require('path');
const expressValidator = require('express-Validator');
const mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
const app = express();

/*
var logger = function(res, req, next){
	console.log('Logging..');
	next();
}

app.use(logger);
*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));
 
app.use(function(req, res, next){
	res.locals.errors = null;
	next();
});


//express Validator 
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

// var users = [
// 	{
// 		id: 1,
// 		title: '4 Reasons why reputation monitoring is important for Healthcare Industry?',
// 		first_name:'John',
// 		last_name: 'Doe',
// 		date: '10-3-2018',
// 		email: 'john@gmail.com',
// 		description: 'Early morning Give warm water to your business regularly in the morning- Dietitians and nutritionist recommends having warm water in the morning time to lose weight; to keep yourself healthy and to look presentable likewise business needs warm and quick view to all the channels by the admin. Admin should check all the social media platforms',

// 	},
// 	{
// 		id: 2,
// 		title: 'To know the difference between your competitors and you?',
// 		first_name:'Bob',
// 		last_name: 'Jonshan',
// 		date: '18-3-2018',
// 		email: 'bob@gmail.com',
// 		description: 'With computerized innovation continually building up, the healthcare service scenario is changing, creating modern consumer behaviour. The sudden hike in the innovation of portable or mobile phones and open healthcare gadgets give clients more control over the choices of their care like never before. 8 out of 10 people check online reviews or doctor’s feedback',

// 	},

// 	{
// 		id: 3,
// 		title: 'How Digital marketers should feed their business',
// 		first_name:'Anky',
// 		last_name: 'Smith',
// 		date: '28-3-2018',
// 		email: 'ankur@gmail.com',
// 		description: 'Early morning Give warm water to your business regularly in the morning- Dietitians and nutritionist recommends having warm water in the morning time to lose weight; to keep yourself healthy and to look presentable likewise business needs warm and quick view to all the channels by the admin. Admin should check all the social media platforms',
// 	},
// 	{
// 		id: 1,
// 		title: '4 Reasons why reputation monitoring is important for Healthcare Industry?',
// 		first_name:'Vish',
// 		last_name: 'Jho',
// 		date: '30-3-2018',
// 		email: 'vish@gmail.com',
// 		description: 'Early morning Give warm water to your business regularly in the morning- Dietitians and nutritionist recommends having warm water in the morning time to lose weight; to keep yourself healthy and to look presentable likewise business needs warm and quick view to all the channels by the admin. Admin should check all the social media platforms',

// 	}

// ]



app.get('/', function(req, res){
	db.users.find(function(err, docs){
		res.render('index', {
			blog: 'Rank Me Online',
			users: docs
		});
	});	
});

app.post('/users/add', function(req, res){
	req.checkBody('title', 'Title is Required').notEmpty();
	req.checkBody('first_name', 'First Name is Required').notEmpty();
	req.checkBody('last_name', 'Last Name is Required').notEmpty();
	req.checkBody('date', 'Date Name is Required').notEmpty();
	req.checkBody('description', 'Description Name is Required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('index', {
			blog: 'Rank Me Online',
			users: users,
			errors: errors
		});
	}
	else{
		var newUser = {
		title: req.body.title,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		date: req.body.date,
		description: req.body.description,
	}

	db.users.insert(newUser, function(err, result ){
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});

	}	
});

app.listen(4000, function(){
	console.log('Listening on port 4000...');
});

// app.use((req, res, next) => {
// 	res.status(200).json({
// 		message: 'It\'s work!'
// 	});
// });

// module.exports = app;