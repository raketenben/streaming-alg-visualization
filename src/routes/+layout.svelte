<script lang="ts">
	export const prerender = true;
</script>

<div class="layout">
	<nav class="menu">
		<a href="/streaming-alg-visualization">Demo</a>
		<a href="/streaming-alg-visualization/complexity">Platzkomplexität</a>
	</nav>
	<slot></slot>
</div>
<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: min-content 1fr;
		grid-gap: 1rem;
		padding: 1rem;
		height: 100dvh;
		width: 100dvw;
		overflow-x: hidden;
	}

	.menu {
		grid-column: 1 / 4;
		padding: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.menu a {
		margin: 0.1rem 0.5rem;
		padding: 0.5rem;
		border-radius: 0.25rem;
		background-color: #f0f0f0;
		color: black;
		text-decoration: none;
	}

	.menu a:hover {
		background-color: #e0e0e0;
	}
</style>