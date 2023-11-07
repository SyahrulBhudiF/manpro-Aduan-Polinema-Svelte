<script lang="ts">
	import profile from '$lib/Assets/profile.png';
	import arrow from '$lib/Assets/arrow-down.svg';
	import questionPict from '$lib/Assets/user-octagon.svg';
	import PersonExamine from '$lib/Assets/PersonExamine.svelte';

	import { onMount } from 'svelte';
	import ec1 from '$lib/Assets/Ellipse-4.svg';
	import ec2 from '$lib/Assets/Ellipse-5.svg';
	import search from '$lib/Assets/search-normal.svg';
	import x from '$lib/Assets/Frame.svg';
	import admin from '$lib/Assets/logo-polinema.png';
	import Card from '$lib/Components/card.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Modal } from 'carbon-components-svelte';

	export let data;
	export let form;

	let laporanItems = [{ name: 'Semua', id: 0 }];
	let isBerandaClicked: boolean = true;
	let isLaporanClicked: boolean = false;
	let activeIndex: number = 0;
	let isModalOpen: boolean = false;
	let selectedUserId: number;
	let modalLaporan: { target: any | null; show: boolean } = { target: null, show: false };

	let selectedLP: any | null = null;

	let searchValue: string | null = null;
	let searchEl: HTMLInputElement | null = null;

	let open = false;

	data.category != null
		? data.category.map((value: any) =>
				laporanItems.push({ name: value.nama_kategori, id: value.id_kategori })
		  )
		: null;

	$: formData = $page.form;

	const formCompleteTrigger = () => {
		if (formData?.isErr) open = true;
	};

	const searchTextChange = (component: HTMLInputElement | null): void => {
		// console.log(component?.value);
		searchValue = component?.value != undefined ? component?.value : null;
	};

	if (formData != null || formData != undefined) formCompleteTrigger();

	function handleBerandaClick() {
		isBerandaClicked = true;
		isLaporanClicked = false;
	}

	function handleLaporanClick() {
		isBerandaClicked = false;
		isLaporanClicked = true;
	}

	const triggerForm = (target: string): void => {
		isBerandaClicked = false;
		isLaporanClicked = true;

		setTimeout(() => {
			modalLaporan = { show: true, target: target };
		}, 200);
	};

	const openForm = (target: string): void => {
		modalLaporan = { show: true, target: target };
	};

	const openDetailLP = (userId: number) => {
		data.content.map((value: any) => {
			if (value.id_laporan == userId) selectedLP = value;
		});
	};

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

	$: if (form != null) {
		//kubenarkan
		setTimeout(() => {
			form = null;
		}, 5000);
	}
</script>

