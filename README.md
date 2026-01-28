# Portfolio Website - README

A modern, responsive portfolio website for UI/UX designers and web developers. Built with clean HTML5, CSS3, and vanilla JavaScript.

## 🎨 Design Features

- **Dark Theme**: Sleek dark background with cyan and blue accent colors
- **Glassmorphism Effects**: Modern frosted glass aesthetic on cards and navigation
- **Neon Glows**: Subtle glow effects on interactive elements
- **Smooth Animations**: Typing effect, scroll animations, and hover transitions
- **Fully Responsive**: Mobile-first design that works on all devices

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Global styles and CSS variables
│   ├── sidebar.css        # Navigation sidebar styles
│   ├── hero.css           # Hero section styles
│   ├── skills.css         # Skills section with progress bars
│   ├── portfolio.css      # Portfolio grid and cards
│   ├── education.css      # Timeline layout for education
│   ├── languages.css      # Language proficiency bars
│   └── responsive.css     # Mobile responsive styles
├── js/
│   └── script.js          # Interactive features (typing, scroll, etc.)
├── assets/
│   └── images/            # Profile and project images
└── README.md              # This file
```

## 🚀 Quick Start

1. **Open the website**: Simply open `index.html` in your web browser
2. **No build process required**: This is a static website with no dependencies

## ✏️ Customization Guide

### 1. Personal Information

**Edit `index.html`:**

- **Line 80**: Change "Adam" to your name
- **Line 82-84**: Update the description text
- **Line 88**: Update the CV download link

### 2. Colors and Theme

**Edit `css/main.css` (lines 3-12):**

```css
:root {
    --bg-color: #050810;           /* Background color */
    --card-bg: rgba(20, 25, 40, 0.7); /* Card background */
    --accent-cyan: #00d4ff;        /* Primary accent */
    --accent-blue: #3b82f6;        /* Secondary accent */
    --text-primary: #ffffff;       /* Main text color */
    --text-secondary: #94a3b8;     /* Secondary text color */
}
```

### 3. Profile Image

**Replace the profile image:**
- Add your image to `assets/images/`
- Update line 73 in `index.html`:
  ```html
  <img src="assets/images/YOUR-IMAGE.jpg" alt="Profile" class="profile-img" id="profile-img">
  ```

### 4. Typing Effect Text

**Edit `js/script.js` (line 4):**

```javascript
const phrases = ['UI/UX Designer', 'Web Developer', 'Creative Thinker', 'Problem Solver'];
```

Add or modify the phrases that appear in the typing animation.

### 5. Skills Section

**Edit `index.html` (lines 94-161):**

- Modify skill names and percentages
- Update the CSS class names in `css/skills.css` to match your percentages

### 6. Portfolio Projects

**Edit `index.html` (lines 163-202):**

1. Replace project images in `assets/images/`
2. Update project titles, descriptions, and links
3. Add more projects by copying the `.portfolio-card` structure

### 7. Education & Certifications

**Edit `index.html` (lines 204-242):**

- Update dates, degrees, and institutions
- Add or remove timeline items as needed

### 8. Languages

**Edit `index.html` (lines 244-284):**

- Modify language names and proficiency levels
- Adjust the `width` percentage in inline styles

## 🎯 Sections Overview

### Home (Hero)
- Profile image with animated glow
- Typing effect for dynamic text
- Call-to-action buttons

### Skills
- Categorized skill sets
- Animated progress bars
- Responsive grid layout

### Portfolio
- Project showcase grid
- Hover effects on cards
- Placeholder for project images

### Education & Certifications
- Timeline layout
- Icons for different achievement types
- Alternating left/right design

### Languages
- Language proficiency display
- Progress bars with percentages
- Clean card layout

## 📱 Responsive Design

The portfolio automatically adapts to different screen sizes:

- **Desktop** (>1024px): Full sidebar navigation, multi-column layouts
- **Tablet** (768px-1024px): Adjusted spacing and layouts
- **Mobile** (<768px): Bottom navigation bar, single-column layouts

## 🌐 Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 🎨 Font Awesome Icons

This project uses Font Awesome 6.5.1 for icons. Icons are loaded from CDN in the HTML file.

## 📝 Deployment

### GitHub Pages
1. Create a GitHub repository
2. Push your portfolio files
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop the portfolio folder to Netlify
2. Your site will be live instantly

### Custom Domain
- Update the domain settings in your hosting provider
- Add a CNAME record pointing to your hosting service

## 🔧 Advanced Customization

### Adding New Sections
1. Add a new `<section>` in `index.html`
2. Create a corresponding CSS file
3. Link it in the `<head>` of `index.html`
4. Add navigation link in the sidebar

### Changing Animations
- Edit animation keyframes in respective CSS files
- Modify timing in `js/script.js` for JavaScript animations

## 📄 License

Free to use for personal and commercial projects. Attribution appreciated but not required.

## 🤝 Support

For issues or questions:
- Check the code comments in each file
- Ensure all file paths are correct
- Verify images are in the correct directory

---

**Created with ❤️ using modern web technologies**
