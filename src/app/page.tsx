import Link from "next/link";

const actions = [
  {
    href: "/scan",
    title: "Scan a Label",
    description: "Snap a photo. Know your wine in 3 seconds.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#722F37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15L16 10L5 21" />
      </svg>
    ),
  },
  {
    href: "/wine-list",
    title: "Read a Wine List",
    description: "Find the best value at any restaurant.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#722F37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6h16" />
        <path d="M4 10h16" />
        <path d="M4 14h10" />
        <path d="M4 18h8" />
        <path d="M18 14l2 2-2 2" />
      </svg>
    ),
  },
  {
    href: "/preferences",
    title: "My Palate",
    description: "Teach Pour what you love.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#722F37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8 2 4 6 4 10C4 14 8 18 12 22C16 18 20 14 20 10C20 6 16 2 12 2Z" />
        <path d="M12 6V14" />
        <path d="M8 10H16" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="px-6 pt-14">
      {/* Logo & Header */}
      <div className="mb-12">
        <h1 className="font-serif text-5xl font-semibold tracking-tight text-charcoal">
          Pour
        </h1>
        <div className="mt-1 h-0.5 w-8 rounded-full bg-wine" />
        <p className="mt-4 text-lg leading-relaxed text-slate">
          Your sommelier, always on.
        </p>
        <p className="mt-1 text-sm text-muted">
          Smart, opinionated wine advice — like having an expert in your pocket.
        </p>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="group flex items-center gap-4 rounded-2xl border border-warm-border bg-card p-5 transition-all hover:border-wine/30 hover:shadow-sm active:scale-[0.98]">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-wine/8 transition-colors group-hover:bg-wine/12">
                {action.icon}
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-lg font-medium text-charcoal">
                  {action.title}
                </h2>
                <p className="mt-0.5 text-sm text-muted">
                  {action.description}
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B8B8B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform group-hover:translate-x-1"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Tagline Footer */}
      <div className="mt-12 border-t border-warm-border pt-6 text-center">
        <p className="text-xs text-muted">
          Not a database. Not a social network.
        </p>
        <p className="mt-0.5 text-xs text-muted">
          Just smart guidance when you need it.
        </p>
      </div>
    </div>
  );
}
