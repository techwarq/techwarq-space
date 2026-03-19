"use client";

import { useState, useEffect } from "react";

/* ── RETRO PALETTE ──────────────────────────────────────────── */
const AMBER      = "#DFA05D";   // primary accent — warm gold
const TERRA      = "#AC5045";   // secondary — terracotta red
const SAGE       = "#658761";   // tertiary — sage green
const WHITE      = "#F2EDE4";   // warm off-white (aged paper)
const GREY       = "#9A9080";   // warm grey
const DIM        = "#5A5248";   // dimmed text
const BG         = "#141210";   // near-black with warm tint
const CARD       = "#1C1916";   // card background
const BORDER     = "#2E2A26";   // warm dark border
const BORDER2    = "#3D3830";   // slightly lighter border

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const disp = { fontFamily: "'Bebas Neue', sans-serif" };

/* ── GLOBAL CSS ─────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #141210; overflow-x: hidden; }
    ::selection { background: #DFA05D; color: #141210; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #141210; }
    ::-webkit-scrollbar-thumb { background: #DFA05D; }

    @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
    @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes ticker  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
    @keyframes grainShift {
      0%   { transform: translate(0px, 0px); }
      10%  { transform: translate(-2px, 1px); }
      20%  { transform: translate(2px, -2px); }
      30%  { transform: translate(-1px, 2px); }
      40%  { transform: translate(2px, 1px); }
      50%  { transform: translate(-2px, -1px); }
      60%  { transform: translate(1px, 2px); }
      70%  { transform: translate(-1px, -2px); }
      80%  { transform: translate(2px, 2px); }
      90%  { transform: translate(-2px, 0px); }
      100% { transform: translate(0px, 0px); }
    }
    .grain-overlay {
      position: fixed; inset: -20%;
      width: 140%; height: 140%;
      pointer-events: none; z-index: 9998;
      opacity: 0.09;
      animation: grainShift 0.4s steps(1) infinite;
    }

    /* ── MOBILE ≤768px ── */
    @media (max-width: 768px) {
      .desktop-nav-links { display: none !important; }
      .hamburger          { display: flex !important; }

      .hero-section {
        grid-template-columns: 1fr !important;
        min-height: auto !important;
        background: ${AMBER} !important;
        border-bottom: 3px solid ${BG} !important;
      }
      .hero-left {
        border-right: none !important;
        padding: 32px 24px 28px !important;
        background: ${AMBER} !important;
      }
      .hero-label-box  { background: ${BG} !important; color: ${AMBER} !important; }
      .hero-label-text { color: ${BG} !important; }
      .hero-h1         { color: ${BG} !important; font-size: 90px !important; }
      .hero-h1-accent  { color: ${BG} !important; -webkit-text-stroke: 2px ${BG} !important; }
      .hero-role       { color: rgba(20,18,16,0.55) !important; font-size: 22px !important; }
      .hero-desc       { color: rgba(20,18,16,0.7) !important; }
      .hero-stat-num   { color: ${BG} !important; font-size: 44px !important; }
      .hero-stat-lbl   { color: rgba(20,18,16,0.5) !important; }
      .hero-stat-div   { border-left-color: rgba(20,18,16,0.2) !important; }
      .hero-stat-bar   { border-top-color: rgba(20,18,16,0.2) !important; }
      .hero-right      { display: none !important; }

      .mobile-skill-grid { display: grid !important; }

      .ticker-wrap { background: ${BG} !important; }
      .ticker-item { color: ${AMBER} !important; }

      .about-grid   { grid-template-columns: 1fr !important; gap: 40px !important; }
      .work-grid    { grid-template-columns: 1fr !important; }
      .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .featured-card { grid-template-columns: 1fr !important; grid-column: span 1 !important; }
      .featured-visual { min-height: 180px !important; }
      .section-pad { padding: 64px 20px !important; }
      .work-section { padding: 64px 20px !important; }
      .footer-inner { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
      .footer-socials { flex-wrap: wrap !important; gap: 16px !important; }

      .mobile-menu {
        position: fixed; inset: 0; background: ${AMBER}; z-index: 10000;
        display: flex; flex-direction: column;
        padding: 80px 32px 40px;
        animation: slideIn .3s ease;
      }
      .mobile-menu-link {
        font-size: 72px; letter-spacing: 3px; color: ${BG};
        border-bottom: 2px solid rgba(20,18,16,0.15); padding: 16px 0;
        cursor: pointer;
      }
    }
    @media (min-width: 769px) {
      .mobile-skill-grid { display: none !important; }
      .hamburger          { display: none !important; }
      .mobile-menu        { display: none !important; }
    }
  `}</style>
);

/* ── GRAIN OVERLAY (canvas-based, actually works) ───────────── */
function GrainOverlay() {
  useEffect(() => {
    const canvas = document.getElementById("grain-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 300, H = 300;
    canvas.width = W;
    canvas.height = H;
    function generateGrain() {
      if (!ctx) return;
      const img = ctx.createImageData(W, H);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255 | 0;
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }
    generateGrain();
    const id = setInterval(generateGrain, 80);
    return () => clearInterval(id);
  }, []);
  return (
    <canvas id="grain-canvas" style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 9998,
      opacity: 0.06, mixBlendMode: "overlay",
      animation: "grainShift 0.4s steps(1) infinite",
      imageRendering: "pixelated",
    }} />
  );
}

/* ── HELPERS ────────────────────────────────────────────────── */
const Tag = ({ ch, color }: { ch: string; color?: string }) => {
  const c = color || AMBER;
  return (
    <span style={{ ...mono, fontSize: 10, color: GREY, border: `1px solid ${BORDER}`, padding: "3px 10px", letterSpacing: 2, textTransform: "uppercase", cursor: "default", display: "inline-block", transition: "all .2s" }}
      onMouseEnter={e => { (e.currentTarget as any).style.color = c; (e.currentTarget as any).style.borderColor = c; }}
      onMouseLeave={e => { (e.currentTarget as any).style.color = GREY; (e.currentTarget as any).style.borderColor = BORDER; }}>
      {ch}
    </span>
  );
};

const SectionLabel = ({ num, title, accent }: { num: string; title: string; accent?: string }) => {
  const c = accent || AMBER;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
      <span style={{ ...mono, fontSize: 9, color: c, border: `1px solid ${c}`, padding: "4px 10px", letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>{num}</span>
      <h2 style={{ ...disp, fontSize: "clamp(36px,6vw,56px)", letterSpacing: 4, color: WHITE, lineHeight: 1 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: BORDER, minWidth: 20 }} />
    </div>
  );
};

/* ── TERMINAL ───────────────────────────────────────────────── */
const LINES = [
  { text: "$ whoami",                                 color: DIM,     delay: 0    },
  { text: "> SONALI NAYAK — fullstack developer",        color: AMBER,   delay: 500  },
  { text: "$ cat stack.txt",                          color: DIM,     delay: 1200 },
  { text: "> react · next.js · node · typescript",    color: SAGE,    delay: 1800 },
  { text: "> tailwind · prisma · postgres · redis",   color: SAGE,    delay: 2200 },
  { text: "$ status",                                 color: DIM,     delay: 2900 },
  { text: "> 5 yrs · 40+ shipped · available now",    color: TERRA,   delay: 3500 },
];

function Terminal() {
  const [shown, setShown] = useState(0);
  useEffect(() => { LINES.forEach((l, i) => setTimeout(() => setShown(i + 1), l.delay)); }, []);
  return (
    <div style={{ background: "#0E0C0A", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${AMBER}`, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: TERRA }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: AMBER, opacity: 0.7 }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: SAGE, opacity: 0.7 }} />
        <span style={{ ...mono, fontSize: 10, color: DIM, marginLeft: 12, letterSpacing: 2, textTransform: "uppercase" }}>bash — portfolio.sh</span>
      </div>
      {LINES.slice(0, shown).map((l, i) => (
        <div key={i} style={{ ...mono, fontSize: 12, color: l.color, lineHeight: 2.1, letterSpacing: 0.5, animation: "fadeUp .3s ease" }}>
          {l.text}
          {i === shown - 1 && <span style={{ display: "inline-block", width: 8, height: 14, marginLeft: 4, verticalAlign: "middle", background: AMBER, animation: "blink 1s step-end infinite" }} />}
        </div>
      ))}
    </div>
  );
}

