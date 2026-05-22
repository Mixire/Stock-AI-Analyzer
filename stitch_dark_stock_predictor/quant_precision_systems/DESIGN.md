---
name: Quant-Precision Systems
colors:
  surface: '#111417'
  surface-dim: '#111417'
  surface-bright: '#37393d'
  surface-container-lowest: '#0b0e11'
  surface-container-low: '#191c1f'
  surface-container: '#1d2023'
  surface-container-high: '#272a2e'
  surface-container-highest: '#323538'
  on-surface: '#e1e2e7'
  on-surface-variant: '#c3c5d8'
  inverse-surface: '#e1e2e7'
  inverse-on-surface: '#2e3134'
  outline: '#8d90a1'
  outline-variant: '#434655'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#002681'
  primary-container: '#6989ff'
  on-primary-container: '#002172'
  inverse-primary: '#134ee4'
  secondary: '#f5fff5'
  on-secondary: '#003920'
  secondary-container: '#00ffa3'
  on-secondary-container: '#007146'
  tertiary: '#ffb3ac'
  on-tertiary: '#680008'
  tertiary-container: '#ff544e'
  on-tertiary-container: '#5c0006'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#52ffac'
  secondary-fixed-dim: '#00e290'
  on-secondary-fixed: '#002111'
  on-secondary-fixed-variant: '#005231'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#111417'
  on-background: '#e1e2e7'
  surface-variant: '#323538'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.01em
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin: 24px
---

## Brand & Style

The design system is engineered for a high-stakes, data-intensive environment. It evokes a sense of algorithmic precision and institutional-grade reliability. The brand personality is "The Invisible Analyst"—intelligent, silent, and incredibly fast.

To differentiate from consumer-grade finance apps, this design system utilizes a **Technical Glassmorphism** style. It combines deep, monochromatic backgrounds with hyper-clear "panes" of data. The aesthetic leans into a futuristic, mission-control vibe where information density is high but visual noise is strictly minimized. Key visual motifs include micro-glows, hairline borders, and translucent layering to represent different depths of data analysis.

## Colors

The palette is anchored in a "Deep Space" charcoal to ensure maximum contrast for data visualization. 

- **Primary (Tech Blue):** Used for primary actions, active states, and focus indicators. It represents the "system intelligence."
- **Secondary (Neon Green):** Exclusively reserved for gains, bullish trends, and success states. 
- **Tertiary (Electric Red):** Reserved for losses, bearish trends, and critical alerts.
- **Neutral/Background:** The base layer is #0B0E11. Surface containers use #161A1E to create subtle separation.
- **Data Accents:** Use high-vibrancy tints of the primary blue for non-directional data (e.g., volume, neutral sentiment).

## Typography

This design system uses a dual-font strategy to separate narrative from data. 

**Inter** handles all UI labels, headers, and descriptive text. It is chosen for its exceptional legibility in dark modes and its neutral, professional tone. 

**JetBrains Mono** is utilized for all numerical values, ticker symbols, and timestamps. Monospaced characters ensure that rapidly changing prices do not "jitter" or shift the layout, providing a stable reading experience during high volatility.

For headlines, use tight tracking (-0.02em) to give a compact, editorial feel. Labels should always be in JetBrains Mono to signify "computed" information.

## Layout & Spacing

The layout follows a **Rigid Dashboard Grid**. It uses a 12-column fluid system for the main stage, allowing data widgets to span 3, 4, 6, or 12 columns.

A strict 8px base unit governs all dimensions. To maintain a "high-tech" feel, use "tight-but-clear" spacing (12px - 16px) between related data points and larger gaps (40px+) between distinct functional modules. 

On mobile, the 12-column grid collapses to a single-column stack, but horizontal scrolling "data-strips" are encouraged for ticker lists to preserve information density without overwhelming the vertical scroll.

## Elevation & Depth

Depth is achieved through **Luminance Layering** and **Backdrop Blurs** rather than traditional shadows.

1.  **Level 0 (Floor):** #0B0E11. The absolute base.
2.  **Level 1 (Card/Widget):** #161A1E with a 1px border of #2B2F36.
3.  **Level 2 (Overlays/Modals):** Translucent Tech Blue or Neutral (80% opacity) with a 20px `backdrop-filter: blur`. This creates the glass effect.
4.  **Level 3 (Popovers):** Solid surfaces with a "Primary Glow"—a soft, 15% opacity Tech Blue shadow (0px 8px 24px) to indicate active interaction.

Hairline strokes (1px) are the primary way to define boundaries. Avoid heavy dropshadows; use light "inner glows" to make buttons feel backlit.

## Shapes

The shape language is **Technical-Geometric**. A low roundedness (0.25rem / 4px) is applied to all cards and input fields to maintain a professional, sharp edge that suggests precision.

- **Buttons & Inputs:** 4px radius.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from interactive containers.
- **Charts:** Line graphs should use "Sharp" or "Minimal Smoothing" (monotone cubic interpolation) to ensure the data points look accurate rather than stylized.

## Components

### Buttons
Primary buttons use a solid Tech Blue background with white text. Secondary buttons use a transparent background with a 1px Tech Blue border. The "hover" state should include a subtle blue outer glow.

### Data Cards
Data cards use the "Level 1" elevation. They feature a 1px top-border that glows with the Primary color if the data is "neutral," Secondary color if "up," or Tertiary if "down."

### Input Fields
Inputs are dark-filled (#0B0E11) with a 1px border. On focus, the border turns Tech Blue and the entire field receives a subtle 2% blue tint fill.

### Status Indicators
Small, circular dots (8px) used next to ticker symbols. A pulsing animation on these dots indicates "Live Connection" or "Real-time Trading."

### Crisp Line Charts
Charts use a 2px stroke width. The area under the line should have a vertical gradient fading from 10% opacity (at the line) to 0% (at the baseline). Use Secondary Green for gains and Tertiary Red for losses.

### Chips/Tags
Small, low-contrast capsules used for "Sector" or "Volatility" labels. Use JetBrains Mono for the text within chips.