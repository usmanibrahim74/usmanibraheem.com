# Adding a New Project

This portfolio is statically prerendered with `vite-ssg` (see `vite.config.js` / `src/main.js`). Every project lives as one object in **`src/Utils/ProjectsData.js`** — that single file is the source of truth. The homepage grid (`src/components/Projects.vue`), the per-project detail page (`src/pages/ProjectDetail.vue`), the prerendered routes, and `dist/sitemap.xml` / `dist/robots.txt` are all generated *from* this array. You do not need to touch the router, `vite.config.js`, or any component to add a project — editing `ProjectsData.js` and dropping in an image is enough.

## 1. Gather real information first

Before writing anything, verify what the project actually is:

- **Public product** (has its own website): use WebSearch/WebFetch directly to confirm facts — what it does, founding info, features, stats. Only state things you can verify from a source. Do not invent user counts, funding figures, or founding dates. It's fine to say less if nothing is verifiable.
- **Client/internal product with no public presence** (e.g. an in-house Boson Studio product, a private client deployment): if there's a live demo, browse it yourself (Chrome tooling) to learn the real feature set from the UI itself (sidebar modules, dashboard sections, etc.) rather than guessing.
- Do not spawn subagents/forks for this research unless the user explicitly asks for it — do the search/browsing yourself.
- If you want to use a live client's dashboard/screen as the thumbnail and it shows real business data (revenue, client names, etc.), **ask the user first** before using it — it's their call whether that's shareable.

## 2. Add the thumbnail image

- If you have a real screenshot (e.g. captured via the Chrome tool), save it into `public/` as `<slug>.png` (convert to PNG with `sips -s format png` if it came in as `.jpg`).
- If the project already has a marketing image you can link to directly, an absolute URL in `thumbnail` is fine too (see the `glorify` entry, which points at a `framerusercontent.com` image) — no local file needed.
- Aim for a landscape screenshot roughly matching the existing thumbnails (~1800–1900px wide, ~2:1 aspect ratio) so the card/hero crop looks consistent.

## 3. Add the entry to `src/Utils/ProjectsData.js`

Append an object to the `projectsData` array using this shape:

```js
{
    slug: 'my-project',                 // kebab-case, unique, becomes /projects/my-project
    name: 'My Project - Short Tagline', // shown as the page <h1> and card title
    summary: 'One clear sentence describing the project (~80-110 chars, shown in full on the homepage card).',
    thumbnail: '/my-project.png',       // local file in public/, or a full https:// URL
    tags: ['vueJS', 'tailwind CSS', 'laravel'], // tech stack pills
    github: '',                          // repo URL, or '' if none/private
    live: 'https://example.com/',        // live site or demo URL
    content: {
        intro: 'A short paragraph (2-4 sentences) — the lead paragraph on the detail page. State what it is, who it\'s for, and what makes it notable. This is the only required field in `content`.',
        highlights: [
            'A concrete feature or fact, one per bullet — rendered as a checklist on the detail page.',
            'Keep each one specific (a real feature, a real number you verified, a real mechanic) — not vague marketing language.',
            'Usually 3-6 bullets.',
        ],
        // Optional — only include if you (the portfolio owner) actually worked on this project:
        role: 'I worked on this project as a [role], focusing on [what you built].',
        // Optional — only include if there's a public demo with real, safe-to-share credentials:
        demo: [
            {label: 'Email', value: 'demo@example.com'},
            {label: 'Password', value: 'password'},
        ],
    },
}
```

Field notes:

- **`slug`** must be unique across all projects — it's the only thing that determines the URL and the prerendered filename (`dist/projects/<slug>.html`).
- **`summary`** is shown in full on the homepage grid card (no truncation, no "read more" cut mid-sentence) — write it as one complete, readable sentence.
- **`content.intro`** is the opening paragraph on `/projects/<slug>` — write it like the lead of a short blog post, not a dense wall of text.
- **`content.highlights`** renders as a bulleted "Highlights" section with checkmark icons. This is where concrete, specific facts belong (features, verified stats, mechanics) — not restated marketing copy.
- **`content.role`** and **`content.demo`** are both optional and conditionally rendered (`v-if`) — omit the key entirely if it doesn't apply, don't leave it empty. `role` only belongs on projects you (Usman) actually built/contributed to; `demo` only belongs where there's a real, intentionally public demo login.
- Casing/style for `tags` isn't strictly enforced elsewhere in the file (you'll see both `vueJS` and `VueJS`) — just be internally consistent for the new entry.

## 4. Verify

1. `npm run dev` and check:
   - The new card appears in the homepage `#projects` grid with a sensible thumbnail crop and readable summary.
   - `/projects/<slug>` loads directly, shows the intro/highlights/role/demo sections correctly (and that optional sections you didn't add are correctly absent, not rendered empty).
   - It shows up correctly in the "More Projects" teaser list on other project pages.
   - No console errors.
2. `npm run build` (runs `vite-ssg build`) and confirm:
   - `dist/projects/<slug>.html` was generated.
   - Its `<title>`, meta description, and `og:image` reflect the new project (these come from `useHead` in `ProjectDetail.vue`, driven entirely by the data you added — no extra work needed).
   - `dist/sitemap.xml` includes the new URL.

That's it — no router, config, or component changes are needed for a normal addition. If you find yourself wanting to edit `vite.config.js`, `src/router/routes.js`, `Projects.vue`, or `ProjectDetail.vue` just to add a project, stop — that almost certainly means something belongs in the data file instead.
