<script lang="ts">
	import Compare from "$lib/Compare.svelte";
	import DataSource from "$lib/DataSource.svelte";
	import EstimatorCombined from "$lib/EstimatorCombined.svelte";

	let estimators : EstimatorCombined;
	let data_source : DataSource;

	let accurate_f2 = $state(0);
	let predicted_f2 = $state(0);


</script>

<!--<div class="layout">-->
	<DataSource data={(value : number) => {
		estimators.handle_data(value);
	}} bind:prediction={accurate_f2} bind:this={data_source}/>

	<EstimatorCombined bind:this={estimators} bind:prediction={predicted_f2} updated={() => {
		data_source.clear_data();
	}}/>
	<Compare accurate_f2={accurate_f2} predicted_f2={predicted_f2}/>
<!--</div>-->

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