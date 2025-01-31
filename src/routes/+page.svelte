<script lang="ts">
	import DataSource from "$lib/DataSource.svelte";
	import EstimatorCombined from "$lib/EstimatorCombined.svelte";

	let estimators : EstimatorCombined;

	let accurate_f2 = $state(0);
	let predicted_f2 = $state(0);

	let delta = $derived(Math.abs(accurate_f2 - predicted_f2));
	let percentale_error = $derived(delta / accurate_f2 * 100);

</script>

<div class="layout">
	<DataSource data={(value : number) => {
		estimators.handle_data(value);
	}} bind:prediction={accurate_f2} />

	<EstimatorCombined bind:this={estimators} bind:prediction={predicted_f2} />
	<div class="panel">
		<span>Delta: {delta}</span>
		<span>Percentale Error: {percentale_error.toFixed(2)}%</span>
	</div>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1rem;
		padding: 1rem;
		height: 100dvh;
		width: 100dvw;
	}
</style>