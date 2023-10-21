// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				email: string | null;
				username: string | null;
				id: string | null;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};