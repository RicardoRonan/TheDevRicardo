# Spacing System Guide

## Overview

This comprehensive spacing system is built on an 8px base unit, ensuring pixel-perfect alignment with your retro-futuristic design aesthetic. The system provides consistent spacing across all components while maintaining accessibility standards.

## Base Unit & Scale

- **Base Unit**: 8px (0.5rem)
- **Scale**: All values are multiples of 8px for perfect grid alignment
- **Tokens**: 17 spacing values from 2px to 256px

## Spacing Tokens

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-025` | 0.125rem | 2px | Micro spacing, borders |
| `--space-050` | 0.25rem | 4px | Fine details, focus outlines |
| `--space-100` | 0.5rem | 8px | **Base unit** - micro spacing |
| `--space-150` | 0.75rem | 12px | Small component spacing |
| `--space-200` | 1rem | 16px | Standard spacing |
| `--space-250` | 1.25rem | 20px | Medium spacing |
| `--space-300` | 1.5rem | 24px | Component spacing |
| `--space-400` | 2rem | 32px | Section spacing |
| `--space-500` | 2.5rem | 40px | Large spacing |
| `--space-600` | 3rem | 48px | Touch targets |
| `--space-700` | 3.5rem | 56px | Large touch targets |
| `--space-800` | 4rem | 64px | Section separation |
| `--space-1000` | 5rem | 80px | Major spacing |
| `--space-1200` | 6rem | 96px | Large sections |
| `--space-1600` | 8rem | 128px | Page sections |
| `--space-2000` | 10rem | 160px | Major page spacing |
| `--space-2400` | 12rem | 192px | Hero sections |
| `--space-3200` | 16rem | 256px | Maximum spacing |

## Utility Classes

### Margin Utilities
```css
.m-100    /* margin: var(--space-100) */
.mt-200   /* margin-top: var(--space-200) */
.mb-300   /* margin-bottom: var(--space-300) */
.ml-400   /* margin-left: var(--space-400) */
.mr-500   /* margin-right: var(--space-500) */
.mx-200   /* margin horizontal: var(--space-200) */
.my-300   /* margin vertical: var(--space-300) */
```

### Padding Utilities
```css
.p-200    /* padding: var(--space-200) */
.pt-300   /* padding-top: var(--space-300) */
.pb-400   /* padding-bottom: var(--space-400) */
.pl-500   /* padding-left: var(--space-500) */
.pr-600   /* padding-right: var(--space-600) */
.px-200   /* padding horizontal: var(--space-200) */
.py-300   /* padding vertical: var(--space-300) */
```

### Gap Utilities
```css
.gap-200  /* gap: var(--space-200) */
.gap-300  /* gap: var(--space-300) */
.gap-400  /* gap: var(--space-400) */
```

## Component-Specific Classes

### Section Spacing
```css
.section-spacing     /* padding: var(--space-800) var(--space-200) */
.section-spacing-sm  /* padding: var(--space-400) var(--space-200) */
.section-spacing-lg  /* padding: var(--space-1200) var(--space-400) */
```

### Container Spacing
```css
.container-spacing     /* padding: var(--space-200); margin: var(--space-200) */
.container-spacing-sm  /* padding: var(--space-100); margin: var(--space-100) */
.container-spacing-lg  /* padding: var(--space-400); margin: var(--space-400) */
```

### Card Spacing
```css
.card-spacing           /* padding: var(--space-300) */
.card-spacing-compact   /* padding: var(--space-200) */
.card-spacing-comfortable /* padding: var(--space-400) */
.card-spacing-spacious  /* padding: var(--space-600) */
```

### Form Spacing
```css
.form-spacing        /* gap: var(--space-200) */
.form-group-spacing  /* margin-bottom: var(--space-300) */
.form-field-spacing  /* margin-bottom: var(--space-200) */
```

### Navigation Spacing
```css
.nav-spacing        /* gap: var(--space-150); padding: var(--space-200) */
.nav-item-spacing   /* padding: var(--space-150) */
```

### Grid Spacing
```css
.grid-spacing     /* gap: var(--space-200) */
.grid-spacing-sm  /* gap: var(--space-100) */
.grid-spacing-lg  /* gap: var(--space-400) */
```

### Typography Spacing
```css
.heading-spacing     /* margin-bottom: var(--space-200) */
.paragraph-spacing   /* margin-bottom: var(--space-200) */
.text-spacing        /* line-height: 1.6 */
```

## Accessibility Classes

### Touch Targets
```css
.touch-target     /* min-width/height: var(--space-700) - 56px */
.touch-target-sm  /* min-width/height: var(--space-600) - 48px */
.touch-target-lg  /* min-width/height: var(--space-800) - 64px */
```

### Focus Spacing
```css
.focus-spacing     /* outline: var(--space-025); outline-offset: var(--space-050) */
.focus-spacing-sm  /* outline: var(--space-025); outline-offset: var(--space-025) */
.focus-spacing-lg  /* outline: var(--space-050); outline-offset: var(--space-100) */
```

### Reading Flow
```css
.reading-flow       /* line-height: 1.6; margin-bottom: var(--space-200) */
.reading-flow-tight /* line-height: 1.4; margin-bottom: var(--space-150) */
.reading-flow-loose /* line-height: 1.8; margin-bottom: var(--space-300) */
```

### Visual Hierarchy
```css
.hierarchy-spacing-sm  /* margin-bottom: var(--space-100) */
.hierarchy-spacing     /* margin-bottom: var(--space-200) */
.hierarchy-spacing-lg  /* margin-bottom: var(--space-300) */
.hierarchy-spacing-xl  /* margin-bottom: var(--space-400) */
```

## Responsive Scaling

The spacing system automatically scales based on screen size:

- **Mobile** (< 768px): 0.75x scaling for tighter layouts
- **Tablet** (768px - 1024px): 0.875x scaling for balanced spacing
- **Desktop** (1024px - 1440px): Base values for optimal readability
- **Large Desktop** (> 1440px): 1.25x scaling for expansive layouts

## Usage Examples

### Card Component
```html
<div class="card card-spacing">
  <div class="card-header">
    <h3 class="heading-spacing">Card Title</h3>
  </div>
  <div class="card-body">
    <p class="paragraph-spacing">Card content with proper spacing.</p>
  </div>
