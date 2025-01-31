<script lang="ts">
	import DataSource from "$lib/DataSource.svelte";
	import EstimatorCombined from "$lib/EstimatorCombined.svelte";

	let estimators : EstimatorCombined;
	let data_source : DataSource;

	let accurate_f2 = $state(0);
	let predicted_f2 = $state(0);

	let delta = $derived(Math.abs(accurate_f2 - predicted_f2));
	let percentale_error = $derived(delta / accurate_f2 * 100);

</script>

<div class="layout">
	<DataSource data={(value : number) => {
		estimators.handle_data(value);
	}} bind:prediction={accurate_f2} bind:this={data_source}/>

	<EstimatorCombined bind:this={estimators} bind:prediction={predicted_f2} updated={() => {
		data_source.clear_data();
	}}/>
	<div class="panel">
		<h1>F2 Vergleich</h1>
		{#if accurate_f2}
			<h2><span>Genauer Wert: <span class="important">{accurate_f2}</span></span></h2>
		{/if}
		{#if predicted_f2}
			<h2><span>Geschätzter Wert: <span class="important">{predicted_f2}</span></span></h2>
		{/if}
		{#if delta}
			<h2><span>Abweichung Absolute: <span class="important">{delta}</span></span></h2>
		{/if}
		{#if percentale_error}
		<h2><span>Abweichung Prozentual: <span class="important">{percentale_error.toFixed(2)}%</span></span></h2>
		{:else}
			<span>-</span>
		{/if}
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