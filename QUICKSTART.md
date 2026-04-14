# Quick Start Guide

## Setup (1 minute)

```bash
# Install dependencies
npm install

# Build tokens
npm run build
```

## Generated Files

The build creates these in `dist/`:
- **tokens.css** - CSS custom properties for use in stylesheets
- **tokens.json** - JSON format for programmatic access
- **tokens.js** - JavaScript ES module for imports
- **tokens.d.ts** - TypeScript type definitions

## Using Tokens

### In CSS
```css
@import './dist/tokens.css';

.button {
  background-color: var(--colors-buttons-ultimate-surface-default);
  color: var(--colors-buttons-ultimate-text-default);
  padding: var(--spacing-4);
  border-radius: var(--borderRadius-md);
}
```

### In JavaScript/TypeScript
```javascript
import tokens from './dist/tokens.js';

const color = tokens.colors.buttons.ultimate['surface-default'].value; // #d55d1d
const spacing = tokens.spacing['4'].value;                            // 16px
```

## Available Token Categories

### Colors (`colors.json`)
- **everpure** - Everpure Design System colors (extracted from Figma)
  - canvas, orange, grey (20-80), white, black, sea, rose, divider
- **buttons** - Button component colors (ultimate, primary, secondary, tertiary)
  - Each variant has surface and text colors for all states (default, hover, pressed, disabled)
- **primary** - Blue tones (50-900)
- **secondary** - Purple tones
- **success** - Green tones
- **warning** - Yellow tones
- **error** - Red tones
- **neutral** - Gray tones (0-950)

### Typography (`typography.json`)
- **spacing** - List and paragraph spacing from Figma typography styles
- **fontFamily** - sans, mono stacks
- **fontSize** - xs to 4xl
- **fontWeight** - regular to bold
- **lineHeight** - tight, normal, relaxed

### Layout (`layout.json`)
- **spacing** - 0 to 16 (0px to 64px)
- **borderRadius** - none to full
- **shadow** - sm to xl
- **zIndex** - base to tooltip

## Components

### Button
The Button component (`Button.tsx`, `Button.css`) fully leverages design system tokens:
- **Variants:** ultimate, primary, secondary, tertiary
- **States:** default, hover/focus, pressed, disabled
- **Sizes:** small, default, large
- All colors use `--colors-buttons-{variant}-{property}-{state}` variables

## Development Workflow

```bash
# Watch for changes and rebuild automatically
npm run dev

# Validate tokens
npm run validate

# Extract from Figma (requires setup)
npm run extract-figma
```

## Figma Integration

This project's tokens are synced with the **Everpure Design System: Sixty v4.0 beta** Figma library.

To update tokens from Figma:

1. Get access token from figma.com/@yourname/settings
2. Set environment variable: `export FIGMA_ACCESS_TOKEN=your_token`
3. Update `figma.config.json` with your Figma file key
4. Run: `npm run extract-figma`

## File Structure

```
design-system-tokens/
├── tokens/              # Source token definitions
│   ├── colors.json          # Color palette and button colors
│   ├── typography.json      # Typography spacing
│   └── layout.json
├── scripts/             # Build utilities
│   ├── build.js
│   ├── validate.js
│   ├── extract-figma.js
│   └── watch.js
├── dist/               # Generated outputs (created after build)
│   ├── tokens.css
│   ├── tokens.json
│   ├── tokens.js
│   └── tokens.d.ts
├── Button.tsx          # React button component
├── Button.css          # Button styles using token variables
└── ButtonOptions.tsx   # Button props interface
```

## Common Tasks

| Task | Command |
|------|---------|
| Build tokens | `npm run build` |
| Watch for changes | `npm run dev` |
| Validate tokens | `npm run validate` |
| Extract from Figma | `npm run extract-figma` |

## Next Steps

1. ✅ Build tokens: `npm run build`
2. 📝 Review generated outputs in `dist/`
3. 🎨 Use tokens in your CSS/JS
4. 🎯 Import the Button component: `import { Button } from './Button'`
5. 🔄 Run `npm run build` after token changes

## Examples

See [examples.js](./examples.js) for code examples of using tokens in React, Vue, and other frameworks.

For detailed documentation, see [README.md](./README.md).
