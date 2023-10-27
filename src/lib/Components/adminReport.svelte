<script lang="ts">
	export let ec: string;
	export let img: string;
	export let text: string;
    export let total: number;
    export let idenfier: string;

    let x: string;
    let y: string;

    if (idenfier === 'Laporan') {
        x = 'bottom-0'
        y = 'left-0'
    } else if (idenfier === 'Direspon'){
        x = 'top-0'
        y = 'right-0'
    } else {
        x = 'bottom-0'
        y = 'right-0'
    }

</script>

<div class="flex flex-col bg-[#1CAF9A] bg-opacity-10 p-6 gap-12 rounded-xl relative">
	<img src={ec} alt="" class={`absolute ${x} ${y}`} />
	<div class="flex">
		<img src={img} alt="" />
		<p class="text-[#121212] text-base">{text}</p>
	</div>
	<p>
		<span class="text-[2.75rem] text-[#121212]">{total}</span>
		<span class="text-[#121212] opacity-60">{idenfier}</span>
	</p>
</div>
