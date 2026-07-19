# Rajesh Kumar Gautam — Portfolio (React)

Aapki original `check.html` ko poori tarah React project mein convert kar diya gaya hai.
Har section alag component file mein hai, aur saari information ek single data file
(`src/data/portfolioData.js`) mein rakhi gayi hai — taaki content edit karna easy ho.

## Chalane ka tarika (Run locally)

```bash
npm install
npm run dev
```

Fir browser mein `http://localhost:5173` open karein.

Production build banane ke liye:

```bash
npm run build
```

## Folder Structure

```
src/
  data/
    portfolioData.js     ← Saari info yahan hai (name, about, projects, skills, education, contact)
  hooks/
    useHeroGrid.js        ← Interactive 3D hero grid (flip cards + scroll shatter effect)
    useNameRoll.js         ← Naam ka rolling/flip animation
    useScrollReveal.js     ← Scroll par sections fade-in hone wala effect
  components/
    Navbar.jsx / .css
    Hero.jsx / .css
    SideDecoration.jsx     ← Left/right vine decorations
    About.jsx / .css
    Projects.jsx / .css
    Skills.jsx / .css
    Contact.jsx / .css
    Footer.jsx / .css
    MeditatingFigure.jsx / .css
  App.jsx / .css
  main.jsx
  index.css                ← Global variables, fonts, shared styles
index.html
package.json
vite.config.js
```

## Content update kaise karein

Sirf `src/data/portfolioData.js` file kholiye — naam, about text, projects, skills,
education, aur contact info sab yahin se change ho jayegi. Kisi bhi component file
ko touch karne ki zaroorat nahi.

## Contact form

Abhi form sirf UI-level validation aur "TRANSMITTED ✓" state dikhata hai
(`src/components/Contact.jsx` mein `handleSubmit`). Actual email bhejne ke liye
apna backend API ya koi service (EmailJS, Formspree, etc.) yahan integrate kar sakte hain.
