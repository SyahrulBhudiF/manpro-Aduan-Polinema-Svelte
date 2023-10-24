import { JWT_TOKEN_SERIALIZER } from '$env/static/private';
import { connect } from '$lib/Server/Database/Connect.js';
// import Cryptr  from 'cryptr'
import bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const POST = async ({ request, locals }) => {
	try {
		const body = await request.json();

		const connection = await connect();
		const pool = connection.request();
		const result = await pool.query(`SELECT * FROM dbo.mahasiswa WHERE nim = '${body?.nim}'`);

		console.log(result);
		console.log(result.recordset[0].nama);

		if (result.recordset.length < 1)
			return json({ isErr: true, errMessage: 'NIM Not found', token: null });

		const passwordMatch = await bcrypt.compare(body?.password, result.recordset[0]?.password);

		if (!passwordMatch)
			return json({ isErr: true, errMessage: 'Password are Incorrect', token: null });

		let token;
		if (result.recordset.length > 0)
			token = jwt.sign(
				{ userName: result.recordset[0].nama, nim: result.recordset[0].nim },
				JWT_TOKEN_SERIALIZER,
				{
					expiresIn: '1d'
				}
			);

		locals.user = {
			id: '224',
			nim: result.recordset[0].nim,
			username: result.recordset[0].nama
		};

		console.log(result.recordset);
		console.log(locals.user);

		return json({ isErr: false, errMessage: null, token: token });
	} catch (error) {
		return json({ isErr: true, errMessage: error, token: null });
	}
};
