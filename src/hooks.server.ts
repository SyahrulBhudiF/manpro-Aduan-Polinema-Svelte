import { JWT_TOKEN_SERIALIZER } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const handle = async ({ event, resolve }) => {
	if (event.cookies.getAll().length < 1) return resolve(event);

	if (event.locals.user == null) {
		event.locals.user = {
			id: null,
			nim: null,
			username: null
		};
	}

	if (event.cookies.getAll().map((value) => value.name == 'token')) {
		const cookieToken = event.cookies.get('token') ?? null;

		const token = cookieToken != null ? jwt.verify(cookieToken, JWT_TOKEN_SERIALIZER) : null;

		if (token == null) return resolve(event);
		if (typeof token === 'string') {
			throw new Error('Something went wrong');
		}

		console.log(token);

		event.locals.user = {
			id: '1',
			nim: token?.nim,
			username: token?.userName
		};
	}

	console.log(event.locals.user);

	return resolve(event);
};
