<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { accurate_f2, predicted_f2 } = $props();

	var canvas: HTMLCanvasElement;

	let percentale_error_cache: { x: number; y: number }[] = [];

	let delta = $derived(accurate_f2 - predicted_f2);
	let percentale_error = $derived((delta / accurate_f2) * 100);

	let canvas_hidden = $derived(
		isNaN(percentale_error) || percentale_error === undefined || percentale_error === null
	);

	onMount(() => {
		let chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: Array.from({ length: 100 }, (_, i) => i + 1),
				datasets: [
					{
						data: [{ x: 0, y: 0 }],
						label: 'Abweichung Prozentual'
					}
				]
			},
			options: {
				animation: false,
				scales: {
					x: {
						type: 'linear',
						position: 'bottom',
						ticks: {
							display: true
						},
						grid: {
							display: false,
							drawTicks: false
						}
					},
					y: {
						type: 'linear',
						suggestedMax: 1,
						suggestedMin: -1,
					}
				},
				elements: {
					point: {
						radius: 0
					}
				}
			}
		});

		let start_time = new Date().getTime() / 1000;
		function update() {
			if (
				percentale_error !== undefined &&
				isNaN(percentale_error) === false &&
				canvas_hidden === false
			) {
				let time = new Date().getTime() / 1000;
				let delta_time = time - start_time;
				percentale_error_cache.push({ x: delta_time, y: percentale_error });
				percentale_error_cache = percentale_error_cache.filter(
					(value) => value.x > delta_time - 10
				);
				chart.data.datasets[0].data = percentale_error_cache;
				chart.update();
			}
		}

		setInterval(() => {
			update();
		}, 100);
	});
</script>

<div class="panel">
	<h1>F2 Vergleich</h1>
	{#if accurate_f2}
		<h2><span>Genauer Wert: <span class="important">{accurate_f2}</span></span></h2>
	{/if}
	{#if predicted_f2}
		<h2><span>Geschätzter Wert: <span class="important">{predicted_f2}</span></span></h2>
	{/if}
	{#if delta !== undefined && isNaN(percentale_error) === false}
		<h2><span>Abweichung Absolut: <span class="important">{delta}</span></span></h2>
		<h2>
			<span
				>Abweichung Prozentual: <span class="important">{percentale_error.toFixed(2)}%</span></span
			>
		</h2>
	{:else}
		<span>-</span>
	{/if}
	<details>
		<summary>Graph</summary>
		<canvas bind:this={canvas} class={canvas_hidden ? 'hidden' : ''}></canvas>
	</details>
</div>

<style>
	.hidden {
		display: none;
	}
</style>
