export type Metric = { value: string; label: string };
export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  type: string;
  status: string;
  featured?: boolean;
  description: string;
  stack: string[];
  metrics: Metric[];
  overview: string;
  features: string[];
  challenges: { title: string; challenge: string; solution: string }[];
  architecture: string[];
  screenshots: string[];
};

const placeholderProject = (number: number, category: string): PortfolioProject => ({
  slug: `placeholder-project-${String(number).padStart(2, "0")}`,
  title: `PLACEHOLDER PROJECT ${String(number).padStart(2, "0")}`,
  category,
  type: "PLACEHOLDER",
  status: "PLACEHOLDER STATUS",
  description:
    "Replace this card with an approved project title, description, status, and verified links.",
  stack: ["PLACEHOLDER TECHNOLOGY", "React", "TypeScript", "Add more"],
  metrics: [
    { value: "TBD", label: "PLACEHOLDER METRIC" },
    { value: "TBD", label: "PLACEHOLDER METRIC" },
  ],
  overview: "PLACEHOLDER: Add a verified project overview here.",
  features: [
    "PLACEHOLDER: Add a project feature.",
    "PLACEHOLDER: Add another feature.",
    "PLACEHOLDER: Add implementation details.",
  ],
  challenges: [
    {
      title: "PLACEHOLDER CHALLENGE",
      challenge: "PLACEHOLDER: Describe a confirmed challenge.",
      solution: "PLACEHOLDER: Describe the confirmed solution.",
    },
  ],
  architecture: ["PLACEHOLDER COMPONENT", "PLACEHOLDER API", "PLACEHOLDER DATA STORE"],
  screenshots: ["PLACEHOLDER PROJECT IMAGE", "PLACEHOLDER PROJECT IMAGE"],
});

