# Design System Tokens - Complete Setup

## Project Created Successfully! ✨

Your design system tokens project is now ready with all components set up and working.

## What's Included

### 📦 Core Components

1. **Token Definitions** (`tokens/`)
   - `colors.json` - 35 color tokens (primary, secondary, success, warning, error, neutral)
   - `typography.json` - 23 typography tokens (fonts, sizes, weights, styles)
   - `layout.json` - 30 layout tokens (spacing, radius, shadows, z-index)

2. **Build System** (`scripts/`)
   - `build.js` - Generates CSS, JSON, JS, and TypeScript outputs
   - `extract-figma.js` - Extract tokens from Figma library variables
   - `validate.js` - Validate tokens and naming conventions
   - `watch.js` - Watch mode for development

3. **Generated Outputs** (`dist/`)
   - `tokens.css` - CSS custom properties (`:root` variables)
   - `tokens.json` - JSON format for programmatic access
   - `tokens.js` - JavaScript ES module
   - `tokens.d.ts` - TypeScript definitions

4. **Configuration**
   - `tokens.config.json` - Project configuration
   - `figma.config.json` - Figma integration template (created on first extract)
   - `.env.example` - Environment variables template
   - `.vscode/tasks.json` - VSCode build tasks
   - `.vscode/launch.json` - VSCode debugging configurations

### 📚 Documentation

- **README.md** - Comprehensive guide with usage patterns
- **QUICKSTART.md** - Get started in 1 minute
- **CONTRIBUTING.md** - How to add/modify tokens
- **examples.js** - Code examples for React, Vue, etc.

## Quick Commands

```bash
# Build tokens (generates CSS, JSON, JS, TS)
npm run build

# Watch for changes during development
npm run dev

# Validate token structure and naming
npm run validate

# Extract tokens from Figma library variables
npm run extract-figma
```

## Token Organization

### CSS Usage
```css
@import './dist/tokens.css';

.button {
  background-color: var(--colors-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
}
```

### JavaScript Usage
```javascript
import tokens from './dist/tokens.js';

const spacing = tokens.spacing['4'].value;        // "16px"
const color = tokens.colors.primary['500'].value; // "#0ea5e9"
```

### TypeScript Usage
```typescript
import tokens from './dist/tokens.js';
import type { Tokens } from './dist/tokens.d.ts';

const padding: string = tokens.spacing['4'].value;
```

## Available Tokens

### Colors (35 tokens)
- **primary**: Blue tones (50-900)
- **secondary**: Purple tones
- **success**: Green tones
- **warning**: Yellow tones
- **error**: Red tones
- **neutral**: Gray tones (0-950)

#### Sample Colors
| Token | Value |
|-------|-------|
| primary-500 | #0ea5e9 |
| success-500 | #22c55e |
| error-500 | #ef4444 |
| neutral-900 | #111827 |

### Typography (23 tokens)
- **Font Families**: sans, mono
- **Font Sizes**: xs (12px) to 4xl (36px)
- **Font Weights**: regular (400) to bold (700)
- **Line Heights**: tight (1.2) to relaxed (1.75)
- **Text Styles**: h1, h2, h3, body, bodySmall, caption

#### Sample Typography
| Token | Value |
|-------|-------|
| fontSize-base | 16px |
| fontSize-lg | 18px |
| fontWeight-semibold | 600 |

### Layout (30 tokens)
- **Spacing**: 0 to 16 (0px to 64px)
- **Border Radius**: none to full (9999px)
- **Shadows**: sm to xl
- **Z-Index**: base (0) to tooltip (1070)

#### Sample Layout
| Token | Value |
|-------|-------|
| spacing-4 | 16px |
| border-radius-md | 8px |
| shadow-lg | 0 10px 15px -3px rgba(0, 0, 0, 0.1), ... |

## Integration with Figma

To extract tokens from Figma:

