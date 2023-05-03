import * as path from 'node:path';

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
// import deno from '@astrojs/deno';

import * as shiki from 'shiki';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const theme = await shiki.loadTheme(path.join(process.cwd(), 'theme.json'));
const katex = { trust: true, fleqn: false, strict: false };

// https://astro.build/config
export default defineConfig({
    // output: 'server',
    // adapter: deno(),
    trailingSlash: 'always',
    build: { format: 'directory' },
    markdown: {
        shikiConfig: { theme },
        remarkPlugins: [remarkMath],
        rehypePlugins: [() => rehypeKatex(katex)],
    },
    integrations: [svelte(), mdx()],
});
