#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensDir = path.join(__dirname, '../tokens');
const outputDir = path.join(__dirname, '../dist');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function buildTokens() {
  try {
    console.log(chalk.blue('\n🎨 Building design system tokens...\n'));

    // Read all token files
    const tokenFiles = fs.readdirSync(tokensDir).filter(file => file.endsWith('.json'));
    let allTokens = {};

    for (const file of tokenFiles) {
      const filePath = path.join(tokensDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const tokens = JSON.parse(content);
      allTokens = { ...allTokens, ...tokens };
    }

    // Generate CSS custom properties
    const cssContent = generateCSSCustomProperties(allTokens);
    const cssPath = path.join(outputDir, 'tokens.css');
    fs.writeFileSync(cssPath, cssContent);
    console.log(chalk.green('✓ Generated CSS custom properties'));
    console.log(`  ${chalk.gray(cssPath)}`);

    // Generate JSON output
    const jsonPath = path.join(outputDir, 'tokens.json');
    fs.writeFileSync(jsonPath, JSON.stringify(allTokens, null, 2));
    console.log(chalk.green('✓ Generated tokens JSON'));
    console.log(`  ${chalk.gray(jsonPath)}`);

    // Generate JavaScript module
    const jsContent = generateJSModule(allTokens);
    const jsPath = path.join(outputDir, 'tokens.js');
    fs.writeFileSync(jsPath, jsContent);
    console.log(chalk.green('✓ Generated JavaScript module'));
    console.log(`  ${chalk.gray(jsPath)}`);

    // Generate TypeScript definitions
    const tsContent = generateTypeScriptDefinitions(allTokens);
    const tsPath = path.join(outputDir, 'tokens.d.ts');
    fs.writeFileSync(tsPath, tsContent);
    console.log(chalk.green('✓ Generated TypeScript definitions'));
    console.log(`  ${chalk.gray(tsPath)}`);

    console.log(chalk.blue('\n✨ Build complete!\n'));
  } catch (error) {
    console.error(chalk.red('\n❌ Build failed!\n'), error);
    process.exit(1);
  }
}

function generateCSSCustomProperties(tokens) {
  let css = '/* Design System CSS Custom Properties */\n/* Auto-generated - do not edit directly */\n\n';
  css += ':root {\n';

  const cssVariables = flattenTokens(tokens, '');

  for (const [key, value] of Object.entries(cssVariables)) {
    css += `  --${key}: ${formatCSSValue(value)};\n`;
  }

  css += '}\n';

  return css;
}

function flattenTokens(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value) && value.value === undefined) {
      Object.assign(result, flattenTokens(value, newKey));
    } else if (value && typeof value === 'object' && value.value !== undefined) {
      if (typeof value.value === 'object') {
        Object.assign(result, flattenTokens(value.value, newKey));
      } else {
        result[newKey] = value.value;
      }
    }
  }

  return result;
}

function formatCSSValue(value) {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

function generateJSModule(tokens) {
  return `// Design System Tokens\n// Auto-generated - do not edit directly\n\nexport const tokens = ${JSON.stringify(tokens, null, 2)};\n\nexport default tokens;\n`;
}

function generateTypeScriptDefinitions(tokens) {
  let ts = '// Design System Tokens\n// Auto-generated - do not edit directly\n\n';
  ts += 'export interface TokenValue {\n';
  ts += '  value: string | number | object;\n';
  ts += '  description?: string;\n';
  ts += '}\n\n';
  ts += 'export interface Tokens {\n';

  for (const category of Object.keys(tokens)) {
    ts += `  ${category}: Record<string, any>;\n`;
  }

  ts += '}\n\n';
  ts += 'export declare const tokens: Tokens;\nexport default tokens;\n';

  return ts;
}

buildTokens();