</div>
```

### Navigation
```html
<nav class="nav-spacing">
  <a href="#" class="nav-item nav-item-spacing touch-target">Home</a>
  <a href="#" class="nav-item nav-item-spacing touch-target">About</a>
</nav>
```

### Form Layout
```html
<form class="form-spacing">
  <div class="form-group-spacing">
    <label class="hierarchy-spacing-sm">Name</label>
    <input class="form-field-spacing" type="text">
  </div>
  <button class="btn btn-md touch-target">Submit</button>
</form>
```

### Grid Layout
```html
<div class="d-flex grid-spacing">
  <div class="card-spacing">Item 1</div>
  <div class="card-spacing">Item 2</div>
  <div class="card-spacing">Item 3</div>
</div>
```

## Best Practices

1. **Use semantic spacing**: Choose spacing based on content relationship, not arbitrary values
2. **Maintain rhythm**: Use consistent multiples of the base unit (8px)
3. **Consider proximity**: Related elements should have smaller gaps than unrelated groups
4. **Accessibility first**: Always ensure minimum 44px touch targets
5. **Responsive design**: Let the system handle scaling automatically
6. **Visual hierarchy**: Use larger spacing to separate major sections

## Integration with Existing Components

The spacing system integrates seamlessly with your existing retro-futuristic design:

- **Button padding** uses spacing tokens
- **Card components** have updated spacing
- **Navigation** maintains pixel-perfect alignment
- **Typography** follows consistent rhythm

## Migration Guide

To migrate existing components:

1. Replace hardcoded spacing with utility classes
2. Use component-specific classes for common patterns
3. Apply accessibility classes for interactive elements
4. Test responsive behavior across breakpoints

Example migration:
```css
/* Before */
.my-component {
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
}

/* After */
.my-component {
  @apply p-200 px-300 mb-400;
}
```

This spacing system ensures consistency, accessibility, and maintainability across your entire portfolio while preserving the unique retro-futuristic aesthetic.
