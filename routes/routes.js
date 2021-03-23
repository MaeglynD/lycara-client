import * as User from '../controllers/user.js';

// Checks if a user is authenticated
const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
};

// Handles any thrown errors
const jsonError = (err, req, res) => {
	res.status(err.status || 500).json(err);
};

// Routes
export default (app) => {
	app.route('/login')
		.post(User.login, jsonError);

	app.route('/register')
		.post(User.register, jsonError);

	app.route('/restrictedRequest')
		.get(isAuthenticated, User.restrictedRequest, jsonError);

	app.route('/profile')
		.get(isAuthenticated, User.getProfileInfo, jsonError);

	app.route('/profile/picture')
		.put(isAuthenticated, User.setProfilePicture, jsonError);

	app.route('/users/all')
		.get(isAuthenticated, User.getAllUsers, jsonError);
};
