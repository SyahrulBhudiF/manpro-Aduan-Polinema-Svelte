<script lang="ts">
	import { Tooltip } from 'carbon-components-svelte';
	// import 'carbon-components-svelte/css/g90.css';

	export let id: string,
		profile: string,
		name: string,
		date: string,
		category: string,
		text: string,
		urgentState: number;
	export let openModal: any;
</script>

<div class="card col-span-1 h-full w-full">
	<div class="flex">
		<img src={profile} alt="profile" class="p-2 bg-[#F5F5F5] rounded-full" />
		<div class="flex flex-col">
			<p class="text-sm text-[#121212] font-semibold">
				{name.length > 4
					? name.charAt(0) + '*'.repeat(name.length - 2) + name.substring(name.length - 1)
					: name.length == 1
					? name
					: name.charAt(0) + '*'}
			</p>
			<p class="text-xs text-black text-opacity-40 font-normal">{date}</p>
		</div>
		<div class="w-full relative group flex justify-end">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="w-7 {urgentState == 1
					? 'fill-black'
					: urgentState == 2
					? 'fill-yellow-600'
					: urgentState == 3
					? 'fill-rose-500'
					: 'fill-purple-600'}"
				><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z" /><path
					d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"
				/></svg
			>
			<div
				class="absolute top-8 right-2 scale-0 group-focus-within:scale-100 group-hover:scale-100 transition-all ease-in duration-100 origin-top-right rounded-md"
			>
				<p
					class="border-2 border-transparent rounded-md text-center w-full px-2 {urgentState == 1
						? 'bg-emerald-500 text-white'
						: urgentState == 2
						? 'bg-yellow-300'
						: urgentState == 3
						? 'bg-rose-500 text-white'
						: 'bg-purple-600 text-white'}"
				>
					<span class="text-center w-full">
						{urgentState == 1
							? 'Low'
							: urgentState == 2
							? 'Intermediate'
							: urgentState == 3
							? 'High'
							: 'Urgent'}
					</span>
				</p>
			</div>
		</div>
	</div>

	<span class="p-2 bg-[#F5F5F5] rounded-md w-fit font-semibold text-xs text-[#121212]"
		>{category}</span
	>

	<p class="text-black text-opacity-70 text-justify h-full w-full">
		{#each text.split(' ') as value, index}
			{index >= 41 ? '' : value + ' '}
		{/each}
		{text.split(' ').length >= 41 ? '...' : ''}
	</p>
	<hr />

	<button
		class="text-[#048F7B] font-semibold text-xs text-right cursor-pointer"
		on:click={openModal(id)}
		on:keydown={openModal(id)}
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
	}
</style>
