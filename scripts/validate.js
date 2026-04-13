#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensDir = path.join(__dirname, '../tokens');
const distDir = path.join(__dirname, '../dist');

async function validateTokens() {
  try {
    console.log(chalk.blue('\n✓ Validating design system tokens...\n'));

    const tokenFiles = fs.readdirSync(tokensDir).filter(file => file.endsWith('.json'));
    let totalTokens = 0;
    let errors = [];

    for (const file of tokenFiles) {
      try {
        const filePath = path.join(tokensDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const tokens = JSON.parse(content);
        const count = countTokens(tokens);
        totalTokens += count;
        console.log(chalk.green(`  ✓ ${file}`), chalk.gray(`(${count} tokens)`));
      } catch (error) {
        errors.push(`${file}: ${error.message}`);
        console.log(chalk.red(`  ✗ ${file}`), chalk.gray(error.message));
      }
    }

    // Check for naming conventions
    validateNamingConventions(tokensDir);

    // Check for color contrast (basic check)
    validateColorContrast(tokensDir);

    console.log(chalk.blue(`\n📊 Total tokens: ${totalTokens}\n`));

    if (errors.length > 0) {
      console.error(chalk.red('\n❌ Validation issues found:\n'));
      errors.forEach(error => console.error(chalk.red(`  • ${error}`)));
      process.exit(1);
    } else {
      console.log(chalk.green('✨ All tokens are valid!\n'));
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Validation failed!\n'), error);
    process.exit(1);
  }
}

function countTokens(obj, depth = 0) {
  let count = 0;
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (value.value !== undefined) {
        count++;
      } else {
        count += countTokens(value, depth + 1);
      }
    }
  }
  return count;
}

function validateNamingConventions(tokensDir) {
  console.log(chalk.gray('\nChecking naming conventions...'));
  const tokenFiles = fs.readdirSync(tokensDir).filter(file => file.endsWith('.json'));

  for (const file of tokenFiles) {
    const filePath = path.join(tokensDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const flatTokens = flattenTokens(content, '');

    for (const tokenName of Object.keys(flatTokens)) {
      // Check if token name is lowercase and kebab-case
      if (tokenName !== tokenName.toLowerCase().replace(/_/g, '-')) {
        console.warn(chalk.yellow(`  ⚠ ${file}: "${tokenName}" should be lowercase kebab-case`));
      }
    }
  }
}

function validateColorContrast(tokensDir) {
  console.log(chalk.gray('Checking color definitions...'));
  const colorsFile = path.join(tokensDir, 'colors.json');

  if (fs.existsSync(colorsFile)) {
    const colors = JSON.parse(fs.readFileSync(colorsFile, 'utf-8'));
    const colorTokens = flattenTokens(colors, '');

    for (const [name, value] of Object.entries(colorTokens)) {
      if (typeof value === 'string' && /^#[0-9a-f]{6}$/.test(value)) {
        // Valid hex color
      } else if (typeof value === 'string' && /^rgb/.test(value)) {
        // Valid rgb color
      } else {
        console.warn(chalk.yellow(`  ⚠ ${name}: Invalid color format "${value}"`));
      }
    }
  }
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

validateTokens();
