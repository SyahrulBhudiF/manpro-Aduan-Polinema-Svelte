<script lang="ts">
	export let user: {
		id: number;
		profile: string;
		name: string;
		date: string;
		category: string;
		text: string;
	};
	export let openModal: any;
</script>

<div class="card">
	<div class="flex">
		<img src={user.profile} alt="profile" class="p-2 bg-[#F5F5F5] rounded-full" />
		<div class="flex flex-col">
			<p class="text-sm text-[#121212] font-semibold">{user.name}</p>
			<p class="text-xs text-black text-opacity-40 font-normal">{user.date}</p>
		</div>
	</div>

	<span class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
		>{user.category}</span
	>

	<p class="text-black text-opacity-70 text-justify">{user.text}</p>
	<hr />

	<button
		class="text-[#048F7B] font-semibold text-xs text-right cursor-pointer"
		on:click={openModal(user.id)}
		on:keydown={openModal(user.id)}
		tabindex="0">Lihat Respon</button
	>
</div>

<style lang="postcss">
	.card {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 1.25rem;
		border-radius: 1rem;
		border: 1px solid #ededed;
		width: fit-content;
		height: fit-content;
	}
</style>
