import { z, defineCollection } from 'astro:content';
import { readdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const collection = defineCollection({
    schema: z.object({
        title: z.optional(z.string()),
    }),
});

/*
e.g. for the following file structure:
content
├── colle-1
│   ├── page-1.md
│   ├── page-2.md
│   └── page-3.md
└── colle-2
    ├── page-1.md
    ├── page-2.md
    └── page-3.md

then `contents` will be ['colle-1', 'colle-2']
*/
const contents = (await readdir(fileURLToPath(dirname(import.meta.url)))).filter(p => !p.startsWith('config'))

export const collections: { [content: string]: any } = Object.assign({}, ...contents.map(
    content => ({ [content]: collection })
));
