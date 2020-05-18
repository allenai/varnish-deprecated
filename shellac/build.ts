/**
 * This helper function packages up the things required for shellac and
 * sticks them in the provided directory.
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateCSS } from './generateCSS';
import { generateLESS } from './generateLESS';

// TODO: (@codeviking) Image assets need a better solution. This will do for now
// but should be refined in the near future.
import { svgs } from './server';

// This is a little whacky. We use Shellac to generate the LESS that our modified
// fork of `ant-design` depends on. We put this in `dist_varnish` instead of
// `dist` as the build tooling from `ant-design` clears out `dist` as part of it's
// build process.
const distPath = path.join(__dirname, '..', 'dist_varnish');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const lessPath = path.join(distPath, 'varnish.less');
fs.writeFileSync(lessPath, generateLESS(), 'utf-8');
console.log(`✨ wrote ${path.relative(process.cwd(), lessPath)}`); // eslint-disable-line no-console

const cssPath = path.join(distPath, 'shellac.css');
fs.writeFileSync(cssPath, generateCSS(), 'utf-8');
console.log(`✨ wrote ${path.relative(process.cwd(), cssPath)}`); // eslint-disable-line no-console

for (let i = 0; i < svgs.length; i++) {
  const svgPath = svgs[i];
  const outputPath = path.join(distPath, path.basename(svgPath));
  fs.writeFileSync(outputPath, fs.readFileSync(svgPath, 'utf-8'), 'utf-8');
  console.log(`🌅 wrote ${path.relative(process.cwd(), outputPath)}`); // eslint-disable-line no-console
}

const htmlPath = path.join(__dirname, 'template.html');
const htmlOutputPath = path.join(distPath, 'shellac.html');
fs.writeFileSync(htmlOutputPath, fs.readFileSync(htmlPath, 'utf-8'), 'utf-8');
console.log(`🕸  wrote ${path.relative(process.cwd(), htmlOutputPath)}`); // eslint-disable-line no-console
