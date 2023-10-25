import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch }) => {
	if (locals.user == null) throw redirect(301, '/login');
	if (locals.user.nim == null) throw redirect(301, '/login');

	const responseReports = await fetch('/api/branda', { method: 'GET' });
	const jsonReports = await responseReports.json();

	const responseZone = await fetch('/api/branda/zona', { method: 'GET' });
	const jsonZone = await responseZone.json();

	const responseCategory = await fetch('/api/branda/kategori', { method: 'GET' });
	const jsonCategory = await responseCategory.json();

	if (jsonReports?.isErr) throw jsonReports.errMessage;

	if (jsonZone?.isErr) throw jsonZone.errMessage;

	if (jsonCategory?.isErr) throw jsonZone.errMessage;

	console.log(jsonReports);
	console.log(jsonCategory);

	return {
		user: locals.user,
		content: jsonReports.content,
		zone: jsonZone.content,
		category: jsonCategory.content
	};
};
