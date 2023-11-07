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
	let openFilter: { target: any | null; show: boolean } = { target: null, show: false };
	let checkboxes: { low: boolean; intermediate: boolean; high: boolean; urgent: boolean } = {
		low: false,
		intermediate: false,
		high: false,
		urgent: false
	};
	let selectedOptionDate: boolean = true;
	let selectedOptionRespon: string = 'Semua';
	let content = data.content;

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

	function handleFilter() {
		openFilter = { show: true, target: null };
	}

	function closeFilter() {
		openFilter = { show: false, target: null };
	}

	function handleClickOutside(event: any) {
		const modal = document.getElementById('modalFilter');

		if (modal && !modal.contains(event.target)) {
			closeFilter();
		}
	}

	function filterTrigger() {
		const urgentState = urgentStateFilter();
		responseFilter(urgentState);
		shorter();

		console.log(content);
	}

	const responseFilter = (urgentState: boolean) => {
		let filterType: number | null = null;

		if (selectedOptionRespon == 'Semua') filterType = null;
		if (selectedOptionRespon == '!Respon') filterType = 0;
		if (selectedOptionRespon == 'Direspon') filterType = 1;

		if (filterType == null) {
			if (urgentState) content = content;
			if (!urgentState) content = data.content;
			shorter();
			return;
		}

		if (urgentState)
			content = content.filter((value: any) => (value.status == filterType ? value : false));
		if (!urgentState)
			content = data.content.filter((value: any) => (value.status == filterType ? value : false));
	};

	const urgentStateFilter = () => {
		let filteredContent: any[] = [];
		let filterType: number[] = [];

		if (checkboxes.low) filterType.push(1);
		if (checkboxes.intermediate) filterType.push(2);
		if (checkboxes.high) filterType.push(3);
		if (checkboxes.urgent) filterType.push(4);

		if (filteredContent.length == 0) return false;

		data.content.map((value: any) => console.log(filterType.includes(value.urgensi)));

		data.content.map((value: any) =>
			filterType.includes(value.urgensi) ? filteredContent.push(value) : false
		);

		content = filteredContent;

		return true;
	};

	const shorter = () => {
		let sorted = content.sort((a: any, b: any) =>
			selectedOptionDate ? a.created_at - b.created_at : b.created_at - a.created_at
		);

		content = sorted;
	};

	// const selectOnlyThis = (index: number) => {
	// 	checkboxes = checkboxes.map((value, i) => i === index);
	// };

	const reset = () => {
		checkboxes = {
			low: false,
			intermediate: false,
			high: false,
			urgent: false
		};
		selectedOptionDate = true;
		selectedOptionRespon = 'Semua';
	};

	onMount(() => {
		isBerandaClicked = true;
		isLaporanClicked = false;
		const handleClickOutside = (event: MouseEvent) => {
			if (!document.querySelector('.modal')?.contains(event.target as Node)) {
				closeFilter();
			}
		};
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class={isModalOpen || modalLaporan ? 'overflow-hidden max-h-screen' : ''}>
	<nav class="nav bg-[#364150] {isModalOpen ? 'blur' : ''}">
		<h1 class="text-white textLogo">ADUAN <span class="text-[#00C7FF]">POLINEMA</span></h1>
		<div class="flex gap-4 align-baseline cursor-pointer">
			<img src={profile} alt="profile.png" />
			{#if data.user != null}
				<div class="flex flex-col">
					<span class="text-white font-[600] text-sm">{data.user.name}</span>
					<span class="font-medium text-xs text-[#FFFFFF99]">{data.user.category}</span>
				</div>
				<img src={arrow} alt="arrow" class="w-6 h-6 cursor-pointer" />
			{/if}
		</div>
	</nav>
	<div class="flex justify-center">
		<div class="flex justify-start align-middle w-[96%] h-fit py-[1.48rem]">
			<section class="flex flex-col w-full gap-6">
				<section class="grid grid-cols-3 gap-3">
					<Report
						ec={ec3}
						img={danger}
						text="Total Laporan"
						total={data.content.length}
						idenfier="Laporan"
					/>

					<Report
						ec={ec4}
						img={centang}
						text="Telah Direspon"
						total={data.count_laporan_1.jumlah_laporan}
						idenfier="Direspon"
					/>

					<Report
						ec={ec5}
						img={mirror}
						text="Belum Direspon"
						total={data.count_laporan_0.jumlah_laporan}
						idenfier="Pertanyaan"
					/>
				</section>

				<section class="mainContent relative">
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
						<div class="flex flex-col w-max">
							<button class="navLi flex gap-1 modal" on:click={handleFilter}>
								<img src={filter} alt="" />
								<p>Filter</p>
							</button>
							{#if openFilter.show === true}
								<div class="card-modalFilter h-full w-full">
									<div
										class="modal cursor-default filter-shadow flex justify-center align-middle border border-[#EDEDED] w-[28%] h-fit bg-white p-4 rounded-lg mt-[7%] mr-[1.3%]"
										on:click|stopPropagation
										on:keydown
										role="button"
										tabindex="0"
									>
										<div class="flex flex-col w-full justify-center gap-6">
											<div class="flex justify-between">
												<h4 class="text-[#121212] text-xl font-semibold">Filter</h4>
												<button
													on:click={reset}
													class="text-[#E14942] text-xs font-semibold cursor-pointer">Reset</button
												>
											</div>
											<form class="flex flex-col gap-6">
												<label for="tanggal" class="label-text">Urutan Tanggal</label>
												<div class="flex gap-3">
													<label class="label-category">
														<input
															type="radio"
															name="tanggal"
															id="tanggal"
															class="radio-in"
															value={true}
															required
															bind:group={selectedOptionDate}
														/>
														<span class="radio-text">Terbaru</span>
													</label>
													<label class="label-category">
														<input
															type="radio"
															name="tanggal"
															id="tanggal"
															class="radio-in"
															value={false}
															required
															bind:group={selectedOptionDate}
														/>
														<span class="radio-text">Terlama</span>
													</label>
												</div>
												<label for="urgent" class="label-text">Urgensi</label>
												<div class="flex gap-3">
													<label class="label-category">
														<!-- bind:checked={checkboxes.low} -->
														<input
															type="checkbox"
															on:change={() =>
																checkboxes.low ? (checkboxes.low = false) : (checkboxes.low = true)}
															class="checkbox"
															checked={checkboxes.low}
														/>
														<span class="radio-text">Low</span>
													</label>
													<label class="label-category">
														<!-- bind:checked={checkboxes.intermediate} -->
														<input
															type="checkbox"
															on:change={() =>
																checkboxes.intermediate
																	? (checkboxes.intermediate = false)
																	: (checkboxes.intermediate = true)}
															class="checkbox"
															checked={checkboxes.intermediate}
														/>
														<span class="radio-text">Medium</span>
													</label>
													<label class="label-category">
														<!-- bind:checked={checkboxes.high} -->
														<input
															type="checkbox"
															on:change={() =>
																checkboxes.high
																	? (checkboxes.high = false)
																	: (checkboxes.high = true)}
															class="checkbox"
															checked={checkboxes.high}
														/>
														<span class="radio-text">High</span>
													</label>
													<label class="label-category">
														<!-- bind:checked={checkboxes.urgent} -->
														<input
															type="checkbox"
															on:change={() =>
																checkboxes.urgent
																	? (checkboxes.urgent = false)
																	: (checkboxes.urgent = true)}
															class="checkbox"
															checked={checkboxes.urgent}
														/>
														<span class="radio-text">Urgent</span>
													</label>
												</div>
												<label for="tanggal" class="label-text">Telah direspon</label>
												<div class="flex gap-3">
													<label class="label-category">
														<input
															type="radio"
															name="respon"
															id="tanggal"
															class="radio-in"
															value="Semua"
															required
															bind:group={selectedOptionRespon}
															checked
														/>
														<span class="radio-text">Semua</span>
													</label>
													<label class="label-category">
														<input
															type="radio"
															name="respon"
															id="tanggal"
															class="radio-in"
															value="Direspon"
															required
															bind:group={selectedOptionRespon}
														/>
														<span class="radio-text">Telah Direspon</span>
													</label>
													<label class="label-category">
														<input
															type="radio"
															name="respon"
															id="tanggal"
															class="radio-in"
															value="!Respon"
															required
															bind:group={selectedOptionRespon}
														/>
														<span class="radio-text">Belum Direspon</span>
													</label>
												</div>
											</form>
											<div class="flex justify-end">
												<div
													class="w-fit py-2 px-6 bg-[#048F7B] rounded-md hover:bg-opacity-90 transition-colors duration-300"
												>
													<!-- on:click={closeFilter} -->
													<button
														type="submit"
														class="text-white text-sm font-semibold text-center"
														on:click={() => filterTrigger()}>Terapkan</button
													>
												</div>
											</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>

					<div class="grid grid-cols-3 gap-4">
						{#each content as { id_laporan, nama, pesan, jawaban, urgensi, kategori, status, created_at, answered_at, namaAdmin }, index}
							{#if kategori === laporanItems[activeIndex].name}
								{#if selectedOptionRespon == 'Semua'}
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
								{:else}
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

	.card-modalFilter {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: flex-end;
		z-index: 50;
	}

	.filter-shadow {
		box-shadow: 0px 14px 38px 0px rgba(18, 18, 18, 0.15);
	}
	.label-category {
		@apply cursor-pointer flex items-center gap-2 p-4 w-fit border rounded-lg border-solid border-[#EDEDED];
	}
	.label-category:has(input:checked) {
		@apply border-2 border-[#048F7B] text-[#048F7B];
	}
	.label-category:has(input:checked) > .radio-in {
		@apply relative h-4 w-4 cursor-pointer appearance-none
		 rounded-full border border-blue-200 text-green-500 transition-all before:absolute before:top-2/4 before:left-2/4
		  before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-500
		   before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10
		   after:text-green-400;
	}

	.label-text {
		@apply text-[#121212] text-sm font-semibold -mb-[1rem];
	}

	.label-category:has(input:checked) > .radio-text {
		@apply text-[#048F7B];
	}

	.radio-in {
		@apply w-fit h-[1.125rem] text-blue-600 bg-sky-100 border-sky-300 cursor-pointer focus:ring-blue-500;
	}

	.radio-text {
		@apply text-[rgba(18,18,18,0.60)] text-sm not-italic font-medium leading-[140%] font-JKTSans;
	}

	.checkbox {
		@apply cursor-pointer;
	}

	.selection-zone {
		@apply font-semibold text-lg appearance-none bg-[url('../lib/Assets/arrow.svg')] bg-no-repeat bg-[right_0.7rem_top_50%] bg-[2rem_auto];
	}
</style>
