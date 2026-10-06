"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* DATA                                                                 */
/* ------------------------------------------------------------------ */

interface Reel {
  src: string;
  poster: string;
  title: string;
  group: "ugc" | "ads" | "launch" | "reels" | "clep";
  tall?: boolean;
  note?: string;
}

// Mixed so portrait and landscape cuts interleave in the masonry.
const REELS: Reel[] = [
  { src: "/creative/launch-truemile.mp4", poster: "/creative/launch-truemile.jpg", title: "TrueMile", group: "launch", note: "The product, told as a journey." },
  { src: "/creative/reel-48-hours.mp4", poster: "/creative/reel-48-hours.jpg", title: "48 Hours #01", group: "reels", tall: true, note: "One thing, 48 hours." },
  { src: "/creative/ad-pendant-hands.mp4", poster: "/creative/ad-pendant-hands.jpg", title: "pendant, in hand", group: "ads" },
  { src: "/final-ugc-1775016828920-528968ac-aff1-43a2-bc0f-aaa62f8b8ad8 (1).mp4", poster: "/ugc/ugc-1.jpg", title: "street · summer heat", group: "ugc", tall: true },
  { src: "/creative/launch-maritime.mp4", poster: "/creative/launch-maritime.jpg", title: "Maritime", group: "launch", note: "An agent's story at sea." },
  { src: "/creative/reel-build-until-they-notice.mp4", poster: "/creative/reel-build-until-they-notice.jpg", title: "Build until they notice", group: "reels", tall: true, note: "A founder, heads down." },
  { src: "/creative/launch-clep-motion-ui.mp4", poster: "/creative/launch-clep-motion-ui.jpg", title: "Clep", group: "launch", note: "From idea to product, in one take." },
  { src: "/creative/ad-bridal.mp4", poster: "/creative/ad-bridal.jpg", title: "bridal jewellery", group: "ads", tall: true },
  { src: "/creative/clep-editorial.mp4", poster: "/creative/clep-editorial.jpg", title: "editorial template", group: "clep" },
  { src: "/creative/reel-my-story.mp4", poster: "/creative/reel-my-story.jpg", title: "My story, 16 → 22", group: "reels", tall: true, note: "Six years in a minute." },
  { src: "/creative/ad-sneaker.mp4", poster: "/creative/ad-sneaker.jpg", title: "sneaker, in motion", group: "ads" },
  { src: "/creative/launch-talo-anime.mp4", poster: "/creative/launch-talo-anime.jpg", title: "Talo", group: "launch", note: "A launch drawn like a comic." },
  { src: "/creative/ugc-college.mp4", poster: "/creative/ugc-college.jpg", title: "college corridor", group: "ugc", tall: true },
  { src: "/creative/launch-notch.mp4", poster: "/creative/launch-notch.jpg", title: "Notch", group: "launch", note: "Your Mac's notch, finally useful." },
  { src: "/creative/reel-antimattr-yc.mp4", poster: "/creative/reel-antimattr-yc.jpg", title: "A week at YC", group: "reels", tall: true, note: "Startup life, up close." },
  { src: "/creative/clep-doc-convert.mp4", poster: "/creative/clep-doc-convert.jpg", title: "PDF in, Doc out", group: "clep" },
  { src: "/creative/launch-truecaller.mp4", poster: "/creative/launch-truecaller.jpg", title: "Truecaller Business Chat", group: "launch", note: "From unread to answered." },
  { src: "/ugc-video (5).mp4", poster: "/ugc/ugc-2.jpg", title: "vanity · get ready with me", group: "ugc", tall: true },
  { src: "/creative/clep-phone-chat.mp4", poster: "/creative/clep-phone-chat.jpg", title: "phone chat template", group: "clep" },
  { src: "/creative/reel-exosat.mp4", poster: "/creative/reel-exosat.jpg", title: "Exosat", group: "reels", tall: true, note: "Your phone dies. The fix is overhead." },
  { src: "/creative/ad-pendant-dark.mp4", poster: "/creative/ad-pendant-dark.jpg", title: "pendant, on black", group: "ads" },
  { src: "/creative/launch-teaser.mp4", poster: "/creative/launch-teaser.jpg", title: "Prismo 2", group: "launch", note: "Ten seconds, on the beat." },
  { src: "/creative/clep-feature-film.mp4", poster: "/creative/clep-feature-film.jpg", title: "feature film template", group: "clep" },
  { src: "/creative/explainer-qwen-deepseek.mp4", poster: "/creative/explainer-qwen-deepseek.jpg", title: "Qwen vs DeepSeek", group: "reels", tall: true, note: "Two models, one question." },
  { src: "/creative/film-48-hours-rules-16x9.mp4", poster: "/creative/film-48-hours-rules-16x9.jpg", title: "48 Hours: The Rules", group: "launch", note: "The same story, cut wide." },
  { src: "/final-ugc-1775019503338-e9f3798b-1782-4d2b-9c29-d917b595f73c.mp4", poster: "/ugc/ugc-3.jpg", title: "desk · snack break", group: "ugc", tall: true },
  { src: "/creative/clep-hero-story.mp4", poster: "/creative/clep-hero-story.jpg", title: "hero story template", group: "clep" },
  { src: "/creative/reel-48-hours-rules.mp4", poster: "/creative/reel-48-hours-rules.jpg", title: "48 Hours: The Rules", group: "reels", tall: true, note: "No moving the goalpost." },
  { src: "/creative/clep-agent-run.mp4", poster: "/creative/clep-agent-run.jpg", title: "agent run template", group: "clep" },
  { src: "/creative/clep-dashboard.mp4", poster: "/creative/clep-dashboard.jpg", title: "product demo · dashboard", group: "clep" },
];

