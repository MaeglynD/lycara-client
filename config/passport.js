import { Strategy as LocalStrategy } from 'passport-local';
import * as User from '../models/user.js';

export default (passport) => {
	// Serialize the user for the session
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// Deserialize user
	passport.deserializeUser(async (id, done) => {
		try {
			// Fidn user by id
			const user = await User.findById(id);

			//
			done(null, user);
		} catch (err) {
			//
			done(err);
		}
	});

	// Local passport strategy
	passport.use('isBased',
		new LocalStrategy(async (username, password, done) => {
			try {
				// Find user, will throw an error if the credentials are invalid
				const user = await User.getCredentials(username, password);

				//
				done(null, user);
			} catch (err) {
				//
				done(err);
			}
		}));
};
