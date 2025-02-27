<script lang="ts">
	import PredictorCount from '$lib/PredictorCount.svelte';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	let data_bound = $state(250000);
	let packets = $state(500000);

	let estimator_count: number = $state(1);
	let bits_hashfunction = $state(32);

	let space_naive = (data_size: number) => {
		return Math.log2(data_size) * data_bound;
	};

	let space_estimated = (data_size: number) => {
		return (Math.log2(data_size) + bits_hashfunction) * estimator_count;
	};

	let chart: Chart;

	const sample_size = 100;
	function updateData() {
		chart.data.datasets[0].label = 'Naive';
		chart.data.datasets[0].data = Array.from({ length: sample_size }, (_, i) =>
			space_naive((i / sample_size) * packets)
		).map((value, index) => ({ x: (index / sample_size) * packets, y: value }));

		chart.data.datasets[1].label = 'Estimated';
		chart.data.datasets[1].data = Array.from({ length: sample_size }, (_, i) =>
			space_estimated((i / sample_size) * packets)
		).map((value, index) => ({ x: (index / sample_size) * packets, y: value }));

		chart.update();
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'line',
			data: { datasets: [
				{ label: 'Naive', data: [] },
				{ label: 'Estimated', data: [], hidden: true}
			] },
			options: {
				animation: false,
				scales: {
					x: {
						title: {
							display: true,
							text: 'Anzahl Pakete'
						},
						type: 'linear',
						position: 'bottom'
					},
					y: { title: { display: true, text: 'Speicherbedarf (Bits)' } }
				},
				elements: {
					point: {
						radius: 0
					}
				}
			}
		});

		$effect(updateData);
	});
</script>

<div class="panel pl">
	<h2>Vergleich Platzkomplexität - F2 Algorithmus</h2>
	<div class="plot">
		<canvas bind:this={canvas}></canvas>
	</div>

	<div class="row">
		<label for="packets">Größe des Universums</label>
		<input
			name="packets"
			type="range"
			min="0"
			max="1000000"
			step="1000"
			bind:value={data_bound}
		/><span>{data_bound}</span>
	</div>
	<div class="row">
		<label for="packets">Anzahl Pakete</label>
		<input
			name="packets"
			type="range"
			min="0"
			max="100000000"
			step="100000"
			bind:value={packets}
		/><span>{packets}</span>
	</div>
	<details class="panel">
		<summary>Schätzer Parameter</summary>
		<div class="params">
			<label for="data_bound">Bits Hashfunktion:</label>
			<input name="data_bound" type="range" min="1" max="128" bind:value={bits_hashfunction} /><span
				>{bits_hashfunction}</span
			>
		</div>
		<br />
		<PredictorCount bind:estimator_count />
	</details>
</div>

<style>
	.row {
		padding: 1rem;
		display: grid;
		grid-template-columns: auto 1fr min-content;
		grid-gap: 1rem;
	}

	.layout {
		padding: 1rem;
	}

	.params {
		padding: 1rem;
		display: grid;
		grid-template-columns: auto 1fr min-content;
		grid-gap: 1rem;
	}

	.pl {
		grid-column-start: 1;
		grid-column-end: 4;
	}

	.plot {
		max-height: 70dvh;
		display: flex;
		justify-content: center;
	}
</style>
