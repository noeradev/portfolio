import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { locales } from './i18n/ui';

const localeEnum = z.enum(locales as unknown as [string, ...string[]]);

/**
 * One file per project; localized copy lives under `locales.<lang>`
 * so neutral data (links, stack, cover) is never duplicated.
 */
const localizedProject = z.object({
	title: z.string(),
	tagline: z.string(),
	description: z.string(),
	highlights: z.array(z.string()).default([]),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			order: z.number().int(),
			year: z.string(),
			status: z.enum(['live', 'alpha', 'concept']),
			version: z.string().optional(),
			repo: z.url().optional(),
			live: z.url().optional(),
			private: z.boolean().default(false),
			/** Tint used for the card glow, any CSS color. */
			accent: z.string(),
			stack: z.array(z.string()).default([]),
			/** Cover shown in the WebGL carousel and the project modal. */
			cover: image(),
			locales: z
				.record(localeEnum, localizedProject)
				.refine((r) => Object.keys(r).length > 0, 'at least one locale required'),
		}),
});

export const collections = { projects };
