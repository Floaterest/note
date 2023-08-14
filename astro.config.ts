import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import shiki from 'shiki';
import * as path from 'path';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import relativeLinks from 'astro-relative-links';
import svelte from '@astrojs/svelte';

const katex = {
    trust: true,
    fleqn: false,
    strict: false,
};
const theme = await shiki.loadTheme(path.join(process.cwd(), 'public/theme.json'));


// https://astro.build/config
export default defineConfig({
    trailingSlash: 'always',
    compressHTML: true,
    build: {
        format: 'directory',
        assets: 'assets',
    },
    markdown: {
        shikiConfig: {
            theme,
        },
        remarkPlugins: [remarkMath],
        rehypePlugins: [() => rehypeKatex(katex)],
    },
    integrations: [svelte(), relativeLinks(), mdx(), tailwind({
        config: {
            applyBaseStyles: false,
        },
    })],
});