/* ── TICKER ─────────────────────────────────────────────────── */
const TECH = ["REACT","NEXT.JS","NODE.JS","TYPESCRIPT","POSTGRESQL","REDIS","GRAPHQL","DOCKER","AWS","PRISMA","TAILWIND","VITEST"];
function Ticker() {
  const items = [...TECH, ...TECH];
  return (
    <div className="ticker-wrap" style={{ background: AMBER, overflow: "hidden", padding: "11px 0", borderTop: `1px solid ${BG}`, borderBottom: `1px solid ${BG}` }}>
      <div style={{ display: "flex", animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
        {items.map((t, i) => (
          <span key={i} className="ticker-item" style={{ ...disp, fontSize: 13, color: BG, padding: "0 32px", letterSpacing: 4, opacity: i % 2 === 0 ? 1 : 0.55 }}>
            {t} <span style={{ opacity: 0.3 }}>//</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── MOBILE SKILL GRID ──────────────────────────────────────── */
const SKILL_TILES = [
  { label: "REACT",      icon: "⬡", accent: TERRA },
  { label: "NEXT.JS",    icon: "▲", accent: BG    },
  { label: "NODE.JS",    icon: "◉", accent: TERRA },
  { label: "TYPESCRIPT", icon: "◈", accent: BG    },
  { label: "POSTGRES",   icon: "⬢", accent: TERRA },
  { label: "REDIS",      icon: "◆", accent: BG    },
  { label: "GRAPHQL",    icon: "⟁", accent: TERRA },
  { label: "DOCKER",     icon: "▣", accent: BG    },
  { label: "AWS",        icon: "○", accent: TERRA },
  { label: "TAILWIND",   icon: "△", accent: BG    },
];

function MobileSkillGrid() {
  return (
    <div className="mobile-skill-grid"
      style={{ display: "none", gridTemplateColumns: "1fr 1fr", gap: 2, background: BG, border: `2px solid ${BG}`, margin: "0 -24px" }}>
      {SKILL_TILES.map((tile, i) => (
        <div key={tile.label} style={{
          background: tile.accent === BG ? BG : AMBER,
          padding: "20px 18px",
          borderBottom: `2px solid ${BG}`,
          borderRight: i % 2 === 0 ? `2px solid ${BG}` : "none",
        }}>
          <div style={{ ...mono, fontSize: 9, color: tile.accent === BG ? AMBER : BG, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, opacity: 0.75 }}>{tile.label}</div>
          <div style={{ ...disp, fontSize: 52, color: tile.accent === BG ? AMBER : BG, lineHeight: 1, opacity: 0.85 }}>{tile.icon}</div>
        </div>
      ))}
      <div style={{ background: TERRA, padding: "20px 18px", gridColumn: "span 2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ ...mono, fontSize: 10, color: WHITE, letterSpacing: 2, textTransform: "uppercase" }}>// AVAILABLE FOR WORK</span>
        <span style={{ ...disp, fontSize: 22, color: WHITE }}>→</span>
      </div>
    </div>
  );
}

/* ── PROJECT CARDS ──────────────────────────────────────────── */
interface Project {
  num: string;
  featured?: boolean;
  title: string;
  type: string;
  desc: string;
  stack: string[];
  metric: {
    val: string;
    label: string;
  };
  accent?: string;
}

const PROJECTS: Project[] = [
  { num: "001", featured: true,
    title: "NEXUS PLATFORM", type: "Full-Stack Application",
    desc: "Real-time collaboration platform — live cursors, CRDT sync, E2E encryption. Scaled to 10k+ concurrent users.",
    stack: ["Next.js", "WebSockets", "Redis", "Prisma", "TypeScript"],
    metric: { val: "10k+", label: "concurrent users" }, accent: AMBER },
  { num: "002",
    title: "CORE API", type: "Backend / Infrastructure",
    desc: "High-throughput REST & GraphQL API at 2M+ req/day. Custom rate limiting, distributed tracing, full observability.",
    stack: ["Node.js", "GraphQL", "PostgreSQL", "Grafana"],
    metric: { val: "2M+", label: "req / day" }, accent: TERRA },
  { num: "003",
    title: "SHIFT DASHBOARD", type: "Frontend / Data Viz",
    desc: "Analytics dashboard — 30+ chart types, SSR data fetching, pixel-perfect dark mode built from scratch in 3 weeks.",
    stack: ["React", "Recharts", "Tailwind", "Zustand"],
    metric: { val: "30+", label: "chart types" }, accent: SAGE },
  { num: "004",
    title: "AUTH ENGINE", type: "Open-Source Library",
    desc: "Zero-dependency auth toolkit — JWT, OAuth2, magic links, TOTP. 800+ GitHub stars, used in 200+ projects.",
    stack: ["TypeScript", "JWT", "OAuth2", "NPM"],
    metric: { val: "800+", label: "GitHub stars" }, accent: AMBER },
];

function ProjectCard({ p }: { p: Project }) {
  const [hov, setHov] = useState(false);
  const ac = p.accent || AMBER;
  const hS = hov ? { borderColor: ac, transform: "translate(-3px,-3px)", boxShadow: `5px 5px 0 ${ac}` } : {};

  if (p.featured) return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="featured-card"
      style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", background: CARD, border: `1px solid ${BORDER}`, transition: "all .25s", cursor: "crosshair", ...hS }}>
      <div className="featured-visual" style={{ borderRight: `1px solid ${BORDER}`, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#0E0C0A", position: "relative", overflow: "hidden" }}>
        {/* retro stripe accent */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, display: "flex" }}>
          <div style={{ flex: 1, background: AMBER }} />
          <div style={{ flex: 1, background: TERRA }} />
          <div style={{ flex: 1, background: SAGE }} />
        </div>
        <span style={{ ...disp, fontSize: 110, color: AMBER, opacity: hov ? 0.1 : 0.04, position: "absolute", letterSpacing: 8, transition: "opacity .4s", userSelect: "none" }}>FEAT</span>
        <span style={{ ...disp, fontSize: 90, color: AMBER, opacity: 0.3, position: "relative", zIndex: 1 }}>◈</span>
      </div>
      <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <span style={{ ...mono, fontSize: 9, color: ac, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 12 }}>PROJECT {p.num} — FEATURED</span>
          <div style={{ ...disp, fontSize: "clamp(32px,4vw,46px)", letterSpacing: 2, color: WHITE, lineHeight: 1, marginBottom: 10 }}>{p.title}</div>
          <div style={{ ...mono, fontSize: 10, color: GREY, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 20, height: 1, background: ac, display: "inline-block" }} />{p.type}
          </div>
          <p style={{ ...mono, fontSize: 12, color: GREY, lineHeight: 1.9, marginBottom: 18 }}>{p.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{p.stack.map(s => <Tag key={s} ch={s} color={ac} />)}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${BORDER}`, paddingTop: 18, marginTop: 24 }}>
          <div>
            <span style={{ ...disp, fontSize: 38, color: ac, lineHeight: 1 }}>{p.metric.val}</span>
            <span style={{ ...mono, fontSize: 9, color: DIM, letterSpacing: 2, textTransform: "uppercase", marginLeft: 8 }}>{p.metric.label}</span>
          </div>
          <a href="#" style={{ ...mono, fontSize: 10, color: ac, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase" }}>VIEW →</a>
        </div>
      </div>
    </div>
  );

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: CARD, border: `1px solid ${BORDER}`, padding: "36px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", cursor: "crosshair", transition: "all .25s", ...hS }}>
      <div style={{ position: "absolute", top: 0, left: 0, height: 3, background: ac, width: hov ? "100%" : 0, transition: "width .4s ease" }} />
      <div>
        <span style={{ ...mono, fontSize: 9, color: ac, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 16 }}>PROJECT {p.num}</span>
        <div style={{ ...disp, fontSize: "clamp(28px,3.5vw,38px)", letterSpacing: 2, color: WHITE, lineHeight: 1, marginBottom: 8 }}>{p.title}</div>
        <div style={{ ...mono, fontSize: 10, color: GREY, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 16, height: 1, background: ac, display: "inline-block" }} />{p.type}
        </div>
        <p style={{ ...mono, fontSize: 12, color: GREY, lineHeight: 1.9, marginBottom: 16 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{p.stack.map(s => <Tag key={s} ch={s} color={ac} />)}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${BORDER}`, paddingTop: 16, marginTop: 20 }}>
        <div>
          <span style={{ ...disp, fontSize: 30, color: ac, lineHeight: 1 }}>{p.metric.val}</span>
          <span style={{ ...mono, fontSize: 9, color: DIM, letterSpacing: 2, textTransform: "uppercase", marginLeft: 8 }}>{p.metric.label}</span>
        </div>
        <a href="#" style={{ ...mono, fontSize: 10, color: ac, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase" }}>VIEW →</a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ background: BG, minHeight: "100vh", color: WHITE, ...mono }}>
      <GlobalStyles />
      <GrainOverlay />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
        background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)" }} />

      {/* ── MOBILE MENU ──────────────────────────────────────── */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)}
            style={{ ...mono, position: "absolute", top: 22, right: 24, background: "none", border: "none", color: BG as any, fontSize: 28, cursor: "pointer" }}>✕</button>
          <div style={{ ...mono, fontSize: 9, color: "rgba(20,18,16,0.5)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>// NAVIGATE</div>
          {[["about","About"],["work","Work"],["contact","Contact"]].map(([id, label]) => (
            <div key={id} className="mobile-menu-link" style={{ ...disp }} onClick={() => scrollTo(id)}>{label}</div>
          ))}
          <div style={{ marginTop: "auto", ...mono, fontSize: 10, color: "rgba(20,18,16,0.55)", letterSpacing: 2, textTransform: "uppercase" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: BG, animation: "pulse 2s infinite" }} />
              AVAILABLE FOR WORK
            </div>
            hello@sonalinayak.dev
          </div>
        </div>
      )}

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 32px", borderBottom: `1px solid ${BORDER}`,
        background: "rgba(20,18,16,0.97)", backdropFilter: "blur(12px)" }}>
        <div>
          <div style={{ ...disp, fontSize: 24, color: AMBER, letterSpacing: 3 }}>SONALI NAYAK</div>
          <div style={{ ...mono, fontSize: 9, color: DIM, letterSpacing: 3, textTransform: "uppercase" }}>// fullstack dev</div>
        </div>
        <div className="desktop-nav-links" style={{ display: "flex", gap: 40 }}>
          {[["about","About"],["work","Work"],["contact","Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ ...mono, background: "none", border: "none", color: GREY, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget as any).style.color = WHITE}
              onMouseLeave={e => (e.currentTarget as any).style.color = GREY}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="desktop-nav-links" style={{ display: "flex", alignItems: "center", gap: 8, ...mono, fontSize: 10, color: GREY, letterSpacing: 2, textTransform: "uppercase" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: SAGE, animation: "pulse 2s infinite" }} />
            Available
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(true)}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <span style={{ display: "block", width: 24, height: 2, background: AMBER }} />
            <span style={{ display: "block", width: 24, height: 2, background: AMBER }} />
            <span style={{ display: "block", width: 16, height: 2, background: AMBER }} />
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-section" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 80, borderBottom: `1px solid ${BORDER}` }}>
        <div className="hero-left" style={{ padding: "72px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: `1px solid ${BORDER}` }}>
          <div>
            <div style={{ ...mono, fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>
              <span className="hero-label-box" style={{ background: AMBER, color: BG, padding: "3px 10px", marginRight: 12, fontWeight: 700 }}>01</span>
              <span className="hero-label-text" style={{ color: AMBER }}>DEVELOPER PORTFOLIO</span>
            </div>
            <h1 className="hero-h1" style={{ ...disp, fontSize: "clamp(80px,11vw,156px)", lineHeight: 0.88, letterSpacing: 2, color: WHITE, marginBottom: 8 }}>
              SONALI<br /><span className="hero-h1-accent" style={{ color: AMBER }}>NAYAK</span>
            </h1>
            <div className="hero-role" style={{ ...disp, fontSize: "clamp(22px,3vw,44px)", color: GREY, letterSpacing: 5, marginBottom: 36 }}>
              FULLSTACK DEVELOPER
            </div>
            <p className="hero-desc" style={{ ...mono, fontSize: 12, color: GREY, lineHeight: 2, maxWidth: 440 }}>
              I build fast, scalable, maintainable software — from pixel-perfect frontends to distributed backend systems. Every layer, end to end.
            </p>
            <div style={{ marginTop: 32 }}>
              <MobileSkillGrid />
            </div>
          </div>
          {/* stats */}
          <div className="hero-stat-bar" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: `1px solid ${BORDER}`, paddingTop: 32, marginTop: 48 }}>
            {[["5+","Yrs Exp", AMBER],["40+","Projects", TERRA],["20+","Clients", SAGE]].map(([n, l, c], i) => (
              <div key={l} className={i > 0 ? "hero-stat-div" : ""}
                style={{ paddingLeft: i > 0 ? 24 : 0, paddingRight: 24, borderLeft: i > 0 ? `1px solid ${BORDER}` : "none" }}>
                <div className="hero-stat-num" style={{ ...disp, fontSize: 52, color: c, lineHeight: 1 }}>{n}</div>
                <div className="hero-stat-lbl" style={{ ...mono, fontSize: 9, color: DIM, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — desktop */}
        <div className="hero-right" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, padding: "56px 44px", borderBottom: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ ...mono, fontSize: 9, color: AMBER, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>// LIVE TERMINAL</div>
            <Terminal />
          </div>
          <div style={{ padding: 44 }}>
            <div style={{ ...mono, fontSize: 9, color: DIM, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>// READY TO BUILD?</div>
            <p style={{ ...mono, fontSize: 12, color: GREY, lineHeight: 1.9, marginBottom: 24 }}>
              Open to full-time roles, contracts, and interesting freelance projects.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              {[{ label: "VIEW WORK →", id: "work", bg: AMBER, fg: BG },
                { label: "GET IN TOUCH", id: "contact", bg: "none", fg: WHITE, border: BORDER }].map(btn => (
                <button key={btn.label} onClick={() => scrollTo(btn.id)}
                  style={{ ...mono, background: btn.bg, color: btn.fg, border: btn.border ? `1px solid ${btn.border}` : "none",
                    padding: "14px 28px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                    fontWeight: btn.bg !== "none" ? 700 : 400, cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={e => { (e.currentTarget as any).style.transform = "translate(-2px,-2px)"; (e.currentTarget as any).style.boxShadow = `4px 4px 0 ${BORDER2}`;
                    if (btn.border) { (e.currentTarget as any).style.borderColor = AMBER; (e.currentTarget as any).style.color = AMBER; }}}
                  onMouseLeave={e => { (e.currentTarget as any).style.transform = "none"; (e.currentTarget as any).style.boxShadow = "none";
                    if (btn.border) { (e.currentTarget as any).style.borderColor = BORDER; (e.currentTarget as any).style.color = WHITE; }}}>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="section-pad about-grid"
        style={{ padding: "100px 48px", borderBottom: `1px solid ${BORDER}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
        <div>
          <SectionLabel num="02" title="ABOUT" accent={AMBER} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 52 }}>
            <p style={{ ...mono, fontSize: 12, color: GREY, lineHeight: 2 }}>
              <span style={{ color: WHITE, fontWeight: 700 }}>I&apos;m a fullstack developer</span> obsessed with the craft of writing clean, purposeful code. I care as much about the architecture beneath as the interface above.
            </p>
            <p style={{ ...mono, fontSize: 12, color: GREY, lineHeight: 2 }}>
              My sweet spot is <span style={{ color: WHITE, fontWeight: 700 }}>React + Node</span> ecosystems — component systems, APIs that scale, deploys that stay boring.
            </p>
            <p style={{ ...mono, fontSize: 12, color: GREY, lineHeight: 2 }}>
              When I&apos;m not coding I&apos;m contributing to open source, reading RFCs, or thinking too hard about <span style={{ color: WHITE, fontWeight: 700 }}>data modelling</span>.
            </p>
          </div>
          <div style={{ ...mono, fontSize: 9, color: AMBER, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>// EXPERIENCE</div>
          {[
            { role: "Senior Engineer", co: "ACME Corp",  period: "2023 — NOW",  c: AMBER },
            { role: "Frontend Lead",   co: "StartupXYZ", period: "2021 — 2023", c: TERRA },
            { role: "Dev / Freelance", co: "Self",        period: "2019 — 2021", c: SAGE  },
          ].map(e => (
            <div key={e.co} style={{ display: "flex", justifyContent: "space-between", padding: "18px 0", borderTop: `1px solid ${BORDER}` }}>
              <div>
                <div style={{ ...mono, fontSize: 13, color: WHITE, textTransform: "uppercase", letterSpacing: 1 }}>{e.role}</div>
                <div style={{ ...mono, fontSize: 10, color: e.c, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{e.co}</div>
              </div>
              <div style={{ ...mono, fontSize: 10, color: DIM, letterSpacing: 1, textTransform: "uppercase" }}>{e.period}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "FRONTEND", accent: AMBER, tags: ["React","Next.js","TypeScript","Tailwind","Framer Motion","Zustand","React Query"] },
            { label: "BACKEND",  accent: TERRA, tags: ["Node.js","Express","Fastify","GraphQL","REST","WebSockets","tRPC"] },
            { label: "DATA",     accent: SAGE,  tags: ["PostgreSQL","Redis","Prisma","Drizzle","MongoDB","Elasticsearch"] },
            { label: "INFRA",    accent: AMBER, tags: ["Docker","AWS","Vercel","CI/CD","Vitest","Playwright","Turborepo"] },
          ].map(block => (
            <div key={block.label}
              style={{ background: CARD, border: `1px solid ${BORDER}`, padding: "20px 22px", transition: "border-color .2s, box-shadow .2s", cursor: "crosshair" }}
              onMouseEnter={e => { (e.currentTarget as any).style.borderColor = block.accent; (e.currentTarget as any).style.boxShadow = `3px 3px 0 ${block.accent}`; }}
              onMouseLeave={e => { (e.currentTarget as any).style.borderColor = BORDER; (e.currentTarget as any).style.boxShadow = "none"; }}>
              <div style={{ ...mono, fontSize: 9, color: block.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>// {block.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{block.tags.map(t => <Tag key={t} ch={t} color={block.accent} />)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────── */}
      <section id="work" className="work-section" style={{ padding: "100px 48px", borderBottom: `1px solid ${BORDER}` }}>
        <SectionLabel num="03" title="SELECTED WORK" accent={TERRA} />
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: BORDER }}>
          {PROJECTS.map(p => <ProjectCard key={p.num} p={p} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <a href="#"
            style={{ ...mono, fontSize: 11, color: GREY, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", border: `1px solid ${BORDER}`, padding: "12px 24px", transition: "all .2s" }}
            onMouseEnter={e => { (e.currentTarget as any).style.color = AMBER; (e.currentTarget as any).style.borderColor = AMBER; }}
            onMouseLeave={e => { (e.currentTarget as any).style.color = GREY;  (e.currentTarget as any).style.borderColor = BORDER; }}>
            ALL PROJECTS →
          </a>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="section-pad contact-grid"
        style={{ padding: "100px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
        <div>
          <SectionLabel num="04" title="CONTACT" accent={SAGE} />
          <div style={{ ...disp, fontSize: "clamp(52px,7vw,108px)", lineHeight: 0.9, letterSpacing: 2, color: WHITE, marginBottom: 48 }}>
            LET&apos;S<br />BUILD<br /><span style={{ color: AMBER }}>SOMETHING.</span>
          </div>
          {/* retro 3-stripe bar */}
          <div style={{ display: "flex", height: 4, marginBottom: 32, gap: 2 }}>
            <div style={{ flex: 1, background: AMBER }} />
            <div style={{ flex: 1, background: TERRA }} />
            <div style={{ flex: 1, background: SAGE }} />
          </div>
          <div>
            {[
              { label: "EMAIL",    val: "hello@sonalinayak.dev",       href: "mailto:hello@sonalinayak.dev", c: AMBER },
              { label: "GITHUB",   val: "github.com/sonalinayak",      href: "#",                         c: AMBER },
              { label: "LINKEDIN", val: "linkedin.com/in/sonalinayak", href: "#",                         c: AMBER },
              { label: "TWITTER",  val: "@yourhandle",              href: "#",                         c: AMBER },
              { label: "STATUS",   val: "● AVAILABLE NOW",          special: SAGE },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderTop: `1px solid ${BORDER}` }}>
                <span style={{ ...mono, fontSize: 9, color: row.c || SAGE, letterSpacing: 2, textTransform: "uppercase", width: 76, flexShrink: 0 }}>{row.label}</span>
                {row.href
                  ? <a href={row.href} style={{ ...mono, fontSize: 12, color: WHITE, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase", transition: "color .2s" }}
                      onMouseEnter={e => (e.currentTarget as any).style.color = AMBER}
                      onMouseLeave={e => (e.currentTarget as any).style.color = WHITE}>{row.val}</a>
                  : <span style={{ ...mono, fontSize: 12, color: row.special || WHITE, letterSpacing: 1, textTransform: "uppercase" }}>{row.val}</span>
                }
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
          <div style={{ ...mono, fontSize: 9, color: SAGE, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>// SEND A MESSAGE</div>
          {[
            { label: "YOUR NAME",     key: "name",  placeholder: "JOHN DOE",          type: "text",  ac: AMBER },
            { label: "EMAIL ADDRESS", key: "email", placeholder: "HELLO@COMPANY.COM", type: "email", ac: TERRA },
          ].map(f => (
            <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={{ ...mono, fontSize: 9, color: f.ac, letterSpacing: 2, textTransform: "uppercase" }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [f.key as keyof typeof form]: e.target.value })}
                style={{ ...mono, background: CARD, border: `1px solid ${BORDER}`, color: WHITE, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", padding: "14px 16px", outline: "none", cursor: "text", transition: "border-color .2s", width: "100%" }}
                onFocus={e => (e.currentTarget as any).style.borderColor = f.ac}
                onBlur={e => (e.currentTarget as any).style.borderColor = BORDER} />
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <label style={{ ...mono, fontSize: 9, color: SAGE, letterSpacing: 2, textTransform: "uppercase" }}>MESSAGE</label>
            <textarea rows={5} placeholder="TELL ME ABOUT YOUR PROJECT..." value={form.msg}
              onChange={e => setForm({ ...form, msg: e.target.value })}
              style={{ ...mono, background: CARD, border: `1px solid ${BORDER}`, color: WHITE, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", padding: "14px 16px", outline: "none", resize: "vertical", cursor: "text", transition: "border-color .2s", width: "100%" }}
              onFocus={e => (e.currentTarget as any).style.borderColor = SAGE}
              onBlur={e => (e.currentTarget as any).style.borderColor = BORDER} />
          </div>
          <button
            style={{ ...mono, background: AMBER, color: BG, border: "none", padding: 16, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { (e.currentTarget as any).style.transform = "translate(-2px,-2px)"; (e.currentTarget as any).style.boxShadow = `4px 4px 0 ${TERRA}`; }}
            onMouseLeave={e => { (e.currentTarget as any).style.transform = "none"; (e.currentTarget as any).style.boxShadow = "none"; }}>
            SEND MESSAGE →
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "24px 32px" }}>
        {/* retro stripe top */}
        <div style={{ display: "flex", height: 2, marginBottom: 24, gap: 1 }}>
          <div style={{ flex: 1, background: AMBER, opacity: 0.4 }} />
          <div style={{ flex: 1, background: TERRA, opacity: 0.4 }} />
          <div style={{ flex: 1, background: SAGE,  opacity: 0.4 }} />
        </div>
        <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ ...disp, color: AMBER, fontSize: 20, letterSpacing: 3 }}>SONALI NAYAK</div>
          <div style={{ ...mono, fontSize: 9, color: DIM, letterSpacing: 2, textTransform: "uppercase" }}>© 2026 — ALL RIGHTS RESERVED</div>
          <div className="footer-socials" style={{ display: "flex", gap: 28 }}>
            {[["GitHub", AMBER],["Twitter", TERRA],["LinkedIn", SAGE],["Dribbble", AMBER]].map(([s, c]) => (
              <a key={s} href="#"
                style={{ ...mono, fontSize: 9, color: DIM, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget as any).style.color = c}
                onMouseLeave={e => (e.currentTarget as any).style.color = DIM}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
