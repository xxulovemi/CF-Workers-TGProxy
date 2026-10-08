import { build } from 'esbuild';


build({
  // 精确指向您的源码文件（如果您的文件名是 index.js，请改为 'src/index.js'）
  entryPoints: ['src/_worker.js'],
  bundle: true,
  minify: true,
  outdir: 'dist',
  format: 'esm',
  target: 'es2022',
  platform: 'node', // 允许打包 Node.js 兼容模块
  // 让 esbuild 按 workerd 运行时的 package.json exports 条件解析依赖，
  // 而不是普通 Node.js 环境的条件；nodejs_compat 默认开启后（2026-08-04+）
  // 很多包会同时提供 workerd/browser 专用入口，加上这个条件能选到正确的版本
  conditions: ['workerd', 'worker', 'browser'],
  external: ['cloudflare:sockets'], // 排除 cloudflare 原生 sockets 模块
}).catch(() => process.exit(1));