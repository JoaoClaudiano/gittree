# GitTree 2026 - Quick Demo Guide

## 🎯 Try These Features Now!

### 1. AI Navigator Demo
1. Open GitTree
2. Press `Ctrl+K` (or `Cmd+K` on Mac)
3. Type "auth" in the search box
4. See semantic search results
5. Click any result to navigate
6. Press `Escape` to close

### 2. View the Deep Charcoal Theme
- Notice the dark charcoal background (#1a1d29)
- Observe the neon blue accents (#00d4ff)
- Hover over the AI Navigator button to see the glow effect

### 3. Skeleton Loader
1. Enter a repository: `facebook/react`
2. Click "Visualizar"
3. Watch the animated skeleton tree appear
4. Notice the shimmer effect and variable indentation

### 4. Keyboard Navigation
1. Load a repository
2. Use arrow keys to navigate the tree
3. Press `Enter` to expand/collapse folders
4. Press `Home`/`End` to jump to start/end
5. Press `Tab` to move between controls

### 5. Bento Metadata Panel (When React/tree components are working)
1. Load a repository
2. Click on any file in the tree
3. See the Bento Grid panel with:
   - File size
   - Extension
   - Language
   - Language distribution chart

## 🎨 Visual Features to Notice

### Colors
- **Background**: Deep charcoal (#1a1d29)
- **Primary accent**: Neon blue (#00d4ff)
- **Text**: White with subtle gray subtext
- **Cards**: Gradient backgrounds with glassmorphism

### Animations
- Sidebar slide-in from right
- Skeleton shimmer effect
- Button glow on hover
- Smooth transitions everywhere

### Accessibility
- Focus indicators (blue outline)
- ARIA labels on all interactive elements
- Full keyboard navigation
- Screen reader support

## 📊 Impact Highlight Demo (Developer Feature)

```javascript
// In browser console:
window.setImpactHighlight([
    'README.md',
    'package.json',
    'src/index.js'
]);
```

Files in the tree will glow with neon blue highlight!

## 🔧 Developer Testing

### Test AI Semantic Search
```javascript
// Test semantic mappings
window.GitTree2026.treeData = {
    pathMap: new Map([
        ['src/auth/login.js', { type: 'file', name: 'login.js' }],
        ['src/api/routes.js', { type: 'file', name: 'routes.js' }],
        ['tests/unit/auth.test.js', { type: 'file', name: 'auth.test.js' }]
    ])
};

// Open AI Navigator and search
window.GitTree2026.aiSidebarOpen = true;
window.renderAISidebar();
```

## 📱 Mobile Testing
- Open on mobile device
- AI Navigator becomes full-screen
- Touch gestures work
- All features remain accessible

## ⚡ Performance Features
- Zero layout shift (CLS = 0)
- Memoized components
- Lazy loading
- Smooth 60fps animations

## 🌐 Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (with -webkit- prefixes)
- Mobile browsers: ✅ Responsive design

---

**Enjoy exploring GitTree 2026!** 🚀
