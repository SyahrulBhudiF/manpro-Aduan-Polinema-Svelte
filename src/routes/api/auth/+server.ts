import { JWT_TOKEN_SERIALIZER } from '$env/static/private';
import { connect } from '$lib/Server/Database/Connect.js';
// import Cryptr  from 'cryptr'
import bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const POST = async ({ request, locals }) => {
	const body = await request.json();

	const token = jwt.sign({ userName: 'Udin', nim: body.nim }, JWT_TOKEN_SERIALIZER, {
		expiresIn: '1d'
	});

	const connection = await connect();
	const pool = connection.request();
	const result = await pool.query(`SELECT * FROM dbo.mahasiswa WHERE nim = '${body?.nim}'`);

	console.log(result);

	if (result.recordset.length < 1)
		return json({ isErr: true, errMessage: 'NIM Not found', token: null });

	const passwordMatch = await bcrypt.compare(body?.password, result.recordset[0]?.password);

	if (!passwordMatch)
		return json({ isErr: true, errMessage: 'Password are Incorrect', token: null });

	locals.user = {
		id: '224',
		nim: result.recordset[0].nim,
		username: result.recordset[0].nama
	};

	console.log(result.recordset);
	console.log(locals.user);

	return json({ isErr: false, errMessage: null, token: token });
};
