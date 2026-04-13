# Design System Tokens

A comprehensive design system tokens project with CSS custom properties and JSON tokens extracted from Figma library variables.

## Features

✨ **Core Capabilities**
- 📝 Define tokens in JSON format (colors, typography, spacing, shadows, etc.)
- 🎨 Auto-generate CSS custom properties (`:root` variables)
- 📦 Export as JSON, JavaScript, and TypeScript modules
- 🎯 Extract tokens directly from Figma library variables
- ✅ Validate token naming conventions and formats
- 👀 Watch mode for development

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Tokens

```bash
npm run build
```

This generates:
- `dist/tokens.css` - CSS custom properties
- `dist/tokens.json` - JSON format
- `dist/tokens.js` - JavaScript module
- `dist/tokens.d.ts` - TypeScript definitions

### 3. Use in Your Project

**CSS:**
```css
:root {
  --colors-primary-500: #0ea5e9;
  --colors-primary-900: #082f49;
  --spacing-4: 16px;
}

.button {
  padding: var(--spacing-4);
  background-color: var(--colors-primary-500);
}
```

**JavaScript:**
```javascript
import tokens from './dist/tokens.js';

const primaryColor = tokens.colors.primary['500'].value;
```

**TypeScript:**
```typescript
import type { Tokens } from './dist/tokens';
import tokens from './dist/tokens.js';

const buttonSpacing: string = tokens.spacing['4'].value;
```

## Token Structure

Tokens are organized in JSON files by category:

### colors.json
- Primary, secondary, success, warning, error, neutral colors
- Organized in tones (50, 100, 200, ... 900)

### typography.json
- Font families (sans, mono)
- Font sizes (xs through 4xl)
- Font weights (regular through bold)
- Text styles (h1-h3, body, caption)

### layout.json
- Spacing scale (0-16)
- Border radius (sm through full)
- Box shadows (sm through xl)
- Z-index levels

## Working with Figma

### Extract Tokens from Figma

