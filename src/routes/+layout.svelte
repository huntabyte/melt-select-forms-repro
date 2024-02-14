<script>
	import { page } from '$app/stores';
	import '../app.postcss';

	$: pathname = $page.url.pathname;
</script>

<div class="container py-4">
	<h1 class="text-4xl font-semibold">Select Form Demo</h1>
	<div class="flex items-center gap-3 pt-4">
		<a
			href="/native"
			class="px-3 py-2 bg-sky-700 rounded-md hover:bg-sky-800 {pathname === '/native' &&
				'border-white border-2'}">Native Select</a
		>
		<a
			href="/melt"
			class="px-3 py-2 bg-sky-700 rounded-md hover:bg-sky-800 {pathname === '/melt' &&
				'border-white border-2'}">Melt Select</a
		>
		<a
			href="/melt-with-extras"
			class="px-3 py-2 bg-sky-700 rounded-md hover:bg-sky-800 {pathname === '/melt-with-extras' &&
				'border-white border-2'}">Melt Select w/ bunch of boilerplate</a
		>
	</div>

	<div class="py-4">
		<slot />
	</div>
</div>
