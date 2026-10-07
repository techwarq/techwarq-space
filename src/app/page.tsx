"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* DATA                                                                 */
/* ------------------------------------------------------------------ */

interface Cta { label: string; href: string; }

type Media =
  | { kind: "video"; src: string; poster: string }
  | { kind: "reel"; clips: Clip[] }
  | { kind: "term"; cmd: string; out: string; log: string[] };

interface Clip { src: string; poster: string; label: string; }

interface Project {
  id: string;
  name: string;
  meta: string;
  lead: string;
  tag: string;
  desc: string;
  features: string[];
  tech: string[];
  cta: Cta[];
  media: Media;
}

const UGC_CLIPS: Clip[] = [
  {
    src: "/final-ugc-1775016828920-528968ac-aff1-43a2-bc0f-aaa62f8b8ad8 (1).mp4",
    poster: "/ugc/ugc-1.jpg",
    label: "street · summer heat",
  },
  { src: "/ugc-video (5).mp4", poster: "/ugc/ugc-2.jpg", label: "vanity · get ready with me" },
  {
    src: "/final-ugc-1775019503338-e9f3798b-1782-4d2b-9c29-d917b595f73c.mp4",
    poster: "/ugc/ugc-3.jpg",
    label: "desk · snack break",
  },
];

const PROJECTS: Project[] = [
  {
    id: "clep",
    name: "Clep",
    meta: "2026 · clep.abstraklabs.com",
    lead: "Most recently, I started clep: paste your site, describe the video, and get a studio-grade launch video in your brand ↓",
    tag: "launch your product every day",
    desc: "launch videos are slow and expensive, so most teams skip them. clep reads your product, writes the script, and renders motion in your brand. your code already knows what each feature does, so clep starts there.",
    features: [
      "code-aware capture — a claude code skill marks up your ui with data-clep attributes, then scans and renders the flow.",
      "film flow — narrator voices, a script panel, and live render statuses while the film comes together.",
      "motion studio — reels and motion videos rendered through the clep platform api.",
      "videos library — a composer with upload and aspect-ratio control, plus every render in one place.",
      "access keys — key-based access to the platform api, checked against /v1/me.",
    ],
    tech: ["Next.js", "TypeScript", "Cloudflare Workers", "Claude Code skill", "Vercel"],
    cta: [
      { label: "Visit clep.abstraklabs.com", href: "https://clep.abstraklabs.com" },
      { label: "GitHub repo", href: "https://github.com/techwarq/clep-video-automations" },
    ],
    media: { kind: "video", src: "/clep-demo.mp4", poster: "/clep-demo.jpg" },
  },
  {
    id: "ailens",
    name: "ai-lens",
    meta: "2026 · pip install ailens-evals",
    lead: "Every prompt tweak made my video agents better or worse, and I couldn't tell which. So I built ai-lens, evals you add with one decorator ↓",
    tag: "evals for AI apps that make text, images, video or audio",
    desc: "add one decorator, say in plain english what you care about, and ai-lens tells you whether every change made your outputs better or worse, why, and what it costs.",
    features: [
      "one decorator — @lens.trace records inputs, prompt, assets, output, latency, errors, git commit, tokens and cost for every run and step.",
      "any output — text, json, images, video judged from sampled frames, and audio.",
      "plain-english goals — lens track \"are my videos getting better?\" writes the eval plan for you.",
      "verdicts you can trust — same-input comparisons with 95% confidence intervals and side-by-side judging in both orders, so position bias can't decide.",
      "it names the cause — each regression is tied to the commit, model, parameter, prompt or asset that changed, and lens suggest proposes fixes with file and line numbers.",
      "your model, your keys — ships no model and never sees an api key. all judging runs through a function you provide.",
    ],
    tech: ["Python", "PyPI", "LLM-as-judge", "FFmpeg", "Zero dependencies"],
    cta: [
      { label: "pip install ailens-evals", href: "https://pypi.org/project/ailens-evals/" },
      { label: "GitHub repo", href: "https://github.com/techwarq/ai-lens" },
    ],
    media: { kind: "video", src: "/ailens-demo.mp4", poster: "/ailens-demo.jpg" },
  },
  {
    id: "ugc",
    name: "AI UGC Agent",
    meta: "2026 · live on nagent.ai",
    lead: "On nagent.ai, I built an agent that turns a script or a product link into a UGC video. Swipe through what it made ↓",
    tag: "script or product link → high-fidelity UGC video",
    desc: "anyone can drop a script or product link and generate high-fidelity ugc videos from scratch.",
    features: [
      "intelligent ingestion — mistral ocr + gemini flash structure messy text into a json storyline.",
      "keyframe generation — dynamic base-frame rendering for visual continuity.",
      "orchestration — dense context injection to build veo 3.1 video-generation prompts.",
      "async video rendering — concurrent 8-second clip generation with persistent seed tracking.",
      "final stitching — ffmpeg clip merging & voice-over syncing via cloud queues.",
    ],
    tech: ["Mistral OCR", "Gemini Flash", "Veo 3.1", "FFmpeg", "Cloud Queues"],
    cta: [{ label: "See it live", href: "https://nagent.ai/agent-details/ugc" }],
    media: { kind: "reel", clips: UGC_CLIPS },
  },
  {
    id: "edith",
    name: "Edith",
    meta: "2026 · open source",
    lead: "For myself, I built Edith, a personal agent that remembers me and keeps working while I sleep ↓",
    tag: "personal AI agent — memory, voice, autonomous jobs",
    desc: "a personal AI agent that remembers you and acts on its own — chat + voice, google workspace + whatsapp, scheduled autonomous jobs, and a linkedin autopilot that plans, generates, and publishes content.",
    features: [
      "agent loop — openrouter tool-calling with iteration caps, retry/backoff, and context-trim fallbacks.",
      "durable memory — sqlite facts + fts5 history plus qdrant semantic vectors with nightly reflection.",
      "autonomous jobs — temporal cloud schedules for reflections, job search, and deep-research runs.",
      "real integrations — gmail, drive, calendar, whatsapp, health connect, and push notifications.",
      "three clients — android app, electron desktop island, and next.js observability dashboard.",
      "content autopilot — linkedin oauth, media upload, scheduling, and a stats-driven learning loop.",
    ],
    tech: ["Python", "FastAPI", "Qwen / OpenRouter", "Qdrant", "Temporal"],
    cta: [{ label: "GitHub repo", href: "https://github.com/techwarq/Edith" }],
    media: { kind: "video", src: "/edith-demo.mp4", poster: "/edith-demo.jpg" },
  },
];

interface Moment {
  when: string; // "YYYY-MM", or "YYYY" when the month is fuzzy
  stamp?: string; // overrides the month on the stamp, e.g. "mid"
  tag: string;
  warm?: boolean;
  title: string;
  body: string;
  heatmap?: boolean;
}

// In order. Year markers are drawn wherever the year changes.
const TIMELINE: Moment[] = [
  {
    when: "2024-01",
    tag: "first agent",
    title: "Groq, open models, and my first agent",
    body: "Started building with Groq and open-source models. My first real agent: upload your resume, and it drafts and sends emails to recruiters for you.",
  },
  {
    when: "2025-01",
    tag: "career",
    title: "Bengaluru, and my first AI startup",
    body: "Joined a Bengaluru AI agents startup in my fourth year of college. Learned to work with every kind of multimodal LLM, mostly building marketing and creative agents.",
  },
  {
    when: "2025",
    stamp: "later",
    tag: "career",
    title: "The UGC and photoshoot agents",
    body: "That work turned into the AI UGC agent, which makes UGC videos from a script or a product link, and the virtual photoshoot agent, which runs studio-quality shoots without a studio.",
  },
  {
    when: "2026-01",
    tag: "freelance",
    title: "FlowDesk, my wildest build",
    body: "Kept people logged into 10+ e-commerce apps so they could order in bulk during sales, and ran 100+ browsers inside one desktop app at zero hosting cost. Shipped as a .dmg and an .exe, with the whole backend running locally and only the database on Supabase. Plus bulk auto-logout, proxies, and rotating IPs.",
  },
  {
    when: "2026",
    stamp: "mid",
    tag: "side project",
    title: "alloreai.com, with friends",
    body: "A side project with some friends: automated storytelling creatives for D2C brands.",
  },
  {
    when: "2026",
    stamp: "mid",
    tag: "career",
    title: "A fintech MCP for banks",
    body: "As things got rocky at the startup, we built an agentic MCP server that lets banks add an agentic chat. It helps users sort out their personal finances, and it can do the work on its own.",
  },
  {
    when: "2026-07",
    tag: "side project",
    title: "Clep and Edith begin",
    body: "Started Clep for video automation, and Edith, my personal assistant inspired by EDITH from Spider-Man: Far From Home, with a mobile app, a desktop app, and a widget.",
  },
  {
    when: "2026-09",
    tag: "big move",
    warm: true,
    title: "Resigned to build Clep",
    body: "The startup was on the verge of closing, so I resigned to build Clep full time: launch videos, demo videos, and a content machine that makes reels.",
  },
  {
    when: "2026-09",
    tag: "open models",
    title: "My OpenRouter heatmap beats my GitHub one",
    body: "I love open-source and cheap models. They do most of my work, and here's the proof.",
    heatmap: true,
  },
  {
    when: "2026-10",
    tag: "now",
    warm: true,
    title: "Hunting for cool jobs",
    body: "Building Clep and Edith, and looking for a team doing something cool. Say hi ↓",
  },
];

