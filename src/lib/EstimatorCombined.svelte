<script lang="ts">
	import { onMount } from "svelte";
	import Predictor from "./predictor";
	import { tick } from 'svelte';
	import PredictorCount from "./PredictorCount.svelte";
	import Chart from "chart.js/auto";

	let canvas : HTMLCanvasElement;

	let amount = $state(1);

	let { updated, prediction = $bindable() } = $props();

	//let amount = $state(800);
	
	let predictors : Predictor[] = [];
	
	let status = $state("");

	async function update_estimators() {
		status = `Initalisiere ${amount} Schätzer...`;
		await tick();
		if(amount > predictors.length) {
			for(let i = predictors.length; i < amount; i++) {
				let p = new Predictor();
				await p .init()
				predictors.push(p);
			}
		} else {
			predictors = predictors.slice(0, amount);
		}
		status = `Initialisierung von ${amount} Schätzern abgeschlossen.`;
		//clear all counters
		for(const p of predictors) {
			p.clear();
		}
		updated();
	}

	let rate_of_change : {x:number,y:number}[] = [];
	let previouse_value = 0;
	function moving_average(data: {x:number,y:number}[], window_size: number) {
		let result = [];
		for(let i = 0; i < data.length - window_size; i++) {
			let sum = 0;
			for(let j = 0; j < window_size; j++) {
				sum += data[i + j].y;
			}
			result.push({x: data[i].x, y: sum / window_size});
		}
		return result;
	}

	let start_time = new Date().getTime() / 1000;
	export const handle_data = (value: number) => {
		let avg = 0;
		for ( const p of predictors) {
			avg += p.predict(value);
		}
		previouse_value = prediction;
		prediction = Math.round(avg / predictors.length);

		let time = new Date().getTime() / 1000;
		let delta = time - start_time;
		let change = (prediction - previouse_value);

		let percentale_change = change / prediction;
		
		rate_of_change.push({x: delta, y: percentale_change});
	};

	onMount(() => {
		let chart = new Chart(canvas, {
			type: 'line',
			data: {
				datasets: [
					{
						data: [{ x: 0, y: 0 }],
						label: 'Änderungsrate'
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
						suggestedMax: 0.0001,
						suggestedMin: 0,
					}
				},
				elements: {
					point: {
						radius: 0
					}
				}
			}
		});

		function update() {
			let time = new Date().getTime() / 1000;
			let delta_time = time - start_time;
			rate_of_change = rate_of_change.filter(
				(value) => value.x > delta_time - 10
			);
			chart.data.datasets[0].data = moving_average(rate_of_change, 100);
			chart.update();
		}

		setInterval(update, 100);
	});
</script>
<div class="panel">
	<h1>F2 Schätzer</h1>
	<PredictorCount bind:estimator_count={amount} />
	<br />
	<div class="panel">
		<input type="number" bind:value={amount} />
		<button onclick={update_estimators}>Update</button>
		<br />
		<div class="status">
			<span>{status}</span>
			<br>
			{#if prediction}
				<h2><span>Schätzung F2: <span class="important">{prediction}</span></span></h2>
			{/if}
		</div>
		<details>
			<summary>Änderungsrate</summary>
			<canvas bind:this={canvas}></canvas>
		</details>
	</div>
</div>

<style>
	button {
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: none;
		background-color: #007bff;
		color: white;
	}

	input[type=number] {
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid gray;
	}

	.status {
		padding: 0.5rem;
	}

</style>