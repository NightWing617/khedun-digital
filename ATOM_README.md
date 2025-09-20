# Khedun Digital 3D Atom Component

A stunning 3D animated atom structure that serves as a dynamic logo replacement for the Khedun Digital website.

## Features

- **3D CSS Animations**: Smooth, hardware-accelerated 3D transformations
- **Interactive Controls**: Mouse/touch movement affects rotation
- **Responsive Design**: Adapts to different screen sizes
- **Color Theme Integration**: Uses Khedun Digital's gold/orange color scheme
- **Performance Optimized**: Efficient animations with reduced motion support
- **Accessibility**: Respects user preferences for reduced motion

## Components

### CSS (`src/assets/styles/atom.css`)
- Complete 3D atom styling with orbital rings and electrons
- Responsive breakpoints for mobile and tablet
- Color variables for easy customization
- Print-friendly styles

### JavaScript (`src/assets/js/atom.js`)
- KDAtom class for easy initialization
- Interactive 3D rotation controls
- Color and speed customization methods
- Mobile touch support

## Usage

### Basic Implementation

```html
<!-- Add CSS link -->
<link rel="stylesheet" href="../assets/styles/atom.css">

<!-- Add JS link -->
<script src="../assets/js/atom.js"></script>

<!-- Add atom container -->
<div id="kd-atom-container"></div>

<!-- Initialize atom -->
<script>
    if (typeof KDAtom !== 'undefined' && document.getElementById('kd-atom-container')) {
        window.kdAtom = new KDAtom('kd-atom-container', {
            size: 384,
            colors: {
                primary: '#FFD700',
                secondary: '#E95A0C',
                accent: '#FF6B35'
            },
            animationSpeed: 1,
            interactive: true
        });
    }
</script>
```

### Customization Options

```javascript
// Change colors
window.kdAtom.updateColors({
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1'
});

// Change animation speed
window.kdAtom.setSpeed(1.5);

// Destroy and recreate
window.kdAtom.destroy();
```

## Structure

The atom consists of:

1. **Central Nucleus**: Pulsating core with gradient colors
2. **Orbital Rings**: 3 rotating rings of different sizes
3. **Electrons**: 4 orbiting particles with individual animations
4. **Particle Field**: Background gradient effects

## Browser Support

- Modern browsers with CSS 3D transform support
- Chrome 36+
- Firefox 16+
- Safari 9+
- Edge 12+

## Performance Notes

- Uses CSS transforms for optimal performance
- RequestAnimationFrame for smooth animations
- Respects `prefers-reduced-motion` for accessibility
- Hardware acceleration enabled

## Color Scheme

- **Primary**: `#FFD700` (Gold)
- **Secondary**: `#E95A0C` (Burnt Orange)
- **Accent**: `#FF6B35` (Orange)
- **Background**: `#1A1A1A` (Charcoal)

## Responsive Breakpoints

- **Desktop**: 384px × 384px
- **Tablet**: 280px × 280px
- **Mobile**: 200px × 200px

## Integration

The component has been integrated into all Khedun Digital pages:

- `/src/pages/web.html`
- `/src/pages/ai.html`
- `/src/pages/marketing.html`
- `/src/pages/automation.html`

## Testing

Test the component by opening any of the above pages in a browser:

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
# http://localhost:8000/src/pages/web.html
# http://localhost:8000/src/pages/ai.html
# http://localhost:8000/src/pages/marketing.html
# http://localhost:8000/src/pages/automation.html
```

## Troubleshooting

1. **Atom not appearing**: Check browser console for JavaScript errors
2. **No animations**: Ensure CSS file is loaded correctly
3. **Poor performance**: Try reducing animation speed or disabling interactivity
4. **Mobile issues**: Check touch event support

## Future Enhancements

- Sound effects for interactions
- More complex orbital patterns
- Dynamic color themes
- VR/AR compatibility
- Advanced physics simulations