<script lang="ts">
	import { melt, createSelect } from '@melt-ui/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms';
	import { flavorValues, flavors, type FlavorOption, scoops } from '../data';
	import { writable } from 'svelte/store';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form, {
		clearOnSubmit: 'none'
	});

	const selectedScoop = writable(scoops[0]);

	const selectedFlavor = writable(
		$form.flavors
			.map((f) => flavors.find((fl) => fl.value === f))
			.filter((f): f is FlavorOption => f !== undefined)
	);

	const {
		elements: { menu: scoopMenu, option: scoopOption, trigger: scoopTrigger, label: scoopLabel },
		states: { selectedLabel: scoopSelectedLabel }
	} = createSelect({
		selected: selectedScoop,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});

	const {
		elements: {
			menu: flavorMenu,
			option: flavorOption,
			trigger: flavorTrigger,
			label: flavorLabel
		},
		states: { selectedLabel: flavorSelectedLabel }
	} = createSelect<(typeof flavorValues)[number], true>({
		selected: selectedFlavor,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		multiple: true
	});

	function updateFormFlavorStore(v: FlavorOption[]) {
		$form.flavors = v.map((f) => f.value);
	}

	function updateScoopStore(v: number) {
		$form.scoops = v;
	}

	$: updateScoopStore($selectedScoop.value);
	$: updateFormFlavorStore($selectedFlavor);
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance>
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label use:melt={$scoopLabel} class="block">Select scoops</label>
	<button use:melt={$scoopTrigger} class="bg-white px-3 py-2 text-black">
		{$scoopSelectedLabel || 'Select number of scoops'} <span aria-hidden>▼</span>
	</button>

	<div use:melt={$scoopMenu} class="z-10 bg-white text-black">
		{#each scoops as opt}
			<div use:melt={$scoopOption({ value: opt.value, label: opt.label })}>
				{opt.label}
			</div>
		{/each}
	</div>

	<select bind:value={$form.scoops} name="scoops" class="hidden">
		{#each scoops as opt}
			<option value={opt.value} selected={$form.scoops === opt.value}>{opt.label}</option>
		{/each}
	</select>

	{#if $errors.scoops}<p>{$errors.scoops}</p>{/if}

	<!-- eslint-disable-next-line svelte/valid-compile -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label use:melt={$flavorLabel} class="block mt-8">Select flavors</label>
	<button use:melt={$flavorTrigger} class="bg-white px-3 py-2 text-black">
		{$flavorSelectedLabel || 'Select number of scoops'} <span aria-hidden>▼</span>
	</button>

	<div use:melt={$flavorMenu} class="z-10 bg-white text-black">
		{#each flavors as opt}
			<div use:melt={$flavorOption({ value: opt.value, label: opt.label })}>
				{opt.label}
			</div>
		{/each}
	</div>

	{#if $errors.flavors?._errors}<p>{$errors.flavors._errors}</p>{/if}

	{#if $message}<p>{$message}</p>{/if}
	<select bind:value={$form.flavors} name="flavors" class="hidden" multiple>
		{#each flavors as opt}
			<option value={opt.value} selected={$form.flavors.includes(opt.value)}>{opt.label}</option>
		{/each}
	</select>

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
