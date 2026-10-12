# Shubham Pandey — Portfolio

A responsive developer portfolio inspired by the visual language and information architecture of the supplied reference site, customized with Shubham's professional background.

## Features

- Home, About, and Projects views
- Responsive desktop and mobile layout
- Dark/light theme toggle
- Project category filters and detail modal
- CSS illustrations, animated ambient glow, hover states, and motion
- Project and skills data organized in `src/App.tsx`
- Built with React, TypeScript, Vite, and plain CSS

## Run locally

Requirements: Node.js 20.19+ (ESLint 10 development tooling)

```bash
npm install
npm run dev
```

## Project structure

```text
src/
├── components/          # Shared UI such as internal navigation links
├── features/projects/   # Projects listing page and its page-scoped styles
├── App.tsx              # Application shell and page routing
├── content.ts           # Typed portfolio content, including project data
├── main.tsx             # React entry point
└── styles.css           # Global styles and shared page styles
```

Project descriptions, categories, technologies, and metrics are maintained in `src/content.ts`.

## Code quality

```bash
npm run lint
npm run format
npm run format:check
```

ESLint checks the TypeScript app and React hook rules. Prettier formats the shared component and Projects feature; its formatting scope avoids rewriting unrelated legacy pages and global styles during this page update.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project to a new GitHub repository.
2. Import the repository into Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

## Personalize before publishing

Update personal details, social links, project descriptions, statuses, technologies, and metrics in `src/content.ts`.

Search `src/App.tsx` for placeholder repository and demo URLs, and add only links you can verify and share.

The project cards intentionally avoid inventing public repository links. Add only links you can verify and share.

# shubham-portfolio
