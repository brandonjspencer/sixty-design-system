#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import 'dotenv/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensDir = path.join(__dirname, '../tokens');
const configPath = path.join(__dirname, '../figma.config.json');

/**
 * Extract design tokens from Figma library variables
 * 
 * Requires:
 * - FIGMA_ACCESS_TOKEN environment variable
 * - figma.config.json with fileKey and variableIds
 * 
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your-token node scripts/extract-figma.js
 */

async function extractFigmaTokens() {
  try {
    console.log(chalk.blue('\n🎨 Extracting tokens from Figma...\n'));

    const accessToken = process.env.FIGMA_ACCESS_TOKEN;
    if (!accessToken) {
      console.error(chalk.red('❌ Error: FIGMA_ACCESS_TOKEN environment variable not set'));
      console.log(chalk.gray('Please set your Figma API token:'));
      console.log(chalk.gray('  export FIGMA_ACCESS_TOKEN=your_access_token\n'));
      process.exit(1);
    }

    if (!fs.existsSync(configPath)) {
      console.warn(chalk.yellow('⚠ figma.config.json not found. Creating template...\n'));
      createConfigTemplate();
      process.exit(0);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const { fileKey } = config;

    if (!fileKey) {
      console.error(chalk.red('❌ Error: fileKey not specified in figma.config.json'));
      process.exit(1);
    }

    // Fetch file metadata and variables
    console.log(chalk.gray(`Fetching from Figma file: ${fileKey}...`));
    
    const fileResponse = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
      headers: {
        'X-Figma-Token': accessToken,
      },
    });

    if (!fileResponse.ok) {
      throw new Error(`Figma API error: ${fileResponse.status} ${fileResponse.statusText}`);
    }

    const fileData = await fileResponse.json();
    const variables = fileData.variables || [];

    if (variables.length === 0) {
      console.warn(chalk.yellow('⚠ No variables found in the specified Figma file'));
      process.exit(0);
    }

    // Organize variables by collection
    const tokensByCollection = {};

    for (const variable of variables) {
      const { name, resolvedType, valuesByMode } = variable;
      const [collection, ...nameParts] = name.split('/');
      const tokenName = nameParts.join('-').toLowerCase();

      if (!tokensByCollection[collection.toLowerCase()]) {
        tokensByCollection[collection.toLowerCase()] = {};
      }

      // Get the first mode's value as the default
      const defaultModeId = Object.keys(valuesByMode)[0];
      const tokenValue = valuesByMode[defaultModeId];

      tokensByCollection[collection.toLowerCase()][tokenName] = {
        value: tokenValue,
        description: `Extracted from Figma (${name})`,
        type: resolvedType,
      };
    }

    // Save extracted tokens
    for (const [collection, tokens] of Object.entries(tokensByCollection)) {
      const tokenPath = path.join(tokensDir, `${collection}.json`);
      fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
      console.log(chalk.green(`✓ Extracted ${Object.keys(tokens).length} ${collection} tokens`));
      console.log(`  ${chalk.gray(tokenPath)}`);
    }

    console.log(chalk.blue('\n✨ Extraction complete!\n'));
    console.log(chalk.gray('Run `npm run build` to generate CSS and JSON outputs.\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Extraction failed!\n'), error.message);
    process.exit(1);
  }
}

function createConfigTemplate() {
  const template = {
    fileKey: 'YOUR_FIGMA_FILE_KEY',
    description: 'Configuration for Figma token extraction',
    instructions: [
      '1. Get your Figma file key from the URL: figma.com/design/{fileKey}',
      '2. Set FIGMA_ACCESS_TOKEN environment variable with your personal access token',
      '3. Create library variables in Figma (Design -> Variables)',
      '4. Run: npm run extract-figma',
    ],
  };

  fs.writeFileSync(configPath, JSON.stringify(template, null, 2));
  console.log(chalk.green('✓ Created figma.config.json template'));
  console.log(`  ${chalk.gray(configPath)}`);
  console.log(chalk.gray('\nTo get your Figma access token:'));
  console.log(chalk.gray('  1. Go to figma.com/@yourname/settings'));
  console.log(chalk.gray('  2. Scroll to Personal access tokens'));
  console.log(chalk.gray('  3. Create a new token and copy it\n'));
}

extractFigmaTokens();