export const projects: PortfolioProject[] = [
  {
    slug: "ai-interview-thinking-partner",
    title: "AI Interview Thinking Partner",
    category: "AI/ML",
    type: "Side Project",
    status: "In Development",
    featured: true,
    description:
      "An AI interview companion designed to help candidates structure their thinking, reason through technical problems, and communicate answers in clear, natural English.",
    stack: ["React", "TypeScript", "Node.js", "LLM APIs", "Prompt workflows"],
    metrics: [
      { value: "TBD", label: "Interview workflows" },
      { value: "TBD", label: "Evaluation criteria" },
      { value: "TBD", label: "AI services" },
    ],
    overview:
      "An AI interview companion in development. Replace this overview with a verified description of the product scope, supported interview formats, and implementation details.",
    features: [
      "PLACEHOLDER: Add verified question generation details.",
      "PLACEHOLDER: Add verified thinking and answer structure workflows.",
      "PLACEHOLDER: Add confirmed evaluation and feedback behavior.",
      "PLACEHOLDER: Add supported roles and technical topics.",
    ],
    challenges: [
      {
        title: "PLACEHOLDER: Prompt and response quality",
        challenge: "Describe a confirmed challenge in producing useful interview practice.",
        solution: "Describe the tested solution and its result.",
      },
      {
        title: "PLACEHOLDER: Workflow design",
        challenge: "Describe a confirmed workflow challenge.",
        solution: "Describe the implemented resolution.",
      },
    ],
    architecture: [
      "React frontend",
      "PLACEHOLDER: API / orchestration layer",
      "PLACEHOLDER: LLM provider",
    ],
    screenshots: [
      "PLACEHOLDER: Interview setup screen",
      "PLACEHOLDER: Practice and feedback screen",
    ],
  },
  {
    slug: "multi-tenant-cms",
    title: "Multi-tenant CMS Platform",
    category: "Full Stack",
    type: "Professional",
    status: "Completed",
    featured: true,
    description:
      "A content management experience for multiple brand websites, built around reusable configurations and shared publishing workflows.",
    stack: ["React", "Node.js", "SQL", "REST APIs"],
    metrics: [
      { value: "TBD", label: "Brand websites" },
      { value: "TBD", label: "Publishing workflows" },
    ],
    overview:
      "PLACEHOLDER: Add the approved CMS overview, tenant model, responsibilities, and scope of your contribution.",
    features: [
      "Reusable website configuration",
      "PLACEHOLDER: Add confirmed content authoring features.",
      "PLACEHOLDER: Add confirmed publishing workflow details.",
    ],
    challenges: [
      {
        title: "PLACEHOLDER: Tenant configuration",
        challenge: "Describe a confirmed multi-tenant challenge.",
        solution: "Describe the solution you contributed.",
      },
    ],
    architecture: ["React frontend", "Node.js APIs", "SQL data store"],
    screenshots: ["PLACEHOLDER: CMS screenshot", "PLACEHOLDER: Brand site screenshot"],
  },
  {
    slug: "luxtripper-deals-enquiries",
    title: "Luxtripper — Deals & Enquiries",
    category: "Frontend",
    type: "Professional",
    status: "Completed",
    featured: true,
    description:
      "Frontend contributions to travel website experiences across deals and enquiry workflows, connecting customer-facing interfaces with internal APIs.",
    stack: ["React", "JavaScript", "CSS", "REST APIs"],
    metrics: [
      { value: "TBD", label: "Deals experience" },
      { value: "TBD", label: "Enquiry workflows" },
    ],
    overview:
      "PLACEHOLDER: Add the approved description of your contribution to the Luxtripper site and the workflows you worked on.",
    features: [
      "Travel deals browsing",
      "Enquiry workflow UI",
      "PLACEHOLDER: Add verified responsive and API integration details.",
    ],
    challenges: [
      {
        title: "PLACEHOLDER: Enquiry journey",
        challenge: "Describe a verified user-flow challenge.",
        solution: "Describe the solution you delivered.",
      },
    ],
    architecture: [
      "React web interface",
      "Internal APIs",
      "PLACEHOLDER: Add confirmed platform components",
    ],
    screenshots: [
      "PLACEHOLDER: Deals listing screenshot",
      "PLACEHOLDER: Enquiry workflow screenshot",
    ],
  },
  {
    slug: "power-bi-custom-visuals",
    title: "Power BI Custom Visuals",
    category: "Data & Analytics",
    type: "Professional",
    status: "Completed",
    description:
      "React and TypeScript-based visual experiences for exploring business information in Power BI reporting workflows.",
    stack: ["React", "TypeScript", "Power BI", "Microsoft Fabric", "Dataverse"],
    metrics: [
      { value: "TBD", label: "Custom visuals" },
      { value: "TBD", label: "Data workflows" },
    ],
    overview:
      "PLACEHOLDER: Add confirmed descriptions of the visuals, data sources, and your role in their implementation.",
    features: [
      "Interactive report visuals",
      "Business data presentation",
      "PLACEHOLDER: Add confirmed Power BI integration details.",
    ],
    challenges: [
      {
        title: "PLACEHOLDER: Data visualization",
        challenge: "Describe a confirmed data or rendering challenge.",
        solution: "Describe the implemented approach.",
      },
    ],
    architecture: [
      "React visual",
      "Power BI data view",
      "PLACEHOLDER: Add confirmed platform connections",
    ],
    screenshots: ["PLACEHOLDER: Visual in report", "PLACEHOLDER: Data interaction screenshot"],
  },
  {
    slug: "movie-browser",
    title: "Movie Browser",
    category: "Frontend",
    type: "Side Project",
    status: "Completed",
    description:
      "A personal React project for browsing movie information with incremental loading and a responsive interface.",
    stack: ["React", "JavaScript", "CSS", "REST APIs"],
    metrics: [
      { value: "TBD", label: "Movie records" },
      { value: "TBD", label: "Browse interactions" },
    ],
    overview:
      "PLACEHOLDER: Add a verified description of this personal project, its data source, and current status.",
    features: ["Movie browsing interface", "Incremental content loading", "Responsive layout"],
    challenges: [
      {
        title: "PLACEHOLDER: Incremental loading",
        challenge: "Describe the actual pagination or loading challenge.",
        solution: "Describe the solution used in the project.",
      },
    ],
    architecture: ["React components", "PLACEHOLDER: Movie data API", "Browser UI state"],
    screenshots: ["PLACEHOLDER: Movie browser screenshot", "PLACEHOLDER: Detail view screenshot"],
  },
  {
    slug: "canvas-drag-drop-editor",
    title: "Canvas Drag-and-Drop Editor",
    category: "Frontend",
    type: "Side Project",
    status: "Completed",
    description:
      "A personal frontend project exploring draggable canvas elements, coordinate handling, and direct manipulation in the browser.",
    stack: ["React", "React Konva", "JavaScript"],
    metrics: [
      { value: "TBD", label: "Canvas elements" },
      { value: "TBD", label: "Editing tools" },
    ],
    overview:
      "PLACEHOLDER: Add the approved scope and current state of this canvas editing experiment.",
    features: [
      "Draggable canvas objects",
      "Coordinate handling",
      "PLACEHOLDER: Add confirmed editing operations.",
    ],
    challenges: [
      {
        title: "PLACEHOLDER: Canvas interactions",
        challenge: "Describe a confirmed state or coordinate challenge.",
        solution: "Describe the implementation used.",
      },
    ],
    architecture: ["React UI", "React Konva canvas", "PLACEHOLDER: Add confirmed state model"],
    screenshots: ["PLACEHOLDER: Editor canvas", "PLACEHOLDER: Drag interaction"],
  },
  ...[
    "Frontend Experience",
    "Data Dashboard",
    "API Integration Tool",
    "Content Workflow",
    "Customer Portal",
    "Analytics Interface",
    "Design System",
    "Developer Utility",
    "Reporting Workflow",
    "Web Application",
  ].map((title, i) => ({
    ...placeholderProject(
      i + 7,
      [
        "Frontend",
        "Data & Analytics",
        "Full Stack",
        "Frontend",
        "Full Stack",
        "Data & Analytics",
        "Frontend",
        "AI/ML",
        "Data & Analytics",
        "Full Stack",
      ][i],
    ),
    title: `PLACEHOLDER: ${title}`,
  })),
];
