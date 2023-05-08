# Note

## Usage

1. clone repo and install packages
2. add contents to content collections<br>
   see [astro docs](https://docs.astro.build/en/guides/content-collections/) or [src/content/config.ts](./src/content/config.ts) for details
3. run (p)npm dev

## CD/CI

- for [actions/deploy-pages@v1](https://github.com/actions/deploy-pages), the actions/upload-artifact part is already done
- for [denoland/deployctl@v1](https://deno.com/deploy/docs/deployctl#deployctl-github-action), there is [public/entry.ts](./public/entry.ts). So `entrypoint: entry.ts` will work.
