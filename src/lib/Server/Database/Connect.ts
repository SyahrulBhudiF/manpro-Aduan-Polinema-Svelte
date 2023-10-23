import { DBNAME, DBPASSWORD, DBUSER } from '$env/static/private';
import mssql from 'mssql';

const sqlConfig = {
	user: DBUSER,
	password: DBPASSWORD,
	database: DBNAME,
	server: 'localhost',
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	},
	options: {
		encrypt: false, // for azure
		trustServerCertificate: true // change to true for local dev / self-signed certs
	}
};

export const connect = async (): Promise<mssql.ConnectionPool> => {
	return await mssql.connect(sqlConfig);
};
