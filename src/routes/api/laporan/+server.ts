import { connect } from '$lib/Server/Database/Connect.js';
import { json } from '@sveltejs/kit';
import mssql from 'mssql';

export const POST = async ({ request, locals }) => {
	try {
		const body = await request.formData();

		const connection = await connect();
		const pool = connection.request();

		console.log(body);

		const category = body.get('category')?.toString() ?? '1';
		const urgentstate = body.get('urgentstate')?.toString() ?? '1';
		const zone = body.get('urgentstate')?.toString() ?? '1';
		const message = body.get('urgentstate')?.toString() ?? '';

		const statement = `INSERT INTO dbo.laporan (nim,kategori,urgensi, id_zona,pesan,[status],created_at) VALUES(
            CONVERT(varchar,'${locals.user.nim?.toString()}'),
            CONVERT(int,${category}),
            CONVERT(int,${urgentstate}),
            CONVERT(int,${zone}),
            CONVERT(text,'${message.toString()}'),
            CONVERT(int,0),
            CONVERT(bigint,${Date.now() / 1000}))`;

		console.log(statement);

		const statementResult = await pool.input('category', mssql.Int, category).query(statement);

		console.log(statementResult);

		const effectedRow = statementResult.rowsAffected;
		if (effectedRow[0] < 1)
			return json({ isErr: true, errMessage: 'Failed to execute statement', content: null });

		return json({ isErr: false, errMessage: null, content: 'Laporan berhasil dibuat' });
	} catch (error) {
		console.error(error);
		return json({ isErr: true, errMessage: error, content: null });
	}
};
