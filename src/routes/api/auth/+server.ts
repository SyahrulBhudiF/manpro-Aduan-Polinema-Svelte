import { JWT_TOKEN_SERIALIZER } from '$env/static/private';
import { login as adminLg } from '$lib/Server/Models/Admin.model.js';
import { login as mhsLg } from '$lib/Server/Models/Mahasiswa.model.js';
import { error, json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const POST = async ({ request, locals }) => {
	try {
		const body = await request.json();

		const hasUsername = Object.prototype.hasOwnProperty.call(body, 'username');
		const hasNIM = Object.prototype.hasOwnProperty.call(body, 'nim');
		/* eslint-disable  @typescript-eslint/no-explicit-any */
		let loginResult: any | null = null;
		let token;

		if (hasUsername && !hasNIM) {
			loginResult = await adminLg({ username: body?.username, password: body?.password });
		}

		if (hasNIM && !hasUsername) {
			loginResult = await mhsLg({ nim: body?.nim, password: body?.password });
		}

		// console.log(loginResult);

		if (loginResult.isErr) {
			throw error(404, { message: loginResult.errMessage });
		}

		if (!loginResult.isErr && loginResult.content != null) {
			token = jwt.sign(
				{
					name: loginResult.content.name,
					id: loginResult.content.id,
					category: loginResult.content.category
				},
				JWT_TOKEN_SERIALIZER,
				{
					expiresIn: '1d'
				}
			);

			locals.user = {
				id: loginResult.content.id,
				name: loginResult.content.name,
				category: loginResult.content.category
			};
		}

		return json({ isErr: false, errMessage: null, token: token });
	} catch (err) {
		/* eslint-disable @typescript-eslint/ban-ts-comment */
		//@ts-ignore
		throw error(404, { message: err });
	}
};
