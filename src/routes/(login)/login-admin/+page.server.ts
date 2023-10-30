import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user != null) {
		if (locals.user.id != null) throw redirect(303, '/');
	} else throw redirect(303, '/');
};

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (username == null) return { isErr: true, errContnet: 'Username should not empty' };
		if (password == null) return { isErr: true, errContnet: 'Password should not empty' };

		// console.log(username, password);

		const response = await fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});

		const jsonResponse = await response.json();
		if (jsonResponse.isErr)
			return { isLoggedIn: false, isErr: true, message: jsonResponse?.errMessage };

		cookies.set('token', jsonResponse.token, { path: '/', secure: true, maxAge: 86400 });
		// return { isLoggedIn: true, isErr: false, message: null };
		throw redirect(301, '/admin');
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
