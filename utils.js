// Regex to ensure valid emails
export const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Regex to ensure the password
export const passwordRegex = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

// Validate a email and a password
export const validateCredentials = (email, password) => {
	// Validate email
	if (!emailRegex.test(email)) {
		throw new Error('Invalid email');
	}

	// Validate password
	if (!passwordRegex.test(password)) {
		throw new Error('Invalid password');
	}
};
