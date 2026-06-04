"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/* DATA                                                                  */
/* ------------------------------------------------------------------ */

interface Cta { label: string; href: string; }

interface Project {
  id: string;
  name: string;
  tag: string;
  status: string;
  desc: string;
  behind: string;
  features: string[];
  tech: string[];
  cta: Cta[];
  note?: string;
  previewType: "browser" | "terminal" | "app";
  url: string | null;
  urlLabel: string;
  termCmd?: string;
  termOut?: string;
  screenshots?: string[];
  video?: string;
}

const PROJECTS: Project[] = [
  {
    id: "snips",
    name: "Snips AI",
    tag: "premium knowledge extraction platform",
    status: "LIVE",
    desc: "snips ai distills 40-page research papers or 2-hour lectures into interactive 'snips' cards — with visual figure detection and precision extraction.",
    behind: "engineered a multi-modal analysis engine using gemini 3.1 pro and groq.",
    features: [
      "agentic research search — describe your problem and snips searches arXiv/semantic scholar for the exact papers that solve it, then auto-snips the relevant sections and surfaces the implementation details you need.",
      "code architecture from papers — extracts the proposed architecture, algorithms, and pseudocode from any paper and generates a ready-to-implement code scaffold using your preferred stack.",
      "deep document analysis — page-by-page extraction with automated figure cropping and katex math rendering.",
      "intelligent youtube processing — leverages native file api to 'watch' videos and opencv for precise frame capture at key timestamps.",
      "mathematical explainer — interactive sliders and symbols breakdown for complex formulas using math.js.",
      "high-performance stack — fastapi backend, mongodb storage, next.js 14 frontend with emerald/dark aesthetics.",
      "learning progress — activity heatmap visualization for daily knowledge accumulation.",
    ],
    tech: ["Gemini 3.1 Pro", "Groq", "FastAPI", "MongoDB", "Next.js 14", "KaTeX", "OpenCV"],
    cta: [{ label: "Visit usesnips.com", href: "https://usesnips.com" }],
    previewType: "browser",
    url: "https://usesnips.com",
    urlLabel: "usesnips.com",
    video: "/snips-demo.mp4",
    screenshots: ["/snips1.png", "/snips-1.png", "/snips-2.png"],
  },
  {
    id: "ailens",
    name: "@techwarq/ailens",
    tag: "local-first LLM observability & testing suite",
    status: "NPM",
    desc: "bringing real software engineering to AI apps — debug, diff, type-check, and trace LLM calls with zero overhead.",
    behind: "engineered a high-performance tracing engine and a semantic rule evaluator.",
    features: [
      "zero-latency logging — async local-first session tracking with automated git-ignore management.",
      "semantic checks — multi-tier validation using instant local regex and deep LLM-judge verification.",
      "causal chain analysis — a 'why' engine that pinpoints exactly which part of a prompt caused a quality regression.",
      "behavioral diffing — goes beyond text diffs to explain how model tone, length, and reasoning shifted between versions.",
      "pipeline tracing — unified SDK for tracing multi-modal agents (LLM + Image + Video + Tools) with automatic dependency linking.",
    ],
    tech: ["TypeScript", "Node.js", "LLM-judge", "Regex Eval", "SDK"],
    cta: [
      { label: "npm install", href: "https://www.npmjs.com/package/@techwarq/ailens" },
      { label: "GitHub repo", href: "https://github.com/techwarq/ai-lens" },
    ],
    previewType: "terminal",
    url: "https://www.npmjs.com/package/@techwarq/ailens",
    urlLabel: "npmjs.com/@techwarq/ailens",
    termCmd: "npx @techwarq/ailens trace",
    termOut: "→ session linked · 0ms overhead",
    screenshots: ["/ailens-mockup.png"],
  },
  {
    id: "ugc",
    name: "AI UGC Agent",
    tag: "script or product link → high-fidelity UGC video",
    status: "LIVE",
    desc: "anyone can drop a script or product link and generate high-fidelity ugc videos from scratch.",
    behind: "designed a resilient, 5-stage multi-modal pipeline that abstracts the complexity of long-running ai tasks.",
    features: [
      "intelligent ingestion — mistral ocr + gemini flash structure messy text into a json storyline.",
      "keyframe generation — dynamic base-frame rendering for visual continuity.",
      "orchestration — dense context injection to build veo 3.1 video-generation prompts.",
      "async video rendering — concurrent 8-second clip generation with persistent seed tracking.",
      "final stitching — ffmpeg clip merging & voice-over syncing via cloud queues.",
    ],
    tech: ["Mistral OCR", "Gemini Flash", "Veo 3.1", "FFmpeg", "Cloud Queues"],
    cta: [{ label: "See it live", href: "https://nagent.ai/agent-details/ugc" }],
    previewType: "browser",
    url: "https://nagent.ai/agent-details/ugc",
    urlLabel: "nagent.ai/agent-details/ugc",
    video: "/final-ugc-1775019503338-e9f3798b-1782-4d2b-9c29-d917b595f73c.mp4",
  },
  {
    id: "photoshoot",
    name: "Virtual Photoshoot Agent",
    tag: "studio-quality imagery at massive scale — no studio",
    status: "LIVE",
    desc: "standard brand shoots are slow and expensive. this agent automates the entire photoshoot lifecycle — eliminating studios and manual prompt engineering.",
    behind: "built a modular inference engine using ndjson streaming and heartbeat pings to bypass timeout limits on long-running AI models.",
    features: [
      "asset ingestion — multi-vector upload (binary / data-uri / arrays) to cloud storage.",
      "avatar generation — ndjson streaming to handle high-fidelity model inference in real-time.",
      "virtual try-on — garment mapping with heartbeat flushes to prevent load-balancer timeouts.",
      "pose manipulation — structural mapping via visual references and text prompts.",
      "asset delivery — dynamic accessory compositing and automated .zip compilation for batch exports.",
    ],
    tech: ["NDJSON Streaming", "Cloud Storage", "Inference Engine", "Compositing"],
    cta: [{ label: "See it live", href: "https://nagent.ai/agent-details/virtual-photoshoot-agent" }],
    previewType: "browser",
    url: "https://nagent.ai/agent-details/virtual-photoshoot-agent",
    urlLabel: "nagent.ai/agent-details/virtual-photoshoot-agent",
    screenshots: [
      "/result_0_1775472750909.jpg",
      "/result_0_1775472856839.jpg",
      "/result_0_1775473210676.jpg",
      "/result_1_1775473213552.jpg",
      "/result_2_1775473215635.jpg",
      "/avatr.jpg",
      "/avatar2.jpg",
      "/avatar3.jpg",
      "/pose.jpg",
      "/pose2.jpg",
      "/pose3.jpg",
    ],
  },
  {
    id: "campaign",
    name: "Campaign Hub",
    tag: "enterprise bulk AI orchestrator, synced to Google Sheets",
    status: "LIVE",
    desc: "managing marketing across hundreds of SKUs is a manual bottleneck. this engine syncs with Google Sheets to autonomously generate copy, images, and metadata in bulk.",
    behind: "engineered a 'fan-out' system that takes one sheet and splits it into thousands of individual AI tasks.",
    features: [
      "google sheet connection — source data is cached in redis for zero-latency access.",
      "intelligent generation — the AI reads product specs and brand objectives to draft custom copy and ad creatives.",
      "smart orchestration (BullMQ) — a 'mega to-do list' managing specialized workers so no task is dropped.",
      "real-time write-back — as each ad is ready it syncs back to the original sheet, live.",
      "scaling at zero cost — handles 1,000+ SKUs concurrently without hitting rate limits or crashing the browser.",
    ],
    tech: ["Google Sheets API", "Redis", "BullMQ", "Distributed Queues", "Webhooks"],
    cta: [{ label: "See it live", href: "https://nagent.ai/agent-details/campaign-hub" }],
    previewType: "browser",
    url: "https://nagent.ai/agent-details/campaign-hub",
    urlLabel: "nagent.ai/agent-details/campaign-hub",
    screenshots: ["/campaign-hub-sheet.png"],
  },
  {
    id: "flowdesk",
    name: "FlowDesk (ASTRA)",
    tag: "e-commerce ops suite — 1,500+ accounts daily",
    status: "PRIVATE",
    desc: "managing bulk orders across 9+ platforms (amazon, vivo, flipkart...) is an operational bottleneck. this RPA suite automates tracking, ip-allocation, and bulk link execution via a custom in-app browser.",
    behind: "engineered a sophisticated playwright RPA engine and a custom electron browser to automate massive-scale e-commerce operations.",
    features: [
      "multi-platform hub — automated order tracking across 9+ major sites, handling complex navigation and MFA flows via node.js.",
      "in-app bulk browser — a custom browser engine for simultaneous link execution at scale.",
      "intelligent ip allocation — advanced routing to maintain account health and bypass anti-bot protections.",
      "high-performance dashboard — real-time UI monitoring 1,500+ daily active accounts with sub-second filtering.",
      "ai-powered order intelligence — a RAG chatbot with a vector database to query order & logistics history in natural language.",
      "operational intelligence — CSV exports, smart batch fetching, automated chatbot-driven customer updates.",
    ],
    tech: ["React 19", "Tailwind v4", "Playwright", "Electron", "Gemini", "Qdrant (RAG)"],
    cta: [
      { label: "Download Mac (arm64)", href: "/FlowDesk-0.1.2-arm64.dmg" },
      { label: "Download Windows (.exe)", href: "/FlowDesk-Setup-0.1.2.exe" },
    ],
    note: "Demo credentials: u: testuser · p: testuser123",
    previewType: "app",
    url: null,
    urlLabel: "private client instance",
    screenshots: ["/flowdesk-dashboard.png", "/flowdesk-ui.png"],
  },
  {
    id: "research",
    name: "Research & Experiments",
    tag: "reading papers, building my own memory architecture",
    status: "WIP",
    desc: "i read research papers and try to build stuff — exploring the boundaries of LLM reasoning & memory. currently building my own small memory architecture.",
    behind: "an ongoing exploration. no polish promised, just honest attempts at hard problems.",
    features: [
      "memory v1 — a from-scratch small memory architecture for long-horizon recall.",
      "paper → prototype — turning published ideas into runnable experiments.",
      "boundaries of reasoning — probing where current LLMs break and why.",
    ],
    tech: ["LLM Reasoning", "Memory", "Experiments"],
    cta: [{ label: "Memory v1.pdf", href: "/Memory v1 (2).pdf" }],
    previewType: "terminal",
    url: null,
    urlLabel: "Memory v1 — architecture breakdown",
    termCmd: "cat memory-v1.notes",
    termOut: "→ recall horizon ↑  hallucination ↓",
  },
];

