import { connect } from '../Database/Connect';

interface CRUD_Payload {
	nim: string;
	category: number;
	urgentstate: number;
	zone: number;
	message: string;
	idLaporan: string;
	editorID: string;
}

export const getCountLaporan = async (status: boolean | null) => {
	const query =
		status != null
			? `SELECT COUNT([status]) jumlah_laporan FROM dbo.laporan WHERE [status] = ${Number(
					status
			  )} AND is_edited_mhs = 0 AND is_deleted_mhs = 0`
			: `SELECT COUNT([status]) jumlah_laporan FROM dbo.laporan WHERE is_edited_mhs = 0 AND is_deleted_mhs = 0`;

	const connection = await connect();
	const pool = connection.request();
	const result = await pool.query(query);

	return {
		isErr: false,
		errMessage: null,
		content: result.recordset[0]
	};
};

export const updateLaporanMHS = async (payload: CRUD_Payload) => {
	const { nim, category, message, urgentstate, zone, idLaporan, editorID } = payload;

	const query = `
	UPDATE dbo.laporan SET
	nim = CONVERT(varchar,'${nim}'),
	kategori = CONVERT(int,${category}),
	urgensi = CONVERT(int,${urgentstate}),
	id_zona = CONVERT(int,${zone}),
	pesan = CONVERT(text,'${message.toString()}'),
	is_edited_mhs = 1,
	edited_by_mhs = '${editorID}'
	WHERE id_laporan = '${idLaporan}'`;

	const connection = await connect();
	const pool = connection.request();
	const result = await pool.query(query);

	if (result.rowsAffected[0] > 0)
		return {
			isErr: false,
			errMessage: null,
			content: 'Update Complete'
		};

	return {
		isErr: true,
		errMessage: 'Something went wrong, cannot proceed query',
		content: null
	};
};
export const deleteLaporanMHS = async (payload: CRUD_Payload) => {
	const { idLaporan, editorID } = payload;

	const query = `
	UPDATE dbo.laporan SET
	is_deleted_mhs = 1,
	deleted_by_mhs = '${editorID}'
	WHERE id_laporan = '${idLaporan}'`;

	const connection = await connect();
	const pool = connection.request();
	const result = await pool.query(query);

	if (result.rowsAffected[0] > 0)
		return {
			isErr: false,
			errMessage: null,
			content: 'Delete Complete'
		};

	return {
		isErr: true,
		errMessage: 'Something went wrong, cannot proceed query',
		content: null
	};
};
