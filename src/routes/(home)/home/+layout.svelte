<script lang="ts">
	import profile from '$lib/Assets/profile.png';
	import arrow from '$lib/Assets/arrow-down.svg';
</script>

<nav class="nav bg-[#364150]">
	<h1 class="text-white textLogo">ADUAN <span class="text-[#00C7FF]">POLINEMA</span></h1>
	<div class="flex gap-4 align-baseline cursor-pointer">
		<img src={profile} alt="profile.png" />
		<div class="flex flex-col">
			<span class="text-white font-[600] text-sm">Budi Darmawan</span>
			<span class="font-medium text-xs text-[#FFFFFF99]">2241720167</span>
		</div>
		<img src={arrow} alt="arrow" class="w-6 h-6 cursor-pointer" />
	</div>
</nav>
<div class="flex justify-center">
	<div class="flex justify-start align-middle w-[96%] h-fit py-[1.48rem]">
		<slot />
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
		gap: 61.875rem;
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
</style>
