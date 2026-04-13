#!/usr/bin/env node

/**
 * Examples of using design system tokens
 * 
 * Run after building: npm run build
 */

// Example 1: Using tokens in JavaScript
console.log('=== JavaScript Token Usage ===\n');

try {
  const tokens = require('./dist/tokens.js').default;
  
  console.log('Primary Color (500):', tokens.colors.primary['500'].value);
  console.log('Spacing (4):', tokens.spacing['4'].value);
  console.log('Border Radius (md):', tokens.borderRadius.md.value);
  console.log('Shadow (lg):', tokens.shadow.lg.value);
  console.log('Font Size (lg):', tokens.typography.fontSize.lg.value);
  
} catch (error) {
  console.log('Tokens not yet built. Run: npm run build\n');
}

// Example 2: Generating style objects
console.log('\n=== Generating Style Objects ===\n');

function createButtonStyles(tokens) {
  return {
    padding: tokens.spacing['4'].value,
    borderRadius: tokens.borderRadius.md.value,
    backgroundColor: tokens.colors.primary['500'].value,
    color: tokens.colors.neutral['0'].value,
    boxShadow: tokens.shadow.md.value,
    fontSize: tokens.typography.fontSize.base.value,
    fontFamily: tokens.typography.fontFamily.sans.value,
    fontWeight: tokens.typography.fontWeight.semibold.value,
  };
}

console.log('Button styles would be:', JSON.stringify({
  "padding": "16px",
  "borderRadius": "8px",
  "backgroundColor": "#0ea5e9",
  "color": "#ffffff",
  "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  "fontSize": "16px",
  "fontFamily": "system-ui, -apple-system, sans-serif",
  "fontWeight": "600"
}, null, 2));

// Example 3: Creating CSS class definitions
console.log('\n=== CSS Class Definitions ===\n');

const cssExampleCode = `
/* Generated from tokens */
.button {
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  background-color: var(--colors-primary-500);
  color: var(--colors-neutral-0);
  box-shadow: var(--shadow-md);
  font-size: var(--typography-font-size-base);
  font-family: var(--typography-font-family-sans);
  font-weight: var(--typography-font-weight-semibold);
}

.button:hover {
  background-color: var(--colors-primary-600);
  box-shadow: var(--shadow-lg);
}

.button.secondary {
  background-color: var(--colors-secondary-500);
}

.button.danger {
  background-color: var(--colors-error-500);
}
`;

console.log(cssExampleCode);

// Example 4: React component example
console.log('\n=== React Component Example ===\n');

const reactExampleCode = `
import tokens from './dist/tokens.js';

export const Button = ({ variant = 'primary', children, ...props }) => {
  const variantColor = {
    primary: tokens.colors.primary['500'].value,
    secondary: tokens.colors.secondary['500'].value,
    danger: tokens.colors.error['500'].value,
  }[variant];

  return (
    <button
      style={{
        padding: tokens.spacing['4'].value,
        borderRadius: tokens.borderRadius.md.value,
        backgroundColor: variantColor,
        color: tokens.colors.neutral['0'].value,
        boxShadow: tokens.shadow.md.value,
        fontSize: tokens.typography.fontSize.base.value,
        fontFamily: tokens.typography.fontFamily.sans.value,
        fontWeight: tokens.typography.fontWeight.semibold.value,
        border: 'none',
        cursor: 'pointer',
      }}
      {...props}
    >
      {children}
    </button>
  );
};
`;

console.log(reactExampleCode);

console.log('\n✨ See examples in tokens/ directory and dist/ for generated outputs\n');
