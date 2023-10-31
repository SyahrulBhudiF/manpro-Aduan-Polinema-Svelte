import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch }) => {
	if (locals.user == null) throw redirect(301, '/login');
	if (locals.user.id == null) throw redirect(301, '/login');

	const responseReports = await fetch('/api/branda', { method: 'GET' });
	const jsonReports = await responseReports.json();

	const responseZone = await fetch('/api/branda/zona', { method: 'GET' });
	const jsonZone = await responseZone.json();

	const responseCategory = await fetch('/api/branda/kategori', { method: 'GET' });
	const jsonCategory = await responseCategory.json();

	if (jsonReports?.isErr) throw jsonReports.errMessage;

	if (jsonZone?.isErr) throw jsonZone.errMessage;

	if (jsonCategory?.isErr) throw jsonZone.errMessage;

	return {
		user: locals.user,
		content: jsonReports.content,
		zone: jsonZone.content,
		category: jsonCategory.content
	};
};

export const actions = {
	create: async ({ fetch, request }) => {
		const formData = await request.formData();
		const category = formData.get('category')?.toString() ?? '1';
		const urgentstate = formData.get('urgentstate')?.toString() ?? '1';
		const zone = formData.get('zone')?.toString() ?? '1';
		const message = formData.get('message')?.toString() ?? '';

		const response = await fetch('/api/laporan', {
			method: 'POST',
			body: JSON.stringify({ category, urgentstate, zone, message })
		});
		const result = await response.json();

		console.log(result);

		return {
			isErr: result?.isErr,
			errMessage: result?.errMessage,
			content: result?.content
		};
	}
};