type Glyph =
  | "python" | "node" | "ts" | "workers" | "queues" | "durable" | "vm" | "run"
  | "postgres" | "supabase" | "mongo" | "redis" | "ailens" | "opencode" | "claude" | "eraser";

interface Tool { name: string; note?: string; glyph: Glyph; bg: string; href?: string; }

const STACK: { group: string; tools: Tool[] }[] = [
  {
    group: "languages",
    tools: [
      { name: "Python", glyph: "python", bg: "linear-gradient(160deg, #4b8bc8, #2b5b8a)" },
      { name: "Node.js", glyph: "node", bg: "linear-gradient(160deg, #5fae4f, #2f6f2c)" },
      { name: "TypeScript", glyph: "ts", bg: "linear-gradient(160deg, #4a90da, #1f5fa6)" },
    ],
  },
  {
    group: "cloud",
    tools: [
      { name: "Workers", note: "Cloudflare", glyph: "workers", bg: "linear-gradient(160deg, #fbb04a, #ee6a12)" },
      { name: "Queues", note: "Cloudflare", glyph: "queues", bg: "linear-gradient(160deg, #f9a23c, #e2560f)" },
      { name: "Durable Objects", note: "Cloudflare", glyph: "durable", bg: "linear-gradient(160deg, #f6973a, #d24a0c)" },
      { name: "Compute VM", note: "GCP", glyph: "vm", bg: "linear-gradient(160deg, #6aa5ff, #2563d8)" },
      { name: "Cloud Run", note: "GCP", glyph: "run", bg: "linear-gradient(160deg, #5c9bff, #1b4fc4)" },
    ],
  },
  {
    group: "data",
    tools: [
      { name: "Postgres", glyph: "postgres", bg: "linear-gradient(160deg, #4f7fae, #263f63)" },
      { name: "Supabase", glyph: "supabase", bg: "linear-gradient(160deg, #2b2f2d, #121413)" },
      { name: "MongoDB", glyph: "mongo", bg: "linear-gradient(160deg, #0d3a35, #021a1e)" },
      { name: "Redis", glyph: "redis", bg: "linear-gradient(160deg, #ec5a4b, #b5221a)" },
    ],
  },
  {
    group: "tracing & evals",
    tools: [
      {
        name: "ai-lens",
        note: "my own SDK",
        glyph: "ailens",
        bg: "linear-gradient(160deg, #4f6bff, #1b2470)",
        href: "https://www.npmjs.com/package/@techwarq/ailens",
      },
    ],
  },
  {
    group: "coding agents",
    tools: [
      { name: "OpenCode", note: "Muse Spark 1.3 · free", glyph: "opencode", bg: "linear-gradient(160deg, #34343a, #0d0d10)" },
      { name: "Claude Code", glyph: "claude", bg: "linear-gradient(160deg, #e48a6a, #c8613f)" },
    ],
  },
  {
    group: "design",
    tools: [{ name: "Eraser", note: "eraser.io", glyph: "eraser", bg: "linear-gradient(160deg, #fbfbfd, #e4e6ee)" }],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const NAV = [
  { id: "work", label: "work" },
  { id: "timeline", label: "timeline" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];

/* ------------------------------------------------------------------ */
/* HOOKS                                                                */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const safety = setTimeout(() => els.forEach((el) => el.classList.add("in")), 2400);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let cur: string | null = null;
      let best = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= mid && top > best) {
          best = top;
          cur = id;
        }
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return active;
}

/* ------------------------------------------------------------------ */
/* GITHUB ACTIVITY                                                      */
/* ------------------------------------------------------------------ */

interface GHEvent { repo: string; message: string; ago: string; repoUrl: string; }

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function useGitHubActivity(username: string) {
  const [events, setEvents] = useState<GHEvent[]>([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public?per_page=50`)
      .then((r) => r.json())
      .then((data: unknown[]) => {
        const list: GHEvent[] = [];
        for (const e of data as Record<string, unknown>[]) {
          if (e.type !== "PushEvent") continue;
          const commits = (e.payload as Record<string, unknown>).commits as Record<string, string>[];
          if (!commits?.length) continue;
          const repoName = (e.repo as Record<string, string>).name;
          list.push({
            repo: repoName.replace(`${username}/`, ""),
            message: commits[commits.length - 1].message?.split("\n")[0] ?? "",
            ago: timeAgo(new Date(e.created_at as string)),
            repoUrl: `https://github.com/${repoName}`,
          });
          if (list.length === 3) break;
        }
        setEvents(list);
      })
      .catch(() => {});
  }, [username]);
  return events;
}

