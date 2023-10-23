<script lang="ts">
	import { onMount } from 'svelte';
	import ec1 from '$lib/Assets/Ellipse-4.svg';
	import ec2 from '$lib/Assets/Ellipse-5.svg';
	import search from '$lib/Assets/search-normal.svg';
	import x from '$lib/Assets/Frame.svg';
	import admin from '$lib/Assets/logo-polinema.png';
	import Card from '../../components/card.svelte';
	import { users } from './data';

	let laporanItems = ['Semua', 'UKT', 'Fasilitas', 'Kebijakan Akademik'];
	let isBerandaClicked: boolean = true;
	let isLaporanClicked: boolean = false;
	let activeIndex: number = 0;
	let isModalOpen: boolean = false;
	let selectedUserId: number | null = null;

	function handleBerandaClick() {
		isBerandaClicked = true;
		isLaporanClicked = false;
	}

	function handleLaporanClick() {
		isBerandaClicked = false;
		isLaporanClicked = true;
	}

	function handleClickLi(index: number) {
		activeIndex = index;
	}

	function openModal(userId: number) {
		isModalOpen = true;
		selectedUserId = userId;
	}

	function closeModal() {
		isModalOpen = false;
	}

	onMount(() => {
		isBerandaClicked = true;
		isLaporanClicked = false;
	});
</script>

