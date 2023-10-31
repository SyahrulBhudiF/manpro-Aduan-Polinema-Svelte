import { redirect } from '@sveltejs/kit';
import generateUUID from 'generate-unique-id';

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

	console.log(generateUUID({ length: 50, useLetters: true }));

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
	},
	update: async ({ fetch, request, locals }) => {
		const formData = await request.formData();
		const nim = formData.get('nim')?.toString() ?? '1';
		const category = formData.get('category')?.toString() ?? '1';
		const urgentstate = formData.get('urgentstate')?.toString() ?? '1';
		const zone = formData.get('zone')?.toString() ?? '1';
		const message = formData.get('message')?.toString() ?? '';
		const idLaporan = formData.get('id_laporan')?.toString() ?? '';
		const editorID = locals.user.id;

		const response = await fetch('/api/laporan', {
			method: 'PUT',
			body: JSON.stringify({ nim, category, urgentstate, zone, message, idLaporan, editorID })
		});
		const result = await response.json();

		console.log(result);

		return {
			isErr: result?.isErr,
			errMessage: result?.errMessage,
			content: result?.content
		};
	},
	delete: async ({ fetch, request, locals }) => {
		const formData = await request.formData();
		const idLaporan = formData.get('id_laporan')?.toString() ?? '';
		const editorID = locals.user.id;

		const response = await fetch('/api/laporan', {
			method: 'DELETE',
			body: JSON.stringify({
				nim: null,
				category: null,
				urgentstate: null,
				zone: null,
				message: null,
				idLaporan,
				editorID
			})
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
