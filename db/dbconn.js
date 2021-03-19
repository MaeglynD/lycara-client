import mysql from 'mysql';

export const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'lycara',
	waitForConnections: true,
});

export function queryPool(query) {
	return new Promise((resolve, reject) => {
		pool.query(query, (err, rows) => {
			if (err) {
				return reject(err);
			}

			resolve(rows);
		});
	});
}
