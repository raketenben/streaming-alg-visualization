<script lang="ts">
	let probability_correctness = $state(0.95);
	let expected_delta = $state(0.01);
	
	let { estimator_count = $bindable() } = $props()

	$effect(() => {
		estimator_count = Math.round(1 / (Math.pow(expected_delta, 2) * (1-probability_correctness)));
	});

</script>
<div class="panel">
	<div class="params">
		<label for="data_bound">Delta</label>
		<input name="data_bound" type="range" min="0.001" max="0.1" step="0.001" bind:value={expected_delta} /><span>{(expected_delta * 100).toFixed(2)}%</span>
		<label for="data_bound">Wahrscheinlichkeit</label>
		<input name="data_bound" type="range" min="0.5" max="0.99" step="0.01" bind:value={probability_correctness} /><span>{probability_correctness}</span>
	</div>
	<div class="p">
		<span>Anzahl Schätzer: {estimator_count.toFixed(2)}</span>
	</div>
</div>

<style>
	.row {
		padding: 1rem;
		display: grid;
		grid-template-columns: auto 1fr min-content;
		grid-gap: 1rem;
	}

	.layout {
		padding:1rem;
	}

	.params {
		padding: 1rem;
		display: grid;
		grid-template-columns: auto 1fr min-content;
		grid-gap: 1rem;
	}
</style>