<section class="flex flex-col w-full gap-6">
	<div class="flex gap-3">
		<span
			role="button"
			tabindex="0"
			class="button active:opacity-80"
			class:selected={isBerandaClicked}
			on:click={handleBerandaClick}
			on:keydown={handleBerandaClick}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				class="{isBerandaClicked ? 'stroke-none' : 'stroke-black'} fill-current"
			>
				<g id="vuesax/bold/3dcube">
					<g id="3dcube">
						<path
							id="Vector"
							d="M19.3299 5.68003L13.0599 2.30003C12.3999 1.94003 11.5999 1.94003 10.9399 2.30003L4.66993 5.68003C4.20993 5.93003 3.92993 6.41003 3.92993 6.96003C3.92993 7.50003 4.20993 7.99003 4.66993 8.24003L10.9399 11.62C11.2699 11.8 11.6399 11.89 11.9999 11.89C12.3599 11.89 12.7299 11.8 13.0599 11.62L19.3299 8.24003C19.7899 7.99003 20.0699 7.51003 20.0699 6.96003C20.0699 6.41003 19.7899 5.93003 19.3299 5.68003Z"
							fill="white"
						/>
						<path
							id="Vector_2"
							d="M9.91 12.79L4.07 9.87C3.62 9.65 3.1 9.67 2.68 9.93C2.25 10.2 2 10.65 2 11.15V16.66C2 17.61 2.53 18.47 3.38 18.9L9.21 21.82C9.41 21.92 9.63 21.97 9.85 21.97C10.11 21.97 10.37 21.9 10.6 21.76C11.03 21.5 11.28 21.04 11.28 20.54V15.03C11.29 14.07 10.76 13.21 9.91 12.79Z"
							fill="white"
						/>
						<path
							id="Vector_3"
							d="M21.32 9.9299C20.89 9.6699 20.37 9.6399 19.93 9.8699L14.1 12.7899C13.25 13.2199 12.72 14.0699 12.72 15.0299V20.5399C12.72 21.0399 12.97 21.4999 13.4 21.7599C13.63 21.8999 13.89 21.9699 14.15 21.9699C14.37 21.9699 14.59 21.9199 14.79 21.8199L20.62 18.8999C21.47 18.4699 22 17.6199 22 16.6599V11.1499C22 10.6499 21.75 10.1999 21.32 9.9299Z"
							fill="white"
						/>
					</g>
				</g>
			</svg>

			Beranda
		</span>
		<span
			role="button"
			tabindex="0"
			class="button active:opacity-80"
			class:selected={isLaporanClicked}
			on:click={handleLaporanClick}
			on:keydown={handleLaporanClick}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				class="{isLaporanClicked ? 'stroke-white' : 'stroke-none'} fill-current"
			>
				<g id="vuesax/outline/warning-2">
					<g id="warning-2">
						<path
							id="Vector"
							d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z"
							fill="#121212"
							fill-opacity="0.6"
						/>
						<path
							id="Vector_2"
							d="M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z"
							fill="#121212"
							fill-opacity="0.6"
						/>
						<path
							id="Vector_3"
							d="M12.0002 22.7501C11.3302 22.7501 10.6502 22.5801 10.0502 22.2301L4.11017 18.8001C2.91017 18.1001 2.16016 16.8101 2.16016 15.4201V8.58011C2.16016 7.19011 2.91017 5.90011 4.11017 5.20011L10.0502 1.77012C11.2502 1.07012 12.7402 1.07012 13.9502 1.77012L19.8902 5.20011C21.0902 5.90011 21.8402 7.19011 21.8402 8.58011V15.4201C21.8402 16.8101 21.0902 18.1001 19.8902 18.8001L13.9502 22.2301C13.3502 22.5801 12.6702 22.7501 12.0002 22.7501ZM12.0002 2.7501C11.5902 2.7501 11.1702 2.8601 10.8002 3.0701L4.86017 6.5001C4.12017 6.9301 3.66016 7.72011 3.66016 8.58011V15.4201C3.66016 16.2701 4.12017 17.0701 4.86017 17.5001L10.8002 20.9301C11.5402 21.3601 12.4602 21.3601 13.1902 20.9301L19.1302 17.5001C19.8702 17.0701 20.3302 16.2801 20.3302 15.4201V8.58011C20.3302 7.73011 19.8702 6.9301 19.1302 6.5001L13.1902 3.0701C12.8302 2.8601 12.4102 2.7501 12.0002 2.7501Z"
							fill="#121212"
							fill-opacity="0.6"
						/>
					</g>
				</g>
			</svg>
			Laporan Anda</span
		>
	</div>

	{#if isBerandaClicked}
		<section class="input w-full flex justify-between">
			<img src={ec1} alt="ec" />
			<div class="flex flex-col text-center align-middle justify-center gap-3 w-[17%]">
				<p class="text-[1.75rem] font-semibold text-white">Ingin ajukan pelaporan?</p>
				<p class="text-sm text-[#FFFFFF99]">
					Pastikan Anda mengajukan pelaporan dengan fakta dan norma yang sesuai, ya.
				</p>
				<div class="mt-5">
					<span
						role="button"
						tabindex="0"
						class="bg-[#048f7b] px-6 py-3 w-fit text-white rounded-md active:opacity-80"
						on:click={handleLaporanClick}
						on:keydown={handleLaporanClick}
					>
						Buat Laporan</span
					>
				</div>
			</div>
			<img src={ec2} alt="ec" />
		</section>

		<section class="mainContent">
			<p class="text-[#121212] text-xl font-semibold">Laporan yang sering diajukan</p>
			<div class="flex justify-between">
				<ul class="flex gap-4">
					{#each laporanItems as item, index}
						<li>
							<button
								class="navLi {activeIndex === index ? 'selected' : ''}"
								on:click={() => handleClickLi(index)}
							>
								{item}
							</button>
						</li>
					{/each}
				</ul>
				<div class="flex navLi gap-2">
					<input
						type="search"
						name="search"
						id="search"
						placeholder="Cari berdasarkan kata"
						class="outline-none"
					/>
					<img src={search} alt="search" />
				</div>
			</div>
			<div class="grid grid-cols-3 gap-4">
				{#each users as user}
					{#if activeIndex === user.index}
						<Card {user} {openModal} />
					{:else if activeIndex === user.all}
						<Card {user} {openModal} />
					{/if}
					{#if isModalOpen && selectedUserId === user.id}
						<div class="card-modal">
							<div
								class="flex flex-col justify-center align-middle bg-white p-8 w-[40%] rounded-xl"
							>
								<div class="flex justify-between mx-5 mb-4">
									<p class="text-[#121212] text-xl font-semibold">Detail Laporan</p>

									<button class="btn" on:click={closeModal}><img src={x} alt="close" /></button>
								</div>

								<div class="flex flex-col p-6 gap-5">
									<div class="flex">
										<img src={user.profile} alt="profile" class="p-2 bg-[#F5F5F5] rounded-full" />

										<div class="flex flex-col">
											<p class="text-sm text-[#121212] font-semibold">{user.name}</p>
											<p class="text-xs text-black text-opacity-40 font-normal">{user.date}</p>
										</div>
									</div>

									<span
										class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
										>{user.category}</span
									>

									<p class="text-black text-opacity-70 text-justify">{user.text}</p>
								</div>

								<p class="text-[#121212] text-xl font-semibold mx-5 mb-5">Respon</p>

								<div class="flex gap-4 align-baseline mx-6 mb-4">
									<img src={admin} alt="admin.png" class="w-9" />

									<div class="flex flex-col">
										<span class="text-[#121212] font-[600] text-sm">Admin Polinema</span>
										<span class="font-medium text-xs text-black text-opacity-40"
											>{user.dateRespon}</span
										>
									</div>
								</div>

								<p class="text-black text-opacity-70 text-justify mx-6">{user.textRespon}</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</section>
	{:else if isLaporanClicked}
		<div class="input w-full flex justify-between" />
	{/if}
</section>

<style lang="postcss">
	.button {
		display: flex;
		padding: 0.75rem 1.5rem;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		border-radius: 0.3125rem;
		cursor: pointer;
		border: 1px solid #ededed;
		transition: 0.3s ease-in-out;
	}

	.button.selected {
		background-color: #048f7b;
		color: white;
	}

	.input {
		height: 13.0625rem;
		flex-shrink: 0;
		border-radius: 0.75rem;
		background: #121212;
	}

	.mainContent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem;
		border-radius: 1.25rem;
		border: 1px solid #ededed;
		background: #fff;
	}

	.navLi {
		cursor: pointer;
		padding: 0.625rem 1.5rem;
		border-radius: 6.25rem;
		border: 1px solid #ededed;
		transition: 0.25s ease-in-out;
	}

	.navLi.selected {
		background-color: black;
		color: white;
	}

	.card-modal {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		background-color: rgba(0, 0, 0, 0.1);
		animation: fade-in 0.5s ease forwards;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
