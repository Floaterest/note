import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import relativeLinks from 'astro-relative-links';
import { defineConfig } from 'astro/config';
import * as path from 'path';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import shiki from 'shiki';

const katex = {
    trust: true,
    fleqn: false,
    strict: false,
};

const theme = await shiki.loadTheme(path.join(process.cwd(), 'public/theme.json'));

const tailw: any = {
    config: {
        applyBaseStyles: false,
    },
};

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
    integrations: [svelte(), relativeLinks(), mdx(), tailwind(tailw)],
});
