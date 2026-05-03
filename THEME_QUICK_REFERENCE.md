# 🌙 Theme System - Quick Reference

## Toggle Button Location
**Top-right corner of dashboard header**
- Sun icon = Light mode active
- Moon icon = Dark mode active
- Click to toggle
- Tooltip shows next mode

## How to Use in Code

### Import useTheme Hook
```javascript
import { useTheme } from "../context/ThemeContext";
```

### Access Theme State
```javascript
const { theme, toggleTheme } = useTheme();
```

### Add Dark Mode Classes
```jsx
<div className="bg-white dark:bg-gray-800">
  Light mode white → Dark mode gray
</div>
```

## Common Dark Mode Patterns

### Background Colors
```jsx
// Light/Dark background
<div className="bg-white dark:bg-gray-800">

// Light/Dark with transparency
<div className="bg-white dark:bg-gray-700/50">

// Gradient background
<div className="bg-gradient-to-r from-blue-50 dark:from-slate-900 to-indigo-50 dark:to-slate-800">
```

### Text Colors
```jsx
// Primary text
<p className="text-gray-900 dark:text-white">

// Secondary text
<p className="text-gray-600 dark:text-gray-400">

// Tertiary text
<p className="text-gray-500 dark:text-gray-500">
```

### Status/Alert Colors
```jsx
// Good/Success
<div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">

// Warning
<div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">

// Critical/Error
<div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
```

### Borders & Shadows
```jsx
// Border
<div className="border-gray-200 dark:border-gray-700">

// Shadow
<div className="shadow-md dark:shadow-lg">

// Hover shadow
<div className="shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl">
```

## Smooth Transitions

All elements automatically transition over 300ms:
```css
transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
```

No extra code needed - CSS handles it automatically!

## Testing

1. **Toggle Theme**
   ```bash
   npm start
   # Click sun/moon icon
   ```

2. **System Preference**
   - DevTools → Settings
   - Emulate CSS media feature `prefers-color-scheme`
   - Select "dark" or "light"

3. **Persistence**
   - Toggle theme
   - Reload page
   - Theme stays selected

## Customization

### Change Transition Speed
Edit `src/index.css`:
```css
transition: background-color 0.5s ease-in-out;
```

### Use Different Dark Colors
In component, replace `dark:` classes:
```jsx
{/* Using slate instead of gray */}
<div className="bg-white dark:bg-slate-800">
```

### Add Custom Theme Colors
In `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      "theme-light": "#f0f4ff",
      "theme-dark": "#0f172a",
    },
  },
}
```

## Colors Used

### Light Mode
- **Background**: #f0f4ff → #f9f7ff (gradient)
- **Cards**: #ffffff
- **Text**: #1f2937
- **Accents**: Bright blues, greens, reds

### Dark Mode
- **Background**: #0f172a → #1a1f3a (gradient)
- **Cards**: #1f2937, #374151
- **Text**: #f3f4f6, #d1d5db
- **Accents**: Softer bright colors

## File Structure

```
src/
├── context/
│   └── ThemeContext.js      ← Theme management
├── components/
│   ├── ThemeToggle.js       ← Toggle button
│   ├── Dashboard.js         ← Has toggle button
│   ├── MetricCard.js        ← Dark mode classes
│   ├── InsightPanel.js      ← Dark mode classes
│   ├── RecommendationPanel.js ← Dark mode classes
│   └── MetricsChart.js      ← Adaptive colors
├── App.js                   ← Wrapped with ThemeProvider
└── index.css                ← Dark mode styles
```

## Troubleshooting

### Theme not changing?
- Check ThemeProvider wraps App in `src/App.js`
- Clear browser cache
- Check console for errors

### Dark mode classes not applying?
- Verify `darkMode: "class"` in `tailwind.config.js`
- Check class names are using `dark:` prefix
- Rebuild Tailwind

### Colors look wrong?
- Verify dark color values in Tailwind
- Check contrast ratios for accessibility
- Test in DevTools

## Next Steps

1. ✅ Theme system is complete
2. 📖 Read `DARK_MODE_GUIDE.md` for details
3. 🎨 Customize colors as needed
4. 🚀 Deploy with confidence!

---

**Theme implementation by:** Claude Code
**Status:** ✨ Production Ready
