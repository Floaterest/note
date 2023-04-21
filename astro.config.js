import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const katex = {
    trust: true,
    strict: false,
}

// workaround until Phase 2 (https://github.com/withastro/astro/issues/1212)
// same for src/components/Code.astro
const theme = '../../../../../../theme'

// https://astro.build/config
export default defineConfig({
    base: 'note',
    build:{ format: 'file' },
    integrations: [svelte(), mdx({
        remarkPlugins: [remarkMath],
        rehypePlugins: [() => rehypeKatex(katex)]
    })],
    markdown: {
        shikiConfig:{ theme }
    }
});
