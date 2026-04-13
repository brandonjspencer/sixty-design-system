#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensDir = path.join(__dirname, '../tokens');

/**
 * Watch token files for changes and rebuild
 */
function watchTokens() {
  console.log(chalk.blue('\n👀 Watching tokens directory for changes...\n'));
  console.log(chalk.gray(`Watching: ${tokensDir}\n`));

  let timeout = null;
  let isBuilding = false;

  fs.watch(tokensDir, { recursive: true }, (eventType, filename) => {
    if (!filename.endsWith('.json')) return;

    console.log(chalk.gray(`${new Date().toLocaleTimeString()} - ${filename} changed`));

    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (isBuilding) return;

      isBuilding = true;
      console.log(chalk.blue('Rebuilding tokens...'));

      try {
        const buildProcess = spawn('node', ['scripts/build.js'], {
          cwd: path.join(__dirname, '..'),
          stdio: 'inherit',
        });

        buildProcess.on('close', (code) => {
          isBuilding = false;
          if (code === 0) {
            console.log(chalk.green('✓ Build complete\n'));
          }
        });
      } catch (error) {
        console.error(chalk.red('Build error:'), error);
        isBuilding = false;
      }
    }, 500);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n\n👋 Stopping watcher...\n'));
    process.exit(0);
  });
}

watchTokens();
