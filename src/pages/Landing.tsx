import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Database, Gauge, Layers3, Sparkles, User } from "lucide-react";
import { format } from "date-fns";

import { getAllPosts } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const bentoItems = [
  {
    title: "Direct-to-database engine",
    body: "No middle warehouse copy. Kuantra pushes optimized queries where your data already lives.",
    icon: Database,
    metric: "0 ETL hops",
    className: "md:col-span-2",
  },
  {
    title: "Query latency",
    body: "Sub-100ms dashboard interactions powered by DuckDB acceleration.",
    icon: Gauge,
    metric: "<100ms",
    className: "md:col-span-1",
  },
  {
    title: "AI Text-to-SQL",
    body: "Schema-aware prompts generate production-safe SQL for analysts and operators.",
    icon: Sparkles,
    metric: "NL → SQL",
    className: "md:col-span-1",
  },
  {
    title: "Composable dashboard blocks",
    body: "Build once, reuse everywhere with a block system designed for high signal BI UX.",
    icon: Layers3,
    metric: "Bento UI",
    className: "md:col-span-2",
  },
];

export default function Landing() {
  const { user } = useUser();
  const latestPosts = useMemo(() => getAllPosts().slice(0, 3), []);

  return (
    <div className="dark">
      <main
        className="min-h-screen text-white"
        style={{
          backgroundColor: "#0A0A0A",
          fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_5%,rgba(0,229,153,0.16),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(0,229,153,0.12),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:54px_54px]" />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-24 md:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#00E599" }} />
                {user ? `Welcome back, ${user.firstName || user.username || "Operator"}` : "Kuantra for modern data teams"}
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-white md:text-7xl">
                Zero-Config BI. Sub-100ms Queries.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
                Stop fighting dbt and waiting on slow JVM engines. Kuantra connects directly to your database and delivers instant AI Text-to-SQL dashboards via DuckDB.
              </p>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link to="/install">
                  <Button
                    size="lg"
                    className="h-12 border-0 px-8 font-medium text-black transition-all hover:opacity-95"
                    style={{
                      backgroundColor: "#00E599",
                      boxShadow: "0 0 0 1px rgba(0,229,153,0.35), 0 0 44px rgba(0,229,153,0.38)",
                    }}
                  >
                    Deploy via Docker
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link to="/features" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                  Explore product architecture <ArrowRight className="ml-1 inline h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-14 grid gap-4 md:grid-cols-3"
            >
              {bentoItems.map((item) => (
                <article
                  key={item.title}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/20 ${item.className}`}
                  style={{ backgroundColor: "#171717" }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 0%, rgba(0,229,153,0.15), transparent 45%)" }} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30">
                        <item.icon className="h-5 w-5" style={{ color: "#00E599" }} />
                      </span>
                      <span className="text-xs uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                        {item.metric}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        {latestPosts.length > 0 && (
          <section className="mx-auto w-full max-w-7xl px-6 py-20">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">Engineering Journal</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Latest Insights</h2>
              </div>
              <Link to="/blog" className="text-sm text-white/65 transition-colors hover:text-white">
                Read all posts <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-white/10 p-6 transition-all hover:-translate-y-0.5 hover:border-white/20"
                  style={{ backgroundColor: "#171717" }}
                >
                  <div className="mb-5 flex items-center gap-4 text-xs text-white/45">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.meta.date ? format(new Date(post.meta.date), "MMM d, yyyy") : "Draft"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.meta.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-white transition-colors group-hover:text-[#00E599]">
                    {post.meta.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">{post.meta.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/40 sm:flex-row">
            <div className="flex items-center gap-2">
              <Logo size="sm" showText={false} />
              <span>Kuantra</span>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/pricing" className="transition-colors hover:text-white/75">Pricing</Link>
              <Link to="/blog" className="transition-colors hover:text-white/75">Blog</Link>
              <Link to="/install" className="transition-colors hover:text-white/75">Install</Link>
              <Link to="/features" className="transition-colors hover:text-white/75">Product</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
