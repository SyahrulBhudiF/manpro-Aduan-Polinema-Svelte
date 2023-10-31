import { connect } from '$lib/Server/Database/Connect.js';
import {
	deleteLaporanMHS,
	getCountLaporan,
	updateLaporanMHS
} from '$lib/Server/Models/Laporan.model.js';
import { error, json } from '@sveltejs/kit';
import mssql from 'mssql';

export const POST = async ({ request, locals }) => {
	try {
		const body = await request.json();

		const connection = await connect();
		const pool = connection.request();

		const category = body.category;
		const urgentstate = body.urgentstate;
		const zone = body.zone;
		const message = body.message;

		const statement = `INSERT INTO dbo.laporan (nim,kategori,urgensi, id_zona,pesan,[status],created_at) VALUES(
		    CONVERT(varchar,'${locals.user.id?.toString()}'),
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

export const GET = async ({ url }) => {
	try {
		const status = url.searchParams.get('status');

		if (status == null) throw error(400, { message: 'Status is Empty' });

		const result = await getCountLaporan(status.toLowerCase() === '1' ? true : false);

		// console.log(result);

		return json({ isErr: false, errMessage: null, content: result.content });
	} catch (error) {
		console.error(error);
		return json({ isErr: true, errMessage: error, content: null });
	}
};
// {
// 	nim: string;
// 	category: number;
// 	urgentstate: number;
// 	zone: number;
// 	message: string;
// }
export const PUT = async ({ request }) => {
	const body = await request.json();

	const result = await updateLaporanMHS(body);

	if (result.isErr) throw error(400, { message: result.errMessage! });

	return json({
		isErr: false,
		errMessage: null,
		content: result.content
	});
};
export const DELETE = async ({ request }) => {
	const body = await request.json();

	const result = await deleteLaporanMHS(body);

	if (result.isErr) throw error(400, { message: result.errMessage! });

	return json({
		isErr: false,
		errMessage: null,
		content: result.content
	});
};
