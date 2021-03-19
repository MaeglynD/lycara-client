import passport from 'passport';
import * as User from '../models/user.js';

export async function login(req, res, next) {
	passport.authenticate('isBased', async (err, user, info) => {
		// Error
		if (err) {
			return next(err);
		}

		// If users not found, return 404
		if (!user) {
			return res.sendStatus(404);
		}

		await req.logIn(user, (err) => {
			if (err) return next(err);

			res.sendStatus(200);
		});
	})(req, res, next);
}

export async function register(req, res, next) {
	try {
		// Get the credentials from the body
		const { email, password } = req.body;

		// Invoke method to register a user
		await User.register(email, password);

		// Return OK
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
}

export async function restrictedRequest(req, res, next) {
	try {
		// invoke method to register a user
		const restrictedResult = await User.restrictedRequest();

		// Return OK
		res.json({ restrictedResult });
	} catch (err) {
		next(err);
	}
}
