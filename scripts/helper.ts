import Bun, {
    $,
    write,
    build,
    serve,
    file,
} from 'bun';
import { parseArgs } from 'util';
import { watch } from 'fs';

const { values: {
    port = '1714',
    outdir = 'dist',
    srcdir = 'src',
    entrypoints = 'index.tsx',
    serve: serveOption = false,
    watch: watchOption = false,
    bundle: bundleOption = false,
}} = parseArgs({
    args: Bun.argv,
    options: {
        port: { type: 'string', short: 'p' },
        outdir: { type: 'string', short: 'o' },
        srcdir: { type: 'string', short: 'i' },
        entrypoints: { type: 'string' },
        serve: { type: 'boolean', short: 's' },
        watch: { type: 'boolean', short: 'w' },
        bundle: { type: 'boolean', short: 'b' },
    },
    strict: true,
    allowPositionals: true,
});

async function bundle() {
    if (!bundleOption) return;
    await Promise.all([
        $`bun x tailwindcss -i ${srcdir}/index.css -o ${outdir}/index.css`,
        write(`${outdir}/index.html`, 
        '<!DOCTYPE html>' + '\n' +
        '<html>' + '\n' +
            '<head>' + '\n' +
                '<meta charset="utf-8">' + '\n' +
                '<meta name="viewport" content="width=device-width, initial-scale=1">' + '\n' +
                '<link rel="stylesheet" href="index.css">' + '\n' +
            '</head>' + '\n' +
            '<body>' + '\n' +
                '<div id="app"></div>' + '\n' +
                '<script type="module" src="index.js"></script> ' + '\n' +
                ((watchOption) ? (
                '<script>' + '\n' +
                    'if (!globalThis.ws) {' + '\n' +
                        `new WebSocket("ws://localhost:${port}/dev").onmessage = () => location.reload();` + '\n' +
                        'globalThis.ws = true;' + '\n' +
                    '}'+ '\n' + 
                '</script>' + '\n') : '') +
            '</body>' + '\n' +
        '<html>' + '\n'
        ),
        await build({
            entrypoints: entrypoints.split(',').map((e) => `${srcdir}/${e}`),
            outdir,
            format: 'esm',
            target: 'browser',
            minify: Bun.env.NODE_ENV === 'production',
            splitting: true,
            sourcemap: Bun.env.NODE_ENV === 'development' ? 'inline' : 'none',
            define: { 'process.env.NODE_ENV': `"${Bun.env.NODE_ENV}"` },
        }),
    ]);
}

await bundle();

if (!serveOption) process.exit(0);

const server = serve({
    port: Number(port),
    fetch(request, server) {
        let { pathname } = new URL(request.url);
        if (pathname === '/dev') {
            return server.upgrade(request) ? undefined : new Response(null, { status: 400 });
        }
        if (pathname === '/') {
            pathname = '/index.html';
        }
        return new Response(file(`${outdir}${pathname}`));
    },
    websocket: {
        message: () => {},
        open: (ws) => ws.subscribe('dev'),
    },
});

console.info(`Server running at http://localhost:${port}`);

const watcher = watchOption
    ? 
        watch(srcdir, { recursive: true }, () => bundle().then(() => server.publish('dev', ''))) 
    : 
        undefined;

process.on('SIGINT', () => {
    watcher?.close();
    server.stop(true);
    process.exit(0);
});