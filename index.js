// Dependency imports
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import passportConfig from './config/passport.js';
import routes from './routes/routes.js';

// Configure passport
passportConfig(passport);

// Setup server
const app = express();
const server = http.createServer(app);

// Allow from localhost origin
const cors = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	next();
};

// Fake lag
app.use((req, res, next) => setTimeout(next, 1000));

// Cors
app.use(cors);

// Urlencoded
app.use(express.urlencoded({
	extended: false,
}));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false,
}));

// Parse cookies, used for auth
app.use(cookieParser());

// Parse application/json
app.use(bodyParser.json());

// Log every api call
app.use(morgan('dev'));

// Express session
app.use(session({
	secret: 'basedsecret420_',
	resave: true,
	saveUninitialized: true,
}));

//
app.use(passport.initialize());

//
app.use(passport.session());

// Configures routes
routes(app, passport);

// Listen
server.listen(8081, () => {
	console.log('fuck it, we\'ll do it live (on port 8081)');
});
