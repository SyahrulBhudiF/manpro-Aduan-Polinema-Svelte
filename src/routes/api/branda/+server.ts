import { connect } from '$lib/Server/Database/Connect';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	try {
		const connection = await connect();
		const pool = connection.request();
		const result = await pool.query(`SELECT * FROM dbo.DisplayBranda`);

		return json({ isErr: false, errMessage: null, content: result.recordset });
	} catch (error) {
		console.error(error);
		return json({ isErr: true, errMessage: error, content: null });
	}
};
