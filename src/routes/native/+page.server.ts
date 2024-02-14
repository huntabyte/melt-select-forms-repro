import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { schema } from '../data.js';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types.js';

function joinFlavours(flavours: string[]) {
	if (flavours.length === 1) return flavours[0];
	return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
}

///// Load //////////////////////////////////////////////////////////

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

///// Form actions //////////////////////////////////////////////////

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		console.dir(form, { depth: 4 });

		if (!form.valid) return fail(400, { form });

		const { scoops, flavors } = form.data;

		return message(
			form,
			`You ordered ${scoops} ${scoops === 1 ? 'scoop' : 'scoops'} of ${joinFlavours(flavors)}`
		);
	}
};
