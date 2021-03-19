import * as User from '../controllers/user.js';

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
};

export default (app) => {
	app.route('/login')
		.post(User.login);

	app.route('/register')
		.post(User.register);

	app.route('/restrictedRequest')
		.get(isAuthenticated, User.restrictedRequest);
};