{#if form != null}
	<div
		class="fixed flex flex-col p-2 bg-white shadow-md hover:shodow-lg rounded-2xl h-20 mt-5 mr-5 right-0"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div class="flex flex-col ml-3">
					<div class="font-medium leading-none">
						{form?.isErr ? 'Error' : 'Info'}
					</div>
					<p class="text-sm text-gray-600 leading-none mt-1">
						{form?.content}
					</p>
				</div>
			</div>
			<button
				class="flex-no-shrink bg-red-500 px-1 ml-4 py-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
				on:click={() => (form = null)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5" viewBox="0 0 24 24"
					><path
						d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"
					/><path
						d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"
					/></svg
				>
			</button>
		</div>
	</div>
{/if}
<div class={isModalOpen || modalLaporan.show ? 'overflow-hidden max-h-screen' : ''}>
	<nav class="nav bg-[#364150] {isModalOpen ? 'blur' : ''}">
		<h1 class="text-white textLogo">ADUAN <span class="text-[#00C7FF]">POLINEMA</span></h1>
		<div class="flex gap-4 align-baseline cursor-pointer">
			<img src={profile} alt="profile.png" />
			{#if data.user != null}
				<div class="flex flex-col">
					<span class="text-white font-[600] text-sm">{data.user.name}</span>
					<span class="font-medium text-xs text-[#FFFFFF99]">{data.user.id}</span>
				</div>
				<img src={arrow} alt="arrow" class="w-6 h-6 cursor-pointer" />
			{/if}
		</div>
	</nav>
	<div class="flex justify-center">
		<div class="flex justify-start align-middle w-[96%] h-fit py-[1.48rem]">
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
							class={!isLaporanClicked ? 'stroke-current' : 'stroke-white'}
						>
							<g id="vuesax/outline/warning-2">
								<g id="warning-2">
									<path
										id="Vector"
										d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z"
										class={!isLaporanClicked ? 'fill-[#121212]' : 'fill-white'}
									/>
									<path
										id="Vector_2"
										d="M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z"
										class={!isLaporanClicked ? 'fill-[#121212]' : 'fill-white'}
									/>
									<path
										id="Vector_3"
										d="M12.0002 22.7501C11.3302 22.7501 10.6502 22.5801 10.0502 22.2301L4.11017 18.8001C2.91017 18.1001 2.16016 16.8101 2.16016 15.4201V8.58011C2.16016 7.19011 2.91017 5.90011 4.11017 5.20011L10.0502 1.77012C11.2502 1.07012 12.7402 1.07012 13.9502 1.77012L19.8902 5.20011C21.0902 5.90011 21.8402 7.19011 21.8402 8.58011V15.4201C21.8402 16.8101 21.0902 18.1001 19.8902 18.8001L13.9502 22.2301C13.3502 22.5801 12.6702 22.7501 12.0002 22.7501ZM12.0002 2.7501C11.5902 2.7501 11.1702 2.8601 10.8002 3.0701L4.86017 6.5001C4.12017 6.9301 3.66016 7.72011 3.66016 8.58011V15.4201C3.66016 16.2701 4.12017 17.0701 4.86017 17.5001L10.8002 20.9301C11.5402 21.3601 12.4602 21.3601 13.1902 20.9301L19.1302 17.5001C19.8702 17.0701 20.3302 16.2801 20.3302 15.4201V8.58011C20.3302 7.73011 19.8702 6.9301 19.1302 6.5001L13.1902 3.0701C12.8302 2.8601 12.4102 2.7501 12.0002 2.7501Z"
										class={!isLaporanClicked ? 'fill-[#121212]' : 'fill-white'}
									/>
								</g>
							</g>
						</svg>
						Laporan Anda</span
					>
				</div>

				{#if isBerandaClicked}
					<section class="input w-full h-[20%] flex justify-between align-middle">
						<img
							src={ec1}
							alt="ec"
							class="w-[10%] laptop1:w-[15%] laptop2:w-[18%] laptop3:w-[18%]"
						/>
						<div
							class="flex flex-col text-center align-middle justify-center gap-3 w-[20%] p-4 laptop1:w-[25%] laptop2:w-[28%] laptop3:w-[28%]"
						>
							<p class="text-[1.75rem] font-semibold text-white">Ingin ajukan pelaporan?</p>
							<p class="text-sm text-[#FFFFFF99]">
								Pastikan Anda mengajukan pelaporan dengan fakta dan norma yang sesuai, ya.
							</p>
							<div class="mt-5">
								<span
									role="button"
									tabindex="0"
									class="bg-[#048f7b] px-6 py-3 w-fit text-white rounded-md active:opacity-80"
									on:click={() => triggerForm('createLP')}
									on:keydown
								>
									Buat Laporan</span
								>
							</div>
						</div>
						<img
							src={ec2}
							alt="ec"
							class="w-[10%] laptop1:w-[15%] laptop2:w-[18%] laptop3:w-[18%]"
						/>
					</section>

					<section class="mainContent">
						<p class="text-[#121212] text-xl font-semibold">Laporan yang sering diajukan</p>
						<div class="flex justify-between">
							<ul class="flex gap-4">
								{#each laporanItems as { name, id }, index}
									<li>
										<button
											class="navLi {activeIndex === index ? 'selected' : ''}"
											on:click={() => handleClickLi(index)}
										>
											{name}
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
									bind:this={searchEl}
									on:input={(event) => searchTextChange(event.currentTarget)}
								/>
								<img src={search} alt="search" />
							</div>
						</div>
						<div class="grid grid-cols-3 gap-4">
							{#each data.content as { id_laporan, nama, pesan, jawaban, urgensi, kategori, status, created_at, answered_at, namaAdmin }, index}
								{#if searchValue !== null && new String(kategori)
										.toLowerCase()
										.includes(searchValue)}
									<Card
										id={id_laporan}
										profile={questionPict}
										name={nama}
										date={new Date(created_at * 1000).toLocaleDateString()}
										category={kategori}
										text={pesan}
										urgentState={Number.parseInt(urgensi)}
										{openModal}
									/>
								{:else if kategori === laporanItems[activeIndex].name && (searchValue === null || searchValue === '')}
									<Card
										id={id_laporan}
										profile={questionPict}
										name={nama}
										date={new Date(created_at * 1000).toLocaleDateString()}
										category={kategori}
										text={pesan}
										urgentState={Number.parseInt(urgensi)}
										{openModal}
									/>
								{:else if activeIndex === 0 && (searchValue === null || searchValue === '')}
									<Card
										id={id_laporan}
										profile={questionPict}
										name={nama}
										date={new Date(created_at * 1000).toLocaleDateString()}
										category={kategori}
										text={pesan}
										urgentState={Number.parseInt(urgensi)}
										{openModal}
									/>
								{/if}
								{#if isModalOpen && selectedUserId === id_laporan}
									<div style="display: none;">
										{setTimeout(() => {
											document.getElementById('modal-detail')?.classList.toggle('scale-0');
											document.getElementById('modal-detail')?.classList.toggle('scale-100');
										}, 1)}
									</div>
									<div class="card-modal" id="card-modal" style="backdrop-filter: blur(5px);">
										<div
											class="flex flex-col justify-center align-middle bg-white p-8 w-[40%] rounded-xl transition-all duration-100 ease-in origin-center scale-0 max-h-1/2 blur-none"
											id="modal-detail"
										>
											<div class="flex justify-between mx-5 mb-4">
												<p class="text-[#121212] text-xl font-semibold">Detail Laporan</p>

												<button class="btn" on:click={closeModal}
													><img src={x} alt="close" /></button
												>
											</div>

											<div class="flex flex-col p-6 gap-5 overflow-auto max-h-96">
												<div class="flex">
													<img
														src={questionPict}
														alt="profile"
														class="p-2 bg-[#F5F5F5] rounded-full"
													/>

													<div class="flex flex-col">
														<p class="text-sm text-[#121212] font-semibold">
															{nama.length > 4
																? nama.charAt(0) +
																  '*'.repeat(nama.length - 2) +
																  nama.substring(nama.length - 1)
																: nama.length == 1
																? nama
																: nama.charAt(0) + '*'}
														</p>
														<p class="text-xs text-black text-opacity-40 font-normal">
															{new Date(created_at * 1000).toLocaleDateString()}
														</p>
													</div>
												</div>
												<hr />

												<span
													class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
													>{kategori}</span
												>

												<p class="text-black text-opacity-70 text-justify max-h-40 overflow-auto">
													{pesan}
												</p>
											</div>

											{#if namaAdmin != null}
												<p class="text-[#121212] text-xl font-semibold mx-5 mb-5">Respon</p>

												<div class="w-full">
													<div class="flex gap-4 align-baseline mx-6 mb-4">
														<img src={admin} alt="admin.png" class="w-12 h-12" />
														<svg
															viewBox="0 0 16 16"
															xmlns="http://www.w3.org/2000/svg"
															class="fill-current w-5 absolute stroke-white bottom-[8.75rem] left-[5.5rem]"
														>
															<path
																d="M14.3733 7.16012L13.4667 6.10679C13.2933 5.90679 13.1533 5.53345 13.1533 5.26679V4.13345C13.1533 3.42679 12.5733 2.84679 11.8667 2.84679H10.7333C10.4733 2.84679 10.0933 2.70679 9.89334 2.53345L8.84 1.62679C8.38 1.23345 7.62667 1.23345 7.16 1.62679L6.11334 2.54012C5.91334 2.70679 5.53334 2.84679 5.27334 2.84679H4.12C3.41334 2.84679 2.83334 3.42679 2.83334 4.13345V5.27345C2.83334 5.53345 2.69334 5.90679 2.52667 6.10679L1.62667 7.16679C1.24 7.62679 1.24 8.37345 1.62667 8.83345L2.52667 9.89345C2.69334 10.0935 2.83334 10.4668 2.83334 10.7268V11.8668C2.83334 12.5735 3.41334 13.1535 4.12 13.1535H5.27334C5.53334 13.1535 5.91334 13.2935 6.11334 13.4668L7.16667 14.3735C7.62667 14.7668 8.38 14.7668 8.84667 14.3735L9.9 13.4668C10.1 13.2935 10.4733 13.1535 10.74 13.1535H11.8733C12.58 13.1535 13.16 12.5735 13.16 11.8668V10.7335C13.16 10.4735 13.3 10.0935 13.4733 9.89345L14.38 8.84012C14.7667 8.38012 14.7667 7.62012 14.3733 7.16012ZM10.7733 6.74012L7.55334 9.96012C7.46 10.0535 7.33334 10.1068 7.2 10.1068C7.06667 10.1068 6.94 10.0535 6.84667 9.96012L5.23334 8.34679C5.04 8.15345 5.04 7.83345 5.23334 7.64012C5.42667 7.44679 5.74667 7.44679 5.94 7.64012L7.2 8.90012L10.0667 6.03345C10.26 5.84012 10.58 5.84012 10.7733 6.03345C10.9667 6.22679 10.9667 6.54679 10.7733 6.74012Z"
																fill="#0071FF"
															/>
														</svg>
														<!-- {console.log(namaAdmin)} -->
														<div class="flex flex-col h-full gap-2">
															<span class="text-[#121212] font-[600] text-sm">{namaAdmin}</span>
															<span class="font-medium text-xs text-black text-opacity-40"
																>{new Date(answered_at * 1000).toLocaleDateString()}</span
															>
														</div>
													</div>
												</div>
												<p class="text-black text-opacity-70 text-justify mx-6">{jawaban}</p>
											{/if}
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</section>
				{:else if isLaporanClicked}
					<section class="mainContent">
						<div class="flex justify-between">
							<p class="text-[#121212] text-xl font-semibold">Laporan yang anda ajukan</p>
							<span
								role="button"
								tabindex="0"
								class="button active:opacity-80 bg-[#048F7B] text-white"
								on:click={() => {
									openForm('createLP');
								}}
								on:keydown
							>
								<svg
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									class="fill-current stroke-white w-[1.5rem]"
									><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" /><path
										d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
									/>
								</svg>
								Buat Laporan</span
							>
						</div>
						<hr />
						<div class="w-full flex justify-center align-middle">
							<table class="table-fixed w-full">
								<thead class="border-solid border-b-2 border-slate-200">
									<tr class="h-14">
										<th class="w-1/12"> Tanggal </th>
										<th class="w-2/12"> Kategori </th>
										<th class="w-4/12"> Pesan </th>
										<th class="w-1/12"> Urgensi </th>
										<th class="w-1/12"> Zona </th>
										<th class="w-1/12"> Status </th>
										<th class="w-1/12" />
									</tr>
								</thead>
								<tbody>
									{#each data.content as { id_laporan, nama, pesan, jawaban, urgensi, kategori, status, created_at, answered_at, namaAdmin, nama_zona, is_deleted_mhs, is_edited_mhs }, index}
										{#if is_deleted_mhs == 0 && is_edited_mhs == 0}
											<tr class="w-full text-center h-14 border-b-2 border-slate-200">
												<td>
													{new Date(created_at * 1000).toLocaleDateString()}
												</td>
												<td>
													<span class="col-pesan font-JKTSans font-semibold">
														{kategori}
													</span>
												</td>
												<td>
													<span
														class="col-pesan font-JKTSans font-semibold"
														style="font-weight: bold !important"
													>
														{#each pesan.split(' ') as value, index}
															{index > 7 ? '' : value + ' '}
														{/each}
														{pesan.split(' ').length > 7 ? '...' : ''}
													</span>
												</td>
												<td>
													<span class="col-pesan font-JKTSans font-semibold">
														{urgensi == 1
															? 'Low'
															: urgensi == 2
															? 'Intermediate'
															: urgensi == 3
															? 'High'
															: 'Urgent'}
													</span>
												</td>
												<td>
													<span class="col-pesan font-JKTSans font-semibold">
														{nama_zona}
													</span>
												</td>
												<td>
													{status == 0 ? 'Belum direspon' : 'Telah direspon'}
												</td>
												<td class="relative group">
													<span class="w-full h-full flex justify-end" role="button">
														<button class="col-pesan w-fit h-full">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
																class="fill-current w-7"
																><path
																	d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
																/></svg
															>
														</button>
													</span>
													<div
														class="inline-flex flex-col items-start gap-2 p-4 absolute scale-0 group-hover:scale-100 border shadow-[0px_10px_32px_0px_rgba(18,18,18,0.10)] rounded-lg border-solid border-[#EDEDED] bg-[#fff] right-2 z-50"
													>
														<button
															class="border-b-[1px] w-full pb-2 hover:text-[#00b4e6]"
															on:click={() => {
																openDetailLP(id_laporan);
																openForm('detailLP');
															}}>Detail</button
														>

														<button
															class="border-b-[1px] w-full pb-2 hover:text-yellow-500"
															on:click={() => {
																openDetailLP(id_laporan);
																openForm('updateLP');
															}}>Edit</button
														>

														<button
															on:click={() => {
																openDetailLP(id_laporan);
																openForm('deleteLP');
															}}
														>
															<span class="text-[#E14942] w-full"> Delete </span>
														</button>
													</div>
												</td>
											</tr>
										{/if}
									{/each}
								</tbody>
							</table>
						</div>
					</section>
				{/if}
			</section>
		</div>
	</div>
	{#if modalLaporan.target == 'createLP' && modalLaporan.show}
		<div class="opacity-0" style="display: none;">
			{setTimeout(() => {
				if (document.getElementById('card-modal')?.classList.contains('scale-0'))
					document.getElementById('card-modal')?.classList.toggle('scale-0');
				if (document.getElementById('card-modal')?.classList.contains('scale-100'))
					document.getElementById('card-modal')?.classList.toggle('scale-100');
			}, 1)}
		</div>
		<div class="card-modal scale-0 {modalLaporan.show ? 'backdrop-blur' : ''}" id="card-modal">
			<div
				class="flex flex-col justify-center align-middle bg-white p-8 w-[40%] rounded-xl transition-all duration-100 ease-in origin-center"
				id="modal-detail"
			>
				<div class="flex justify-between mx-5 mb-4">
					<p class="text-[#121212] text-xl font-semibold">Buat Laporan</p>

					<button
						class="btn"
						on:click={() => {
							modalLaporan = { show: false, target: null };
						}}><img src={x} alt="close" /></button
					>
				</div>
				<form
					method="post"
					class="w-full h-full flex justify-center align-middle"
					use:enhance
					action="?/create"
					on:submit={() => (modalLaporan = { show: false, target: null })}
				>
					<div class="form-contain">
						<div class="container-category">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Kategori
							</span>
							<div class="flex gap-2">
								{#each data.category as { id_kategori, nama_kategori }, idx}
									<label
										class="label-category peer-checked:border-blue-600 peer-checked:text-blue-600"
									>
										<input
											type="radio"
											name="category"
											class="radio-in"
											required
											value={id_kategori}
											id={nama_kategori}
										/>
										<span class="radio-text">
											{nama_kategori}
										</span>
									</label>
								{/each}
							</div>
						</div>
						<div class="container-level mt-[1.5rem] gap-2">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Urgensi
							</span>
							<div class="flex gap-2">
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										value="1"
										required
										id="low"
									/>
									<span class="radio-text"> Low </span>
								</label>
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										required
										value="2"
										id="intermediate"
									/>
									<span class="radio-text"> Intermediate </span>
								</label>
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										required
										value="3"
										id="high"
									/>
									<span class="radio-text"> High </span>
								</label>
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										required
										value="4"
										id="urgent"
									/>
									<span class="radio-text"> Urgent </span>
								</label>
							</div>
						</div>
						<div class="container-level mt-[1.5rem]">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Zona
							</span>
							<div class="flex">
								<select
									name="zone"
									id="zone"
									required
									class="selection-zone w-full mt-2 flex justify-between items-center self-stretch bg-transparent border-2 p-4 rounded-lg border-solid border-[#EDEDED] text-[#121212] text-sm not-italic font-semibold leading-[140%] font-JKTSans"
								>
									<option selected disabled class="font-semibold"> Pilih Zona </option>
									{#each data.zone as { id_zona, nama_zona }, idx}
										<option value={id_zona} class="font-semibold"> {nama_zona}</option>
									{/each}
								</select>
							</div>
						</div>
						<div class="container-level mt-[1.5rem] w-full">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Pesan
							</span>
							<div class="flex">
								<textarea
									name="message"
									id="message"
									rows="5"
									required
									placeholder="Masukkan pesan anda"
									class="w-full max-h-52 overflow-auto flex justify-center items-start gap-[2.1875rem] border p-3 rounded-[0.625rem] border-solid border-[#EFEFEF] font-JKTSans resize-none"
								/>
							</div>
						</div>
						<div class="flex w-full justify-center mt-10">
							<button
								class="button w-fit inline-flex justify-center items-center gap-2 px-6 py-3 rounded-[0.3125rem] bg-[#048F7B] text-white"
								type="submit"
							>
								Kirim Laporan
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
	{#if modalLaporan.target == 'detailLP' && modalLaporan.show}
		<div class="opacity-0" style="display: none;">
			{setTimeout(() => {
				if (document.getElementById('card-modal-detail')?.classList.contains('scale-0'))
					document.getElementById('card-modal-detail')?.classList.toggle('scale-0');
				if (document.getElementById('card-modal-detail')?.classList.contains('scale-100'))
					document.getElementById('card-modal-detail')?.classList.toggle('scale-100');
			}, 1)}
		</div>
		<div
			class="card-modal scale-0 {modalLaporan.show ? 'backdrop-blur' : ''}"
			id="card-modal-detail"
		>
			<div
				class="flex flex-col justify-center align-middle bg-white p-8 w-[40%] rounded-xl transition-all duration-100 ease-in origin-center"
				id="modal-detail"
			>
				<div class="flex justify-between mx-5 mb-4">
					<p class="text-[#121212] text-xl font-semibold">Detail Laporan</p>

					<button
						class="btn"
						on:click={() => {
							modalLaporan = { show: false, target: null };
						}}><img src={x} alt="close" /></button
					>
				</div>

				<div class="flex flex-col p-6 gap-5 overflow-auto max-h-96">
					<div class="flex">
						<img src={profile} alt="profile" class="p-2 bg-[#F5F5F5] rounded-full" />

						<div class="flex flex-col">
							<p class="text-sm text-[#121212] font-semibold">
								{selectedLP.nama}
							</p>
							<p class="text-xs text-black text-opacity-40 font-normal">
								{new Date(selectedLP.created_at * 1000).toLocaleDateString()}
							</p>
						</div>
					</div>
					<hr />

					<span class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
						>{selectedLP.kategori}</span
					>

					<p class="text-black text-opacity-70 text-justify max-h-40 overflow-auto">
						{selectedLP.pesan}
					</p>
				</div>

				<p class="text-[#121212] text-2xl font-medium mx-5 mb-5">Respon</p>
				{#if selectedLP.namaAdmin != null}
					<div class="w-full mb-5">
						<div class="flex gap-4 align-baseline mx-6 mb-4">
							<img src={admin} alt="admin.png" class="w-12 h-12" />
							<svg
								viewBox="0 0 16 16"
								xmlns="http://www.w3.org/2000/svg"
								class="fill-current w-5 absolute stroke-white bottom-[8.75rem] left-[5.5rem]"
							>
								<path
									d="M14.3733 7.16012L13.4667 6.10679C13.2933 5.90679 13.1533 5.53345 13.1533 5.26679V4.13345C13.1533 3.42679 12.5733 2.84679 11.8667 2.84679H10.7333C10.4733 2.84679 10.0933 2.70679 9.89334 2.53345L8.84 1.62679C8.38 1.23345 7.62667 1.23345 7.16 1.62679L6.11334 2.54012C5.91334 2.70679 5.53334 2.84679 5.27334 2.84679H4.12C3.41334 2.84679 2.83334 3.42679 2.83334 4.13345V5.27345C2.83334 5.53345 2.69334 5.90679 2.52667 6.10679L1.62667 7.16679C1.24 7.62679 1.24 8.37345 1.62667 8.83345L2.52667 9.89345C2.69334 10.0935 2.83334 10.4668 2.83334 10.7268V11.8668C2.83334 12.5735 3.41334 13.1535 4.12 13.1535H5.27334C5.53334 13.1535 5.91334 13.2935 6.11334 13.4668L7.16667 14.3735C7.62667 14.7668 8.38 14.7668 8.84667 14.3735L9.9 13.4668C10.1 13.2935 10.4733 13.1535 10.74 13.1535H11.8733C12.58 13.1535 13.16 12.5735 13.16 11.8668V10.7335C13.16 10.4735 13.3 10.0935 13.4733 9.89345L14.38 8.84012C14.7667 8.38012 14.7667 7.62012 14.3733 7.16012ZM10.7733 6.74012L7.55334 9.96012C7.46 10.0535 7.33334 10.1068 7.2 10.1068C7.06667 10.1068 6.94 10.0535 6.84667 9.96012L5.23334 8.34679C5.04 8.15345 5.04 7.83345 5.23334 7.64012C5.42667 7.44679 5.74667 7.44679 5.94 7.64012L7.2 8.90012L10.0667 6.03345C10.26 5.84012 10.58 5.84012 10.7733 6.03345C10.9667 6.22679 10.9667 6.54679 10.7733 6.74012Z"
									fill="#0071FF"
								/>
							</svg>
							<!-- {console.log(namaAdmin)} -->
							<div class="flex flex-col h-full gap-2">
								<span class="text-[#121212] font-[600] text-sm">{selectedLP.namaAdmin}</span>
								<span class="font-medium text-xs text-black text-opacity-40"
									>{new Date(selectedLP.answered_at * 1000).toLocaleDateString()}</span
								>
							</div>
						</div>
						<p class="text-black text-opacity-70 text-justify mx-6">
							{selectedLP.jawaban}
						</p>
					</div>
				{:else}
					<div class="w-full flex justify-center align-middle mb-5">
						<div class="w-full">
							<div class="flex w-full justify-center">
								<PersonExamine />
							</div>
							<div class="w-full flex">
								<span class="w-full h-full text-center">
									Belum ada respon, laporan anda masih diproses oleh admin
								</span>
							</div>
						</div>
					</div>
				{/if}
				<div class="flex w-full justify-center mt-10 gap-5">
					<button
						class="flex justify-center items-center gap-2 text-[#E14942] text-center text-sm not-italic font-semibold leading-normal px-6 py-3 font-JKTSans rounded-[0.3125rem] border border-[#d73e36]"
						type="submit"
						on:click={() => {
							modalLaporan = { show: false, target: null };
							triggerForm('deleteLP');
						}}
					>
						Hapus Laporan
					</button>
					<button
						class="button w-fit inline-flex justify-center items-center gap-2 px-6 py-3 rounded-[0.3125rem] bg-[#048F7B] text-white"
						type="submit"
						on:click={() => {
							modalLaporan = { show: false, target: null };
							triggerForm('updateLP');
						}}
					>
						Edit Laporan
					</button>
				</div>
			</div>
		</div>
	{/if}
	{#if modalLaporan.target == 'updateLP' && modalLaporan.show}
		<div class="opacity-0" style="display: none;">
			{setTimeout(() => {
				if (document.getElementById('card-modal-update')?.classList.contains('scale-0'))
					document.getElementById('card-modal-update')?.classList.toggle('scale-0');
				if (document.getElementById('card-modal-update')?.classList.contains('scale-100'))
					document.getElementById('card-modal-update')?.classList.toggle('scale-100');
			}, 100)}
		</div>
		<div
			class="card-modal scale-0 {modalLaporan.show ? 'backdrop-blur' : ''}"
			id="card-modal-update"
		>
			<div
				class="flex flex-col justify-center align-middle bg-white p-8 w-[40%] rounded-xl transition-all duration-100 ease-in origin-center"
				id="modal-detail"
			>
				<div class="flex justify-between mx-5 mb-4">
					<p class="text-[#121212] text-xl font-semibold">Edit Laporan</p>

					<button
						class="btn"
						on:click={() => {
							modalLaporan = { show: false, target: null };
						}}><img src={x} alt="close" /></button
					>
				</div>
				<form
					method="post"
					class="w-full h-full flex justify-center align-middle"
					use:enhance
					action="?/update"
					on:submit={() => (modalLaporan = { show: false, target: null })}
				>
					<div class="form-contain">
						<div class="container-category">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Kategori
							</span>
							<input
								type="text"
								name="id_laporan"
								id="id_laporan"
								readonly
								style="display: none;"
								value={selectedLP.id_laporan}
							/>
							<div class="flex gap-2">
								{#each data.category as { id_kategori, nama_kategori }, idx}
									<label
										class="label-category peer-checked:border-blue-600 peer-checked:text-blue-600"
									>
										<input
											type="radio"
											name="category"
											class="radio-in"
											required
											value={id_kategori}
											id={nama_kategori}
											checked={selectedLP.kategori == nama_kategori ? true : false}
										/>
										<span class="radio-text">
											{nama_kategori}
										</span>
									</label>
								{/each}
							</div>
						</div>
						<div class="container-level mt-[1.5rem] gap-2">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Urgensi
							</span>
							<div class="flex gap-2">
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										value="1"
										required
										id="low"
										checked={selectedLP.urgensi.toString() == '1' ? true : false}
									/>
									<span class="radio-text"> Low </span>
								</label>
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										required
										value="2"
										id="intermediate"
										checked={selectedLP.urgensi.toString() == '2' ? true : false}
									/>
									<span class="radio-text"> Intermediate </span>
								</label>
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										required
										value="3"
										id="high"
										checked={selectedLP.urgensi.toString() == '3' ? true : false}
									/>
									<span class="radio-text"> High </span>
								</label>
								<label class="label-category">
									<input
										type="radio"
										name="urgentstate"
										class="radio-in"
										required
										value="4"
										id="urgent"
										checked={selectedLP.urgensi.toString() == '4' ? true : false}
									/>
									<span class="radio-text"> Urgent </span>
								</label>
							</div>
						</div>
						<div class="container-level mt-[1.5rem]">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Zona
							</span>
							<div class="flex">
								<select
									name="zone"
									id="zone"
									required
									class="selection-zone w-full mt-2 flex justify-between items-center self-stretch bg-transparent border-2 p-4 rounded-lg border-solid border-[#EDEDED] text-[#121212] text-sm not-italic font-semibold leading-[140%] font-JKTSans"
								>
									<option selected disabled class="font-semibold"> Pilih Zona </option>
									{#each data.zone as { id_zona, nama_zona }, idx}
										<option
											value={id_zona}
											class="font-semibold"
											selected={selectedLP.nama_zona == nama_zona ? true : false}
										>
											{nama_zona}</option
										>
									{/each}
								</select>
							</div>
						</div>
						<div class="container-level mt-[1.5rem] w-full">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								Pesan
							</span>
							<div class="flex">
								<textarea
									name="message"
									id="message"
									rows="5"
									required
									placeholder="Masukkan pesan anda"
									class="w-full max-h-52 overflow-auto flex justify-center items-start gap-[2.1875rem] border p-3 rounded-[0.625rem] border-solid border-[#EFEFEF] font-JKTSans resize-none"
									>{selectedLP.pesan}</textarea
								>
							</div>
						</div>
						<div class="container-level mt-[1.5rem] w-full">
							<span class="text-[#121212] text-lg not-italic font-semibold leading-[normal]">
								NIM Pembuat
							</span>
							<input
								type="text"
								name="nim"
								id="nim"
								class="w-full max-h-52 overflow-auto flex justify-center items-start gap-[2.1875rem] border p-3 rounded-[0.625rem] border-solid border-[#EFEFEF] font-JKTSans resize-none read-only:bg-slate-300 read-only:text-slate-600"
								readonly
								value={selectedLP.nim}
							/>
						</div>
						<div class="flex w-full justify-center mt-10">
							<button
								class="button w-fit inline-flex justify-center items-center gap-2 px-6 py-3 rounded-[0.3125rem] bg-[#048F7B] text-white"
								type="submit"
							>
								Simpan
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
	{#if modalLaporan.target == 'deleteLP' && modalLaporan.show}
		<div class="opacity-0" style="display: none;">
			{setTimeout(() => {
				if (document.getElementById('card-modal-delete')?.classList.contains('scale-0'))
					document.getElementById('card-modal-delete')?.classList.toggle('scale-0');
				if (document.getElementById('card-modal-delete')?.classList.contains('scale-100'))
					document.getElementById('card-modal-delete')?.classList.toggle('scale-100');
			}, 100)}
		</div>
		<div
			class="card-modal scale-0 {modalLaporan.show ? 'backdrop-blur' : ''}"
			id="card-modal-delete"
		>
			<div
				class="flex flex-col justify-center align-middle bg-white p-8 w-[40%] rounded-xl transition-all duration-100 ease-in origin-center"
				id="modal-detail"
			>
				<div class="flex justify-between mx-5 mb-4">
					<p class="text-[#121212] text-xl font-semibold">Delete Laporan</p>

					<button
						class="btn"
						on:click={() => {
							modalLaporan = { show: false, target: null };
						}}><img src={x} alt="close" /></button
					>
				</div>
				<form
					method="post"
					class="w-full h-full flex justify-center align-middle mx-5"
					use:enhance
					action="?/delete"
					on:submit={() => (modalLaporan = { show: false, target: null })}
				>
					<div class="form-contain w-full">
						<div class="flex flex-col p-6 gap-5 overflow-auto max-h-96">
							<div class="flex">
								<img
									src={profile}
									alt="profile"
									class="p-2 bg-[#F5F5F5] rounded-full w-20 border-none"
								/>

								<div class="flex flex-col">
									<p
										class="text-[#121212] max-w-lg:text-lg text-sm not-italic font-bold leading-[normal] font-JKTSans"
									>
										{selectedLP.nama}
									</p>
									<p
										class="text-[rgba(18,18,18,0.60)] max-w-lg:text-md text-xs not-italic font-normal leading-[normal] font-JKTSans"
									>
										{new Date(selectedLP.created_at * 1000).toLocaleDateString()}
									</p>
								</div>
							</div>
							<hr />

							<div class="flex w-full gap-5 justify-start">
								<span
									class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
								>
									Kategori: {selectedLP.kategori}
								</span>
								<span
									class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
								>
									Urgensi:{selectedLP.urgensi == 1
										? 'Low'
										: selectedLP.urgensi == 2
										? 'Intermediate'
										: selectedLP.urgensi == 3
										? 'High'
										: 'Urgent'}
								</span>
								<span
									class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
								>
									Kategori: {selectedLP.nama_zona}
								</span>
							</div>

							<p class="text-black text-opacity-70 text-justify max-h-40 overflow-auto">
								{selectedLP.pesan}
							</p>
						</div>
						<div class="container-category">
							<input
								type="text"
								name="id_laporan"
								id="id_laporan"
								readonly
								style="display: none;"
								value={selectedLP.id_laporan}
							/>
						</div>
						<div class="flex w-full justify-center mt-10 gap-5">
							<button
								class="flex justify-center items-center gap-2 border-2 text-[#121212] text-center text-sm not-italic font-semibold leading-[normal] px-6 py-3 rounded-[0.3125rem] border-solid border-[#EDEDED]"
								type="submit"
							>
								Batal
							</button>
							<button
								class="flex justify-center items-center gap-2 text-white bg-[#E14942] text-center text-sm not-italic font-bold leading-normal px-6 py-3 font-JKTSans rounded-[0.3125rem] border border-transparent"
								type="submit"
							>
								Hapus Laporan
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.nav {
		display: flex;
		width: 100wh;
		height: 4.5625rem;
		padding: 1.03125rem 2.5rem;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}

	.textLogo {
		font-family: Plus Jakarta Sans;
		font-size: 1.25rem;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		letter-spacing: -0.005rem;
	}

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
	}
	.col-pesan {
		color: rgba(18, 18, 18, 0.8);
		font-size: 1rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	th {
		@apply text-start;
	}

	td {
		@apply text-start;
	}

	label {
		color: #121212;
		font-family: Plus Jakarta Sans;
		font-size: 0.875rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.label-category {
		@apply flex items-center gap-2 p-4 w-fit border rounded-lg border-solid border-[#EDEDED];
	}
	.label-category:has(input:checked) {
		@apply border-2 border-[#048F7B] text-[#048F7B];
	}
	.label-category:has(input:checked) > .radio-in {
		@apply relative h-5 w-5 cursor-pointer appearance-none
		 rounded-full border border-blue-200 text-green-500 transition-all before:absolute before:top-2/4 before:left-2/4
		  before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-500
		   before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10
		   after:text-green-400;
	}
	.label-category:has(input:checked) > .radio-text {
		@apply text-[#048F7B];
	}
	.radio-in {
		@apply w-[1.125rem] h-[1.125rem] text-blue-600 bg-sky-100 border-sky-300 focus:ring-blue-500;
	}

	.radio-text {
		@apply text-[rgba(18,18,18,0.60)] text-sm not-italic font-medium leading-[140%] font-JKTSans;
	}

	.selection-zone {
		@apply font-semibold text-lg appearance-none bg-[url('../lib/Assets/arrow.svg')] bg-no-repeat bg-[right_0.7rem_top_50%] bg-[2rem_auto];
	}

	textarea::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	textarea::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	textarea::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 5px;
	}

	/* Handle on hover */
	textarea::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
