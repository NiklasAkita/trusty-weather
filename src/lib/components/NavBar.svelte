<script>
	import ListRowIcon from '$lib/icons/ListRowIcon.svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
</script>

<div class="container">
	<a href="/"
		><div class="sizer"><SunIcon /></div>
		Current
	</a>
	<a href="/forecast"
		><div class="sizer"><ListRowIcon /></div>
		Forecast
	</a>
</div>

<style>
	.container {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 80px;
		width: 100%;

		display: flex;
		justify-content: space-between;
		border-top: 1px solid var(--color-text);
	}

	a {
		width: 100%;
		height: 100%;
		background-color: var(--color-bg-1);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.sizer {
		width: 24px;
	}
</style>