/* ------------------------------------------------------------------ */
/* REVEAL HOOK                                                           */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || document.visibilityState !== "visible") {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    els.forEach((el) => el.classList.remove("in"));
    const reveal = (el: HTMLElement) => el.classList.add("in");
    const vh = window.innerHeight;
    els.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.95) reveal(el); });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target as HTMLElement); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    els.forEach((el) => io.observe(el));
    const safety = setTimeout(() => els.forEach(reveal), 1400);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, []);
}

/* ------------------------------------------------------------------ */
/* PREVIEW COMPONENTS                                                    */
/* ------------------------------------------------------------------ */

function ChromeDot() { return <span className="chrome-dot" />; }

function MediaBody({ p, live }: { p: Project; live: boolean }) {
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => { setImgIdx(0); }, [p.id]);
  const shots = p.screenshots ?? [];
  if (live && p.url) return null; // handled by parent
  if (p.video) return <video className="pv-media" src={p.video} autoPlay muted loop playsInline />;
  if (shots.length > 0) return (
    <div className="pv-shots">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="pv-media" src={shots[imgIdx]} alt={p.name} />
      {shots.length > 1 && (
        <>
          <button className="pv-nav pv-nav-prev" onClick={() => setImgIdx((i) => (i - 1 + shots.length) % shots.length)}>‹</button>
          <button className="pv-nav pv-nav-next" onClick={() => setImgIdx((i) => (i + 1) % shots.length)}>›</button>
          <div className="pv-ind">
            {shots.map((_, i) => (
              <span key={i} className={"pv-ind-dot" + (i === imgIdx ? " on" : "")} onClick={() => setImgIdx(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
  return (
    <div className="pv-placeholder">
      <span className="pv-placeholder-txt">[ screenshot ]</span>
      <span className="pv-placeholder-sub">{p.urlLabel}</span>
    </div>
  );
}

function BrowserPreview({ p }: { p: Project }) {
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLive(false); setLoaded(false); }, [p.id]);
  return (
    <div className="pv-window">
      <div className="pv-bar">
        <div className="pv-dots"><ChromeDot /><ChromeDot /><ChromeDot /></div>
        <div className="pv-url">{p.url ? p.url.replace(/^https?:\/\//, "") : p.urlLabel}</div>
        {p.url && (
          <button className="pv-live" onClick={() => { setLive((v) => !v); setLoaded(false); }}>
            {live ? "media ▣" : "load live ↗"}
          </button>
        )}
      </div>
      <div className="pv-body">
        {live && p.url ? (
          <>
            {!loaded && <div className="pv-loading">loading {p.urlLabel}…</div>}
            <iframe className="pv-iframe" src={p.url} title={p.name}
              onLoad={() => setLoaded(true)}
              style={{ position: "relative", zIndex: 1 }}
              sandbox="allow-scripts allow-same-origin allow-popups" />
          </>
        ) : (
          <MediaBody p={p} live={live} />
        )}
      </div>
    </div>
  );
}

function TerminalPreview({ p }: { p: Project }) {
  const lines = [
    { t: "cmd", v: "$ " + (p.termCmd || "cat notes") },
    { t: "out", v: p.termOut || "→ ok" },
    ...p.tech.slice(0, 4).map((t) => ({ t: "log", v: "[ok] " + t.toLowerCase() })),
    { t: "blink", v: "" },
  ];
  return (
    <div className="pv-window pv-term">
      <div className="pv-bar pv-bar-term">
        <div className="pv-dots"><ChromeDot /><ChromeDot /><ChromeDot /></div>
        <div className="pv-apptitle">{p.urlLabel}</div>
        <div className="pv-spacer" />
      </div>
      <div className="pv-body pv-termbody">
        {lines.map((l, i) => (
          <div key={i} className={"tl tl-" + l.t}>
            {l.t === "blink" ? <span className="cursor">█</span> : l.v}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppPreview({ p }: { p: Project }) {
  return (
    <div className="pv-window pv-app">
      <div className="pv-bar pv-bar-app">
        <div className="pv-dots"><ChromeDot /><ChromeDot /><ChromeDot /></div>
        <div className="pv-apptitle">{p.urlLabel}</div>
        <div className="pv-spacer" />
      </div>
      <div className="pv-body">
        <MediaBody p={p} live={false} />
      </div>
    </div>
  );
}

function Preview({ p }: { p: Project }) {
  if (p.previewType === "terminal") return <TerminalPreview p={p} />;
  if (p.previewType === "app") return <AppPreview p={p} />;
  return <BrowserPreview p={p} />;
}

/* ------------------------------------------------------------------ */
/* DETAIL PANEL                                                          */
/* ------------------------------------------------------------------ */

function DetailPanel({ p, index, onClose }: { p: Project | null; index: number; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = p ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [p]);

  return (
    <div className={"panel-wrap" + (p ? " open" : "")}>
      <div className="panel-scrim" onClick={onClose} />
      <aside className="panel" role="dialog" aria-label={p?.name ?? ""}>
        {p && (
          <div className="panel-inner">
            <div className="panel-top">
              <span className="panel-idx">{String(index + 1).padStart(2, "0")}</span>
              <button className="panel-x" onClick={onClose}>close ✕</button>
            </div>

            <div className="panel-head">
              <span className="panel-status">{p.status}</span>
              <h2 className="panel-name">{p.name}</h2>
              <p className="panel-tag">{p.tag}</p>
            </div>

            <div className="panel-preview"><Preview p={p} /></div>

            <p className="panel-desc">{p.desc}</p>

            <div className="panel-sect">
              <div className="sect-label">// behind the scenes</div>
              <p className="panel-behind">{p.behind}</p>
            </div>

            <ol className="feat-list">
              {p.features.map((f, i) => {
                const dash = f.indexOf(" — ");
                const head = dash !== -1 ? f.slice(0, dash) : f;
                const rest = dash !== -1 ? f.slice(dash + 3) : "";
                return (
                  <li key={i} className="feat">
                    <span className="feat-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="feat-body">
                      <strong>{head}</strong>
                      {rest && <span className="feat-rest"> — {rest}</span>}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="panel-sect">
              <div className="sect-label">// stack</div>
              <div className="chips">
                {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>

            {p.note && <div className="panel-note">{p.note}</div>}

            {p.cta.length > 0 ? (
              <div className="panel-cta">
                {p.cta.map((c, i) => (
                  <a key={i} className={"btn" + (i === 0 ? " btn-primary" : "")}
                    href={c.href} target="_blank" rel="noreferrer">
                    {c.label} <span className="btn-arr">↗</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="panel-cta">
                <span className="btn btn-disabled">{p.urlLabel}</span>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FEEDBACK POPUP                                                        */
/* ------------------------------------------------------------------ */

const FEEDBACK_ENDPOINT = "/api/feedback";

function FeedbackPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msg, setMsg] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);
  useEffect(() => { if (!open) { setMsg(""); setContact(""); setSent(false); } }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    const payload = { message: msg, contact, at: new Date().toISOString() };
    try {
      if (FEEDBACK_ENDPOINT) {
        await fetch(FEEDBACK_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      } else {
        const all = JSON.parse(localStorage.getItem("sn_feedback") || "[]");
        all.push(payload);
        localStorage.setItem("sn_feedback", JSON.stringify(all));
      }
    } catch {}
    setSent(true);
  }

  if (!open) return null;
  return (
    <div className="fb-wrap">
      <div className="fb-card" role="dialog">
        <button className="fb-x" onClick={onClose}>✕</button>
        {!sent ? (
          <form onSubmit={submit}>
            <div className="fb-kicker">// a small ask</div>
            <h3 className="fb-title">leaving already?</h3>
            <p className="fb-copy">no pressure — but if something here didn&apos;t land (or did), i&apos;d genuinely love to know. one honest line beats a hundred polite nods. roast me, praise me, whatever.</p>
            <textarea ref={ref} className="fb-input" rows={3} value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="the thing you'd never say to my face…" />
            <input className="fb-contact" value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="email / @handle (optional, if you want a reply)" />
            <div className="fb-actions">
              <button type="button" className="fb-skip" onClick={onClose}>nah, i&apos;m good</button>
              <button type="submit" className="fb-send">send it →</button>
            </div>
          </form>
        ) : (
          <div className="fb-thanks">
            <div className="fb-kicker">// received</div>
            <h3 className="fb-title">you&apos;re a real one.</h3>
            <p className="fb-copy">genuinely, thank you. that helps more than you&apos;d think.</p>
            <button className="fb-send" onClick={onClose}>close</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ROW                                                                   */
/* ------------------------------------------------------------------ */

function Row({ p, index, onOpen }: { p: Project; index: number; onOpen: (i: number) => void }) {
  return (
    <button
      className="row"
      data-reveal
      style={{ "--row-i": index } as React.CSSProperties}
      onClick={() => onOpen(index)}
    >
      <span className="row-dot" aria-hidden="true" />
      <span className="row-idx">{String(index + 1).padStart(2, "0")}</span>
      <span className="row-main">
        <span className="row-name">{p.name}</span>
        <span className="row-tag">{p.tag}</span>
      </span>
      <span className="row-status">{p.status}</span>
      <span className="row-arrow" aria-hidden="true">↗</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [fb, setFb] = useState(false);

  useReveal();

  const closeFb = useCallback(() => {
    localStorage.setItem("sn_fb_seen", "1");
    setFb(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("sn_fb_seen")) return;
    const id = setTimeout(() => {
      if (!localStorage.getItem("sn_fb_seen")) setFb(true);
    }, 10000);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-text-size-adjust: 100%; }

        :root {
          --accent:   #ffffff;
          --fg:       #f5f5f7;
          --muted:    rgba(235,235,245,0.62);
          --muted-2:  rgba(235,235,245,0.35);
          --glass:    rgba(255,255,255,0.07);
          --glass-2:  rgba(255,255,255,0.11);
          --glass-hi: rgba(255,255,255,0.18);
          --glass-lo: rgba(255,255,255,0.06);
          --r:        22px;
          --r-lg:     30px;
          --r-pill:   999px;
          --sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, "Segoe UI", sans-serif;
          --mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace;
        }

        html, body {
          background: #07080d;
          font-family: var(--sans);
          color: var(--fg);
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          line-height: 1.5;
          overflow-x: hidden;
          min-height: 100vh;
        }
        body {
          background:
            radial-gradient(50% 42% at 16% 8%,  rgba(255,255,255,0.06), transparent 70%),
            radial-gradient(46% 40% at 92% 14%, rgba(255,255,255,0.05), transparent 70%),
            radial-gradient(60% 55% at 80% 98%, rgba(255,255,255,0.04), transparent 72%),
            #070708;
          background-attachment: fixed;
        }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
        ::selection { background: rgba(255,255,255,0.85); color: #07080d; }

        /* PAGE */
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(24px,6vh,80px) clamp(14px,4vw,48px);
        }

        /* SHELL */
        .shell {
          width: 100%; max-width: 840px; margin: 0 auto;
          padding: clamp(28px,5vw,60px) clamp(22px,4.5vw,58px) clamp(24px,4vw,44px);
        }

        /* HERO */
        .hero { text-align: center; padding-bottom: clamp(24px,4vh,40px); }
        .hero-rule {
          display: flex; justify-content: space-between;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em;
          color: var(--muted-2); text-transform: uppercase;
          padding-bottom: 16px; margin-bottom: clamp(24px,5vh,40px);
          border-bottom: 1px solid var(--glass-lo);
        }
        .hero-name {
          font-weight: 700;
          font-size: clamp(40px,8vw,84px);
          line-height: 0.98; letter-spacing: -0.035em;
          background: linear-gradient(180deg,#ffffff,rgba(255,255,255,0.72));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hero-role {
          margin-top: 16px; font-size: clamp(12px,1.3vw,14px);
          font-weight: 600; letter-spacing: 0.04em; color: var(--fg);
        }
        .hero-tag {
          margin: 18px auto 0; max-width: 46ch;
          font-size: clamp(15px,1.5vw,17px); color: var(--muted); line-height: 1.5;
        }
        .hero-links {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-top: 28px; justify-content: center;
        }
        .hero-link {
          font-size: 13px; font-weight: 500; letter-spacing: 0.01em;
          border-radius: var(--r-pill);
          background: var(--glass); border: 1px solid var(--glass-lo);
          box-shadow: 0 1px 0 var(--glass-hi) inset;
          padding: 9px 17px;
          transition: background .2s, transform .2s, border-color .2s;
        }
        .hero-link:hover { background: var(--glass-2); border-color: var(--glass-hi); transform: translateY(-1px); }
        .hero-note {
          color: var(--fg);
          position: relative;
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.28);
          animation: notePulse 2.2s ease-in-out 1.2s infinite;
        }
        .hero-note::before {
          content: "";
          position: absolute; inset: -3px; border-radius: inherit;
          border: 1.5px solid rgba(255,255,255,0.5);
          animation: notePing 2.2s ease-out 1.2s infinite;
          pointer-events: none;
        }
        @keyframes notePing {
          0%   { transform: scale(1);    opacity: 0.7; }
          100% { transform: scale(1.22); opacity: 0;   }
        }
        @keyframes notePulse {
          0%,100% { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.25); box-shadow: 0 1px 0 var(--glass-hi) inset; }
          50%      { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.55); box-shadow: 0 1px 0 var(--glass-hi) inset, 0 0 18px rgba(255,255,255,0.14); }
        }
        .hero-note:hover { animation: none; color: #fff; background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.6); }
        .hero-note:hover::before { display: none; }

        /* ROWS HEAD */
        .rows-head {
          display: flex; justify-content: space-between;
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.16em; color: var(--muted-2);
          margin-bottom: 14px; text-transform: uppercase;
        }

        /* ROWS */
        .rows { display: flex; flex-direction: column; gap: 10px; }

        .row {
          display: grid;
          grid-template-columns: 14px 28px 1fr auto 20px;
          align-items: center;
          gap: 16px; text-align: left; width: 100%;
          padding: 16px 20px;
          border-radius: var(--r);
          background: var(--glass);
          border: 1px solid var(--glass-lo);
          box-shadow: 0 1px 0 var(--glass-hi) inset;
          position: relative; overflow: hidden;
          -webkit-backdrop-filter: saturate(160%) blur(8px);
          backdrop-filter: saturate(160%) blur(8px);
          transition: transform .32s cubic-bezier(.16,.84,.24,1), background .3s, border-color .3s, box-shadow .3s;
        }
        /* shimmer sweep */
        .row::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
          background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.10) 50%, transparent 62%);
          transform: translateX(-130%);
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .row:hover, .row:focus-visible {
          background: var(--glass-2); border-color: var(--glass-hi);
          transform: translateY(-2px);
          box-shadow: 0 1px 0 var(--glass-hi) inset, 0 18px 40px -22px rgba(0,0,0,.8);
          outline: none;
        }
        .row:hover::after { transform: translateX(130%); }

        .row-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--muted-2); display: block;
          transition: background .3s, box-shadow .3s, transform .3s;
        }
        .row:hover .row-dot, .row:focus-visible .row-dot {
          background: var(--accent);
          box-shadow: 0 0 0 4px rgba(255,255,255,0.18);
          transform: scale(1.15);
        }
        .row-idx {
          font-family: var(--mono); font-size: 12px;
          color: var(--muted-2); letter-spacing: 0.02em;
          transition: color .3s;
        }
        .row:hover .row-idx, .row:focus-visible .row-idx { color: var(--fg); }
        .row-main { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .row-name {
          font-weight: 600; font-size: clamp(17px,2.2vw,22px);
          line-height: 1.1; letter-spacing: -0.02em;
        }
        .row-tag {
          font-size: 13px; color: var(--muted); line-height: 1.35;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .row-status {
          font-family: var(--mono); font-size: 9px; font-weight: 600;
          letter-spacing: 0.12em; color: var(--muted);
          border-radius: var(--r-pill);
          background: var(--glass); border: 1px solid var(--glass-lo);
          padding: 5px 10px; white-space: nowrap;
          transition: color .3s, border-color .3s, background .3s;
        }
        .row:hover .row-status, .row:focus-visible .row-status {
          color: #fff; border-color: var(--glass-hi);
          background: rgba(255,255,255,0.12);
        }
        .row-arrow {
          font-size: 16px; color: var(--muted-2);
          transition: transform .3s, color .3s; justify-self: end;
        }
        .row:hover .row-arrow, .row:focus-visible .row-arrow {
          color: var(--accent); transform: translate(3px,-3px);
        }

        /* REVEAL */
        [data-reveal] {
          opacity: 0; transform: translateY(16px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
          transition-delay: calc(var(--row-i, 0) * 40ms);
        }
        [data-reveal].in { opacity: 1; transform: none; }

        /* FOOTER */
        .foot {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 14px;
          margin-top: clamp(26px,4vh,42px); padding-top: 22px;
          border-top: 1px solid var(--glass-lo);
          font-family: var(--mono); font-size: 11px;
          color: var(--muted-2); letter-spacing: 0.02em;
        }
        .foot-r { display: flex; gap: 18px; }
        .foot-r a:hover, .foot-note:hover { color: var(--fg); }

        /* PANEL */
        .panel-wrap {
          position: fixed; inset: 0; z-index: 8000;
          pointer-events: none; overflow: hidden;
        }
        .panel-wrap.open { pointer-events: auto; }
        .panel-scrim {
          position: absolute; inset: 0;
          background: rgba(5,6,12,0);
          -webkit-backdrop-filter: blur(0px); backdrop-filter: blur(0px);
          transition: background .4s, backdrop-filter .4s, -webkit-backdrop-filter .4s;
        }
        .panel-wrap.open .panel-scrim {
          background: rgba(5,6,12,0.55);
          -webkit-backdrop-filter: blur(7px); backdrop-filter: blur(7px);
        }
        .panel {
          position: absolute; top: 0; right: 0; height: 100%;
          width: min(640px,100%);
          background: rgba(14,15,22,0.72);
          -webkit-backdrop-filter: saturate(180%) blur(44px);
          backdrop-filter: saturate(180%) blur(44px);
          border-left: 1px solid var(--glass-hi);
          transform: translateX(100%);
          transition: transform .46s cubic-bezier(.16,.84,.24,1);
          overflow-y: auto; overflow-x: hidden;
          box-shadow: -50px 0 100px rgba(0,0,0,.55);
        }
        .panel-wrap.open .panel { transform: none; }
        .panel-inner { padding: clamp(26px,4vw,50px); }
        .panel-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .panel-idx { font-family: var(--mono); font-size: 12px; color: var(--muted-2); letter-spacing: 0.08em; }
        .panel-x {
          font-size: 12px; font-weight: 500; letter-spacing: 0.02em; color: var(--fg);
          border-radius: var(--r-pill); background: var(--glass); border: 1px solid var(--glass-lo);
          padding: 8px 14px; transition: background .18s, transform .18s;
        }
        .panel-x:hover { background: var(--glass-2); transform: translateY(-1px); }
        .panel-status {
          font-family: var(--mono); font-size: 10px; font-weight: 600;
          letter-spacing: 0.12em; color: #fff;
          border-radius: var(--r-pill); padding: 4px 11px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .panel-name {
          font-weight: 700;
          font-size: clamp(30px,5vw,50px); line-height: 1.02;
          letter-spacing: -0.03em; margin: 16px 0 12px;
        }
        .panel-tag { font-size: 15px; color: var(--muted); }
        .panel-desc { margin: 26px 0; font-size: 16px; line-height: 1.6; color: var(--fg); }
        .panel-preview { margin: 26px 0 4px; }
        .panel-sect { margin: 28px 0; }
        .sect-label {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.55); margin-bottom: 12px; text-transform: uppercase;
        }
        .panel-behind { font-size: 14px; color: var(--muted); line-height: 1.6; }
        .feat-list { list-style: none; border-top: 1px solid var(--glass-lo); margin: 28px 0; }
        .feat {
          display: grid; grid-template-columns: 32px 1fr;
          gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--glass-lo);
        }
        .feat-n { font-family: var(--mono); font-size: 12px; color: rgba(255,255,255,0.45); padding-top: 2px; }
        .feat-body { font-size: 14px; line-height: 1.55; }
        .feat-body strong { font-weight: 600; color: var(--fg); }
        .feat-rest { color: var(--muted); }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip {
          font-size: 12px; letter-spacing: 0.01em; color: var(--muted);
          border-radius: var(--r-pill); background: var(--glass); border: 1px solid var(--glass-lo);
          padding: 7px 13px;
        }
        .panel-note {
          font-size: 12px; color: var(--muted); border-radius: 14px;
          background: var(--glass); border: 1px solid var(--glass-lo);
          padding: 13px 15px; margin: 22px 0; line-height: 1.5;
        }
        .panel-cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 34px; }
        .btn {
          font-size: 14px; font-weight: 500; letter-spacing: 0.01em;
          border-radius: var(--r-pill); border: 1px solid var(--glass-lo);
          background: var(--glass); box-shadow: 0 1px 0 var(--glass-hi) inset;
          padding: 13px 22px;
          transition: background .18s, transform .18s;
          color: var(--fg);
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
          background: linear-gradient(180deg,#ffffff,#c8c8cc);
          color: #07080d; border-color: transparent;
          box-shadow: 0 8px 24px -10px rgba(255,255,255,0.4);
        }
        .btn-primary:hover { filter: brightness(1.06); }
        .btn:not(.btn-primary):not(.btn-disabled):hover { background: var(--glass-2); }
        .btn-disabled { color: var(--muted-2); cursor: default; }
        .btn-disabled:hover { transform: none; }
        .btn-arr { opacity: .8; }

        /* PREVIEW */
        .pv-window {
          border-radius: var(--r); overflow: hidden;
          background: var(--glass); border: 1px solid var(--glass-lo);
          box-shadow: 0 1px 0 var(--glass-hi) inset, 0 20px 50px -24px rgba(0,0,0,.7);
        }
        .pv-bar {
          display: flex; align-items: center; gap: 12px; padding: 11px 14px;
          background: rgba(255,255,255,0.05); border-bottom: 1px solid var(--glass-lo);
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
        }
        .pv-dots { display: flex; gap: 7px; }
        .chrome-dot { width: 11px; height: 11px; border-radius: 50%; display: block; background: rgba(255,255,255,0.22); }
        .pv-dots .chrome-dot:nth-child(1) { background: #ff5f57; }
        .pv-dots .chrome-dot:nth-child(2) { background: #febc2e; }
        .pv-dots .chrome-dot:nth-child(3) { background: #28c840; }
        .pv-url {
          flex: 1; font-family: var(--mono); font-size: 11.5px; color: var(--muted);
          background: rgba(0,0,0,0.22); border: 1px solid var(--glass-lo);
          border-radius: var(--r-pill); padding: 6px 12px; text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pv-apptitle { flex: 1; text-align: center; font-size: 12px; color: var(--muted); font-weight: 500; }
        .pv-spacer { width: 60px; }
        .pv-live {
          font-size: 11px; font-weight: 600; color: #fff;
          border-radius: var(--r-pill); padding: 6px 12px; white-space: nowrap;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
          transition: background .18s, transform .18s;
        }
        .pv-live:hover { background: rgba(255,255,255,0.22); transform: translateY(-1px); }
        .pv-body { aspect-ratio: 16/10; position: relative; overflow: hidden; background: rgba(0,0,0,0.25); }
        .pv-iframe { width: 100%; height: 100%; border: none; background: #fff; display: block; }
        .pv-placeholder {
          width: 100%; height: 100%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
        }
        .pv-placeholder-txt {
          font-family: var(--mono); font-size: 14px; letter-spacing: 0.08em; color: var(--muted-2);
        }
        .pv-placeholder-sub { font-family: var(--mono); font-size: 11px; color: rgba(255,255,255,0.2); }
        .pv-loading {
          position: absolute; inset: 0; display: grid; place-items: center; z-index: 0;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em;
          color: var(--muted-2); text-transform: uppercase;
          background: linear-gradient(100deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 70%);
          background-size: 220% 100%;
          animation: shimmer 1.4s linear infinite;
        }
        @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -120% 0; } }
        .pv-termbody {
          aspect-ratio: 16/10; padding: 20px 22px;
          font-family: var(--mono); font-size: 13px; line-height: 1.9;
          background: rgba(0,0,0,0.32); display: block;
        }
        .tl-cmd { color: var(--fg); }
        .tl-out { color: rgba(255,255,255,0.75); }
        .tl-log { color: var(--muted); }
        .cursor { color: var(--accent); animation: blink 1s steps(2) infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        /* FEEDBACK */
        .fb-wrap {
          position: fixed; right: clamp(14px,3vw,30px); bottom: clamp(14px,3vw,30px);
          z-index: 8500; max-width: calc(100vw - 28px);
          animation: fbIn .45s cubic-bezier(.16,.84,.24,1);
        }
        @keyframes fbIn { from { opacity: 0; transform: translateY(22px) scale(.97); } }
        .fb-card {
          width: 380px; max-width: 100%;
          border-radius: var(--r-lg);
          background: rgba(16,17,24,0.78);
          -webkit-backdrop-filter: saturate(180%) blur(34px);
          backdrop-filter: saturate(180%) blur(34px);
          border: 1px solid var(--glass-hi);
          padding: 26px; position: relative;
          box-shadow: 0 1px 0 var(--glass-hi) inset, 0 30px 70px rgba(0,0,0,.65);
        }
        .fb-x {
          position: absolute; top: 16px; right: 16px;
          font-size: 15px; color: var(--muted);
          width: 28px; height: 28px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--glass);
        }
        .fb-x:hover { color: #fff; background: var(--glass-2); }
        .fb-kicker {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.14em; color: rgba(255,255,255,0.5); text-transform: uppercase;
        }
        .fb-title { font-weight: 700; font-size: 26px; letter-spacing: -0.02em; margin: 8px 0 12px; }
        .fb-copy { font-size: 13.5px; line-height: 1.6; color: var(--muted); }
        .fb-input, .fb-contact {
          width: 100%; font-family: var(--sans); font-size: 14px; color: var(--fg);
          background: rgba(0,0,0,0.28); border: 1px solid var(--glass-lo);
          border-radius: 14px; padding: 12px 14px; margin-top: 14px;
          resize: vertical; box-sizing: border-box;
        }
        .fb-input:focus, .fb-contact:focus {
          outline: none; border-color: rgba(255,255,255,0.35);
        }
        .fb-input::placeholder, .fb-contact::placeholder { color: var(--muted-2); }
        .fb-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; gap: 12px; }
        .fb-skip { font-size: 13px; color: var(--muted); }
        .fb-skip:hover { color: var(--fg); }
        .fb-send {
          font-size: 14px; font-weight: 600; color: #07080d;
          border-radius: var(--r-pill); padding: 11px 20px;
          background: linear-gradient(180deg,#ffffff,#c7c7cc);
          box-shadow: 0 8px 22px -10px rgba(255,255,255,0.4);
        }
        .fb-send:hover { filter: brightness(1.06); }
        .fb-thanks { text-align: left; }

        /* MEDIA */
        .pv-media { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pv-shots { position: relative; width: 100%; height: 100%; }
        .pv-shots .pv-media { position: absolute; inset: 0; }
        .pv-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center;
          background: rgba(0,0,0,0.55); color: #fff; font-size: 20px; z-index: 2;
          transition: background .2s, transform .2s;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .pv-nav:hover { background: rgba(0,0,0,0.78); transform: translateY(-50%) scale(1.05); }
        .pv-nav-prev { left: 10px; }
        .pv-nav-next { right: 10px; }
        .pv-ind {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 2;
        }
        .pv-ind-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.35); cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .pv-ind-dot.on { background: #fff; transform: scale(1.3); }

        /* RESPONSIVE */
        @media (max-width: 620px) {
          .row { grid-template-columns: 12px 22px 1fr auto; gap: 12px; padding: 14px 16px; }
          .row-arrow { display: none; }
          .row-tag { white-space: normal; }
          .hero-name { font-size: clamp(36px,13vw,56px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <div className="page">
        <main className="shell">
          {/* HERO */}
          <header className="hero">
            <div className="hero-rule" data-reveal>
              <span>PORTFOLIO</span>
              <span>{new Date().getFullYear()}</span>
            </div>
            <h1 className="hero-name" data-reveal>sonali nayak</h1>
            <div className="hero-role" data-reveal>fullstack developer ·· building in public</div>
            <p className="hero-tag" data-reveal>
              I build AI systems that ship — pipelines, agents, and tools that survive contact with production.
            </p>
            <div className="hero-links" data-reveal>
              <a href="https://github.com/techwarq" target="_blank" rel="noreferrer" className="hero-link">GitHub ↗</a>
              <a href="https://www.npmjs.com/package/@techwarq/ailens" target="_blank" rel="noreferrer" className="hero-link">npm ↗</a>
              <button className="hero-link hero-note" onClick={() => setFb(true)}>leave a note ✎</button>
            </div>
          </header>

          {/* ROWS */}
          <div className="rows-head" data-reveal>
            <span>// selected work</span>
            <span>{String(PROJECTS.length).padStart(2, "0")} builds</span>
          </div>
          <div className="rows">
            {PROJECTS.map((p, i) => (
              <Row key={p.id} p={p} index={i} onOpen={setOpenIdx} />
            ))}
          </div>

          {/* FOOTER */}
          <footer className="foot" data-reveal>
            <span>sonali nayak — {new Date().getFullYear()}</span>
            <span className="foot-r">
              <a href="https://github.com/techwarq" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.npmjs.com/package/@techwarq/ailens" target="_blank" rel="noreferrer">npm</a>
              <button className="foot-note" onClick={() => setFb(true)}>feedback</button>
            </span>
          </footer>
        </main>

        {/* DETAIL PANEL */}
        <DetailPanel
          p={openIdx != null ? PROJECTS[openIdx] : null}
          index={openIdx ?? 0}
          onClose={() => setOpenIdx(null)}
        />

        {/* FEEDBACK */}
        <FeedbackPopup open={fb} onClose={closeFb} />
      </div>
    </>
  );
}
