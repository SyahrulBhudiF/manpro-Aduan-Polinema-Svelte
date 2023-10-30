import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch }) => {
	if (locals.user != null) {
		if (locals.user.id == null) throw redirect(303, '/');
	} else throw redirect(303, '/');

	const responseReports = await fetch('/api/branda', { method: 'GET' });
	const jsonReports = await responseReports.json();

	const responseZone = await fetch('/api/branda/zona', { method: 'GET' });
	const jsonZone = await responseZone.json();

	const responseCategory = await fetch('/api/branda/kategori', { method: 'GET' });
	const jsonCategory = await responseCategory.json();

	const responseJumlahLaporan0 = await fetch('/api/laporan?status=0', { method: 'GET' });
	const jsonJumlahLaporan0 = await responseJumlahLaporan0.json();

	const responseJumlahLaporan1 = await fetch('/api/laporan?status=1', { method: 'GET' });
	const jsonJumlahLaporan1 = await responseJumlahLaporan1.json();

	if (jsonReports?.isErr) throw jsonReports.errMessage;

	if (jsonZone?.isErr) throw jsonZone.errMessage;

	if (jsonCategory?.isErr) throw jsonCategory.errMessage;

	if (jsonJumlahLaporan0?.isErr) throw jsonJumlahLaporan0.errMessage;

	if (jsonJumlahLaporan1?.isErr) throw jsonJumlahLaporan1.errMessage;

	return {
		user: locals.user,
		content: jsonReports.content,
		zone: jsonZone.content,
		category: jsonCategory.content,
		count_laporan_0: jsonJumlahLaporan0.content,
		count_laporan_1: jsonJumlahLaporan1.content
	};
};
