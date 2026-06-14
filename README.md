# Wistara Banyu Kayana — Portfolio

My personal portfolio website — a fast, bilingual, single-page site that showcases my work, experience, and skills with an emphasis on **clean presentation and measurable results**.

🌐 **Live:** [wistarabanyukayana.github.io](https://wistarabanyukayana.github.io)

## ✨ Features

- **Bilingual (EN / ID)** — a language switch that re-renders the entire page, defaults to the visitor's browser language, and remembers their choice.
- **Data-driven content** — projects, experience, skills, and stats all live in a single file (`assets/js/data.js`). Adding or editing content never touches the HTML/CSS.
- **Tech badges & real-world metrics** — every project card surfaces its stack and the results that matter (e.g. _#1 Google ranking_, _10× traffic_).
- **Light / dark theme** — follows the system preference and can be toggled manually (persisted).
- **Responsive & accessible** — mobile-first layout, reduced-motion support, semantic markup.
- **Performance-minded build** — minified HTML/CSS/JS, optimized images, and cache-busting asset revisioning via Gulp.

## 🛠️ Built With

- **HTML5 · CSS3 · Vanilla JavaScript** (no framework)
- **Bai Jamjuree** + **JetBrains Mono** (Google Fonts), **Remix Icon**
- **Gulp** build pipeline — `csso`, `terser`, `htmlmin`, `imagemin`, `gulp-rev`
- **EmailJS** for the contact form
- **GitHub Actions** → **GitHub Pages** for CI/CD

## 📂 Project Structure

```
.
├── index.html                 # Page markup (sections + i18n hooks)
├── assets/
│   ├── css/styles.css          # Styles + design tokens (CSS variables)
│   ├── js/data.js              # ← Content lives here (single source of truth)
│   ├── js/main.js              # Rendering engine + interactions
│   ├── img/                    # Images, favicons, manifest
│   └── cv/                     # Downloadable CV (PDF)
├── gulpfile.js                 # Build & dev server
└── .github/workflows/          # Build + deploy to GitHub Pages
```

## ✏️ Editing Content

All content is edited in **`assets/js/data.js`** — no markup changes required.
Bilingual fields use the shape `{ en: "...", id: "..." }`.

**Add a project** — append an object to `PROJECTS`:

```js
{
  type: { en: "Web App", id: "Aplikasi Web" },
  title: "Project Name",
  image: "assets/img/your-image.png", // "" → placeholder
  description: { en: "...", id: "..." },
  metrics: [{ value: "10×", label: { en: "Traffic", id: "Trafik" } }],
  tech: ["Next.js", "SEO"],
  links: [{ icon: "ri-link", label: { en: "Visit", id: "Kunjungi" }, url: "https://…" }],
}
```

The same pattern applies to `EXPERIENCE`, `SKILLS`, and `STATS`. UI strings live in the `I18N` dictionary.

## 🚀 Getting Started

```bash
git clone https://github.com/wistarabanyukayana/wistarabanyukayana.github.io.git
cd wistarabanyukayana.github.io
npm install

npm run dev     # build + watch + serve at http://localhost:3000
npm run build   # production build into dist/
```

## ✨ Deployment

Pushing to `main` triggers the GitHub Actions workflow, which runs `npm run build` and deploys the `dist/` output to **GitHub Pages**.

## 📄 License

Licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](LICENSE).

---

Made with ❤️ by [Wistara Banyu Kayana](https://github.com/wistarabanyukayana)