function ActivityFeed() {
  const events = useGitHubActivity("techwarq");
  if (events.length === 0) return null;
  return (
    <div className="activity">
      <span className="activity-hd">
        <i className="live-dot" /> recently shipped, live from github
      </span>
      {events.map((e, i) => (
        <a key={i} href={e.repoUrl} target="_blank" rel="noreferrer" className="activity-row">
          <b>{e.repo}</b>
          <span>{e.message}</span>
          <em>{e.ago}</em>
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MEDIA                                                                */
/* ------------------------------------------------------------------ */

function AutoVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none" />
  );
}

function Coverflow({ clips }: { clips: Clip[] }) {
  const [idx, setIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const [sound, setSound] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const dragX = useRef<number | null>(null);
  const n = clips.length;

  const go = useCallback((d: number) => setIdx((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    vids.current.forEach((v, k) => {
      if (!v) return;
      v.muted = k !== idx || !sound;
      if (k === idx && inView) v.play().catch(() => {});
      else v.pause();
    });
  }, [idx, inView, sound]);

  return (
    <div
      className="cf"
      ref={wrap}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="UGC videos made by the agent"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div
        className="cf-stage"
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        {clips.map((c, k) => {
          let off = k - idx;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          return (
            <figure
              key={c.src}
              className={"cf-card" + (off === 0 ? " on" : "")}
              style={{ "--o": off, "--a": Math.abs(off) } as React.CSSProperties}
              onClick={() => off !== 0 && setIdx(k)}
              aria-hidden={off !== 0}
            >
              <video
                ref={(el) => {
                  vids.current[k] = el;
                }}
                src={c.src}
                poster={c.poster}
                muted
                loop
                playsInline
                preload="none"
              />
              <figcaption>{c.label}</figcaption>
            </figure>
          );
        })}
      </div>
      <div className="cf-ctrl">
        <button className="cf-arrow" onClick={() => go(-1)} aria-label="Previous video">
          ←
        </button>
        <div className="cf-ticks">
          {clips.map((c, k) => (
            <button
              key={c.src}
              className={k === idx ? "on" : ""}
              onClick={() => setIdx(k)}
              aria-label={`Video ${k + 1}`}
            />
          ))}
        </div>
        <button className="cf-arrow" onClick={() => go(1)} aria-label="Next video">
          →
        </button>
        <button className="cf-sound" onClick={() => setSound((s) => !s)} aria-pressed={sound}>
          {sound ? "sound on" : "sound off"}
        </button>
      </div>
    </div>
  );
}

function TermCard({ m }: { m: Extract<Media, { kind: "term" }> }) {
  return (
    <div className="term">
      <div className="term-bar">
        <i /> <i /> <i />
        <span>~/edith</span>
      </div>
      <div className="term-body">
        <div className="t-cmd">$ {m.cmd}</div>
        <div className="t-out">{m.out}</div>
        {m.log.map((l) => (
          <div key={l} className="t-log">
            [ok] {l}
          </div>
        ))}
        <span className="cursor">█</span>
      </div>
    </div>
  );
}

function AppGlyph({ g }: { g: Glyph }) {
  const w = "#fff";
  const st = { fill: "none", stroke: w, strokeWidth: 3.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (g) {
    case "python":
      return (
        <>
          <path d="M23 9h-5a7 7 0 00-7 7v5h13v2H11a6 6 0 00-6 6v1a7 7 0 007 7h3v-6a6 6 0 016-6h8a5 5 0 005-5v-4a7 7 0 00-7-7z" fill={w} />
          <path d="M25 39h5a7 7 0 007-7v-5H24v-2h13a6 6 0 006-6v-1a7 7 0 00-7-7h-3v6a6 6 0 01-6 6h-8a5 5 0 00-5 5v4a7 7 0 007 7z" fill="#ffd94a" />
          <circle cx="17.5" cy="14.5" r="1.8" fill="#2b5b8a" />
          <circle cx="30.5" cy="33.5" r="1.8" fill="#2b5b8a" />
        </>
      );
    case "node":
      return (
        <>
          <path d="M24 7l14.7 8.5v17L24 41 9.3 32.5v-17z" {...st} />
          <path d="M24 17v14M18 21v6M30 21v6" {...st} strokeWidth={3} />
        </>
      );
    case "ts":
      return (
        <text x="39" y="38" textAnchor="end" fill={w} fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="20" letterSpacing="-1">
          TS
        </text>
      );
    case "workers":
      return <path d="M15 34a8 8 0 01-1-15.9A11 11 0 0135 16a9 9 0 01-1 18z" fill={w} />;
    case "queues":
      return (
        <>
          <rect x="9" y="11" width="22" height="6" rx="3" fill={w} />
          <rect x="9" y="21" width="22" height="6" rx="3" fill={w} opacity=".85" />
          <rect x="9" y="31" width="22" height="6" rx="3" fill={w} opacity=".7" />
          <path d="M36 14v20m0 0l-4-4m4 4l4-4" {...st} strokeWidth={3} />
        </>
      );
    case "durable":
      return (
        <>
          <path d="M24 8l14 8v16l-14 8-14-8V16z" fill={w} opacity=".25" />
          <path d="M24 8l14 8v16l-14 8-14-8V16zM24 24l14-8M24 24L10 16M24 24v16" {...st} strokeWidth={3} />
        </>
      );
    case "vm":
      return (
        <>
          <rect x="9" y="10" width="30" height="12" rx="3.5" fill={w} />
          <rect x="9" y="26" width="30" height="12" rx="3.5" fill={w} opacity=".85" />
          <circle cx="15" cy="16" r="1.8" fill="#2563d8" />
          <circle cx="15" cy="32" r="1.8" fill="#2563d8" />
          <path d="M22 16h11M22 32h11" stroke="#2563d8" strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
    case "run":
      return (
        <>
          <path d="M12 12l12 12-12 12" {...st} strokeWidth={4.4} />
          <path d="M25 12l12 12-12 12" {...st} strokeWidth={4.4} opacity=".75" />
        </>
      );
    case "postgres":
      return (
        <text x="24" y="33" textAnchor="middle" fill={w} fontFamily="Fraunces, Georgia, serif" fontWeight="500" fontSize="22" fontStyle="italic">
          Pg
        </text>
      );
    case "supabase":
      return <path d="M26 6L11 27h12l-1 15 15-21H25z" fill="#3ecf8e" />;
    case "mongo":
      return (
        <>
          <path d="M24 6c6 7 10 13 10 20 0 7-4.5 11-10 13-5.5-2-10-6-10-13 0-7 4-13 10-20z" fill="#00ed64" />
          <path d="M24 12v31" stroke="#c9f7d6" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "redis":
      return (
        <>
          <path d="M24 30l15-5v5l-15 5-15-5v-5z" fill={w} opacity=".7" />
          <path d="M24 23l15-5v5l-15 5-15-5v-5z" fill={w} opacity=".85" />
          <path d="M24 11l15 5-15 5-15-5z" fill={w} />
        </>
      );
    case "ailens":
      return (
        <>
          <circle cx="21" cy="21" r="11" fill={w} opacity=".18" />
          <circle cx="21" cy="21" r="11" {...st} />
          <path d="M29 29l9 9" {...st} strokeWidth={4.4} />
          <path d="M21 14l1.8 4.6L27 20l-4.2 1.6L21 26l-1.8-4.4L15 20l4.2-1.4z" fill={w} />
        </>
      );
    case "opencode":
      return (
        <>
          <path d="M12 16l8 8-8 8" {...st} />
          <path d="M24 33h12" {...st} />
        </>
      );
    case "claude":
      return (
        <g stroke={w} strokeWidth="3.4" strokeLinecap="round">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6 + 0.2;
            const r1 = 4;
            const r2 = i % 2 ? 13 : 16;
            return (
              <line
                key={i}
                x1={24 + r1 * Math.cos(a)}
                y1={24 + r1 * Math.sin(a)}
                x2={24 + r2 * Math.cos(a)}
                y2={24 + r2 * Math.sin(a)}
              />
            );
          })}
        </g>
      );
    case "eraser":
      return (
        <>
          <path d="M21 36l-8-8 16-16 10 10-14 14z" fill="#f2486a" />
          <path d="M21 36l-8-8 7-7 10 10-7 5z" fill="#ffc2cf" />
          <path d="M14 38h22" stroke="#9aa0b4" strokeWidth="2.6" strokeLinecap="round" />
        </>
      );
  }
}

function AppIcon({ t }: { t: Tool }) {
  const body = (
    <>
      <span className="app" style={{ background: t.bg }} aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <AppGlyph g={t.glyph} />
        </svg>
      </span>
      <span className="app-name">{t.name}</span>
      {t.note && <span className="app-note">{t.note}</span>}
    </>
  );
  return t.href ? (
    <a className="tool" href={t.href} target="_blank" rel="noreferrer">
      {body}
    </a>
  ) : (
    <div className="tool">{body}</div>
  );
}

function ProjectMedia({ p }: { p: Project }) {
  const m = p.media;
  if (m.kind === "reel") return <Coverflow clips={m.clips} />;
  if (m.kind === "term") return <TermCard m={m} />;
  return <AutoVideo className="media-vid" src={m.src} poster={m.poster} />;
}

// My OpenRouter activity, Aug → Sep 2026, transcribed from the dashboard (0 = none … 3 = most).
const OPENROUTER_WEEKS = [
  "002121110232",
  "101111111133",
  "00121112133.",
  "03111211113.",
  "011111110110",
  "01111131.010",
  "011112033.0.",
];

function Heatmap() {
  return (
    <figure className="card-img heat" aria-label="My OpenRouter activity heatmap, busiest in late August and September">
      <figcaption>
        <span>Aug</span>
        <span>Sep</span>
      </figcaption>
      <div className="heat-grid">
        {OPENROUTER_WEEKS.flatMap((row, r) =>
          row.split("").map((c, i) => <i key={`${r}-${i}`} className={c === "." ? "x" : "l" + c} />)
        )}
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* ICONS                                                                */
/* ------------------------------------------------------------------ */

const ico = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IcoCode() {
  return (
    <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
      <path {...ico} d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
    </svg>
  );
}
function IcoSpark() {
  return (
    <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
      <path {...ico} d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
    </svg>
  );
}
function IcoPlus() {
  return (
    <svg viewBox="0 0 24 24" className="ico-plus" aria-hidden="true">
      <circle {...ico} strokeWidth={1.5} cx="12" cy="12" r="10" />
      <path {...ico} strokeWidth={1.5} d="M12 8v8M8 12h8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* CASE STUDY PANEL                                                     */
/* ------------------------------------------------------------------ */

function DetailPanel({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = p ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [p]);

  return (
    <div className={"panel-wrap" + (p ? " open" : "")} data-clep-state={p ? "open" : "closed"}>
      <div className="panel-scrim" onClick={onClose} />
      <aside className="panel" role="dialog" aria-label={p?.name ?? ""}>
        {p && (
          <div className="panel-inner">
            <div className="panel-top">
              <span className="mono">{p.meta}</span>
              <button className="pill" onClick={onClose}>
                close ✕
              </button>
            </div>
            <h2 className="panel-name">{p.name}</h2>
            <p className="panel-tag">{p.tag}</p>
            <p className="panel-desc">{p.desc}</p>
            <ol className="feat-list">
              {p.features.map((f, i) => {
                const dash = f.indexOf(" — ");
                return (
                  <li key={i}>
                    <span className="feat-n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{dash !== -1 ? f.slice(0, dash) : f}</strong>
                      {dash !== -1 && <span className="feat-rest"> — {f.slice(dash + 3)}</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mono panel-label">stack</div>
            <div className="chips">
              {p.tech.map((t) => (
                <span key={t} className="pill pill-sm">
                  {t}
                </span>
              ))}
            </div>
            <div className="panel-cta">
              {p.cta.map((c) => (
                <a key={c.href} className="btn-blue" href={c.href} target="_blank" rel="noreferrer">
                  {c.label} <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FEEDBACK POPUP                                                       */
/* ------------------------------------------------------------------ */

const FEEDBACK_ENDPOINT = "https://allore-be.sonalinayak0804.workers.dev/feedback";

function FeedbackPopup({ onClose }: { onClose: () => void }) {
  const [msg, setMsg] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    try {
      await fetch(FEEDBACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message: msg, contact, at: new Date().toISOString() }),
      });
    } catch {}
    setSent(true);
  }

  return (
    <div className="fb-wrap">
      <div className="fb-card" role="dialog" aria-label="Work with me">
        <span className="fb-tape" aria-hidden="true" />
        <button className="fb-x" onClick={onClose} aria-label="Close">
          ✕
        </button>
        {!sent ? (
          <form onSubmit={submit}>
            <div className="mono">hire me · $15/hr</div>
            <h3 className="fb-title">tell me what needs shipping.</h3>
            <p className="fb-copy">
              One honest paragraph beats a perfect brief. What&apos;s the backlog, the deadline, and what
              does &quot;done&quot; look like? I reply within 24h.
            </p>
            <textarea
              ref={ref}
              className="fb-input"
              rows={3}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="we need … by … — done looks like …"
            />
            <input
              className="fb-input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="email / @handle (so I can reply)"
            />
            <div className="fb-actions">
              <button type="button" className="fb-skip" onClick={onClose}>
                nah, just browsing
              </button>
              <button type="submit" className="btn-blue">
                send it <span>→</span>
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mono">received</div>
            <h3 className="fb-title">you&apos;re a real one.</h3>
            <p className="fb-copy">Genuinely, thank you. I&apos;ll get back within 24 hours.</p>
            <div className="fb-actions">
              <span />
              <button className="btn-blue" onClick={onClose}>
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                 */
/* ------------------------------------------------------------------ */

const NAV_IDS = NAV.map((n) => n.id);

export default function Home() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [fb, setFb] = useState(false);
  const active = useActiveSection(NAV_IDS);
  useReveal();

  const closeFb = useCallback(() => {
    try {
      localStorage.setItem("sn_fb_seen", "1");
    } catch {}
    setFb(false);
  }, []);
  const closePanel = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    try {
      if (localStorage.getItem("sn_fb_seen")) return;
    } catch {}
    const id = setTimeout(() => {
      try {
        if (!localStorage.getItem("sn_fb_seen")) setFb(true);
      } catch {}
    }, 20000);
    return () => clearTimeout(id);
  }, []);

  const openProject = PROJECTS.find((p) => p.id === openId) ?? null;
  const moments = TIMELINE;
  const activeIdx = NAV.findIndex((n) => n.id === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Inter:wght@400;500;600&family=Caveat:wght@500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }

        :root {
          --paper:   #f3eee4;
          --paper-2: #e8e0cf;
          --card:    #fbf8f1;
          --ink:     #1b1916;
          --muted:   rgba(27,25,22,0.68);
          --muted-2: rgba(27,25,22,0.46);
          --line:    rgba(27,25,22,0.14);
          --line-2:  rgba(27,25,22,0.32);
          --blue:    #2a35f5;
          --blue-2:  #1c25c9;
          --hl:      #ffe75a;
          --kraft:   #e6d1a1;
          --kraft-2: #d9c08a;
          --red:     #c4473a;
          --serif: "Fraunces", Georgia, "Times New Roman", serif;
          --sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          --hand: "Caveat", "Bradley Hand", cursive;
          --gut: clamp(16px, 4vw, 48px);
        }

        html, body {
          background-color: var(--paper);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.3 0 0 0 0 0.22 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          font-family: var(--sans);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
          overflow-x: clip;
          min-height: 100vh;
        }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
        ::selection { background: var(--hl); color: var(--ink); }
        img, video { display: block; max-width: 100%; }
        section[id] { scroll-margin-top: 80px; }
        :focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }

        .mono { font-family: var(--sans); font-size: 11.5px; letter-spacing: 0.01em; color: var(--muted-2); }
        .wrap { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 var(--gut); }

        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          border: 1px solid var(--ink); border-radius: 999px; padding: 6px 16px;
          font-family: var(--sans); font-size: 12px; color: var(--ink); background: transparent;
          transition: background .2s, color .2s;
        }
        .pill:hover { background: var(--ink); color: var(--paper); }
        .pill-sm { font-size: 11px; padding: 3px 11px; border-color: var(--line-2); color: var(--muted); }
        .pill-sm:hover { background: transparent; color: var(--muted); }
        .btn-blue {
          display: inline-flex; align-items: center; justify-content: space-between; gap: 24px;
          background: var(--blue); color: #fff; border-radius: 999px; padding: 10px 14px 10px 20px;
          font-family: var(--sans); font-size: 12px; min-width: 190px;
          transition: background .2s, transform .2s;
        }
        .btn-blue:hover { background: var(--blue-2); transform: translateY(-1px); }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
          padding: 14px var(--gut);
          background: linear-gradient(var(--paper) 40%, rgba(243,238,228,0));
        }
        .nav-mark { font-size: 12px; color: var(--ink); }
        .seg {
          position: relative; display: grid; grid-template-columns: repeat(4, 1fr);
          background: rgba(27,25,22,0.07); border-radius: 999px; padding: 4px;
        }
        .seg-thumb {
          position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / 4);
          background: var(--card); border-radius: 999px; box-shadow: 0 2px 8px rgba(27,25,22,0.12);
          transform: translateX(calc(var(--k) * 100%)); transition: transform .45s cubic-bezier(.3,.8,.2,1), opacity .3s;
        }
        .seg a { position: relative; z-index: 1; text-align: center; padding: 6px clamp(10px,2vw,22px); font-size: 13px; color: var(--muted); transition: color .3s; }
        .seg a.on { color: var(--ink); }
        .nav-hire { justify-self: end; }
        .nav-mid { display: flex; align-items: center; gap: 10px; }
        .chip-in.nav-bubble { font-size: 13px; padding: 9px 16px 10px; line-height: 1.25; color: var(--ink); vertical-align: 0; }
        .nav-bubble span { color: var(--muted-2); font-size: 11px; }

        /* HERO */
        .hero { padding: 104px 0 0; }
        .hero-name {
          font-family: var(--serif); font-weight: 300; font-size: clamp(64px, 14.2vw, 220px);
          line-height: 0.9; letter-spacing: -0.045em; white-space: nowrap; position: relative;
          font-variation-settings: "opsz" 144;
        }
        .hero-name sup {
          position: absolute; right: 0; top: -0.2em; font-family: var(--sans); font-size: 13px;
          letter-spacing: 0; font-weight: 400; color: var(--muted);
        }
        .hero-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(20px, 4vw, 56px); margin-top: clamp(28px, 5vw, 56px); }
        .hero-photo { margin: 0; }
        .hero-photo .frame { border-radius: 26px; overflow: hidden; box-shadow: 0 30px 60px -36px rgba(27,25,22,0.55); aspect-ratio: 4/5; }
        .hero-photo img { width: 100%; height: 100%; object-fit: cover; }
        .hero-photo figcaption { margin-top: 10px; }
        .hero-say { font-family: var(--serif); font-weight: 300; font-size: clamp(26px, 3.3vw, 44px); line-height: 1.22; letter-spacing: -0.015em; }
        .chip-in {
          position: relative; isolation: isolate; overflow: hidden;
          display: inline-flex; align-items: center; gap: 0.25em; vertical-align: 0.08em;
          border-radius: 999px; padding: 0.04em 0.55em 0.1em;
          font-size: 0.78em; line-height: 1.25; white-space: nowrap;
          background:
            radial-gradient(120% 90% at 18% 120%, rgba(120,150,255,0.28), transparent 60%),
            radial-gradient(90% 80% at 92% 110%, rgba(255,214,120,0.30), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(240,236,228,0.35) 55%, rgba(255,255,255,0.6) 100%);
          -webkit-backdrop-filter: blur(16px) saturate(200%) brightness(1.06); backdrop-filter: blur(16px) saturate(200%) brightness(1.06);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            inset 0 -8px 12px -8px rgba(255,255,255,0.95),
            inset 0 0 0 0.5px rgba(255,255,255,0.6),
            inset 0 -2px 3px rgba(27,25,22,0.08),
            0 0 0 0.5px rgba(27,25,22,0.16),
            0 8px 20px -8px rgba(27,25,22,0.3),
            0 2px 3px rgba(27,25,22,0.08);
          transition: transform .35s cubic-bezier(.3,.8,.2,1), box-shadow .35s;
        }
        /* glossy top lens */
        .chip-in::before {
          content: ""; position: absolute; left: 4%; right: 4%; top: 2px; height: 48%; z-index: -1;
          border-radius: 999px 999px 60% 60% / 999px 999px 40% 40%;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.15) 100%);
          pointer-events: none;
        }
        /* light sweep */
        .chip-in::after {
          content: ""; position: absolute; top: -20%; bottom: -20%; left: -40%; width: 28%; z-index: 1;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.85), transparent);
          transform: skewX(-18deg) translateX(0); pointer-events: none;
          animation: gloss 5.5s cubic-bezier(.4,0,.2,1) infinite;
        }
        .chip-in + .chip-in::after, .hero-say .chip-in:nth-of-type(2)::after { animation-delay: .6s; }
        @keyframes gloss { 0%, 62% { left: -40%; } 100% { left: 130%; } }
        .chip-in:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            inset 0 1.5px 0 #fff,
            inset 0 -8px 12px -8px #fff,
            inset 0 0 0 0.5px rgba(255,255,255,0.7),
            inset 0 -2px 3px rgba(27,25,22,0.08),
            0 0 0 0.5px rgba(27,25,22,0.18),
            0 14px 28px -10px rgba(27,25,22,0.35),
            0 2px 3px rgba(27,25,22,0.08);
        }
        @media (prefers-reduced-motion: reduce) { .chip-in::after { animation: none; display: none; } }
        .ico { width: 0.8em; height: 0.8em; }
        .hl {
          font-style: italic; padding: 0 0.12em;
          background: linear-gradient(104deg, transparent 2%, var(--hl) 4%, var(--hl) 96%, transparent 98%) 0 72% / 100% 62% no-repeat;
        }
        .hero-about { margin-top: clamp(40px, 6vw, 72px); max-width: 52ch; font-size: 14.5px; }
        .hero-about p + p { margin-top: 14px; color: var(--muted); font-size: 13px; }
        .hero-about .hl { font-style: normal; }
        .tech { border: 1px solid var(--line-2); border-radius: 999px; padding: 0 7px; white-space: nowrap; }
        .hero-cta { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
        .pill-lg { padding: 9px 18px; }

        .activity { margin-top: 34px; display: grid; gap: 2px; max-width: 60ch; }
        .activity-hd { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted-2); margin-bottom: 6px; }
        .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #2e9e5b; animation: pulse 1.8s ease-in-out infinite; }
        @keyframes pulse { 50% { opacity: .35; } }
        .activity-row { display: grid; grid-template-columns: 9ch minmax(0,1fr) auto; gap: 12px; font-size: 12px; padding: 7px 0; border-top: 1px dashed var(--line); }
        .activity-row b { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .activity-row span { color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .activity-row em { font-style: normal; color: var(--muted-2); }
        .activity-row:hover b { color: var(--blue); }

        /* SECTIONS — label column + content column */
        .sec { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(20px, 4vw, 56px); padding: clamp(80px, 14vh, 150px) 0 0; }
        .sec-label { font-size: 12px; text-decoration: underline; text-underline-offset: 4px; padding-top: 10px; }
        .sec-intro { font-family: var(--serif); font-weight: 300; font-size: clamp(24px, 2.6vw, 34px); line-height: 1.25; letter-spacing: -0.01em; }
        .sec-sub { margin-top: 18px; font-size: 13px; color: var(--muted); max-width: 52ch; }

        /* WORK */
        .proj { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(20px, 4vw, 56px); margin-top: clamp(56px, 9vh, 96px); align-items: start; scroll-margin-top: 90px; }
        .proj-side { position: sticky; top: 96px; padding-top: 0; }
        .work-index { list-style: none; margin-top: 22px; display: grid; gap: 2px; }
        .work-index a { display: flex; gap: 12px; font-family: var(--serif); font-size: 19px; color: var(--muted); padding: 3px 0; transition: color .2s, transform .2s; }
        .work-index a span { font-family: var(--sans); font-size: 11px; color: var(--muted-2); padding-top: 7px; }
        .work-index a:hover { color: var(--ink); transform: translateX(4px); }
        .proj-lead { font-size: 13px; color: var(--muted); max-width: 54ch; margin-bottom: 16px; }
        .proj-head { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; padding-bottom: 6px; }
        .proj-name { font-family: var(--serif); font-weight: 400; font-size: clamp(22px, 2.2vw, 28px); letter-spacing: -0.01em; }
        .proj-open { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted); white-space: nowrap; }
        .proj-open:hover { color: var(--blue); }
        .ico-plus { width: 22px; height: 22px; transition: transform .3s; }
        .proj-open:hover .ico-plus { transform: rotate(90deg); }
        .proj-tag { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: 16px; color: var(--muted); }
        .media-card {
          border-radius: 22px; overflow: hidden; background: var(--ink);
          border: 6px solid var(--card); box-shadow: 0 0 0 1px var(--line), 0 40px 70px -40px rgba(27,25,22,0.6);
          cursor: pointer;
        }
        .media-card.bare { background: transparent; border: none; box-shadow: none; cursor: default; overflow: visible; }
        .media-vid { width: 100%; aspect-ratio: 16/9; object-fit: cover; }

        .term { font-size: 12.5px; color: #e9e4d8; }
        .term-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: #2a2723; color: rgba(233,228,216,0.5); font-size: 11px; }
        .term-bar i { width: 9px; height: 9px; border-radius: 50%; background: rgba(233,228,216,0.25); }
        .term-bar span { margin-left: auto; margin-right: auto; }
        .term-body { padding: 20px 22px; aspect-ratio: 16/8; line-height: 2; }
        .t-cmd { color: #fff; } .t-out { color: var(--hl); } .t-log { color: rgba(233,228,216,0.55); }
        .cursor { animation: blink 1s steps(2) infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        /* COVERFLOW */
        .cf { --cw: clamp(150px, 19vw, 230px); outline: none; user-select: none; }
        .cf-stage { position: relative; height: calc(var(--cw) * 16 / 9); perspective: 1200px; touch-action: pan-y; }
        .cf-card {
          position: absolute; left: 50%; top: 0; width: var(--cw); aspect-ratio: 9/16; margin: 0;
          border-radius: 20px; overflow: hidden; background: var(--ink); cursor: pointer;
          border: 5px solid var(--card); box-shadow: 0 0 0 1px var(--line), 0 30px 50px -30px rgba(27,25,22,0.7);
          transform: translateX(-50%) translateX(calc(var(--o) * 78%)) translateZ(calc(var(--a) * -160px)) rotateY(calc(var(--o) * -32deg));
          z-index: calc(10 - var(--a));
          filter: brightness(calc(1 - var(--a) * 0.12));
          transition: transform .6s cubic-bezier(.3,.8,.2,1), filter .6s;
        }
        .cf-card.on { cursor: default; }
        .cf-card video { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
        .cf-card figcaption {
          position: absolute; left: 10px; bottom: 10px; font-size: 10.5px; color: #fff;
          background: rgba(27,25,22,0.45); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
          padding: 3px 10px; border-radius: 999px; opacity: 0; transition: opacity .4s;
        }
        .cf-card.on figcaption { opacity: 1; }
        .cf-ctrl { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 22px; }
        .cf-arrow { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line-2); font-size: 13px; }
        .cf-arrow:hover { border-color: var(--ink); }
        .cf-ticks { display: flex; align-items: flex-end; gap: 7px; height: 22px; }
        .cf-ticks button { width: 2px; height: 11px; background: var(--line-2); border-radius: 1px; transition: height .3s, background .3s; padding: 0; }
        .cf-ticks button.on { height: 22px; background: var(--ink); }
        .cf-ticks button::after { content: ""; display: block; margin: -6px -8px; height: 34px; }
        .cf-sound { font-size: 11px; color: var(--muted); border: 1px solid var(--line-2); border-radius: 999px; padding: 4px 11px; }
        .cf-sound[aria-pressed="true"] { background: var(--ink); color: var(--paper); border-color: var(--ink); }

        /* STACK — dock-style app icons */
        .stack { margin-top: clamp(40px, 7vh, 64px); display: grid; gap: 8px; }
        .stack-row { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(20px, 4vw, 56px); align-items: center; padding: 18px 0; border-top: 1px dashed var(--line); }
        .stack-row > span { font-size: 12px; color: var(--muted-2); }
        .tools { display: flex; flex-wrap: wrap; gap: 22px 18px; }
        .tool { width: 92px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 3px; }
        .app {
          position: relative; width: 72px; aspect-ratio: 1; border-radius: 23%; display: grid; place-items: center; overflow: hidden;
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.55),
            inset 0 -4px 8px rgba(0,0,0,0.22),
            0 0 0 1.5px rgba(27,25,22,0.55),
            0 12px 20px -10px rgba(27,25,22,0.55),
            0 2px 4px rgba(27,25,22,0.18);
          transition: transform .35s cubic-bezier(.3,.8,.2,1);
          margin-bottom: 8px;
        }
        .app::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background:
            radial-gradient(120% 70% at 30% 0%, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%),
            linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 50%, rgba(0,0,0,0.12));
        }
        .app svg { position: relative; width: 64%; height: 64%; filter: drop-shadow(0 2px 2.5px rgba(0,0,0,0.3)); }
        .tool:hover .app { transform: translateY(-6px) scale(1.08); }
        .app-name { font-size: 11.5px; color: var(--ink); line-height: 1.3; }
        .app-note { font-size: 10px; color: var(--muted-2); line-height: 1.3; }
        a.tool:hover .app-name { color: var(--blue); }
        .scale {
          margin-top: clamp(28px, 5vh, 44px); display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 8px 28px; align-items: center;
          padding: clamp(20px, 3vw, 30px) clamp(22px, 3.4vw, 36px); border-radius: 26px;
          background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35));
          -webkit-backdrop-filter: blur(16px) saturate(180%); backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: inset 0 1.5px 0 #fff, 0 0 0 0.5px rgba(27,25,22,0.14), 0 24px 44px -28px rgba(27,25,22,0.45);
        }
        .scale b { font-family: var(--serif); font-weight: 300; font-size: clamp(44px, 6vw, 76px); line-height: 1; letter-spacing: -0.04em; }
        .scale b small { font-size: 0.42em; letter-spacing: -0.01em; color: var(--muted); }
        .scale p { font-size: 13px; color: var(--muted); max-width: 46ch; }
        .scale p strong { color: var(--ink); font-weight: 500; }

        /* TIMELINE — postcards pinned along a thread */
        .tl { position: relative; margin-top: clamp(48px, 8vh, 80px); padding-bottom: 20px; }
        .tl::before {
          content: ""; position: absolute; left: 50%; top: 0; bottom: 0; width: 0;
          border-left: 2px dashed var(--line-2);
        }
        .tl-yr {
          position: relative; z-index: 1; width: max-content; margin: 0 auto 26px;
          font-family: var(--serif); font-weight: 300; font-size: 22px; background: var(--paper); padding: 4px 16px;
          border: 1px solid var(--ink); border-radius: 999px;
        }
        .tl-item { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; margin-bottom: 30px; }
        .tl-item::after {
          content: ""; position: absolute; left: 50%; top: 34px; width: 13px; height: 13px; margin-left: -6px;
          border-radius: 50%; background: var(--red); box-shadow: inset -2px -2px 0 rgba(0,0,0,0.18), 0 2px 3px rgba(0,0,0,0.25);
        }
        .card {
          position: relative; background: var(--card); padding: 22px 22px 20px;
          border-radius: 3px; box-shadow: 0 1px 0 var(--line), 0 18px 34px -24px rgba(27,25,22,0.55);
          transform: rotate(var(--r, -1deg)); transition: transform .4s cubic-bezier(.3,.8,.2,1);
          display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 16px; align-items: start;
        }
        .card:hover { transform: rotate(0deg) translateY(-3px); }
        .tl-item.l .card { grid-column: 1; --r: -1.2deg; }
        .tl-item.r .card { grid-column: 2; --r: 1.1deg; }
        .card::before {
          content: ""; position: absolute; top: -11px; left: 50%; width: 92px; height: 24px; margin-left: -46px;
          background: rgba(233,215,160,0.72); transform: rotate(-3deg);
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }
        .tl-item.r .card::before { transform: rotate(4deg); background: rgba(190,206,228,0.75); }
        .card h3 { font-family: var(--serif); font-weight: 400; font-size: 22px; line-height: 1.15; letter-spacing: -0.01em; }
        .card p { font-size: 12.5px; color: var(--muted); margin-top: 8px; }
        .card .kind { display: inline-block; margin-top: 12px; font-size: 10.5px; color: var(--muted-2); border: 1px solid var(--line-2); border-radius: 999px; padding: 1px 9px; }
        .card.life { background: #fff8e8; }
        .card-img { margin: 14px 0 2px; border-radius: 10px; overflow: hidden; background: #0b0d10; border: 4px solid #fff; box-shadow: 0 10px 22px -14px rgba(0,0,0,0.6); transform: rotate(-1deg); }
        .heat { padding: 10px 12px 12px; }
        .heat figcaption { position: relative; height: 14px; font-size: 10px; color: rgba(255,255,255,0.55); margin-bottom: 6px; }
        .heat figcaption span { position: absolute; top: 0; }
        .heat figcaption span:first-child { left: 50%; }
        .heat figcaption span:last-child { left: 82%; }
        .heat-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 4px; }
        .heat-grid i { aspect-ratio: 1; border-radius: 4px; background: #15181d; }
        .heat-grid i.l1 { background: #13213a; }
        .heat-grid i.l2 { background: #1e3a68; }
        .heat-grid i.l3 { background: #3d8bfd; box-shadow: 0 0 10px rgba(61,139,253,0.45); }
        .heat-grid i.x { background: transparent; }
        .stamp {
          width: 66px; padding: 6px;
          background: radial-gradient(circle, transparent 3px, var(--card) 3.5px) -5px -5px / 10px 10px;
          filter: drop-shadow(0 1px 1.5px rgba(0,0,0,0.25)); transform: rotate(3deg);
        }
        .stamp-in { background: var(--blue); color: #fff; text-align: center; padding: 8px 0 7px; }
        .tl-item.c1 .stamp-in { background: var(--red); }
        .tl-item.c2 .stamp-in { background: #2f6b4f; }
        .stamp-in b { display: block; font-family: var(--serif); font-weight: 400; font-size: 22px; line-height: 1; }
        .stamp-in span { font-size: 9.5px; letter-spacing: 0.14em; opacity: 0.85; }

        /* CONTACT — scrapbook folder */
        .contact { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: clamp(24px, 4vw, 56px); align-items: center; padding-top: clamp(90px, 16vh, 170px); }
        .contact h2 { font-family: var(--serif); font-weight: 300; font-size: clamp(52px, 7vw, 96px); line-height: 0.95; letter-spacing: -0.04em; }
        .contact-copy { margin-top: 20px; font-size: 13.5px; color: var(--muted); max-width: 46ch; }
        .contact-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }

        .scrap { position: relative; width: 100%; max-width: 560px; aspect-ratio: 1 / 0.86; container-type: inline-size; }
        .scrap > * { position: absolute; }
        .folder-back { left: 6%; right: 4%; top: 18%; bottom: 6%; background: var(--kraft-2); border-radius: 6px 10px 6px 6px; transform: rotate(-4deg); }
        .folder-back::before { content: ""; position: absolute; left: 8%; top: -7%; width: 32%; height: 9%; background: var(--kraft-2); border-radius: 10px 10px 0 0; }
        .folder-front { left: 4%; right: 8%; top: 46%; bottom: 2%; background: var(--kraft); border-radius: 4px 4px 8px 8px; transform: rotate(-2deg); box-shadow: 0 -2px 10px rgba(0,0,0,0.08), 0 30px 40px -24px rgba(27,25,22,0.5); }
        .polaroid { background: #fff; padding: 2.2cqw 2.2cqw 8cqw; box-shadow: 0 10px 22px -12px rgba(0,0,0,0.5); }
        .polaroid img { width: 100%; height: 100%; object-fit: cover; }
        .ph-1 { left: 12%; top: 8%; width: 44%; height: 44%; transform: rotate(-9deg); }
        .ph-2 { left: 47%; top: 4%; width: 25%; height: 46%; transform: rotate(7deg); }
        .clip { left: 21%; top: 2%; width: 7%; transform: rotate(-20deg); color: #9aa0a6; }
        .tape { width: 18%; height: 5.5%; background: rgba(240,230,200,0.75); box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
        .tape-1 { left: 53%; top: 1%; transform: rotate(-8deg); }
        .tape-2 { left: 63%; top: 56%; transform: rotate(14deg); z-index: 6; }
        .stamp-ph { width: 16%; padding: 1.4cqw; background: radial-gradient(circle, transparent 1.2cqw, #fff 1.3cqw) -2cqw -2cqw / 4cqw 4cqw; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3)); }
        .stamp-ph img { width: 100%; aspect-ratio: 3/4; object-fit: cover; }
        .ph-cafe { left: 0%; top: 30%; width: 30%; height: 62%; transform: rotate(-6deg); z-index: 4; padding-bottom: 9cqw; }
        .ph-cafe span { position: absolute; left: 0; right: 0; bottom: 2.4cqw; text-align: center; font-family: var(--hand); font-size: 3.6cqw; color: #3b3a6b; }
        .postcard {
          left: 44%; top: 50%; width: 52%; height: 44%; z-index: 5; background: #fbf6ea; transform: rotate(-3deg);
          box-shadow: 0 14px 26px -14px rgba(0,0,0,0.5); padding: 4cqw; display: grid; grid-template-columns: 1fr 1fr; gap: 3cqw;
        }
        .postcard::before { content: ""; position: absolute; left: 50%; top: 14%; bottom: 14%; border-left: 1px solid var(--line-2); }
        .postcard p { font-family: var(--hand); font-size: 3.7cqw; line-height: 1.15; color: #3b3a6b; }
        .postcard .pc-r { display: flex; flex-direction: column; align-items: flex-end; gap: 2cqw; }
        .postcard .pc-r i { display: block; width: 100%; border-bottom: 1px solid var(--line-2); height: 4.5cqw; }
        .postcard .stamp-ph { position: static; width: 40%; padding: 1cqw; background: radial-gradient(circle, transparent 0.9cqw, #fff 1cqw) -1.5cqw -1.5cqw / 3cqw 3cqw; transform: rotate(4deg); }
        .postmark { right: 20%; top: 52%; z-index: 6; width: 15%; aspect-ratio: 1; border-radius: 50%; border: 2px solid rgba(196,71,58,0.7); color: rgba(196,71,58,0.85); display: grid; place-items: center; text-align: center; font-size: 2cqw; line-height: 1.2; letter-spacing: 0.1em; transform: rotate(-16deg); }

        /* FOOTER */
        .foot { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 24px 48px; align-items: end; padding: 70px 0 40px; margin-top: clamp(90px, 14vh, 140px); border-top: 1px solid var(--line); }
        .foot-name { font-family: var(--serif); font-weight: 300; font-size: clamp(34px, 4vw, 52px); letter-spacing: -0.03em; line-height: 1; }
        .foot-cols { display: flex; gap: clamp(28px, 5vw, 64px); font-size: 12px; }
        .foot-cols ul { list-style: none; display: grid; gap: 4px; }
        .foot-cols a:hover, .foot-cols button:hover { color: var(--blue); }
        .foot-meta { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }

        /* PANEL */
        .panel-wrap { position: fixed; inset: 0; z-index: 80; pointer-events: none; }
        .panel-wrap.open { pointer-events: auto; }
        .panel-scrim { position: absolute; inset: 0; background: rgba(27,25,22,0); transition: background .4s; }
        .panel-wrap.open .panel-scrim { background: rgba(27,25,22,0.4); }
        .panel { position: absolute; top: 0; right: 0; height: 100%; width: min(600px, 100%); background: var(--card); transform: translateX(100%); transition: transform .46s cubic-bezier(.16,.84,.24,1); overflow-y: auto; }
        .panel-wrap.open .panel { transform: none; box-shadow: -40px 0 90px rgba(27,25,22,.22); }
        .panel-inner { padding: clamp(22px, 4vw, 48px); }
        .panel-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .panel-name { font-family: var(--serif); font-weight: 300; font-size: clamp(40px, 6vw, 60px); line-height: 1; letter-spacing: -0.03em; }
        .panel-tag { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: 18px; margin-top: 10px; }
        .panel-desc { margin: 22px 0; font-size: 13.5px; color: var(--muted); }
        .feat-list { list-style: none; border-top: 1px solid var(--line); margin: 22px 0 28px; }
        .feat-list li { display: grid; grid-template-columns: 32px 1fr; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--line); font-size: 12.5px; }
        .feat-n { color: var(--muted-2); }
        .feat-list strong { font-weight: 500; }
        .feat-rest { color: var(--muted); }
        .panel-label { margin-bottom: 10px; }
        .chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .panel-cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }

        /* FEEDBACK */
        .fb-wrap { position: fixed; right: clamp(14px,3vw,30px); bottom: clamp(14px,3vw,30px); z-index: 90; max-width: calc(100vw - 28px); animation: fbIn .45s cubic-bezier(.16,.84,.24,1); }
        @keyframes fbIn { from { opacity: 0; transform: translateY(22px) rotate(2deg); } }
        .fb-card { position: relative; width: 380px; max-width: 100%; background: var(--card); padding: 28px 24px 22px; border-radius: 3px; transform: rotate(-0.8deg); box-shadow: 0 30px 70px rgba(27,25,22,.3), 0 0 0 1px var(--line); }
        .fb-tape { position: absolute; top: -12px; left: 50%; width: 96px; height: 24px; margin-left: -48px; background: rgba(233,215,160,0.8); transform: rotate(-3deg); }
        .fb-x { position: absolute; top: 12px; right: 12px; width: 28px; height: 28px; border-radius: 50%; font-size: 12px; color: var(--muted); }
        .fb-x:hover { background: var(--paper-2); }
        .fb-title { font-family: var(--serif); font-weight: 300; font-size: 28px; line-height: 1.1; margin: 8px 0 10px; letter-spacing: -0.02em; }
        .fb-copy { font-size: 12.5px; color: var(--muted); }
        .fb-input { width: 100%; font-family: var(--sans); font-size: 16px; color: var(--ink); background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 11px 13px; margin-top: 12px; resize: vertical; }
        .fb-input:focus { outline: none; border-color: var(--blue); }
        .fb-actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 16px; }
        .fb-actions .btn-blue { min-width: 0; }
        .fb-skip { font-size: 12px; color: var(--muted); }

        /* REVEAL */
        [data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1); }
        [data-reveal].in { opacity: 1; transform: none; }

        @media (max-width: 860px) {
          .stack-row { grid-template-columns: minmax(0, 1fr); gap: 14px; }
          .scale { grid-template-columns: minmax(0, 1fr); }
          .tool { width: 76px; }
          .app { width: 60px; }
          .nav { grid-template-columns: 1fr auto; padding-top: 10px; padding-bottom: 10px; }
          .nav-mark { display: none; }
          .seg a { padding: 6px 8px; font-size: 12px; }
          .hero { padding-top: 84px; }
          .hero-name { white-space: normal; font-size: clamp(64px, 21vw, 140px); font-variation-settings: "opsz" 72; }
          .hero-name sup { position: static; display: block; margin-bottom: 10px; }
          .hero-grid, .sec, .proj, .contact { grid-template-columns: minmax(0, 1fr); }
          .hero-photo .frame { aspect-ratio: 5/4; }
          .proj { align-items: start; }
          .proj-side { order: -1; position: static; padding-top: 0; }
          .work-index { display: none; }
          .tl::before { left: 6px; }
          .tl-yr { margin-left: 0; }
          .tl-item { grid-template-columns: minmax(0, 1fr); gap: 0; padding-left: 30px; }
          .tl-item::after { left: 6px; }
          .tl-item.l .card, .tl-item.r .card { grid-column: 1; }
          .scrap { margin: 0 auto; }
          .foot { grid-template-columns: minmax(0, 1fr); }
        }
        @media (max-width: 520px) {
          .nav { grid-template-columns: 1fr; justify-items: center; }
          .nav-mid { flex-wrap: wrap; justify-content: center; gap: 6px; }
          .chip-in.nav-bubble { font-size: 12px; padding: 6px 12px 7px; }
          .hero { padding-top: 120px; }
          .nav-hire { display: none; }
          .cf { --cw: 46vw; }
          .cf-card { transform: translateX(-50%) translateX(calc(var(--o) * 62%)) translateZ(calc(var(--a) * -160px)) rotateY(calc(var(--o) * -32deg)); }
          .card { grid-template-columns: minmax(0, 1fr); }
          .stamp { position: absolute; top: -18px; right: -6px; width: 56px; }
          .card h3 { padding-right: 48px; }
          .activity-row { grid-template-columns: minmax(0, 1fr) auto; }
          .activity-row span { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          .cf-card, .seg-thumb, .card { transition: none; }
        }
      `}</style>

      {/* NAV */}
      <header className="nav">
        <a href="#top" className="nav-mark">
          techwarq.space
        </a>
        <div className="nav-mid">
        <nav className="seg" aria-label="Sections">
          <span
            className="seg-thumb"
            style={{ "--k": Math.max(activeIdx, 0), opacity: activeIdx < 0 ? 0 : 1 } as React.CSSProperties}
            aria-hidden="true"
          />
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "on" : ""}>
              {n.label}
            </a>
          ))}
        </nav>
        <Link href="/creative-stuff" className="chip-in nav-bubble">
          creative-stuff <span aria-hidden="true">↗</span>
        </Link>
        </div>
        <button className="pill nav-hire" onClick={() => setFb(true)}>
          hire me
        </button>
      </header>

      <main className="wrap" id="top">
        {/* HERO */}
        <section className="hero">
          <h1 className="hero-name" data-reveal>
            <sup>(techwarq)</sup>
            Hi, I&apos;m Sonali.
          </h1>
          <div className="hero-grid">
            <figure className="hero-photo" data-reveal>
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-cloud-reader.jpg"
                  alt="A man in a hat lying on a cloud, reading a book against a blue sky"
                />
              </div>
            </figure>
            <div>
              <p className="hero-say" data-reveal>
                I&apos;m a{" "}
                <span className="chip-in">
                  <IcoCode /> fullstack &amp; AI engineer
                </span>{" "}
                who builds{" "}
                <span className="chip-in">
                  <IcoSpark /> agents
                </span>{" "}
                that do real work. Otherwise, I&apos;m just a <span className="hl">human</span> reading
                too many stories.
              </p>
              <div className="hero-about" data-reveal id="about">
                <p>
                  I love building software that <span className="hl">thinks for itself</span>, and
                  then telling the story of how it got made.
                </p>
                <p>
                  I work across the stack, mostly in <span className="tech">Next.js</span>,{" "}
                  <span className="tech">TypeScript</span>, <span className="tech">Python</span>, and{" "}
                  <span className="tech">Cloudflare Workers</span>. I ship async, in small daily
                  slices, and every claim here links to a live URL or a repo.
                </p>
                <div className="hero-cta">
                  <a href="#work" className="btn-blue">
                    See the work <span>→</span>
                  </a>
                  <a href="/resume.pdf" download="Sonali_Nayak_Resume.pdf" className="pill pill-lg">
                    download resume ↓
                  </a>
                </div>
                <ActivityFeed />
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" data-clep="portfolio-work">
          <div className="sec" data-reveal>
            <div>
              <span className="sec-label">Work</span>
              <ol className="work-index">
                {PROJECTS.map((p, i) => (
                  <li key={p.id}>
                    <a href={`#p-${p.id}`}>
                      <span>{String(i + 1).padStart(2, "0")}</span> {p.name}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="sec-intro">
                I build AI products focused on automating real work. I believe humans should do
                the thinking, and make the agents better.
              </p>
              <p className="sec-sub">
                Lately that means video agents, evals for AI apps, and a personal AI that remembers
                me. Here are four of them.
              </p>
            </div>
          </div>

          {PROJECTS.map((p, i) => (
            <article key={p.id} id={`p-${p.id}`} className="proj" data-reveal>
              <div className="proj-side">
                <div className="proj-head">
                  <h3 className="proj-name">{p.name}</h3>
                  <button
                    className="proj-open"
                    onClick={() => setOpenId(p.id)}
                    data-clep-action={i === 0 ? "primary" : undefined}
                    aria-label={`Open the ${p.name} case study`}
                  >
                    {p.meta} <IcoPlus />
                  </button>
                </div>
                <p className="proj-tag">{p.tag}</p>
              </div>
              <div>
                <p className="proj-lead">{p.lead}</p>
                {p.media.kind === "reel" ? (
                  <div className="media-card bare">
                    <ProjectMedia p={p} />
                  </div>
                ) : (
                  <div
                    className="media-card"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open the ${p.name} case study`}
                    onClick={() => setOpenId(p.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setOpenId(p.id);
                    }}
                  >
                    <ProjectMedia p={p} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* STACK */}
        <section id="stack">
          <div className="sec" data-reveal>
            <span className="sec-label">Stack</span>
            <div>
              <p className="sec-intro">
                The tools I reach for, and the <em>one rule</em> I build every project around.
              </p>
              <p className="sec-sub">
                Cheap, open models do most of the work. Everything else is picked to stay fast when
                the traffic shows up.
              </p>
            </div>
          </div>

          <div className="stack">
            {STACK.map((g) => (
              <div key={g.group} className="stack-row" data-reveal>
                <span>{g.group}</span>
                <div className="tools">
                  {g.tools.map((t) => (
                    <AppIcon key={t.name} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="scale" data-reveal>
            <b>
              10k <small>req/min</small>
            </b>
            <p>
              <strong>Designed for scale from day one.</strong> Every build starts as a diagram in
              Eraser, sized for 10,000 requests a minute before I write the first line.
            </p>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline">
          <div className="sec" data-reveal>
            <span className="sec-label">2024 → 2026</span>
            <div>
              <p className="sec-intro">
                Three years, one folder of <em>postcards</em>. This is what happened, in order.
              </p>
              <p className="sec-sub">
                From a job-hunting agent built on Groq to resigning to build Clep.
              </p>
            </div>
          </div>

          <div className="tl">
            {moments.map((m, i) => {
              const [y, mo] = m.when.split("-");
              const newYear = i === 0 || moments[i - 1].when.slice(0, 4) !== y;
              return (
                <React.Fragment key={m.when + m.title}>
                  {newYear && <div className="tl-yr">{y}</div>}
                  <div className={"tl-item " + (i % 2 ? "r" : "l") + " c" + (i % 3)} data-reveal>
                    <div className={"card" + (m.warm ? " life" : "")}>
                      <div>
                        <h3>{m.title}</h3>
                        <p>{m.body}</p>
                        {m.heatmap && <Heatmap />}
                        <span className="kind">{m.tag}</span>
                      </div>
                      <div className="stamp" aria-hidden="true">
                        <div className="stamp-in">
                          <b>{m.stamp ?? MONTHS[Number(mo) - 1]}</b>
                          <span>{y}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact">
          <div className="scrap" aria-hidden="true" data-reveal>
            <div className="folder-back" />
            <div className="polaroid ph-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/clep-demo.jpg" alt="" />
            </div>
            <div className="polaroid ph-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ugc/ugc-2.jpg" alt="" />
            </div>
            <span className="tape tape-1" />
            <svg className="clip" viewBox="0 0 24 60">
              <path
                d="M8 14v30a6 6 0 0012 0V10a9 9 0 00-18 0v38a11 11 0 0022 0V18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="folder-front" />
            <div className="polaroid ph-cafe">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/collage/cafe.jpg" alt="" />
              <span>rainy day, still shipping</span>
            </div>
            <div className="postcard">
              <p>
                oct 2026 —
                <br />
                wish you were shipping here. bring a backlog!
                <br />— s.
              </p>
              <div className="pc-r">
                <div className="stamp-ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/collage/cafe.jpg" alt="" />
                </div>
                <i />
                <i />
                <i />
              </div>
            </div>
            <span className="tape tape-2" />
            <div className="postmark">
              TECHWARQ
              <br />
              ✦ 2026 ✦
            </div>
          </div>

          <div data-reveal>
            <h2>let&apos;s connect</h2>
            <p className="contact-copy">
              I&apos;m looking for a team building something cool. I&apos;m also open to freelance work
              at $15/hr: one flat rate, weekly invoices, and a paid one-week trial on a real ticket.
            </p>
            <div className="contact-links">
              <button className="btn-blue" onClick={() => setFb(true)}>
                write to me <span>→</span>
              </button>
              <a href="/resume.pdf" download="Sonali_Nayak_Resume.pdf" className="pill pill-lg">
                download resume ↓
              </a>
            </div>
            <div className="contact-links">
              <a className="pill" href="https://github.com/techwarq" target="_blank" rel="noreferrer">
                github ↗
              </a>
              <a className="pill" href="https://blog.techwarq.space" target="_blank" rel="noreferrer">
                blog ↗
              </a>
              <a
                className="pill"
                href="https://www.npmjs.com/package/@techwarq/ailens"
                target="_blank"
                rel="noreferrer"
              >
                npm ↗
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="foot">
          <div className="foot-name">Sonali Nayak</div>
          <div className="foot-cols">
            <ul>
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>○ {n.label}</a>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <a href="https://github.com/techwarq" target="_blank" rel="noreferrer">
                  ○ GitHub ↗
                </a>
              </li>
              <li>
                <a href="https://blog.techwarq.space" target="_blank" rel="noreferrer">
                  ○ Blog ↗
                </a>
              </li>
              <li>
                <button onClick={() => setFb(true)}>○ Hire me</button>
              </li>
            </ul>
          </div>
          <div className="foot-meta mono">
            <span>© {new Date().getFullYear()} sonali nayak · set in Fraunces &amp; Inter</span>
            <a href="#top">back to top ↑</a>
          </div>
        </footer>
      </main>

      <DetailPanel p={openProject} onClose={closePanel} />
      {fb && <FeedbackPopup onClose={closeFb} />}
    </>
  );
}
