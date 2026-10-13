# Shubham Pandey — Portfolio

A responsive React and TypeScript portfolio built with Vite and plain CSS. The current interface, responsive rules, animations, and interactions are preserved while source code is organized by page feature.

## Run locally

Requirements: Node.js 20.19+.

```bash
npm install
npm run dev
```

## Architecture

```text
src/
├── App.tsx                     # Route state and page composition
├── main.tsx                    # React root
├── components/
│   ├── InternalLink.tsx        # Client-side internal navigation link
│   ├── PortfolioUI.tsx         # Shared headings, badges/cards, metrics, and panels
│   └── SiteLayout.tsx          # Header, footer, and not-found view
├── data/
│   ├── profile.ts              # Profile and work history
│   ├── projects.ts             # Project content and PortfolioProject type
│   ├── skills.ts               # Skill groups, catalog, and complementary skills
│   ├── recognition.ts          # Awards, certifications, and articles
│   ├── home.ts                 # Home page data composition
│   └── about.ts                # About page data composition
├── features/
│   ├── home/HomePage.tsx
│   ├── projects/               # Listing, detail page, and feature CSS
│   ├── skills/SkillsPage.tsx
│   ├── awards/AwardsPage.tsx
│   ├── articles/ArticlesPage.tsx
│   ├── about/AboutPage.tsx
│   └── contact/ContactPage.tsx
├── content.ts                  # Compatibility exports for the data modules
└── styles.css                  # Global tokens, layout, and shared page styling
```

`App.tsx` owns the existing lightweight history-based navigation, theme persistence, reveal observer, and composition of independent pages. Feature-specific state stays with its page; the project listing styles stay in `features/projects/projects.css`. Shared components are used for repeated headings, project metadata, portfolio cards, and layout.

The existing global stylesheet still contains legacy page-specific rules alongside shared styles. It is retained as-is to preserve cascade order and the current design; new project listing styles are scoped to the Projects feature.

## Update portfolio content

Edit the focused files in `src/data/`:

- `profile.ts` for your profile and work history
- `projects.ts` for project descriptions, technologies, metrics, and detail content
- `skills.ts` for skill groups and the searchable catalog
- `recognition.ts` for awards, certifications, and articles

Replace placeholder text and URLs only with information you have verified. The current contact form is a front-end demo and does not send messages until connected to a form service.

## Code quality and production build

```bash
npm run format
npm run format:check
npm run lint
npm run build
npm run preview
```

Formatting uses Prettier across TypeScript, CSS, and project configuration. ESLint checks TypeScript and React hook rules. The production build runs TypeScript project checks before Vite bundles the app.

## Deploy to Vercel

1. Push the project to GitHub and import the repository into Vercel.
2. Use `npm run build` as the build command and `dist` as the output directory.
