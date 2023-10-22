<script lang="ts">
	import logoPolinema from '$lib/Assets/logo-polinema.png';
	import { navigate } from '../../../../node_modules/svelte-routing';
	let hasLogin = false;

	const numberChars = /[A-Za-z]/i;

	let nim: string = '';

	let password: string = '';
	$: inputsHasValue = numberChars.test(nim) || !(nim.length === 10);

	function handleLogin() {
		hasLogin = true;
	}

	$: hasLogin ? navigate('/home') : '';
</script>

<div class="frame bg-white h-fit">
	<img src={logoPolinema} alt="logo-polinema" class="logos" />
	<h1 class="text-3xl font-JKTSans">Selamat Datang di Aduan!</h1>

	<form class="frame-input" method="">
		<!-- method harusnya post tapi karena tidak ada database maka dikosongkan -->
		<div class="nim-input">
			<label for="nim">NIM</label>
			<input type="text" id="nim" name="nim" required class="text-lg" bind:value={nim} />
		</div>
		<div class="password-input">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				class="text-2xl"
				bind:value={password}
			/>
		</div>
		<button
			class="submit-login disabled:bg-slate-400 bg-[#048F7B]"
			disabled={inputsHasValue}
			on:click={handleLogin}
		>
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
		margin-top: 5rem;
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
