/**
 * ============================================================================
 *  main.js — renders content from data.js and wires up interactions.
 *  Content lives in data.js; this file is the "engine".
 * ============================================================================
 */

const { STATS, PROJECTS, EXPERIENCE, SKILLS, I18N } = window.PORTFOLIO;

/* ---------------------------------------------------------------------------
 *  LANGUAGE
 * ------------------------------------------------------------------------- */
const SUPPORTED = ["en", "id"];
const storedLang = localStorage.getItem("selected-lang");
const browserLang = (navigator.language || "en").slice(0, 2);
let currentLang = SUPPORTED.includes(storedLang)
  ? storedLang
  : SUPPORTED.includes(browserLang)
  ? browserLang
  : "en";

/* Pick the right side of a bilingual { en, id } field. */
const t = (field) =>
  field && typeof field === "object" ? field[currentLang] ?? field.en : field;

/* ---------------------------------------------------------------------------
 *  RENDERERS
 * ------------------------------------------------------------------------- */
function renderStats() {
  const el = document.getElementById("home-stats");
  if (!el) return;
  el.innerHTML = STATS.map(
    (s) => `
    <li class="home__stat">
      <p class="home__stat-value">${s.value}${
      s.suffix ? `<span>${s.suffix}</span>` : ""
    }</p>
      <p class="home__stat-label">${t(s.label)}</p>
    </li>`
  ).join("");
}

function renderExperience() {
  const el = document.getElementById("experience-list");
  if (!el) return;
  el.innerHTML = EXPERIENCE.map(
    (job) => `
    <li class="experience__item reveal">
      <div class="experience__meta">
        <span class="experience__period">${t(job.period)}</span>
        <span class="experience__kind">${t(job.kind)}</span>
      </div>
      <div class="experience__body">
        <h3 class="experience__role">${t(job.role)}
          <span class="experience__org">${job.org}</span>
        </h3>
        <ul class="experience__points">
          ${job.points.map((p) => `<li>${t(p)}</li>`).join("")}
        </ul>
      </div>
    </li>`
  ).join("");
}

function projectLink(link) {
  const inner = link.img
    ? `<img src="${link.img}" alt="" /> ${t(link.label)}`
    : `<i class="${link.icon}"></i> ${t(link.label)}`;
  return `<a href="${link.url}" target="_blank" rel="noopener" class="projects__link">${inner}</a>`;
}

function renderProjects() {
  const el = document.getElementById("projects-list");
  if (!el) return;
  el.innerHTML = PROJECTS.map((p) => {
    const media = p.image
      ? `<img src="${p.image}" alt="${p.title}" loading="lazy" class="projects__img" />`
      : `<div class="projects__placeholder"><i class="ri-terminal-box-line"></i></div>`;

    const metrics = (p.metrics || [])
      .map(
        (m) => `
        <div class="projects__metric">
          <span class="projects__metric-value">${m.value}</span>
          <span class="projects__metric-label">${t(m.label)}</span>
        </div>`
      )
      .join("");

    const tech = (p.tech || [])
      .map((name) => `<span class="tech-badge">${name}</span>`)
      .join("");

    const links = (p.links || []).map(projectLink).join("");

    return `
      <article class="projects__card reveal">
        <div class="projects__image">${media}</div>
        <div class="projects__content">
          <p class="projects__type">${t(p.type)}</p>
          <h3 class="projects__title">${p.title}</h3>
          <p class="projects__description">${t(p.description)}</p>
          ${metrics ? `<div class="projects__metrics">${metrics}</div>` : ""}
          ${tech ? `<div class="projects__tech">${tech}</div>` : ""}
          ${links ? `<div class="projects__links">${links}</div>` : ""}
        </div>
      </article>`;
  }).join("");
}

function renderSkills() {
  const el = document.getElementById("skills-list");
  if (!el) return;
  el.innerHTML = SKILLS.map(
    (group) => `
    <div class="skills__group reveal">
      <h3 class="skills__group-title">${t(group.title)}</h3>
      <div class="skills__tags">
        ${group.items.map((s) => `<span class="skills__tag">${s}</span>`).join("")}
      </div>
    </div>`
  ).join("");
}

function renderDynamic() {
  renderStats();
  renderExperience();
  renderProjects();
  renderSkills();
  observeReveals();
}

/* ---------------------------------------------------------------------------
 *  STATIC i18n — applies to elements with data-i18n / -html / -ph attributes.
 * ------------------------------------------------------------------------- */
