<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms';
	import { flavors } from '../data';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form, {
		clearOnSubmit: 'none'
	});
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance>
	<h2>Size</h2>

	<select name="scoops" bind:value={$form.scoops}>
		{#each ['One scoop', 'Two scoops', 'Three scoops'] as scoop, i}
			<option value={i + 1} selected={$form.scoops == i + 1}>{scoop}</option>
		{/each}
	</select>

	{#if $errors.scoops}<p>{$errors.scoops}</p>{/if}

	<h2>flavors</h2>

	<!-- Note that the selected attribute is required for this to work without JS -->
	<select multiple name="flavors" bind:value={$form.flavors}>
		{#each flavors as flavor}
			<option value={flavor.value} selected={$form.flavors.includes(flavor.value)}
				>{flavor.label}</option
			>
		{/each}
	</select>

	{#if $errors.flavors?._errors}<p>{$errors.flavors._errors}</p>{/if}

	{#if $message}<p>{$message}</p>{/if}

	<div><button>Submit</button></div>
</form>

<p class="info">
	<a href="https://svelte.dev/tutorial/group-inputs" target="_blank"
		>Original code from Svelte documentation</a
	>
</p>

<style>
	.info {
		border-top: 1px solid gray;
		margin-top: 4rem;
	}
</style>
