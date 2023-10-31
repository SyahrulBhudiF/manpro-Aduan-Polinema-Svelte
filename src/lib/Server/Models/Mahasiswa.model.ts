import { connect } from '$lib/Server/Database/Connect.js';
import bcrypt from 'bcrypt';

interface login {
	nim: string | null;
	password: string | null;
}

export const login = async (
	body: login
): Promise<{
	isErr: boolean;
	errMessage: string | null;
	content: {
		name: string;
		id: string;
		category: string | null;
	} | null;
}> => {
	const { nim, password } = body;

	// console.log(body);

	if (nim == null) return { isErr: true, errMessage: 'NIM Not found', content: null };
	if (password == null) return { isErr: true, errMessage: 'Password are incorrect', content: null };

	const connection = await connect();
	const pool = connection.request();
	const result = await pool.query(`SELECT * FROM dbo.mahasiswa WHERE nim = '${nim}'`);

	if (result.recordset.length < 1)
		return { isErr: true, errMessage: 'NIM Not found', content: null };

	const passwordMatch = await bcrypt.compare(password!, result.recordset[0]?.password);

	if (!passwordMatch) return { isErr: true, errMessage: 'Password are Incorrect', content: null };

	return {
		isErr: false,
		errMessage: null,
		content: {
			name: result.recordset[0]?.nama,
			id: result.recordset[0]?.nim,
			category: null
		}
	};
};
