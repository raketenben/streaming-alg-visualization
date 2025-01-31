<script lang="ts">

	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { data, prediction = $bindable() } = $props();

	var canvas: HTMLCanvasElement;
	var canvas1: HTMLCanvasElement;

	let interval: number | null = null;
	let data_points_per_second = $state(1);

	let last_element = $state(0);
	let f2 = $state(0);

	//time / value pairs
	let data_stream: { x: number; y: number }[] = [];
	let bins = new Array(100).fill(0);

	let bias_towards = $state(0.5);
	let bias_amount = $state(0.0);

	//bias random value to be closer to the data points at the given value
	function random_value(bias_towards = 0.0, bias_amount = 0.0) {
		let random_val = Math.floor(Math.random() * 100);
		let biased_val = bias_towards * 100;
		let mixed = random_val * (1 - bias_amount) + biased_val * bias_amount;
		return Math.floor(mixed);
	}

	export function clear_data() {
		data_stream = [];
		bins = new Array(100).fill(0);
	}

	onMount(() => {
		let chart = new Chart(canvas, {
			type: 'bar',
			data: {
				datasets: [
					{
						label: 'Random Data',
						data: []
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
					}
				}
			}
		});

		let chart2 = new Chart(canvas1, {
			type: 'bar',
			data: {
				labels: Array.from({ length: 100 }, (_, i) => i + 1),
				datasets: [
					{
						data: bins,
						label: 'Distribution'
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
					}
				}
			}
		});

		function add(accumulator : number, a : number) {
			return accumulator + a;
		}

		let start_time = new Date().getTime() / 1000;
		function data_update() {
			let time = new Date().getTime() / 1000 - start_time;
			let random_val = random_value(bias_towards, bias_amount);

			last_element = random_val;
			data(last_element);

			bins[random_val] += 1;
			f2 = calculate_f2(bins);
			prediction = f2;

			data_stream.push({ x: time, y: random_val });
			//cutoff data points older than 5 seconds
			data_stream = data_stream.filter((d) => d.x > time - 5);
		}

		function chart_update() {
			let time = new Date().getTime() / 1000 - start_time;

			chart.data.datasets[0].data = data_stream;

			//set time frame
			let visible_seconds = 5;
			(chart.options.scales.x.min = Math.max(time - visible_seconds, 0)),
				(chart.options.scales.x.max = Math.max(time, 0));
			chart.options.scales.y.min = 0;
			chart.options.scales.y.max = 100;

			chart.update();

			//update distribution
			chart2.data.datasets[0].data = bins;
			chart2.update();
		}

		$effect(() => {
			if (interval != null) clearInterval(interval);
			interval = setInterval(data_update, 1000 / data_points_per_second);
		});

		setInterval(chart_update, 100);
	});

	function calculate_f2(b : number[]){
		let sum = 0;
		for (let i = 0; i < b.length; i++) {
			sum += Math.pow(b[i], 2);
		}
		return sum;
	}

</script>

<div class="panel">
	<h1>Datenquelle</h1>
	<h2>{last_element}</h2>
	<div class="row">
		<label>Datenpunkte pro Sekunde:</label>
		<input type="range" min="1" max="1000" bind:value={data_points_per_second} />
		<span>{data_points_per_second}/s</span>
	</div>
	<div class="row">
		<button on:click={clear_data}>Clear Data</button>
	</div>
	<details>
		<summary>Datenstrom</summary>
		<div ><canvas bind:this={canvas}></canvas></div>
	</details>
	<details>
		<summary>Verteilung</summary>
		<div><canvas bind:this={canvas1}></canvas></div>
	</details>
	<details>
		<summary>Bias</summary>
		<div class="row">
			<label>Nach:</label>
			<input type="range" min="0" max="1" step="0.01" bind:value={bias_towards} />
			<span>{Math.floor(bias_towards * 100)}</span>
		</div>
		<div class="row">
			<label>Wie stark:</label>
			<input type="range" min="0" max="0.8" step="0.01" bind:value={bias_amount} />
			<span>{Math.round(bias_amount * 100)}%</span>
		</div>
	</details>
	<details>
		<summary>Berechnete F2</summary>
		<h2><span>F2: <span class="important">{prediction}</span></span></h2>
	</details>
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		flex-flow: row;
		width: 100%;
	}

	.row input {
		flex: 1;
	}
</style>