const REEL_GROUPS = [
  { id: "all", label: "all" },
  { id: "launch", label: "launch films" },
  { id: "reels", label: "story reels" },
  { id: "ugc", label: "ugc" },
  { id: "ads", label: "ad films" },
  { id: "clep", label: "clep templates" },
] as const;

/* ------------------------------------------------------------------ */
/* VIDEOS                                                               */
/* ------------------------------------------------------------------ */

function ReelTile({ r, onOpen }: { r: Reel; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Touch screens have no hover, so play whatever sits in the middle of the screen.
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <button
      className={"reel" + (r.tall ? " tall" : "")}
      onClick={onOpen}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => ref.current?.pause()}
      aria-label={`Play ${r.title}`}
    >
      <video ref={ref} src={r.src} poster={r.poster} muted loop playsInline preload="none" />
      <span className="reel-cap">
        <i>{REEL_GROUPS.find((g) => g.id === r.group)?.label}</i> {r.title}
      </span>
      <span className="reel-play" aria-hidden="true">
        ▶
      </span>
    </button>
  );
}

function ReelViewer({ r, onClose }: { r: Reel; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="viewer" role="dialog" aria-label={r.title} onClick={onClose}>
      <figure className={"viewer-in" + (r.tall ? " tall" : "")} onClick={(e) => e.stopPropagation()}>
        <video src={r.src} poster={r.poster} controls autoPlay playsInline />
        <figcaption>
          <span>
            {r.title}
            {r.note && <em className="viewer-note"> — {r.note}</em>}
          </span>
          <button className="pill" onClick={onClose}>
            close ✕
          </button>
        </figcaption>
      </figure>
    </div>
  );
}

