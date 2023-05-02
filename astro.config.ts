import * as path from 'path';

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import * as shiki from 'shiki'

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm'

const theme = await shiki.loadTheme(path.join(process.cwd(), 'theme.json'));
const katex = { trust: true, fleqn: false, strict: false };
// https://astro.build/config
export default defineConfig({
    base: 'note',
    build: { format: 'file' },
    markdown: { shikiConfig: { theme } },
    integrations: [svelte(), mdx({
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [() => rehypeKatex(katex)],
    })],
});
