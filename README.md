# Design System Tokens

Everpure Design System: Sixty v4.0 - A comprehensive design system with tokens extracted from Figma library variables, CSS custom properties, and reusable React components.

## Features

✨ **Core Capabilities**
- 📝 Tokens defined in JSON format (colors, typography, spacing, shadows, etc.)
- 🎨 Auto-generate CSS custom properties (`:root` variables)
- 📦 Export as JSON, JavaScript, and TypeScript modules
- 🎯 Extract tokens directly from Figma library variables
- ✅ Validate token naming conventions and formats
- 👀 Watch mode for development
- 🔘 Reusable Button component leveraging design tokens

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

### 3. Use Tokens in Your Project

**CSS:**
```css
@import './dist/tokens.css';

.container {
  padding: var(--spacing-lg);
  background-color: var(--colors-everpure-canvas);
  border-radius: var(--borderRadius-md);
}
```

**JavaScript:**
```javascript
import tokens from './dist/tokens.js';

const canvasColor = tokens.colors.everpure.canvas.value;  // #F5F1E8
```

**TypeScript:**
```typescript
import type { Tokens } from './dist/tokens';
import tokens from './dist/tokens.js';

const canvasColor: string = tokens.colors.everpure.canvas.value;
```

### 4. Use the Button Component

```typescript
import { Button, type ButtonProps } from './Button';

export function App() {
  return (
    <>
      <Button variant="ultimate">Primary Action</Button>
      <Button variant="primary">Secondary Action</Button>
      <Button variant="secondary">Tertiary Action</Button>
      <Button variant="tertiary">Ghost Action</Button>
    </>
  );
}
```

## Token Structure

Tokens are organized in JSON files by category:

### colors.json
- **everpure** - Everpure Design System colors (extracted from Figma)
  - orange, grey (with opacity variants), white, black, sea, rose, divider, footer-text
- **buttons** - Button component colors by variant
  - ultimate, primary, secondary, tertiary
  - Each with surface and text colors for: default, hover, pressed, disabled
- **Primary, secondary, success, warning, error, neutral** - Standard color palettes
  - Organized in tones (50, 100, 200, ... 900)

### typography.json
- **spacing** - List and paragraph line spacing from Figma typography styles
- **fontFamily** - sans, mono stacks
- **fontSize** - xs through 4xl
- **fontWeight** - regular through bold
- **lineHeight** - tight, normal, relaxed

### layout.json
- **spacing** - 0 to 16 (0px to 64px)
- **borderRadius** - none to full
- **shadow** - sm to xl
- **zIndex** - base to tooltip

## Components

### Button Component

Located in `Button.tsx` with corresponding styles in `Button.css`:

**Features:**
- **Variants:** ultimate, primary, secondary, tertiary
- **States:** default, hover/focus, pressed, disabled
- **Sizes:** small, default, large
- **Icons:** Optional left/right icons
- All colors sourced from `--colors-buttons-{variant}-{property}-{state}` tokens

**Example:**
```typescript
<Button 
  variant="ultimate" 
  size="large"
  showLeftIcon={true}
  disabled={false}
>
  Click Me
</Button>
```

## Working with Figma

### Sync Tokens from Figma

This project is synced with the **Everpure Design System: Sixty v4.0 beta** Figma file.

To update tokens from your own Figma library:

1. **Get your Figma access token:**
   - Go to [figma.com/@yourname/settings](https://figma.com/@yourname/settings)
   - Scroll to "Personal access tokens"
   - Create a new token and copy it

2. **Configure figma.config.json:**
   ```json
   {
     "fileKey": "YOUR_FIGMA_FILE_KEY",
     "description": "Your Figma design file"
   }
   ```
   Get your file key from the URL: `figma.com/design/{fileKey}`

3. **Extract tokens:**
   ```bash
   FIGMA_ACCESS_TOKEN=your_token npm run extract-figma
   ```

### Create Variables in Figma

In your Figma design file:
1. Go to **Design** panel → **Variables** section
2. Create a new collection (e.g., "Colors", "Spacing", "Typography")
3. Add variables with naming patterns that match your token structure:
   - `colors/buttons/ultimate/surface-default` → `colors-buttons-ultimate-surface-default`
   - `spacing/padding/lg` → `spacing-padding-lg`
   - `typography/font-family/sans` → `typography-font-family-sans`

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