function CreativeVideos() {
  const [group, setGroup] = useState<(typeof REEL_GROUPS)[number]["id"]>("all");
  const [open, setOpen] = useState<Reel | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const shown = REELS.filter((r) => group === "all" || r.group === group);
  return (
    <>
      <div className="reel-tabs" role="tablist" aria-label="Filter videos">
        {REEL_GROUPS.map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={group === g.id}
            className={"chip-in reel-tab" + (group === g.id ? " on" : "")}
            onClick={() => setGroup(g.id)}
          >
            {g.label}
            <span className="reel-count">
              {g.id === "all" ? REELS.length : REELS.filter((r) => r.group === g.id).length}
            </span>
          </button>
        ))}
      </div>
      <div className="reels">
        {shown.map((r) => (
          <ReelTile key={r.src} r={r} onOpen={() => setOpen(r)} />
        ))}
      </div>
      {open && <ReelViewer r={open} onClose={close} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                 */
/* ------------------------------------------------------------------ */

export default function CreativeStuff() {
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

        /* SECTIONS — label column + content column */
        .sec { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(20px, 4vw, 56px); padding: clamp(80px, 14vh, 150px) 0 0; }
        .sec-label { font-size: 12px; text-decoration: underline; text-underline-offset: 4px; padding-top: 10px; }
        .sec-intro { font-family: var(--serif); font-weight: 300; font-size: clamp(24px, 2.6vw, 34px); line-height: 1.25; letter-spacing: -0.01em; }
        .sec-sub { margin-top: 18px; font-size: 13px; color: var(--muted); max-width: 52ch; }

        @keyframes fbIn { from { opacity: 0; transform: translateY(22px); } }

        .top { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; font-size: 12px; }
        .top a:hover { color: var(--blue); }
        .title {
          font-family: var(--serif); font-weight: 300; font-size: clamp(56px, 11vw, 170px);
          line-height: 0.92; letter-spacing: -0.045em; margin-top: clamp(30px, 6vh, 64px);
          font-variation-settings: "opsz" 144;
        }
        .title em { font-weight: 300; }
        .sec { padding-top: clamp(28px, 5vh, 48px); }
        .foot { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 40px 0; margin-top: clamp(60px, 10vh, 100px); border-top: 1px solid var(--line); }

        /* CREATIVE VIDEOS */
        .reel-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-top: clamp(36px, 6vh, 56px); font-family: var(--sans); font-size: 18px; }
        .reel-tab { cursor: pointer; font-size: 13px; padding: 7px 16px 8px; color: var(--muted); }
        .reel-tab.on { color: var(--ink); background: linear-gradient(180deg, #fff, rgba(255,255,255,0.75)); }
        .reel-tab.on::after { animation-duration: 3.5s; }
        .reel-count { font-size: 10px; color: var(--muted-2); margin-left: 4px; }
        .reels { columns: 3 260px; column-gap: 16px; margin-top: 26px; }
        .reel {
          position: relative; display: block; width: 100%; margin: 0 0 16px; break-inside: avoid;
          border-radius: 18px; overflow: hidden; background: var(--ink);
          border: 5px solid var(--card); box-shadow: 0 0 0 1px var(--line), 0 26px 44px -30px rgba(27,25,22,0.6);
          transition: transform .4s cubic-bezier(.3,.8,.2,1), box-shadow .4s;
        }
        .reel:hover { transform: translateY(-3px) rotate(-0.4deg); box-shadow: 0 0 0 1px var(--line), 0 34px 54px -30px rgba(27,25,22,0.7); }
        .reel video { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
        .reel.tall video { aspect-ratio: 9/16; }
        .reel::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 64px; pointer-events: none;
          background: linear-gradient(transparent, rgba(20,18,16,0.62));
        }
        .reel-cap {
          position: absolute; left: 10px; bottom: 10px; right: 10px; text-align: left; z-index: 1;
          font-size: 11px; color: #fff; display: flex; gap: 8px; align-items: center;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        .reel-cap i {
          font-style: normal; font-size: 10px; padding: 2px 8px; border-radius: 999px; flex: none;
          background: rgba(255,255,255,0.22); -webkit-backdrop-filter: blur(10px) saturate(180%); backdrop-filter: blur(10px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.45); text-shadow: none;
        }
        .reel-play {
          position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%;
          display: grid; place-items: center; font-size: 10px; color: #fff; padding-left: 2px;
          background: rgba(255,255,255,0.22); -webkit-backdrop-filter: blur(10px) saturate(180%); backdrop-filter: blur(10px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.5); transition: opacity .3s;
        }
        .reel:hover .reel-play { opacity: 0; }
        .viewer { position: fixed; inset: 0; z-index: 85; display: grid; place-items: center; padding: 20px; background: rgba(27,25,22,0.6); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); animation: fbIn .35s cubic-bezier(.16,.84,.24,1); }
        .viewer-in { width: min(1000px, 100%); margin: 0; }
        .viewer-in.tall { width: min(400px, 100%, calc((100svh - 120px) * 9 / 16)); }
        .viewer-in video { width: 100%; max-height: calc(100svh - 110px); border-radius: 16px; background: #000; border: 5px solid var(--card); }
        .viewer-in figcaption { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; color: #fff; font-size: 12px; }
        .viewer-note { font-family: var(--serif); font-size: 15px; opacity: 0.85; }
        .viewer-in .pill { border-color: rgba(255,255,255,0.6); color: #fff; }
        .viewer-in .pill:hover { background: #fff; color: var(--ink); }

        @media (max-width: 860px) {
          .sec { grid-template-columns: minmax(0, 1fr); }
          .reels { columns: 2; column-gap: 10px; }
          .reel { margin-bottom: 10px; border-width: 3px; border-radius: 14px; }
          .reel-cap { font-size: 10px; }
          .reel-cap i { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chip-in::after { animation: none; display: none; }
        }
      `}</style>

      <main className="wrap">
        <header className="top">
          <Link href="/">← techwarq.space</Link>
          <Link href="/#work">work</Link>
        </header>

        <h1 className="title">
          creative <em>stuff.</em>
        </h1>

        <div className="sec">
          <span className="sec-label">Creative videos</span>
          <div>
            <p className="sec-intro">
              Launch films, story reels, UGC, and ad films. Most of it <em>generated</em>, all of it
              cut to tell a story.
            </p>
            <p className="sec-sub">
              Made with my agents and Clep. Hover to play, click to watch with sound.
            </p>
          </div>
        </div>

        <CreativeVideos />

        <footer className="foot mono">
          <span>© {new Date().getFullYear()} sonali nayak</span>
          <Link href="/">back to the portfolio ↗</Link>
        </footer>
      </main>
    </>
  );
}
