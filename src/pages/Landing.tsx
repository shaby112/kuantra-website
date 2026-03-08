import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LuminaPipeline } from "@/components/graphics/LuminaPipeline";
import { ArrowRight, CheckCircle2, Database, Gauge, Share2 } from "lucide-react";

const valueCards = [
  {
    icon: Database,
    title: "Ingest & Connect",
    body: "Connect databases and cloud sources in minutes with secure, schema-aware setup.",
  },
  {
    icon: Gauge,
    title: "Model & Analyze",
    body: "Turn raw tables into an AI-ready semantic model for reliable SQL and dashboards.",
  },
  {
    icon: Share2,
    title: "Design & Share",
    body: "Generate dashboards and publish insights to teams with reusable templates.",
  },
];

export default function Landing() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.11),hsl(var(--background)_42%))] text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm" />
            <span className="text-xl font-semibold tracking-tight">InsightOps</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link to="/features" className="hover:text-foreground transition-colors">Product</Link>
            <Link to="/install" className="hover:text-foreground transition-colors">Install</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignedOut>
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2">
                <Link to="/downloads">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95">
                    Downloads
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="rounded-3xl border border-indigo-200/50 bg-gradient-to-b from-[#0A1127] to-[#050A1C] px-6 py-10 text-white shadow-[0_45px_110px_-60px_rgba(57,93,220,0.95)] md:px-10 md:py-12">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-indigo-200/90">
              {user ? `Welcome back, ${user.firstName || user.username || "there"}` : "From Data to Decision"}
            </div>
            <div className="text-xs text-indigo-200/70">Self-Hosted AI BI</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              From Data to Decision.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-indigo-100/85 md:text-xl">
              Accelerate your data-to-decision pipeline. Connect, model, and visualize analytics at scale.
            </p>
          </div>

          <div className="mt-10">
            <LuminaPipeline />
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/sign-up">
              <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-indigo-300/50 bg-transparent text-indigo-100 hover:bg-indigo-500/20 hover:text-white"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 pb-16 md:grid-cols-3">
        {valueCards.map((card) => (
          <Card key={card.title} className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <card.icon className="h-5 w-5" />
                </span>
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{card.body}</CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-border/70 bg-card/80 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Built for secure self-hosting</h2>
              <p className="mt-2 text-muted-foreground">
                Keep your deployment on your own infrastructure with optional no-egress AI mode.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Clerk-based identity and backend user provisioning
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Docker deployment for app and data services
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Compatible with air-gapped roadmap and licensing
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
