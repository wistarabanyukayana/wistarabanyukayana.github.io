/**
 * ============================================================================
 *  PORTFOLIO CONTENT — single source of truth
 * ----------------------------------------------------------------------------
 *  Everything visible on the site is driven from the structures below.
 *  To add or edit content you only touch THIS file.
 *
 *  Bilingual fields use the shape: { en: "...", id: "..." }
 *  Plain strings (names, tech, URLs) are language-agnostic.
 *
 *  HOW TO ADD A PROJECT  -> append an object to PROJECTS (see the shape below).
 *  HOW TO ADD A JOB      -> append an object to EXPERIENCE.
 *  HOW TO ADD A SKILL    -> add a string to the relevant SKILLS group.
 * ============================================================================
 */

(() => {

/* ---------------------------------------------------------------------------
 *  HERO STATS — the headline metrics a recruiter sees first.
 *  value = the number/badge, label = short caption.
 * ------------------------------------------------------------------------- */
const STATS = [
  { value: "3.91", suffix: "/4.00", label: { en: "GPA", id: "IPK" } },
  {
    value: "10×",
    label: { en: "Traffic delivered", id: "Lonjakan trafik" },
  },
  {
    value: "#1",
    label: { en: "Google ranking", id: "Peringkat Google" },
  },
  {
    value: "7.5",
    label: { en: "IELTS Academic", id: "IELTS Academic" },
  },
];

/* ---------------------------------------------------------------------------
 *  PROJECTS
 *  type        -> small eyebrow label above the title
 *  title       -> language-agnostic project name
 *  image       -> path under assets/img (use "" to fall back to a placeholder)
 *  description -> { en, id }
 *  metrics     -> optional [{ value, label:{en,id} }] shown as result chips
 *  tech        -> array of badge strings
 *  links       -> [{ icon, label:{en,id}, url }]  (icon = Remix Icon class,
 *                 OR use { img: "<url>" } for an SVG logo instead of an icon)
 * ------------------------------------------------------------------------- */
const PROJECTS = [
  {
    type: { en: "Corporate Website · SEO", id: "Website Korporat · SEO" },
    title: "Padelix Indonesia",
    image: "assets/img/padelix.png",
    description: {
      en: "Founding developer of a padel-court construction company's first corporate site. Owned the full lifecycle — planning, build, deployment, QA — and engineered the SEO so it ranks #1 for its target keyword.",
      id: "Developer pendiri untuk website korporat pertama perusahaan konstruksi lapangan padel. Menangani seluruh siklus — perencanaan, pembangunan, deployment, hingga QA — serta merancang SEO sehingga menempati peringkat #1 untuk kata kunci utamanya.",
    },
    metrics: [
      { value: "#1", label: { en: 'Rank · "Padelix Indonesia"', id: 'Peringkat · "Padelix Indonesia"' } },
      { value: "B2B/B2C", label: { en: "Target market", id: "Target pasar" } },
    ],
    tech: ["Next.js", "React", "SEO", "Web Architecture"],
    links: [
      { icon: "ri-link", label: { en: "Visit", id: "Kunjungi" }, url: "https://padelix.co.id/" },
      { icon: "ri-github-line", label: { en: "Code", id: "Kode" }, url: "https://github.com/wistarabanyukayana/padelix-indonesia-website" },
    ],
  },
  {
    type: { en: "Travel Platform · Growth", id: "Platform Wisata · Pertumbuhan" },
    title: "Dallas Tour & Travel",
    image: "assets/img/dtt.png",
    description: {
      en: "Revitalized the architecture of an established tour-and-travel business. A technical restructure plus a structured SEO strategy and Meta Ads campaigns drove a documented 10× increase in visitor traffic.",
      id: "Merevitalisasi arsitektur bisnis tour-and-travel yang sudah berjalan. Restrukturisasi teknis dipadu strategi SEO terstruktur dan kampanye Meta Ads menghasilkan kenaikan trafik pengunjung 10× yang terdokumentasi.",
    },
    metrics: [
      { value: "10×", label: { en: "Visitor traffic", id: "Trafik pengunjung" } },
      { value: "Meta Ads", label: { en: "Acquisition", id: "Akuisisi" } },
    ],
    tech: ["Web Architecture", "SEO", "Meta Ads", "Analytics"],
    links: [
      { icon: "ri-link", label: { en: "Visit", id: "Kunjungi" }, url: "https://dallastourandtravel.com/" },
      { icon: "ri-github-line", label: { en: "Code", id: "Kode" }, url: "https://github.com/wistarabanyukayana/dallastourtravel.com" },
    ],
  },
  {
    type: { en: "Game · Published", id: "Gim · Dipublikasikan" },
    title: "One Night at Horror Play House",
    image: "assets/img/ONHPH.webp",
    description: {
      en: "A horror game inspired by Five Nights at Freddy's with a story of its own: it began as a Scratch project, grew popular, and was rebuilt in Unity and published to the Google Play Store.",
      id: "Gim horor yang terinspirasi Five Nights at Freddy's dengan kisahnya sendiri: bermula sebagai proyek Scratch, menjadi populer, lalu dibangun ulang di Unity dan dipublikasikan ke Google Play Store.",
    },
    metrics: [
      { value: "Play Store", label: { en: "Published", id: "Dipublikasikan" } },
      { value: "Scratch → Unity", label: { en: "Rebuilt", id: "Dibangun ulang" } },
    ],
    tech: ["Unity", "C#", "Game Design"],
    links: [
      { icon: "ri-google-play-line", label: { en: "Play Store", id: "Play Store" }, url: "https://play.google.com/store/apps/details?id=com.xictawstudio.onenightathororplayhouseonhph" },
      { img: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/scratch.svg", label: { en: "Scratch", id: "Scratch" }, url: "https://scratch.mit.edu/projects/375191498/" },
    ],
  },
  {
    type: { en: "Fintech · Internal Tool", id: "Fintech · Alat Internal" },
    title: "SLIK Payment Dashboard",
    image: "",
    description: {
      en: "Built during my engineering internship at Bank Amar Indonesia: a payment-report dashboard for the SLIK credit-information system, delivered on a 3-month timeline with database integration and access control to banking standards.",
      id: "Dibangun saat magang engineering di Bank Amar Indonesia: dashboard laporan pembayaran untuk sistem informasi kredit SLIK, diselesaikan dalam 3 bulan dengan integrasi basis data dan kontrol akses sesuai standar perbankan.",
    },
    metrics: [
      { value: "3 mo", label: { en: "On-time delivery", id: "Tepat waktu" } },
      { value: "SLIK", label: { en: "Credit reporting", id: "Pelaporan kredit" } },
    ],
    tech: ["PHP", "Slim Framework", "SQL", "Dashboard"],
    links: [],
  },
];

/* ---------------------------------------------------------------------------
 *  EXPERIENCE — reverse-chronological. Rendered as a timeline.
 *  points -> bullet list of { en, id } achievements (lead with the metric).
 * ------------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    role: { en: "Founding Lead Developer", id: "Founding Lead Developer" },
    org: "PT Tripandawa Kencana Utama",
    period: { en: "Jun 2025 — Present", id: "Jun 2025 — Sekarang" },
    kind: { en: "Part-time · Project-based", id: "Paruh waktu · Berbasis proyek" },
    points: [
      {
        en: "Led the build and launch of the company's first corporate site (padelix.co.id) end-to-end, from planning to deployment and QA.",
        id: "Memimpin pembangunan dan peluncuran website korporat pertama perusahaan (padelix.co.id) secara menyeluruh, dari perencanaan hingga deployment dan QA.",
      },
      {
        en: "Engineered an SEO strategy that ranks the site #1 for \"Padelix Indonesia\", with monitoring protocols to sustain the position.",
        id: "Merancang strategi SEO yang menempatkan situs di peringkat #1 untuk \"Padelix Indonesia\", lengkap dengan protokol pemantauan untuk mempertahankan posisinya.",
      },
    ],
  },
  {
    role: { en: "Digital Transformation Consultant", id: "Konsultan Transformasi Digital" },
    org: "PT Delta Laras Wisata",
    period: { en: "Oct 2024 — Present", id: "Okt 2024 — Sekarang" },
    kind: { en: "Consultancy", id: "Konsultansi" },
    points: [
      {
        en: "Restructured the website architecture and SEO, producing a documented 10× increase in visitor traffic.",
        id: "Merestrukturisasi arsitektur website dan SEO, menghasilkan kenaikan trafik pengunjung 10× yang terdokumentasi.",
      },
      {
        en: "Ran Meta Ads campaigns for brand expansion and user acquisition, collaborating with the owner, former CTO, and vendors.",
        id: "Menjalankan kampanye Meta Ads untuk ekspansi merek dan akuisisi pengguna, berkolaborasi dengan pemilik, mantan CTO, dan vendor.",
      },
    ],
  },
  {
    role: { en: "Software Engineering Intern", id: "Magang Software Engineering" },
    org: "PT Bank Amar Indonesia",
    period: { en: "Jun 2022 — Nov 2022", id: "Jun 2022 — Nov 2022" },
    kind: { en: "Internship", id: "Magang" },
    points: [
      {
        en: "Built a SLIK payment-report dashboard in PHP and the Slim Framework, delivered within the 3-month timeline.",
        id: "Membangun dashboard laporan pembayaran SLIK menggunakan PHP dan Slim Framework, selesai dalam tenggat 3 bulan.",
      },
      {
        en: "Implemented database integration, data visualization, and secure access control to banking-industry standards.",
        id: "Mengimplementasikan integrasi basis data, visualisasi data, dan kontrol akses aman sesuai standar industri perbankan.",
      },
    ],
  },
  {
    role: { en: "Programming Staff · Tech Development", id: "Staf Programming · Pengembangan Teknologi" },
    org: "Tim Riset Robotik Bayucaraka — ITS",
    period: { en: "Mar 2026 — Present", id: "Mar 2026 — Sekarang" },
    kind: { en: "Research", id: "Riset" },
    points: [
      {
        en: "Extended the Ground Control Station (GCS) software with new features and stability fixes for more reliable UAV operation.",
        id: "Mengembangkan perangkat lunak Ground Control Station (GCS) dengan fitur baru dan perbaikan stabilitas untuk operasi UAV yang lebih andal.",
      },
      {
        en: "Supported development and testing of new aircraft prototypes through systematic testing protocols.",
        id: "Mendukung pengembangan dan pengujian prototipe pesawat baru melalui protokol pengujian yang sistematis.",
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 *  SKILLS — grouped. Each group has a bilingual title and a list of items.
 * ------------------------------------------------------------------------- */
const SKILLS = [
  {
    title: { en: "Languages", id: "Bahasa Pemrograman" },
    items: ["JavaScript", "TypeScript", "Python", "PHP", "Java", "C", "C++", "C#", "SQL", "HTML", "CSS"],
  },
  {
    title: { en: "Frameworks & Libraries", id: "Framework & Library" },
    items: ["Next.js", "React", "Node.js", "Laravel", "Django", "Flask", "Slim"],
  },
  {
    title: { en: "Game & Engines", id: "Gim & Engine" },
    items: ["Unity", "Godot"],
  },
  {
    title: { en: "Tools & DevOps", id: "Tools & DevOps" },
    items: ["Git", "GitHub Actions", "Docker", "CI/CD", "MongoDB", "Figma"],
  },
  {
    title: { en: "Specialties", id: "Spesialisasi" },
    items: ["SEO Optimization", "Web Architecture", "UI/UX Design"],
  },
];

/* ---------------------------------------------------------------------------
 *  UI STRINGS — static interface copy. Keyed by data-i18n in the HTML.
 * ------------------------------------------------------------------------- */
const I18N = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    "hero.role": "Full-Stack Developer · Game Developer · UI/UX Designer",
    "hero.lead": "I'm an Informatics Engineering student at <b>Institut Teknologi Sepuluh Nopember</b> who ships production websites, games, and dashboards — and backs them with measurable results.",
    "hero.cta.contact": "Get in touch",
    "hero.cta.cv": "Download CV",

    "about.title": "About.",
    "about.lead": "From a primary-school robotics hobby to international competitions, then into shipping real software for real businesses.",
    "about.p1": "What started as a robotics extracurricular — and competitions up to the international level — turned into a deep interest in technology and programming. Today I focus on building things people actually use: corporate websites, a published game, and internal tools.",
    "about.p2": "I care about clean architecture, search visibility, and outcomes I can measure. I work comfortably in both English and Indonesian.",
    "about.langs": "Languages",
    "about.langs.val": "Indonesian (Native · UKBI 669) · English (IELTS Academic 7.5)",
    "about.edu": "Education",
    "about.edu.val": "B.Sc. Informatics Engineering, ITS — GPA 3.91/4.00",
    "about.awards": "Highlights",
    "about.awards.val": "International robotics medalist (WRO India) · 7× competition awards",

    "exp.title": "Experience.",
    "exp.lead": "Where I've delivered.",

    "projects.title": "Projects.",
    "projects.lead": "A selection of work, with the results that matter.",
    "projects.tech": "Tech",

    "skills.title": "Skills.",
    "skills.lead": "The stack I build with.",

    "contact.title": "Contact.",
    "contact.lead": "I read every message. Tell me about a role, a project, or just say hello — I'll reply soon.",
    "contact.formTitle": "Send me a message",
    "contact.name": "Name",
    "contact.email": "Email address",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send message",
    "contact.socialQ": "Prefer not to email?",
    "contact.socialA": "Reach me on social media instead.",
    "contact.sent": "Message sent successfully ✅",
    "contact.error": "Message not sent (service error) ❌",

    "footer.rights": "All rights reserved.",
    "footer.built": "Designed & built by",
  },
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.experience": "Pengalaman",
    "nav.projects": "Proyek",
    "nav.contact": "Kontak",
    "nav.menu": "Menu",

    "hero.role": "Full-Stack Developer · Game Developer · UI/UX Designer",
    "hero.lead": "Saya mahasiswa Teknik Informatika di <b>Institut Teknologi Sepuluh Nopember</b> yang merilis website, gim, dan dashboard siap produksi — dengan hasil yang terukur.",
    "hero.cta.contact": "Hubungi saya",
    "hero.cta.cv": "Unduh CV",

    "about.title": "Tentang.",
    "about.lead": "Berawal dari hobi robotika di sekolah dasar hingga kompetisi internasional, lalu merilis perangkat lunak nyata untuk bisnis nyata.",
    "about.p1": "Bermula dari eskul robotika — dan lomba hingga tingkat internasional — yang berkembang menjadi ketertarikan mendalam pada teknologi dan pemrograman. Kini saya fokus membangun hal yang benar-benar dipakai orang: website korporat, gim yang dipublikasikan, dan alat internal.",
    "about.p2": "Saya peduli pada arsitektur yang rapi, visibilitas pencarian, dan hasil yang bisa diukur. Saya nyaman bekerja dalam Bahasa Indonesia maupun Inggris.",
    "about.langs": "Bahasa",
    "about.langs.val": "Indonesia (Native · UKBI 669) · Inggris (IELTS Academic 7.5)",
    "about.edu": "Pendidikan",
    "about.edu.val": "S.Kom. Teknik Informatika, ITS — IPK 3,91/4,00",
    "about.awards": "Sorotan",
    "about.awards.val": "Peraih medali robotika internasional (WRO India) · 7× penghargaan lomba",

    "exp.title": "Pengalaman.",
    "exp.lead": "Tempat saya memberi hasil.",

    "projects.title": "Proyek.",
    "projects.lead": "Pilihan karya, beserta hasil yang berarti.",
    "projects.tech": "Teknologi",

    "skills.title": "Keahlian.",
    "skills.lead": "Teknologi yang saya gunakan.",

    "contact.title": "Kontak.",
    "contact.lead": "Saya membaca setiap pesan. Ceritakan tentang lowongan, proyek, atau sekadar menyapa — saya akan segera membalas.",
    "contact.formTitle": "Kirim saya pesan",
    "contact.name": "Nama",
    "contact.email": "Alamat email",
    "contact.subject": "Subjek",
    "contact.message": "Pesan",
    "contact.send": "Kirim pesan",
    "contact.socialQ": "Tidak ingin mengirim email?",
    "contact.socialA": "Hubungi saya lewat media sosial.",
    "contact.sent": "Pesan berhasil dikirim ✅",
    "contact.error": "Pesan gagal dikirim (kesalahan layanan) ❌",

    "footer.rights": "Hak cipta dilindungi undang-undang.",
    "footer.built": "Dirancang & dibangun oleh",
  },
};

  /* Expose to the renderer (loaded as a classic script before main.js). */
  window.PORTFOLIO = { STATS, PROJECTS, EXPERIENCE, SKILLS, I18N };
})();
