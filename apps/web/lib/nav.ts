export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

export type NavGroup = {
  group: string;
  items: NavItem[];
};

/** Sidebar navigation. Routes map 1:1 to app/(app)/<segment>. */
export const NAV: NavGroup[] = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard" }],
  },
  {
    group: "Analyze",
    items: [
      { label: "Repository analysis", href: "/analysis" },
      { label: "Generated assets", href: "/generator" },
      { label: "AI assistant", href: "/assistant" },
      { label: "Architecture diagram", href: "/diagram" },
    ],
  },
  {
    group: "Operate",
    items: [
      { label: "Security", href: "/security", badge: "1" },
      { label: "Cloud cost", href: "/cost" },
      { label: "Deployments", href: "/deploy" },
      { label: "History", href: "/history" },
    ],
  },
  {
    group: "Manage",
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Integrations", href: "/integrations" },
      { label: "Team & billing", href: "/team" },
      { label: "Notifications", href: "/notifications" },
      { label: "Activity log", href: "/activity" },
      { label: "Documentation", href: "/docs" },
    ],
  },
];

/** Flat lookup: route -> page title (for breadcrumb/topbar). */
export const ROUTE_TITLES: Record<string, string> = Object.fromEntries(
  NAV.flatMap((g) => g.items).map((i) => [i.href, i.label]),
);
