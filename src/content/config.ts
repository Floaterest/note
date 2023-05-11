import { z, defineCollection } from 'astro:content';

const collection = defineCollection({
    schema: z.object({
        title: z.optional(z.string()),
    }),
});

const contents = ['example']

export const collections: { [content: string]: any } = Object.assign({}, ...contents.map(
    content => ({ [content]: collection })
));
