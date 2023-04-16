import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const katex = {
    trust: true,
    strict: false,
}

// https://astro.build/config
export default defineConfig({
    base: 'note',
    build:{ format: 'file' },
    integrations: [svelte(), mdx({
        remarkPlugins: { extends: [remarkMath] },
        rehypePlugins: { extends: [() => rehypeKatex(katex)] }
    })]
});