function applyStaticI18n() {
  const dict = I18N[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = dict[node.getAttribute("data-i18n")];
    if (value != null) node.textContent = value;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const value = dict[node.getAttribute("data-i18n-html")];
    if (value != null) node.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((node) => {
    const value = dict[node.getAttribute("data-i18n-ph")];
    if (value != null) node.setAttribute("placeholder", value);
  });
}

function setLanguage(lang) {
  currentLang = SUPPORTED.includes(lang) ? lang : "en";
  localStorage.setItem("selected-lang", currentLang);
  document.documentElement.lang = currentLang;

  const label = document.getElementById("lang-current");
  if (label) label.textContent = currentLang.toUpperCase();

  applyStaticI18n();
  renderDynamic();
}

const langButton = document.getElementById("lang-button");
if (langButton) {
  langButton.addEventListener("click", () =>
    setLanguage(currentLang === "en" ? "id" : "en")
  );
}

/* ---------------------------------------------------------------------------
 *  THEME — system default + manual override (persisted).
 * ------------------------------------------------------------------------- */
const themeButton = document.getElementById("theme-button");
const DARK = "dark-theme";
const MOON = "ri-moon-line";
const SUN = "ri-sun-line";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const setThemeIcon = (isDark) => {
  themeButton.classList.toggle(SUN, isDark);
  themeButton.classList.toggle(MOON, !isDark);
};

const storedTheme = localStorage.getItem("selected-theme");
const startDark = storedTheme ? storedTheme === "dark" : prefersDark.matches;
document.body.classList.toggle(DARK, startDark);
setThemeIcon(startDark);

themeButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle(DARK);
  setThemeIcon(isDark);
  localStorage.setItem("selected-theme", isDark ? "dark" : "light");
});

/* Follow the system only while the user hasn't chosen manually. */
prefersDark.addEventListener("change", (e) => {
  if (localStorage.getItem("selected-theme")) return;
  document.body.classList.toggle(DARK, e.matches);
  setThemeIcon(e.matches);
});

/* ---------------------------------------------------------------------------
 *  NAV (mobile menu)
 * ------------------------------------------------------------------------- */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

navToggle?.addEventListener("click", () => navMenu.classList.add("show-menu"));
navClose?.addEventListener("click", () => navMenu.classList.remove("show-menu"));
document.querySelectorAll(".nav__link").forEach((link) =>
  link.addEventListener("click", () => navMenu.classList.remove("show-menu"))
);

/* ---------------------------------------------------------------------------
 *  SCROLL behaviors: header shadow, scroll-up, active link
 * ------------------------------------------------------------------------- */
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");
const sections = document.querySelectorAll("section[id]");

const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle("shadow-header", y >= 50);
  scrollUp.classList.toggle("show-scroll", y >= 350);

  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav__menu a[href="#${id}"]`);
    if (!link) return;
    const active = y > top && y <= top + section.offsetHeight;
    link.classList.toggle("active-link", active);
  });
};
window.addEventListener("scroll", onScroll);

function scrollToHashTarget() {
  if (!window.location.hash) return;

  const target = document.getElementById(
    decodeURIComponent(window.location.hash.slice(1))
  );
  if (!target) return;

  const offset = (header?.offsetHeight || 0) + 18;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo(0, Math.max(top, 0));
  onScroll();
  showRevealsInView();
}

window.addEventListener("hashchange", () => {
  requestAnimationFrame(scrollToHashTarget);
});

/* ---------------------------------------------------------------------------
 *  REVEAL on scroll (IntersectionObserver)
 * ------------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

function observeReveals() {
  document
    .querySelectorAll(".reveal:not(.is-visible)")
    .forEach((el) => revealObserver.observe(el));
}

function showRevealsInView() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      revealObserver.unobserve(el);
    }
  });
}

/* ---------------------------------------------------------------------------
 *  EMAIL JS
 * ------------------------------------------------------------------------- */
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();
  emailjs
    .sendForm(
      "service_8c197sc",
      "template_h63f11f",
      "#contact-form",
      "c2rnZSyq9ibJ4516V"
    )
    .then(
      () => {
        contactMessage.textContent = I18N[currentLang]["contact.sent"];
        setTimeout(() => (contactMessage.textContent = ""), 5000);
        contactForm.reset();
      },
      () => {
        contactMessage.textContent = I18N[currentLang]["contact.error"];
      }
    );
};
contactForm?.addEventListener("submit", sendEmail);

/* ---------------------------------------------------------------------------
 *  INIT
 * ------------------------------------------------------------------------- */
const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* Tag static below-the-fold blocks for reveal (hero stays visible on load). */
document
  .querySelectorAll(".section__head, .about__info, .about__perfil")
  .forEach((el) => el.classList.add("reveal"));

setLanguage(currentLang);
observeReveals();
scrollToHashTarget();
window.setTimeout(scrollToHashTarget, 80);
window.addEventListener("load", scrollToHashTarget);
