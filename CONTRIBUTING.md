# Contributing Guide

## Adding New Tokens

### 1. Choose a Category

Tokens are organized by category:
- **colors.json** - Color tokens
- **typography.json** - Font, text style tokens
- **layout.json** - Spacing, borders, shadows, z-index

### 2. Define Your Token

Add to the appropriate file using this structure:

```json
{
  "category": {
    "subcategory": {
      "tokenName": {
        "value": "your-value",
        "description": "Human-readable description"
      }
    }
  }
}
```

### 3. Examples

**Color Token:**
```json
{
  "colors": {
    "brand": {
      "primary": {
        "value": "#5b21b6",
        "description": "Brand primary purple"
      }
    }
  }
}
```

**Spacing Token:**
```json
{
  "spacing": {
    "xl": {
      "value": "96px",
      "description": "Extra large spacing"
    }
  }
}
```

**Text Style Token:**
```json
{
  "typography": {
    "textStyle": {
      "label": {
        "value": {
          "fontSize": "12px",
          "fontWeight": "600",
          "lineHeight": "1.2"
        },
        "description": "Label text style"
      }
    }
  }
}
```

## Build Process

After adding tokens, rebuild the project:

```bash
npm run build
```

This generates:
- `dist/tokens.css` - CSS custom properties
- `dist/tokens.json` - JSON export
- `dist/tokens.js` - JavaScript module
- `dist/tokens.d.ts` - TypeScript definitions

## Validation

Ensure your tokens follow conventions:

```bash
npm run validate
```

### Naming Rules

- Token names: **lowercase, hyphen-separated** (kebab-case)
- File names: lowercase, match category name
- No abbreviations (use `border-radius` not `br`)
- Use semantic names when possible

### Value Rules

- Colors: Hex format or RGB
- Sizes: Always include units (px, em, rem)
- Font sizes: Usually in px
- Spacing: Multiples of base unit (4px, 8px, 12px, etc.)

## Creating Text Styles

Text styles combine multiple typography properties:

```json
{
  "typography": {
    "textStyle": {
      "heading1": {
        "value": {
          "fontSize": "32px",
          "fontWeight": "700",
          "lineHeight": "1.2",
          "fontFamily": "system-ui, sans-serif"
        },
        "description": "Main page heading"
      }
    }
  }
}
```

## Color Guidelines

### Organizing Colors

Use a tonal system (50, 100, 200, ... 900):
- **50**: Lightest variant
- **100-200**: Light tones
- **300-400**: Lighter tones
- **500**: Base / primary tone
- **600-700**: Darker tones
- **800-900**: Very dark

Example:
```json
{
  "colors": {
    "green": {
      "50": { "value": "#f0fdf4" },
      "100": { "value": "#dcfce7" },
      "500": { "value": "#22c55e" },
      "900": { "value": "#14532d" }
    }
  }
}
```

## File Organization

### tokens/
- `colors.json` - All color definitions
- `typography.json` - Fonts, sizes, styles
- `layout.json` - Spacing, radius, shadows, z-index

### Adding a New Category

Create a new file following the same structure:

```bash
# Create tokens/effects.json
{
  "effects": {
    "blur": {
      "sm": {
        "value": "blur(4px)",
        "description": "Small blur effect"
      }
    }
  }
}
```

Then rebuild: `npm run build`

## Testing Your Tokens

### In CSS

```css
@import './dist/tokens.css';

.element {
  color: var(--colors-primary-500);
  padding: var(--spacing-4);
}
```

### In JavaScript

```javascript
import tokens from './dist/tokens.js';

// Access nested tokens
const color = tokens.colors.primary['500'].value;
const size = tokens.spacing['4'].value;
```

### In TypeScript

```typescript
import tokens from './dist/tokens.js';
import type { Tokens } from './dist/tokens.d.ts';

const spacing: string = tokens.spacing['4'].value;
```

## Figma Integration

### Creating Figma Variables

1. In Figma design file, go to **Design panel**
2. Click **Variables** (Variables icon)
3. Create a collection for each token category
4. Add variables with naming pattern: `category/subcategory/name`

Example Figma variable names:
- `colors/primary/blue` → extracted as `colors-primary-blue`
- `typography/fontSize/lg` → extracted as `typography-font-size-lg`
- `spacing/padding/md` → extracted as `spacing-padding-md`

### Extracting from Figma

```bash
# Set your API token
export FIGMA_ACCESS_TOKEN=your_token

# Extract variables
npm run extract-figma
```

This creates/updates `figma.config.json` template and reads variables from your Figma file.

## Code Review Checklist

When contributing tokens, ensure:

- ✅ Token names are lowercase kebab-case
- ✅ Values include proper units (px, em, etc.)
- ✅ Descriptions are clear and helpful
- ✅ No duplicate tokens
- ✅ Organized in appropriate file
- ✅ Validation passes: `npm run validate`
- ✅ Build succeeds: `npm run build`
- ✅ Tested in actual use case

## Breaking Changes

Changes that need a major version bump:
- Renaming existing tokens
- Changing token values significantly
- Removing tokens
- Restructuring major categories

Changes that need a minor version bump:
- Adding new tokens
- Adding new categories
- Updating descriptions

## Gitflow

1. Create a branch for your changes
2. Add/modify tokens in `tokens/` directory
3. Run tests: `npm run validate`
4. Run build: `npm run build`
5. Commit both source and generated files
6. Submit PR with before/after screenshots if needed

## Performance Tips

- Keep token structure predictable
- Use consistent naming patterns
- Group related tokens together
- Document complex relationships

## Troubleshooting

### Build fails
```bash
npm run build  # Check for JSON syntax errors
npm run validate  # Check token validation
```

### CSS variables not working
- Ensure `dist/tokens.css` is imported
- Check variable names in browser DevTools
- Verify CSS is loaded before use

### Figma extraction not working
- Verify `FIGMA_ACCESS_TOKEN` is set
- Check `figma.config.json` has valid `fileKey`
- Ensure Figma file has variables defined

## Support

For questions or issues:
1. Check existing tokens for patterns
2. Review this guide and README.md
3. Run `npm run validate` for error details
4. Check generated files in `dist/` directory

## Additional Resources

- [Design Tokens Specification](https://www.designtokens.org/)
- [Figma Variables Guide](https://help.figma.com/hc/en-us/articles/15145852043927-Getting-started-with-variables)
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Design System Examples](./examples.js)
