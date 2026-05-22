/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base surfaces
        "background":                "#111417",
        "surface":                   "#111417",
        "surface-dim":               "#111417",
        "surface-bright":            "#37393d",
        "surface-container-lowest":  "#0b0e11",
        "surface-container-low":     "#191c1f",
        "surface-container":         "#1d2023",
        "surface-container-high":    "#272a2e",
        "surface-container-highest": "#323538",
        "surface-variant":           "#323538",
        "surface-tint":              "#b7c4ff",

        // On-surfaces
        "on-surface":                "#e1e2e7",
        "on-surface-variant":        "#c3c5d8",
        "on-background":             "#e1e2e7",
        "inverse-surface":           "#e1e2e7",
        "inverse-on-surface":        "#2e3134",

        // Borders
        "outline":                   "#8d90a1",
        "outline-variant":           "#434655",

        // Primary
        "primary":                   "#b7c4ff",
        "on-primary":                "#002681",
        "primary-container":         "#6989ff",
        "on-primary-container":      "#002172",
        "inverse-primary":           "#134ee4",
        "primary-fixed":             "#dce1ff",
        "primary-fixed-dim":         "#b7c4ff",
        "on-primary-fixed":          "#001551",
        "on-primary-fixed-variant":  "#0039b5",

        // Secondary
        "secondary":                 "#f5fff5",
        "on-secondary":              "#003920",
        "secondary-container":       "#00ffa3",
        "on-secondary-container":    "#007146",
        "secondary-fixed":           "#52ffac",
        "secondary-fixed-dim":       "#00e290",
        "on-secondary-fixed":        "#002111",
        "on-secondary-fixed-variant":"#005231",

        // Tertiary
        "tertiary":                  "#ffb3ac",
        "on-tertiary":               "#680008",
        "tertiary-container":        "#ff544e",
        "on-tertiary-container":     "#5c0006",
        "tertiary-fixed":            "#ffdad6",
        "tertiary-fixed-dim":        "#ffb3ac",
        "on-tertiary-fixed":         "#410003",
        "on-tertiary-fixed-variant": "#930010",

        // Error
        "error":                     "#ffb4ab",
        "on-error":                  "#690005",
        "error-container":           "#93000a",
        "on-error-container":        "#ffdad6",
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg":      "0.25rem",
        "xl":      "0.5rem",
        "full":    "0.75rem",
      },
      spacing: {
        "xs":     "4px",
        "sm":     "12px",
        "base":   "8px",
        "gutter": "16px",
        "md":     "24px",
        "margin": "24px",
        "lg":     "40px",
        "xl":     "64px",
      },
      fontFamily: {
        "headline-lg":  ["Inter", "sans-serif"],
        "headline-md":  ["Inter", "sans-serif"],
        "body-lg":      ["Inter", "sans-serif"],
        "body-sm":      ["Inter", "sans-serif"],
        "data-display": ["JetBrains Mono", "monospace"],
        "data-label":   ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg":     ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm":     ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "data-display":["18px", { lineHeight: "1",   letterSpacing: "-0.01em", fontWeight: "500" }],
        "data-label":  ["12px", { lineHeight: "1",   fontWeight: "400" }],
      },
    },
  },
  plugins: [],
}
