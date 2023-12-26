import { writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from 'node:child_process';

const TECTONIC = '/usr/local/bin/tectonic';
const DIST = 'dist';
const PUBLIC = 'public';

const PREAMBLE = String.raw`\documentclass{standalone}
\usepackage{xcolor,amsmath,amssymb,amsfonts}
\usepackage{fontspec}
\usepackage[T1]{fontenc}
\usepackage[tt=false, type1=true]{libertine}
\usepackage[libertine]{newtxmath}
`;

export type LatexConfig = {
    preamble: string[];
    latex: string;
    path: string;
    pages?: number;
}

function unsanitise(s: string) {
    // return s.replace(/^\s*\$\$\s*/, "").replace(/\s*\$\$\s*$/, "").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    return s.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
}

// export async function write(preamble: string | string[], latex: string, standalone: string, pages = 1): Promise<string> {
export async function write({ preamble, latex, path, pages }: LatexConfig): Promise<string> {
    pages = pages || 1;
    // remove $$ prefix/suffix
    const content = [
        PREAMBLE,
        preamble.filter(Boolean).map(p => p.replace(/(^\$\$)|(\$\$$)/g, '')).join('\n'),
        '\\begin{document}',
        unsanitise(latex),
        '\\end{document}'
    ].join('\n');

    const md5 = createHash("md5");
    const hash = md5.update(content).digest("hex");

    const p = join(DIST, path);
    if (!existsSync(p)) mkdirSync(p, { recursive: true });
    const tex = join(p, `${hash}.tex`);
    const pdf = join(p, `${hash}.pdf`);
    const svg = join(p, `${hash}.svg`);

    await writeFile(tex, content);

    if (import.meta.env.DEV) {
        return hash;
    }

    if (!existsSync(TECTONIC)) {
        console.log(`tectonic not found, skip ${tex}`);
        return hash;
    }

    if (existsSync(join(PUBLIC, path, `${hash}.pdf`))) {
        console.log(`PDF found in ${PUBLIC}, skip ${pdf}`);
        return hash;
    }
    console.log(`Compiling ${tex} to ${pdf}`);
    execFileSync(TECTONIC, [tex]);

    if (pages == 1) {
        execFileSync('/usr/bin/pdf2svg', [pdf, svg]);
    } else {
        execFileSync('/usr/bin/qpdf', ['--split-pages', pdf, join("dist", `${hash}-%d.pdf`)]);
        for (let i = 1; i <= pages; i++) {
            const n = i.toString().padStart(2, '0');
            execFileSync('/usr/bin/pdf2svg', [join("dist", `${hash}-${n}.pdf`), join("dist", `${hash}-${n}.svg`)]);
        }
    }
    return hash;
}

