import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user != null) throw redirect(303, '/');
};

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const nim = data.get('nim');
		const password = data.get('password');

		if (nim == null) return { isErr: true, errContnet: 'NIM should not empty' };
		if (password == null) return { isErr: true, errContnet: 'Password should not empty' };

		const response = await fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify({
				nim,
				password
			})
		});

		const jsonResponse = await response.json();
		if (jsonResponse.isErr)
			return { isLoggedIn: false, isErr: true, message: jsonResponse?.errMessage };

		cookies.set('token', jsonResponse.token, { path: '/', secure: true, maxAge: 86400 });
		// return { isLoggedIn: true, isErr: false, message: null };
		throw redirect(301, '/');
	},

	logout: async ({ cookies }) => {
		cookies
			.getAll()
			.map((value) =>
				value.name == 'token' ? cookies.delete(value.name, { path: '/', secure: true }) : value
			);
		return;
	}
};