1. **Get your Figma access token:**
   - Go to [figma.com/@yourname/settings](https://figma.com/@yourname/settings)
   - Scroll to "Personal access tokens"
   - Create a new token and copy it

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your FIGMA_ACCESS_TOKEN
   ```

3. **Generate figma.config.json:**
   ```bash
   npm run extract-figma
   ```
   This creates a template config file.

4. **Update figma.config.json:**
   ```json
   {
     "fileKey": "YOUR_FIGMA_FILE_KEY"
   }
   ```
   Get your file key from the Figma URL: `figma.com/design/{fileKey}`

5. **Extract tokens:**
   ```bash
   npm run extract-figma
   ```

### Create Variables in Figma

In your Figma design file:
1. Go to **Design** panel
2. Click **Variables** (or the Variables icon)
3. Create a new collection (e.g., "Colors", "Spacing")
4. Add variables with these naming patterns:
   - `colors/primary/blue` → becomes `colors-primary-blue`
   - `spacing/padding/lg` → becomes `spacing-padding-lg`
   - `typography/font-family/sans` → becomes `typography-font-family-sans`

## Development Workflow

### Watch Mode

Automatically rebuild when token files change:

```bash
npm run dev
```

### Validate Tokens

Check for naming conventions and format issues:

```bash
npm run validate
```

### Generate Only CSS

```bash
npm run generate-css
```

### Generate Only JSON

```bash
npm run generate-json
```

## Token Format

Each token has a consistent structure:

```json
{
  "category": {
    "subcategory": {
      "tokenName": {
        "value": "value-content",
        "description": "Human-readable description"
      }
    }
  }
}
```

Example:
```json
{
  "colors": {
    "primary": {
      "500": {
        "value": "#0ea5e9",
        "description": "Primary - Base"
      }
    }
  }
}
```

## Naming Conventions

- **Token names:** lowercase, hyphen-separated (kebab-case)
- **File names:** lowercase, matching category name
- **CSS variables:** `--category-subcategory-name`
- **Figma variables:** `category/subcategory/name`

## Project Structure

```
design-system-tokens/
├── tokens/                  # Source token definitions
│   ├── colors.json
│   ├── typography.json
│   └── layout.json
├── scripts/                 # Build and utility scripts
│   ├── build.js
│   ├── extract-figma.js
│   ├── validate.js
│   └── watch.js
├── dist/                    # Generated output
│   ├── tokens.css
│   ├── tokens.json
│   ├── tokens.js
│   └── tokens.d.ts
├── figma.config.json       # Figma extraction config
├── .env.example            # Environment template
├── package.json
└── README.md
```

## Configuration

### figma.config.json

```json
{
  "fileKey": "abc123xyz",
  "description": "Your Figma design file configuration"
}
```

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `npm run build` | Build all outputs (CSS, JSON, JS, TS) |
| `npm run generate-css` | Generate CSS custom properties only |
| `npm run generate-json` | Generate JSON output only |
| `npm run extract-figma` | Extract tokens from Figma variables |
| `npm run validate` | Validate tokens and naming conventions |
| `npm run dev` | Watch mode for development |

## Extending the System

### Add New Token Category

1. Create a new file in `tokens/` directory:
   ```bash
   tokens/my-category.json
   ```

2. Define tokens following the standard format:
   ```json
   {
     "myCategory": {
       "item": {
         "value": "value",
         "description": "Description"
       }
     }
   }
   ```

3. Build:
   ```bash
   npm run build
   ```

### Add New Token Type

Edit the relevant category file and rebuild. Token types don't need to be predefined; they're dynamically parsed.

## Browser Support

CSS custom properties are supported in all modern browsers. For older browsers, use a fallback approach:

```css
.button {
  background-color: #0ea5e9; /* Fallback */
  background-color: var(--colors-primary-500);
}
```

## TypeScript Support

The generated `tokens.d.ts` provides full TypeScript support:

```typescript
import tokens from './dist/tokens.js';

// TypeScript knows the shape of tokens
const spacing = tokens.spacing['4'].value;
```

## Integration Examples

### React
```typescript
import tokens from './dist/tokens.js';

const Button = ({ children }) => (
  <button style={{
    padding: tokens.spacing['4'].value,
    backgroundColor: tokens.colors.primary['500'].value,
  }}>
    {children}
  </button>
);
```

### Vue
```vue
<script setup>
import tokens from './dist/tokens.js';
</script>

<template>
  <button :style="{
    padding: tokens.spacing['4'].value,
    backgroundColor: tokens.colors.primary['500'].value,
  }">
    Click me
  </button>
</template>
```

### Web Components
```javascript
import tokens from './dist/tokens.js';

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(`
  :host {
    --primary-color: ${tokens.colors.primary['500'].value};
    --spacing: ${tokens.spacing['4'].value};
  }
`);
```

## Troubleshooting

### Figma extraction not working
- Verify `FIGMA_ACCESS_TOKEN` is set correctly
- Check that `figma.config.json` has a valid `fileKey`
- Make sure the Figma file has library variables defined

### CSS variables not appearing
- Run `npm run build` to generate CSS
- Check `dist/tokens.css` is being imported
- Verify token names follow naming conventions

### Import errors in TypeScript
- Ensure `dist/tokens.d.ts` was generated
- Check TypeScript `paths` configuration if needed

## Best Practices

1. **Keep tokens normalized** - Use consistent units and naming
2. **Document descriptions** - Add meaningful descriptions to tokens
3. **Version your tokens** - Track changes in git
4. **Validate regularly** - Run validation before commits
5. **Single source of truth** - Use Figma as primary for UI tokens
6. **Review changes** - Use design tokens in design reviews

## Contributing

When adding or modifying tokens:
1. Update token files in `tokens/` directory
2. Run `npm run validate`
3. Run `npm run build`
4. Test in actual projects
5. Commit changes

## License

MIT

## Resources

- [Design Tokens Community Group](https://www.designtokens.org/)
- [Figma Variables Guide](https://help.figma.com/hc/en-us/articles/15145852043927-Getting-started-with-variables)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
