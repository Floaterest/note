import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
import { serveDir, serveFile } from 'https://deno.land/std@0.170.0/http/file_server.ts';
import { join, basename } from "https://deno.land/std@0.170.0/path/mod.ts";

async function handle(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url);
    console.log(join(Deno.cwd(), basename(pathname)));
    if (pathname.endsWith('.svg')) {
        return serveFile(req, join(Deno.cwd(), basename(pathname)));
    }
    return serveDir(req, { showDirListing: true });
}

serve(handle);
