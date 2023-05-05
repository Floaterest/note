import { z, defineCollection } from 'astro:content';
import { readdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const collection = defineCollection({
    schema: z.object({
        title: z.optional(z.string()),
    }),
});

// list collection names
const contents = (await readdir(fileURLToPath(dirname(import.meta.url)))).filter(p => !p.startsWith('config'))

export const collections: { [content: string]: any } = Object.assign({}, ...contents.map(
    content => ({ [content]: collection })
));
