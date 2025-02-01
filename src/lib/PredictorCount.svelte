<script lang="ts">
	let probability_correctness = $state(0.95);
	let expected_delta = $state(0.01);

	let bits_hashfunction = $state(32);
	
	let { estimator_count = $bindable() } = $props()

	let use_optimal = $state(false);

	$effect(() => {
		if (use_optimal) {
			//the optimal number of estimators is given by the formula:
			estimator_count = Math.round(Math.log(1/(1-probability_correctness)) / (Math.pow(expected_delta, 2)));
		} else {
			//our upperbound is given by the formula:
			estimator_count = Math.round(1 / (Math.pow(expected_delta, 2) * (1-probability_correctness)));
		}
	});

</script>
<div class="panel">
	<div class="params">
		<label for="data_bound">Delta</label>
		<input name="data_bound" type="range" min="0.001" max="0.1" step="0.001" bind:value={expected_delta} /><span>{(expected_delta * 100).toFixed(2)}%</span>
		<label for="data_bound">Wahrscheinlichkeit</label>
		<input name="data_bound" type="range" min="0.5" max="0.99" step="0.01" bind:value={probability_correctness} /><span>{(probability_correctness * 100).toFixed(2)}%</span>
		<label for="data_bound">Verbesserte Obergrenze</label>
		<input name="data_bound" type="checkbox" bind:checked={use_optimal} />
		<span>{use_optimal ? 'Ja' : 'Nein'}</span>
		<label for="data_bound">Bits für Zähler</label>
		<input name="data_bound" type="range" min="1" max="128" bind:value={bits_hashfunction} /><span>{bits_hashfunction}</span>
	</div>
	<div class="p">
		<details>
			<summary>Anzahl an Schätzern: {estimator_count.toFixed(2)}</summary>
			<br />
			<span>Bits für Hashfunktion: {Math.ceil(Math.log2(256)*4)}</span>
			<br />
			<br />
			<span>Bits pro Schätzer: {Math.ceil(Math.log2(256)*4 + bits_hashfunction)}</span>
			<br />
			<br />
			<span>Insgesamt: {(Math.ceil((Math.log2(256)*4 + bits_hashfunction) * estimator_count) / (8 * 1024)).toFixed(2)} KiB</span>
		</details>
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