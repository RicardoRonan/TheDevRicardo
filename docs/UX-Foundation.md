# UX Foundation Design System

A token-based design system for consistent spacing, typography, elevation, and motion across the Vue.js portfolio application.

## Overview

This design system provides a foundation of design tokens and utility classes that ensure consistency across the application while respecting the existing retro gaming aesthetic.

## Design Tokens

### Spacing Scale (4px base)
- `--space-0`: 0px
- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-5`: 24px
- `--space-6`: 32px
- `--space-7`: 40px
- `--space-8`: 48px
- `--space-9`: 64px
- `--space-10`: 96px

### Border Radius
- `--radius-1`: 2px
- `--radius-2`: 4px
- `--radius-3`: 8px
- `--radius-4`: 12px
- `--radius-5`: 16px
- `--radius-pill`: 9999px

### Typography Scale (Fluid)
- `--fs-300`: clamp(14px, 0.85rem + 0.10vw, 15px)
- `--fs-400`: clamp(16px, 1.00rem + 0.20vw, 18px)
- `--fs-500`: clamp(18px, 1.125rem + 0.25vw, 20px)
- `--fs-600`: clamp(20px, 1.25rem + 0.50vw, 24px)
- `--fs-700`: clamp(24px, 1.50rem + 0.80vw, 32px)
- `--fs-800`: clamp(30px, 1.875rem + 1.00vw, 40px)
- `--fs-900`: clamp(38px, 2.375rem + 1.50vw, 56px)

### Line Heights
- `--lh-tight`: 1.25 (headings)
- `--lh-snug`: 1.35 (subheadings)
- `--lh-normal`: 1.55 (body text)
- `--lh-loose`: 1.7 (long-form content)

### Motion
- `--duration-fast`: 150ms
- `--duration-med`: 250ms
- `--duration-slow`: 400ms
- `--ease-standard`: cubic-bezier(.2,.0,.2,1)
- `--ease-emphasized`: cubic-bezier(.2,.0,0,1)

### Elevation (Shadows)
- `--shadow-0`: none
- `--shadow-1`: subtle card shadow
- `--shadow-2`: medium elevation
- `--shadow-3`: high elevation (modals)

## Utility Classes

### Layout
- `.container`: Max-width container with auto margins
- `.grid`: 12-column grid system
- `.stack`: Vertical flex layout with gap
- `.cluster`: Horizontal flex layout with gap
- `.flow`: Vertical rhythm with consistent spacing

### Components
- `.card`: Standard card with padding and shadow
- `.retro-card`: Retro-themed card with pixel styling
- `.btn`: Standard button with 44px minimum height
- `.retro-btn`: Retro-themed button
- `.input`, `.retro-input`: Form inputs with consistent styling
- `.textarea`, `.retro-textarea`: Text areas with consistent styling

### Spacing Utilities
- `.section`: Consistent section padding
- `.radius-1` through `.radius-5`: Border radius utilities
- `.elev-0` through `.elev-3`: Elevation utilities

## Retro Theme Integration

The foundation includes retro-specific classes that maintain the existing pixel-art aesthetic:

### Retro Components
- `.retro-card`: Card with 0 border-radius, pixel styling
- `.retro-btn`: Button with retro colors and pixel font
- `.retro-input`: Input with retro styling and pixel font
- `.retro-textarea`: Textarea with retro styling

### Brand Colors
- `--brand-primary`: #dc143c (crimson)
- `--brand-secondary`: #f5f5dc (beige)
- `--brand-background`: #000000 (black)
- `--brand-text`: #ffffff (white)

## Bootstrap Integration

The foundation automatically maps to Bootstrap 5 variables:
- `--bs-border-radius-*`: Maps to foundation radius tokens
- `--bs-body-font-size`: Maps to foundation typography
- `--bs-btn-border-radius-*`: Maps to foundation button styling
- `--bs-focus-ring-*`: Maps to foundation focus styling

## Accessibility Features

- **Touch Targets**: All interactive elements meet 44px minimum height
- **Focus Management**: Visible focus rings with proper contrast
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **High Contrast**: Supports high contrast mode
- **Reading Width**: `.prose` class constrains text to 65 characters

## Usage Examples

### Form with Retro Styling
```html
<div class="retro-card">
  <form>
    <input class="retro-input" type="text" placeholder="Name" />
    <textarea class="retro-textarea" placeholder="Message"></textarea>
    <button class="retro-btn">Submit</button>
  </form>
</div>
```

### Layout with Foundation Spacing
```html
<section class="section">
  <div class="container">
    <div class="stack">
      <h1>Title</h1>
      <p class="prose">Content with optimal reading width</p>
    </div>
  </div>
</section>
```

### Navigation with Consistent Spacing
```html
<nav class="cluster">
  <a href="/" class="btn">Home</a>
  <a href="/about" class="btn">About</a>
</nav>
```

## Migration Notes

### Replaced Hard-coded Values
- `padding: 0.75rem 1rem` → `padding: var(--space-3) var(--space-4)`
- `gap: 0.75rem` → `gap: var(--space-3)`
- `scroll-margin-top: 2rem` → `scroll-margin-top: var(--space-8)`
- Form inputs now use `.retro-input` class
- Buttons now use `.retro-btn` class
- Cards now use `.retro-card` class

### Benefits
- Consistent spacing across all components
- Improved accessibility with proper touch targets
- Better responsive typography with fluid scales
- Maintained retro aesthetic while improving UX
- Reduced CSS duplication
- Easier maintenance and updates

## Future Enhancements

- Add more semantic color tokens
- Expand component library
- Add animation utilities
- Create Vue component wrappers
- Add dark/light theme support
