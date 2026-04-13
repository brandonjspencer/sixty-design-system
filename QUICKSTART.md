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
  background-color: var(--colors-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--borderRadius-md);
}
```

### In JavaScript/TypeScript
```javascript
import tokens from './dist/tokens.js';

const color = tokens.colors.primary['500'].value; // #0ea5e9
const spacing = tokens.spacing['4'].value;        // 16px
```

## Available Tokens

### Colors (`colors.json`)
- **primary** - Blue tones (50-900)
- **secondary** - Purple tones
- **success** - Green tones
- **warning** - Yellow tones
- **error** - Red tones
- **neutral** - Gray tones (0-950)

### Typography (`typography.json`)
- **fontFamily** - sans, mono stacks
- **fontSize** - xs to 4xl
- **fontWeight** - regular to bold
- **lineHeight** - tight, normal, relaxed
- **textStyle** - h1, h2, h3, body, caption

### Layout (`layout.json`)
- **spacing** - 0 to 16 (0px to 64px)
- **borderRadius** - none to full
- **shadow** - sm to xl
- **zIndex** - base to tooltip

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

To extract tokens from Figma:

1. Get access token from figma.com/@yourname/settings
2. Set environment variable: `export FIGMA_ACCESS_TOKEN=your_token`
3. Copy `.env.example` to `.env` and add your token
4. Run: `npm run extract-figma`
5. Update `figma.config.json` with your Figma file key
6. Run again: `npm run extract-figma`

## File Structure

```
design-system-tokens/
├── tokens/              # Source token definitions
│   ├── colors.json
│   ├── typography.json
│   └── layout.json
├── scripts/             # Build utilities
│   ├── build.js
│   ├── validate.js
│   ├── extract-figma.js
│   └── watch.js
└── dist/               # Generated outputs (created after build)
    ├── tokens.css
    ├── tokens.json
    ├── tokens.js
    └── tokens.d.ts
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
4. 🎯 Add more tokens by editing files in `tokens/`
5. 🔄 Run `npm run build` after changes

## Examples

See [examples.js](./examples.js) for code examples of using tokens in React, Vue, and other frameworks.

For detailed documentation, see [README.md](./README.md).
