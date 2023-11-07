import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import relativeLinks from 'astro-relative-links';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import { remarkExtendedTable, extendedTableHandlers } from 'remark-extended-table';
import remarkMath from 'remark-math';
import theme from './theme.json'

const katex = {
    trust: true,
    fleqn: false,
    strict: false,
};

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
        remarkPlugins: [remarkMath, remarkExtendedTable],
        rehypePlugins: [() => rehypeKatex(katex)],
        remarkRehype: { handlers: Object.assign({}, extendedTableHandlers) },
    },
    integrations: [svelte(), relativeLinks(), mdx(), tailwind(tailw)],
});
