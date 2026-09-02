import { readFileSync, mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { build } from 'esbuild';

const root = process.cwd();
const srcDir = join(root, 'src');
const distDir = join(root, 'dist');
const modules = [
  '01-constants.js', '02-state.js', '03-sound-engine.js', '04-smoothing.js',
  '05-loading.js', '06-landing-screen.js', '07-3d-world.js', '08-fighter-rig.js',
  '09-pose-processing.js', '10-combat.js', '11-adaptive-ai.js', '12-fx.js',
  '13-fighter-animation.js', '14-render-loop.js', '15-skeleton-overlay.js',
  '16-camera-onboarding.js', '17-camera-mediapipe.js', '18-manual-controls.js',
  '19-calibration.js', '20-ui.js', '21-modals.js', '22-usability-test-mode-test-1.js',
  '23-boot.js', '24-init.js'
];

mkdirSync(distDir, { recursive: true });
const entry = modules.map(name => readFileSync(join(srcDir, name), 'utf8')).join('\n\n');
const entryPath = join(distDir, 'runtime-entry.js');
writeFileSync(entryPath, entry);
await build({
  entryPoints: [entryPath],
  outfile: join(distDir, 'app.js'),
  bundle: true,
  minify: true,
  sourcemap: true,
  legalComments: 'none',
  target: ['es2020']
});
rmSync(entryPath, { force: true });
const productionIndex = readFileSync(join(root, 'index.html'), 'utf8')
  .replace(/\n<script defer src="src\/[^>]+><\/script>/g, '')
  .replace('</head>', '  <script defer src="app.js"></script>\n</head>');
writeFileSync(join(distDir, 'index.html'), productionIndex);
cpSync(join(root, 'styles.css'), join(distDir, 'styles.css'));
cpSync(join(root, 'assets'), join(distDir, 'assets'), { recursive: true });
console.log(`Built dist/app.js from ${modules.length} runtime modules.`);
