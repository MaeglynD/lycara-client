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
		const { username, password } = req.body;

		// Invoke method to register a user
		await User.register(username, password);

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

export async function setProfilePicture(req, res, next) {
	try {
		// Get url from body
		const { url } = req.body;

		// We only store urls up to 500 characters in length
		if (url.length > 500) {
			throw new Error('URL too long');
		}

		// Set the profile picture (if anything goes wrong an error will be thrown)
		await User.setProfilePicture();

		// return everything OK
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
}

export async function getProfileInfo(req, res, next) {
	try {
		// Get userId from the params, if there is none then we'll use
		// the req.user's id
		let userId = req.user.id;

		// Does the params have a userId property...
		if (req.params.hasOwnProperty('userId')) {
			// eslint-disable-next-line no-unused-vars
			userId = parseInt(req.params.userId);
		}

		// Throw an error if the user Id isn't valid
		if (!userId) {
			throw new Error('Invalid user ID');
		}

		// Request profile info...
		const profileInfo = await User.getProfileInfo(userId);

		// Return info
		return res.json({ ...profileInfo });
	} catch (err) {
		next(err);
	}
}

export async function getAllUsers(req, res, next) {
	try {
		// Fetch all the users
		const allUsers = await User.getAllUsers();

		// Return info
		return res.json({ ...allUsers });
	} catch (err) {
		next(err);
	}
}
