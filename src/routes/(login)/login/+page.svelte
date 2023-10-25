<script lang="ts">
	import { Button, Modal } from 'carbon-components-svelte';
	import logoPolinema from '$lib/Assets/logo-polinema.png';
	import { redirect } from '@sveltejs/kit';
	import 'carbon-components-svelte/css/g90.css';
	import { onMount } from 'svelte';

	export let form;

	let hasLogin = false;
	let open = false;

	onMount(() => {
		open = form?.isErr ?? false;
	});

	const numberChars = /[A-Za-z]/i;

	let nim: string = '';

	let password: string = '';
	$: inputsHasValue = numberChars.test(nim) || !(nim.length === 10);

	if (form?.isLoggedIn) throw redirect(303, '/');
</script>

<Modal passiveModal bind:open modalHeading="ERROR" class="bg-white" danger on:open on:close>
	<h4 class="text-white text-center">
		{form?.message}
	</h4>
</Modal>

<div
	class="frame bg-white text-black my-[6.1%] laptop1:my-[5.87%] laptop2:my-[2.7%] laptop3:my-[8.57%]"
>
	<img src={logoPolinema} alt="logo-polinema" class="logos" />
	<h1 class="text-3xl font-JKTSans">Selamat Datang di Aduan!</h1>

	<form class="frame-input" method="post" action="?/login">
		<div class="nim-input">
			<label for="nim">NIM</label>
			<input type="text" id="nim" name="nim" required class="text-lg text-black" bind:value={nim} />
		</div>
		<div class="password-input">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				class="text-2xl text-black"
				bind:value={password}
			/>
		</div>
		<button class="submit-login disabled:bg-slate-400 bg-[#048F7B]" disabled={inputsHasValue}>
			<span class="submit-login-text">Masuk</span>
		</button>
	</form>
</div>

<style lang="postcss">
	.frame {
		display: flex;
		width: 36.5rem;
		min-width: 25rem;
		max-width: 62.5rem;
		padding: 3.75rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;

		border-radius: 1.25rem;
		background: #fff;
	}

	.logos {
		width: 9.625rem;
		height: 9.625rem;
	}

	.frame-input {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
		align-self: stretch;
	}

	.nim-input {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		align-self: stretch;
	}
	.password-input {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		align-self: stretch;
	}

	label {
		color: #121212;
		font-family: Plus Jakarta Sans;
		font-size: 1.25rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	#nim {
		display: flex;
		padding: 1rem 1.25rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		align-self: stretch;

		border-radius: 4rem;
		border: 1px solid #ededed;
		background: #fff;
	}
	#password {
		display: flex;
		padding: 1rem 1.25rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		align-self: stretch;

		border-radius: 4rem;
		border: 1px solid #ededed;
		background: #fff;
	}

	.submit-login {
		display: flex;
		padding: 1rem 1.25rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		align-self: stretch;

		border-radius: 4rem;
		border: 1px solid rgba(18, 18, 18, 0.2);
	}

	.submit-login-text {
		flex: 1 0 0;

		color: #fff;
		text-align: center;
		font-family: Plus Jakarta Sans;
		font-size: 1.25rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
</style>
