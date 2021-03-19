import bcrypt from 'bcrypt';
import { validateCredentials } from '../utils.js';
import { pool, queryPool } from '../db/dbconn.js';

// Get a users credentials by email and password
export async function getCredentials(email, password) {
	// Validate email and password
	validateCredentials(email, password);

	// Query to find user by email
	const userByEmailQuery = `
		SELECT * FROM	users
		WHERE email = ${pool.escape(email)}
		LIMIT 1
	`;

	// Execute query
	const user = await queryPool(userByEmailQuery);

	// If the email isn't existent in the DB
	if (!user.length) {
		throw new Error('Invalid credentials');
	}

	// If the password given isn't the same as the password in the DB
	if (!bcrypt.compare(password, user[0].password)) {
		throw new Error('Invalid credentials');
	}

	// Return the found user
	return user[0];
}

// Register a user
export async function register(email, password) {
	// Validate email and password
	validateCredentials(email, password);

	// Encrypt the password
	const encryptedPassword = await bcrypt.hash(password, 10);

	// Query to add a user to the db
	const registerQuery = `
		INSERT INTO users (
			email,
			password
		)
		VALUES (
			${pool.escape(email)},
			${pool.escape(encryptedPassword)}
		)
	`;

	// Execute query
	await queryPool(registerQuery);
}

// Find a user by id
export async function findById(id) {
	// Query to find user by id
	const userById = `
		SELECT * FROM users
		WHERE id = ${pool.escape(id)}	
	`;

	// Execute query
	const user = await queryPool(userById);

	// Return the found user
	return user;
}

// Restricted resopnse
export async function restrictedRequest() {
	return 'this is a restricted response...';
}
