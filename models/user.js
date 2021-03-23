import bcrypt from 'bcrypt';
import { validateCredentials } from '../utils.js';
import { pool, queryPool } from '../db/dbconn.js';

// Get a users credentials by email and password
export async function getCredentials(email, password) {
	// Validate email and password
	validateCredentials(email, password);

	// Query to find user by email
	const userByEmailQuery = `
		SELECT * 
		FROM	users
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
export async function findById(userId) {
	// Query to find user by id
	const userById = `
		SELECT * 
		FROM users
		WHERE id = ${pool.escape(userId)}	
	`;

	// Execute query
	const user = await queryPool(userById);

	// Return the found user
	return user[0];
}

// Restricted resopnse
export async function restrictedRequest() {
	return 'this is a restricted response...';
}

// Update a users profile picture
export async function setProfilePicture(url, userId) {
	const setProfileQuery = `
		UPDATE USERS
		SET profile_url = ${pool.escape(url)}
		WHERE id = ${pool.escape(userId)}
	`;

	// Execute...
	await queryPool(setProfileQuery);
}

// Get all user info (a wrapper for findUserById)
export async function getProfileInfo(userId) {
	// Query to find user by id
	const userProfileQuery = `
		SELECT id, email, profile_url 
		FROM users
		WHERE id = ${pool.escape(userId)}	
	`;

	// Execute query
	const userProfileInfo = await queryPool(userProfileQuery);

	// Ensure there is a found user
	if (!userProfileInfo.length) {
		throw new Error('No user found');
	}
	// Return the found profile info
	return userProfileInfo[0];
}

// Get a list of all users
export async function getAllUsers() {
	// Query to get all users
	const allUsersQuery = `
		SELECT *
		FROM users
		LIMIT 1000
	`;

	// Execute query
	const allUsers = await queryPool(allUsersQuery);

	// Return all users
	return allUsers;
}
