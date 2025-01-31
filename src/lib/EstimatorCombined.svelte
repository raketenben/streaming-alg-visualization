<script lang="ts">
	import { onMount } from "svelte";
	import Predictor from "./predictor";
	import { tick } from 'svelte';
	import PredictorCount from "./PredictorCount.svelte";

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

	export const handle_data = (value: number) => {
		let avg = 0;
		for ( const p of predictors) {
			avg += p.predict(value);
		}
		prediction = Math.round(avg / predictors.length);
	};
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