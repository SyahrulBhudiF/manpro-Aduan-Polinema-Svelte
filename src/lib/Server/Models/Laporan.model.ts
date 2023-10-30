import { connect } from '../Database/Connect';

export const getCountLaporan = async (status: boolean | null) => {
	const query =
		status != null
			? `SELECT COUNT([status]) jumlah_laporan FROM dbo.laporan WHERE [status] = ${Number(status)}`
			: `SELECT COUNT([status]) jumlah_laporan FROM dbo.laporan`;

	const connection = await connect();
	const pool = connection.request();
	const result = await pool.query(query);

	return {
		isErr: false,
		errMessage: null,
		content: result.recordset[0]
	};
};
