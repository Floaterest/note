import { getHighlighter as getShikiHighlighter } from 'shiki';

const cache = new Map();

function stringify(opts) {
	// Always sort keys before stringifying to make sure objects match regardless of parameter ordering
	return JSON.stringify(opts, Object.keys(opts).sort());
}

async function resolve(opts) {
	return getShikiHighlighter(opts).then(hl => {
		hl.setColorReplacements({
			'#000001': 'var(--astro-code-color-text)',
			'#000002': 'var(--astro-code-color-background)',
			'#000004': 'var(--astro-code-token-constant)',
			'#000005': 'var(--astro-code-token-string)',
			'#000006': 'var(--astro-code-token-comment)',
			'#000007': 'var(--astro-code-token-keyword)',
			'#000008': 'var(--astro-code-token-parameter)',
			'#000009': 'var(--astro-code-token-function)',
			'#000010': 'var(--astro-code-token-string-expression)',
			'#000011': 'var(--astro-code-token-punctuation)',
			'#000012': 'var(--astro-code-token-link)',
		});
		return hl;
	});
}

export function getHighlighter(opts) {
	const key = stringify(opts);
	// Highlighter has already been requested, reuse the same instance
	if (cache.has(key)) {
		return cache.get(key);
	}
	const highlighter = resolve(opts);
	cache.set(key, highlighter);
	return highlighter;
}
