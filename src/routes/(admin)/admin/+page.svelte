<script lang="ts">
	import profile from '$lib/Assets/profile.png';
	import arrow from '$lib/Assets/arrow-down.svg';
	import questionPict from '$lib/Assets/user-octagon.svg';
	import danger from '$lib/Assets/danger.svg';
	import centang from '$lib/Assets/clipboard-tick.svg';
	import mirror from '$lib/Assets/mirror.svg';

	import { onMount } from 'svelte';
	import ec3 from '$lib/Assets/Ellipse6.svg';
	import ec4 from '$lib/Assets/Ellipse7.svg';
	import ec5 from '$lib/Assets/Ellipse8.svg';
	import filter from '$lib/Assets/sort.svg';
	import x from '$lib/Assets/Frame.svg';
	import admin from '$lib/Assets/logo-polinema.png';
	import Card from '$lib/Components/cardAdmin.svelte';
	import Report from '$lib/Components/adminReport.svelte';
	import { page } from '$app/stores';

	export let data;
	export let form;

	let laporanItems = [{ name: 'Semua', id: 0 }];
	let isBerandaClicked: boolean = true;
	let isLaporanClicked: boolean = false;
	let activeIndex: number = 0;
	let isModalOpen: boolean = false;
	let selectedUserId: number | null = null;
	let modalLaporan = false;

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

	if (formData != null || formData != undefined) formCompleteTrigger();

	function handleBerandaClick() {
		isBerandaClicked = true;
		isLaporanClicked = false;
	}

	function handleLaporanClick() {
		isBerandaClicked = false;
		isLaporanClicked = true;
	}

	const triggerForm = () => {
		isBerandaClicked = false;
		isLaporanClicked = true;

		setTimeout(() => {
			modalLaporan = true;
		}, 200);
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
</script>

<div class={isModalOpen || modalLaporan ? 'overflow-hidden max-h-screen' : ''}>
	<nav class="nav bg-[#364150] {isModalOpen ? 'blur' : ''}">
		<h1 class="text-white textLogo">ADUAN <span class="text-[#00C7FF]">POLINEMA</span></h1>
		<div class="flex gap-4 align-baseline cursor-pointer">
			<img src={profile} alt="profile.png" />
			{#if data.user != null}
				<div class="flex flex-col">
					<span class="text-white font-[600] text-sm">{data.user.username}</span>
					<span class="font-medium text-xs text-[#FFFFFF99]">{data.user.nim}</span>
				</div>
				<img src={arrow} alt="arrow" class="w-6 h-6 cursor-pointer" />
			{/if}
		</div>
	</nav>
	<div class="flex justify-center">
		<div class="flex justify-start align-middle w-[96%] h-fit py-[1.48rem]">
			<section class="flex flex-col w-full gap-6">
				<section class="grid grid-cols-3 gap-3">
					<Report ec={ec3} img={danger} text="Total Laporan" total={1280} idenfier="Laporan" />

					<Report ec={ec4} img={centang} text="Telah Direspon" total={12372} idenfier="Direspon" />

					<Report ec={ec5} img={mirror} text="Belum Direspon" total={588} idenfier="Pertanyaan" />
				</section>

				<section class="mainContent">
					<p class="text-[#121212] text-xl font-semibold">Laporan yang diajukan</p>
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
						<div class="navLi flex gap-1">
							<img src={filter} alt="" />
							<p>Filter</p>
						</div>
					</div>

					<div class="grid grid-cols-3 gap-4">
						{#each data.content as { id_laporan, nama, pesan, jawaban, urgensi, kategori, status, created_at, answered_at, namaAdmin }, index}
							{#if kategori === laporanItems[activeIndex].name}
								<Card
									id={id_laporan}
									profile={questionPict}
									name={nama}
									date={new Date(created_at * 1000).toLocaleDateString()}
									category={kategori}
									text={pesan}
									urgentState={Number.parseInt(urgensi)}
									{openModal}
									{jawaban}
								/>
							{:else if activeIndex === 0}
								<Card
									id={id_laporan}
									profile={questionPict}
									name={nama}
									date={new Date(created_at * 1000).toLocaleDateString()}
									category={kategori}
									text={pesan}
									urgentState={Number.parseInt(urgensi)}
									{openModal}
									{jawaban}
								/>
							{/if}

							{#if isModalOpen && selectedUserId === id_laporan}
								<div style="display: none;">
									{setTimeout(() => {
										document.getElementById('modal-detail')?.classList.toggle('scale-0');
										document.getElementById('modal-detail')?.classList.toggle('scale-100');
									}, 1)}
								</div>
								<div class="card-modal" style="backdrop-filter: blur(5px);">
									<div
										class="flex flex-col justify-center align-middle bg-white p-8 w-[40%] rounded-xl transition-all duration-100 ease-in origin-center scale-0 max-h-1/2 blur-none"
										id="modal-detail"
									>
										<div class="flex justify-between mx-5 mb-4">
											<p class="text-[#121212] text-xl font-semibold">Detail Laporan</p>

											<button class="btn" on:click={closeModal}><img src={x} alt="close" /></button>
										</div>

										<div class="flex flex-col p-6 gap-5 overflow-auto max-h-96">
											<div class="flex">
												<img
													src={questionPict}
													alt="profile"
													class="p-2 bg-[#F5F5F5] rounded-full"
												/>

												<div class="flex flex-col">
													<p class="text-sm text-[#121212] font-semibold">{nama}</p>
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

											<div class="flex gap-4 align-baseline mx-6 mb-4">
												<img src={admin} alt="admin.png" class="w-9" />
												<div class="flex flex-col">
													<span class="text-[#121212] font-[600] text-sm">{namaAdmin}</span>
													<span class="font-medium text-xs text-black text-opacity-40"
														>{new Date(answered_at * 1000).toLocaleDateString()}</span
													>
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
			</section>
		</div>
	</div>
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
	}
</style>
