import { z } from 'zod';

export const flavorValues = ['cc', 'mcc', 'rr'] as const;

export type Flavor = (typeof flavorValues)[number];

export type FlavorOption = { value: Flavor; label: string };

export const flavors: FlavorOption[] = [
	{
		value: 'cc',
		label: 'Cookies and cream'
	},
	{
		value: 'mcc',
		label: 'Mint choc chip'
	},
	{
		value: 'rr',
		label: 'Raspberry ripple'
	}
];

export const scoops = [
	{
		value: 1,
		label: '1 scoop'
	},
	{
		value: 2,
		label: '2 scoops'
	},
	{
		value: 3,
		label: '3 scoops'
	}
];

export const schema = z
	.object({
		scoops: z.number().int().min(1).max(3).default(1),
		flavors: z
			.enum(flavorValues)
			.array()
			.min(1, 'Please select at least one flavour')
			.default([flavorValues[0]])
	})
	.refine((data) => data.flavors.length <= data.scoops, {
		message: "Can't order more flavors than scoops!",
		path: ['flavors']
	});
