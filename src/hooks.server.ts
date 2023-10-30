import { JWT_TOKEN_SERIALIZER } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const handle = async ({ event, resolve }) => {
	if (event.locals.user == null) {
		event.locals.user = {
			id: null,
			name: null,
			category: null
		};
	}

	if (event.cookies.getAll().map((value) => value.name == 'token')) {
		const cookieToken = event.cookies.get('token') ?? null;

		const token = cookieToken != null ? jwt.verify(cookieToken, JWT_TOKEN_SERIALIZER) : null;

		if (token == null) return resolve(event);
		if (typeof token === 'string') {
			throw new Error('Something went wrong');
		}

		event.locals.user = {
			id: token?.id,
			name: token?.name,
			category: token?.category
		};
	}

	return resolve(event);
};