1. **Get API Token**
   - Go to [figma.com/@yourname/settings](https://figma.com/@yourname/settings)
   - Create a personal access token
   
2. **Configure**
   ```bash
   cp .env.example .env
   # Edit .env and add your FIGMA_ACCESS_TOKEN
   ```

3. **Extract**
   ```bash
   npm run extract-figma
   ```

4. **Update Config**
   - Get your Figma file key from the URL: `figma.com/design/{fileKey}`
   - Update `figma.config.json` with your file key
   - Run extraction again

## VSCode Integration

### Available Tasks
- **Build Tokens** - Default build task (Ctrl+Shift+B)
- **Watch Tokens** - Watch mode for development
- **Validate Tokens** - Check tokens validity
- **Extract from Figma** - Extract Figma variables

### Debug Configurations
- Run token build scripts directly from VSCode debugger

## Workflow Examples

### Adding a New Color Token
1. Edit `tokens/colors.json`
2. Add your token with value and description
3. Run `npm run build`
4. CSS: `var(--colors-brand-primary)`
5. JS: `tokens.colors.brand.primary.value`

### Creating Text Styles
```json
{
  "typography": {
    "textStyle": {
      "subtitle": {
        "value": {
          "fontSize": "20px",
          "fontWeight": "600",
          "lineHeight": "1.4"
        },
        "description": "Subtitle text style"
      }
    }
  }
}
```

### Using in React
```typescript
import tokens from './dist/tokens.js';

const Button = ({ children }) => (
  <button style={{
    padding: tokens.spacing['4'].value,
    backgroundColor: tokens.colors.primary['500'].value,
    borderRadius: tokens.borderRadius.md.value,
  }}>
    {children}
  </button>
);
```

## Project Statistics

- **Total Tokens**: 88
- **Categories**: 3 (colors, typography, layout)
- **Generated Formats**: 4 (CSS, JSON, JS, TS)
- **Build Time**: <1 second
- **Output Files Size**: ~50KB (combined)

## File Structure

```
design-system-tokens/
├── .vscode/
│   ├── tasks.json           # VSCode build tasks
│   └── launch.json          # VSCode debug configs
├── dist/                    # Generated outputs
│   ├── tokens.css          # CSS variables
│   ├── tokens.json         # JSON format
│   ├── tokens.js           # JS module
│   └── tokens.d.ts         # TypeScript types
├── tokens/                 # Source definitions
│   ├── colors.json
│   ├── typography.json
│   ├── layout.json
│   └── TEMPLATE.json       # Template for new categories
├── scripts/                # Build utilities
│   ├── build.js
│   ├── validate.js
│   ├── extract-figma.js
│   └── watch.js
├── .env.example            # Environment template
├── .gitignore
├── CONTRIBUTING.md         # Adding tokens guide
├── README.md               # Full documentation
├── QUICKSTART.md           # Quick start guide
├── examples.js             # Code examples
├── index.js                # Main entry point
├── package.json
└── tokens.config.json      # Configuration
```

## Next Steps

1. ✅ **Review Tokens**: Check `tokens/` for default tokens
2. 🎨 **Test in CSS**: Use CSS variables from `dist/tokens.css`
3. 📝 **Test in JS**: Import from `dist/tokens.js`
4. 🔧 **Add Custom Tokens**: Follow `CONTRIBUTING.md`
5. 🎯 **Integrate Figma**: Set up Figma extraction
6. 📦 **Use in Projects**: Import tokens into your apps

## Documentation

- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)
- **Full Guide**: See [README.md](./README.md)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Code Examples**: See [examples.js](./examples.js)

## Support & Resources

### Documentation
- [Design Tokens Community Group](https://www.designtokens.org/)
- [Figma Variables Guide](https://help.figma.com/hc/en-us/articles/15145852043927-Getting-started-with-variables)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

### Validate Setup
```bash
npm run validate  # Check token validity
npm run build     # Build all outputs
```

## Key Concepts

### Design Tokens
Values that define your design system (colors, typography, spacing). Stored once, used everywhere.

### CSS Custom Properties
Native CSS variables that inherit values from token outputs. Used in stylesheets as `var(--token-name)`.

### JSON Exports
Structured token data for programmatic access in JavaScript/TypeScript applications.

### Figma Integration
Extract tokens directly from Figma library variables, keeping design and code in sync.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm run validate` to check for syntax errors |
| CSS variables not working | Ensure `dist/tokens.css` is imported before use |
| Figma extraction fails | Check `FIGMA_ACCESS_TOKEN` env var is set correctly |
| TypeScript errors | Rebuild with `npm run build` to regenerate types |

## Version Info

- **Project Version**: 1.0.0
- **Design Tokens Spec**: Aligned with Industry Standards
- **Node.js**: v16+ recommended

---

**Ready to use!** Start with `npm run build` and explore the generated files in `dist/`.
