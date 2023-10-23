import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch }) => {
	if (locals.user == null) throw redirect(301, '/login');
	if (locals.user.nim == null) throw redirect(301, '/login');

	const response = await fetch('/api/branda', { method: 'GET' });
	const jsonResult = await response.json();

	if (jsonResult?.isErr) {
		throw jsonResult.errMessage;
	}

	// { isErr: true, errMessage: error, content: null }
	return { user: locals.user, content: jsonResult.content };
};
