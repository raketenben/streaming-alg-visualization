<script lang="ts">
	import { onMount } from "svelte";
	import Predictor from "./predictor";
	import { tick } from 'svelte';
	import PredictorCount from "./PredictorCount.svelte";

	let amount = $state(1);

	let { prediction = $bindable() } = $props();

	//let amount = $state(800);
	
	let predictors : Predictor[] = [];
	
	let status = $state("");

	async function update_estimators() {
		status = `Initializing estimators`;
		await tick();
		if(amount > predictors.length) {
			for(let i = predictors.length; i < amount; i++) {
				status = `Initializing estimator ${i} of ${amount}`;
				await tick();
				predictors.push(new Predictor());
			}
		} else {
			predictors = predictors.slice(0, amount);
		}
		status = "";
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
	<h1>Schätzer</h1>
	<PredictorCount bind:estimator_count={amount} />
	<input type="number" bind:value={amount} />
	<button onclick={update_estimators}>Update</button>
	<span>{status}</span>
	<span>{prediction}</span>
</div>