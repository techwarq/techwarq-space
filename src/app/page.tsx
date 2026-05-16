"use client";

import React, { useEffect, useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Disable back navigation as requested ("stay here only")
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="main-wrapper" style={{
      backgroundColor: "#1a1a1a",
      minHeight: "100vh",
      color: "#d4d4d4",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }}>
      <style>{`
        body {
          margin: 0;
          background-color: #1a1a1a;
        }
        .pow-container {
          max-width: 900px;
        }
        .pow-link {
          color: #a0a0a0;
          text-decoration: none;
          border-bottom: 1px dotted transparent;
          transition: border-bottom 0.2s, color 0.2s;
        }
        .pow-link:hover {
          color: #d4d4d4;
          border-bottom: 1px dotted #d4d4d4;
        }
        .blink-cursor {
          animation: blink-animation 1s steps(2, start) infinite;
          background-color: #666;
          display: inline-block;
          width: 2px;
          height: 16px;
          vertical-align: middle;
          margin-right: 2px;
        }
        @keyframes blink-animation {
          to {
             visibility: hidden;
          }
        }

        .video-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .video-scroll-container {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .pow-download-btn:hover {
          background-color: rgba(255,255,255,0.15) !important;
          transform: translateY(-2px);
        }
        .pow-image-tile {
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .pow-image-tile:hover {
          transform: scale(1.1) translateY(-8px);
          border-color: rgba(255,255,255,0.3) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
          z-index: 10;
        }
        .main-wrapper {
          padding: 48px 64px;
        }
        .snips-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 80px;
        }
        .video-scroll-container {
          width: calc(100vw - 64px);
          margin-right: -64px;
        }
        .section-divider {
          margin-top: 120px;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 80px;
        }
        @media (max-width: 640px) {
          .main-wrapper {
            padding: 24px 20px;
          }
          .video-scroll-container {
            width: calc(100vw - 20px);
            margin-right: -20px;
          }
          .snips-grid {
            grid-template-columns: 1fr;
          }
          .section-divider {
            margin-top: 60px;
            padding-top: 40px;
          }
          ul {
            padding-left: 20px;
          }
        }
      `}</style>

      <div className="pow-container">
        <h1 style={{
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "32px",
          color: "#ffffff",
          letterSpacing: "-0.5px"
        }}>
          proof of work
        </h1>

        {/* --- SNIPS AI SECTION --- */}
        <div style={{ marginTop: "32px" }}>
          <h1 style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            letterSpacing: "-0.5px"
          }}>
            Snips AI 🧠✨
          </h1>

          <ul style={{
            paddingLeft: "28px",
            marginBottom: "48px",
            lineHeight: "1.8",
            fontSize: "15px",
            listStyleType: "disc",
            color: "#d4d4d4"
          }}>
            <li style={{ paddingLeft: "8px", marginBottom: "24px" }}>
              built a premium knowledge extraction platform — <span style={{ color: "#a0a0a0" }}>transforming complex content into bite-sized insights</span> <br />
              link→ <a href="https://usesnips.com/" className="pow-link" target="_blank" rel="noopener noreferrer">
                usesnips.com
              </a> <br />
              snips ai distills 40-page research papers or 2-hour lectures into interactive "snips" cards with visual figure detection and precision extraction.
            </li>
            <li style={{ paddingLeft: "8px" }}>
              behind the scenes: engineered a multi-modal analysis engine using gemini 3.1 pro and groq.<br />
              <div style={{ color: "#a0a0a0", fontSize: "14px", paddingLeft: "12px", borderLeft: "2px solid rgba(255,255,255,0.1)", marginTop: "12px", marginBottom: "8px" }}>
                <span style={{ color: "#d4d4d4" }}>1. deep document analysis:</span> page-by-page extraction with automated figure cropping and katex math rendering.<br />
                <span style={{ color: "#d4d4d4" }}>2. intelligent youtube processing:</span> leverages native file api to "watch" videos and opencv for precise frame capture at key timestamps.<br />
                <span style={{ color: "#d4d4d4" }}>3. mathematical explainer:</span> interactive sliders and symbols breakdown for complex formulas using math.js.<br />
                <span style={{ color: "#d4d4d4" }}>4. high-performance stack:</span> fastapi backend with mongodb storage and next.js 14 frontend with emerald/dark aesthetics.<br />
                <span style={{ color: "#d4d4d4" }}>5. learning progress:</span> activity heatmap visualization for daily knowledge accumulation.
              </div>
            </li>
          </ul>

          <div style={{
            marginBottom: "48px",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            backgroundColor: "#000"
          }}>
            <div style={{
              padding: "12px 20px",
              backgroundColor: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
              </div>
              <span style={{ fontSize: "12px", color: "#666", fontFamily: "ui-monospace, monospace" }}>snips_ai_demo.mp4</span>
            </div>
            <VideoPlayer
              src="/snips-demo.mp4"
              loop
              muted
              playsInline
              controls
              style={{
                width: "100%",
                display: "block",
                opacity: "1.0"
              }}
            />
          </div>

          <div className="snips-grid">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/snips-1.png" 
              alt="Snips AI Interface" 
              style={{ width: "100%", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }} 
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/snips-2.png" 
              alt="Snips AI Knowledge Extraction" 
              style={{ width: "100%", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }} 
            />
          </div>
        </div>

        {/* --- @TECHWARQ/AILENS SECTION --- */}
        <div className="section-divider">
          <h1 style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            letterSpacing: "-0.5px"
          }}>
            @techwarq/ailens
          </h1>

          <ul style={{
            paddingLeft: "28px",
            marginBottom: "48px",
            lineHeight: "1.8",
            fontSize: "15px",
            listStyleType: "disc",
            color: "#d4d4d4"
          }}>
            <li style={{ paddingLeft: "8px", marginBottom: "24px" }}>
              built a local-first LLM observability & testing suite — <span style={{ color: "#a0a0a0" }}>available on npm and github</span> <br />
              npm→ <a href="https://www.npmjs.com/package/@techwarq/ailens" className="pow-link" target="_blank" rel="noopener noreferrer">
                https://www.npmjs.com/package/@techwarq/ailens
              </a> <br />
              github→ <a href="https://github.com/techwarq/ai-lens" className="pow-link" target="_blank" rel="noopener noreferrer">
                https://github.com/techwarq/ai-lens
              </a> <br />
              bringing real software engineering to AI apps. ailens allows developers to debug, diff, type-check, and trace LLM calls with zero overhead. <br />
              here is the diagnostic engine in action.
            </li>
            <li style={{ paddingLeft: "8px" }}>
              behind the scenes: engineered a high-performance tracing engine and a semantic rule evaluator.<br />
              <div style={{ color: "#a0a0a0", fontSize: "14px", paddingLeft: "12px", borderLeft: "2px solid rgba(255,255,255,0.1)", marginTop: "12px", marginBottom: "8px" }}>
                <span style={{ color: "#d4d4d4" }}>1. zero-latency logging:</span> async local-first session tracking with automated git-ignore management.<br />
                <span style={{ color: "#d4d4d4" }}>2. semantic checks:</span> multi-tier validation using instant local regex and deep LLM-judge verification.<br />
                <span style={{ color: "#d4d4d4" }}>3. causal chain analysis:</span> "why" engine that pinpoints exactly which part of a prompt caused a quality regression.<br />
                <span style={{ color: "#d4d4d4" }}>4. behavioral diffing:</span> goes beyond text diffs to explain how model tone, length, and reasoning shifted between versions.<br />
                <span style={{ color: "#d4d4d4" }}>5. pipeline tracing:</span> unified SDK for tracing multi-modal agents (LLM + Image + Video + Tools) with automatic dependency linking.
              </div>
            </li>
          </ul>

          <div style={{
            marginBottom: "48px",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            backgroundColor: "#000"
          }}>
            <div style={{
              padding: "12px 20px",
              backgroundColor: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
              </div>
              <span style={{ fontSize: "12px", color: "#666", fontFamily: "ui-monospace, monospace" }}>ailens_debug_session.log</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ailens-mockup.png"
              alt="AILens Diagnostic Engine"
              style={{
                width: "100%",
                display: "block",
                opacity: "1.0"
              }}
            />
          </div>
        </div>

        {/* --- AI UGC AGENT SECTION --- */}
        <div className="section-divider">
          <h1 style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            letterSpacing: "-0.5px"
          }}>
            AI UGC Agent
          </h1>
          <ul style={{
          paddingLeft: "28px",
          marginBottom: "48px",
          lineHeight: "1.8",
          fontSize: "15px",
          listStyleType: "disc",
          color: "#d4d4d4"
        }}>
          <li style={{ paddingLeft: "8px", marginBottom: "24px" }}>
            been working on an AI ugc agent — <span style={{ color: "#a0a0a0" }}>live on the platform right now</span> <br />
            link→ <a href="https://nagent.ai/agent-details/ugc" className="pow-link" target="_blank" rel="noopener noreferrer">
              https://nagent.ai/agent-details/ugc
            </a> <br />
            anyone can drop a script or product link and generate high-fidelity ugc videos from scratch. <br />
            here are some outcomes.
          </li>
          <li style={{ paddingLeft: "8px" }}>
            behind the scenes: designed a highly resilient, 5-stage multi-modal pipeline <br />
            abstracting away the complexity of handling long-running ai tasks.<br />
            <div style={{ color: "#a0a0a0", fontSize: "14px", paddingLeft: "12px", borderLeft: "2px solid rgba(255,255,255,0.1)", marginTop: "12px", marginBottom: "8px" }}>
              <span style={{ color: "#d4d4d4" }}>1. intelligent ingestion:</span> mistral ocr + gemini flash to structure messy text into a json storyline.<br />
              <span style={{ color: "#d4d4d4" }}>2. keyframe generation:</span> dynamic base frame rendering for visual continuity.<br />
              <span style={{ color: "#d4d4d4" }}>3. orchestration:</span> dense context injection to build veo 3.1 video generation prompts.<br />
              <span style={{ color: "#d4d4d4" }}>4. async video rendering:</span> concurrent 8-second clip generation with persistent seed tracking.<br />
              <span style={{ color: "#d4d4d4" }}>5. final stitching:</span> ffmpeg clip merging & voice-over syncing via cloud queues.
            </div>
          </li>
        </ul>

        {/* Video Area */}
        <div className="video-scroll-container" style={{
          marginTop: "40px",
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          paddingBottom: "16px"
        }}>
          {mounted && [
            "/final-ugc-1775016828920-528968ac-aff1-43a2-bc0f-aaa62f8b8ad8 (1).mp4",
            "/ugc-video (5).mp4",
            "/final-ugc-1775019503338-e9f3798b-1782-4d2b-9c29-d917b595f73c.mp4"
          ].map((src, idx) => (
            <div key={idx} style={{
              flex: "0 0 auto",
              position: "relative",
              width: "280px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              backgroundColor: "#000"
            }}>
              <VideoPlayer
                src={src}
                loop
                controls
                playsInline
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "9/16",
                  objectFit: "cover"
                }}
              />

              {/* Download Button */}
              <a
                href={src}
                download
                className="pow-download-btn"
                style={{
                  position: "absolute",
                  top: "16px", /* Positioned at top to avoid native video controls */
                  right: "16px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </a>
            </div>
          ))}
        </div>
        </div>
        
        {/* --- VIRTUAL PHOTOSHOOT SECTION --- */}
        <div style={{ marginTop: "80px" }}>
          <h1 style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            letterSpacing: "-0.5px"
          }}>
            virtual photoshoot agent
          </h1>

          <ul style={{
            paddingLeft: "28px",
            marginBottom: "48px",
            lineHeight: "1.8",
            fontSize: "15px",
            listStyleType: "disc",
            color: "#d4d4d4"
          }}>
            <li style={{ paddingLeft: "8px", marginBottom: "24px" }}>
              built an AI virtual photoshoot agent — <span style={{ color: "#a0a0a0" }}>live on the platform</span> <br />
              link→ <a href="https://nagent.ai/agent-details/virtual-photoshoot-agent" className="pow-link" target="_blank" rel="noopener noreferrer">
                https://nagent.ai/agent-details/virtual-photoshoot-agent
              </a> <br />
              standard brand shoots are slow and expensive. this agent automates the entire photoshoot lifecycle—eliminating the need for studios and manual prompt engineering to produce studio-quality imagery <span style={{ color: "#fff", fontWeight: "600" }}>at massive scale</span>. <br />
              here is the underlying pipeline.
            </li>
            <li style={{ paddingLeft: "8px" }}>
              behind the scenes: built a modular inference engine using ndjson streaming and heartbeat pings to bypass timeout limits on long-running AI models.<br />
              <div style={{ color: "#a0a0a0", fontSize: "14px", paddingLeft: "12px", borderLeft: "2px solid rgba(255,255,255,0.1)", marginTop: "12px", marginBottom: "8px" }}>
                <span style={{ color: "#d4d4d4" }}>1. asset ingestion:</span> multi-vector upload (binary/data-uri/arrays) to cloud storage.<br />
                <span style={{ color: "#d4d4d4" }}>2. avatar generation:</span> ndjson streaming to handle high-fidelity model inference in real-time.<br />
                <span style={{ color: "#d4d4d4" }}>3. virtual try-on:</span> garment mapping with heartbeat flushes to prevent load-balancer timeouts.<br />
                <span style={{ color: "#d4d4d4" }}>4. pose manipulation:</span> structural mapping via visual references and text prompts.<br />
                <span style={{ color: "#d4d4d4" }}>5. asset delivery:</span> dynamic accessory compositing and automated .zip compilation for batch exports.
              </div>
            </li>
          </ul>

          <div className="video-scroll-container" style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "40px",
            overflowX: "auto",
            paddingBottom: "16px",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
          }}>
            {/* Avatars Box */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "fit-content",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>01. avatars</span>
              <div style={{ display: "flex", gap: "12px" }}>
                {["/avatar2.jpg", "/avatar3.jpg", "/avatr.jpg"].map((src, idx) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img key={idx} src={src} alt={`avatar ${idx + 1}`} className="pow-image-tile" style={{
                    width: "80px",
                    aspectRatio: "9/16",
                    objectFit: "cover",
                    backgroundColor: "#111",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "block"
                  }} />
                ))}
              </div>
            </div>

            <div style={{ color: "#444", fontSize: "20px", fontWeight: "300" }}>→</div>

            {/* Try-On Box */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "fit-content",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>02. try-on</span>
              <div style={{ display: "flex", gap: "12px" }}>
                {["/result_0_1775473210676.jpg", "/result_1_1775473213552.jpg", "/result_2_1775473215635.jpg"].map((src, idx) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img key={idx} src={src} alt={`try-on ${idx + 1}`} className="pow-image-tile" style={{
                    width: "80px",
                    aspectRatio: "9/16",
                    objectFit: "cover",
                    backgroundColor: "#111",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "block"
                  }} />
                ))}
              </div>
            </div>

            <div style={{ color: "#444", fontSize: "20px", fontWeight: "300" }}>→</div>

            {/* Poses Box */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "fit-content",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>03. poses</span>
              <div style={{ display: "flex", gap: "12px" }}>
                {["/pose.jpg", "/pose2.jpg", "/pose3.jpg"].map((src, idx) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img key={idx} src={src} alt={`pose ${idx + 1}`} className="pow-image-tile" style={{
                    width: "80px",
                    aspectRatio: "9/16",
                    objectFit: "cover",
                    backgroundColor: "#111",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "block"
                  }} />
                ))}
              </div>
            </div>

            <div style={{ color: "#444", fontSize: "20px", fontWeight: "300" }}>→</div>

            {/* Accessories Box */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "fit-content",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>04. finalize</span>
              <div style={{ display: "flex", gap: "12px" }}>
                {["/result_0_1775472856839.jpg"].map((src, idx) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img key={idx} src={src} alt={`accessory ${idx + 1}`} className="pow-image-tile" style={{
                    width: "80px",
                    aspectRatio: "9/16",
                    objectFit: "cover",
                    backgroundColor: "#111",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "block"
                  }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "64px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", color: "#fff", margin: 0 }}>final outcomes</h3>
              <span style={{ fontSize: "13px", color: "#666" }}>studio-quality results delivered in batch</span>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
              gap: "24px" 
            }}>
              {["/result_0_1775473210676.jpg", "/result_1_1775473213552.jpg", "/result_2_1775473215635.jpg", "/result_0_1775472856839.jpg"].map((src, idx) => (
                <div key={idx} style={{
                   borderRadius: "24px",
                   overflow: "hidden",
                   border: "1px solid rgba(255,255,255,0.05)",
                   boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                   backgroundColor: "#000",
                   position: "relative"
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`outcome ${idx + 1}`} style={{
                    width: "100%",
                    aspectRatio: "9/16",
                    objectFit: "cover",
                    display: "block"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "8px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    vps-render-{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- ENTERPRISE CAMPAIGN HUB SECTION --- */}
        <div className="section-divider">
          <h1 style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            letterSpacing: "-0.5px"
          }}>
            enterprise campaign hub & bulk ai orchestrator
          </h1>

          <ul style={{
            paddingLeft: "28px",
            marginBottom: "48px",
            lineHeight: "1.8",
            fontSize: "15px",
            listStyleType: "disc",
            color: "#d4d4d4"
          }}>
            <li style={{ paddingLeft: "8px", marginBottom: "24px" }}>
              built an enterprise campaign hub — <span style={{ color: "#a0a0a0" }}>live for bulk advertisers</span> <br />
              link→ <a href="https://nagent.ai/agent-details/campaign-hub" className="pow-link" target="_blank" rel="noopener noreferrer">
                https://nagent.ai/agent-details/campaign-hub
              </a> <br />
              managing marketing across hundreds of SKUs is a manual bottleneck. this engine synchronizes with Google Sheets to autonomously generate copy, images, and metadata <span style={{ color: "#fff", fontWeight: "600" }}>in bulk</span>. <br />
              here is the practical flow.
            </li>
            <li style={{ paddingLeft: "8px" }}>
              behind the scenes: engineered a "Fan-Out" system that takes one sheet and splits it into thousands of individual AI tasks.<br />
              <div style={{ color: "#a0a0a0", fontSize: "14px", paddingLeft: "12px", borderLeft: "2px solid rgba(255,255,255,0.1)", marginTop: "12px", marginBottom: "8px" }}>
                <span style={{ color: "#d4d4d4" }}>1. google sheet connection:</span> users link their source data; the system instantly caches it in Redis for zero-latency access.<br />
                <span style={{ color: "#d4d4d4" }}>2. intelligent generation:</span> the AI reads product specs and brand objectives to draft custom notification copy and ad creatives.<br />
                <span style={{ color: "#d4d4d4" }}>3. smart orchestration (BullMQ):</span> think of this as a "mega to-do list" that manages specialized workers to ensure no task is dropped.<br />
                <span style={{ color: "#d4d4d4" }}>4. real-time write-back:</span> as each ad is ready, it's synced back to the original sheet so the user sees progress live.<br />
                <span style={{ color: "#d4d4d4" }}>5. scaling at zero cost:</span> handles 1,000+ SKUs concurrently without hitting rate limits or crashing the browser.
              </div>
            </li>
          </ul>

          {/* Screenshot of the Live Sheet Integration */}
          <div style={{ 
            marginBottom: "48px", 
            borderRadius: "24px", 
            overflow: "hidden", 
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            backgroundColor: "#000"
          }}>
            <div style={{ 
              padding: "12px 20px", 
              backgroundColor: "rgba(255,255,255,0.03)", 
              borderBottom: "1px solid rgba(255,255,255,0.05)", 
              display: "flex", 
              alignItems: "center", 
              gap: "10px" 
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
              </div>
              <span style={{ fontSize: "12px", color: "#666", fontFamily: "ui-monospace, monospace" }}>campaign_sync_audit.xlsx</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/campaign-hub-sheet.png" 
              alt="Campaign Hub Sheet Synchronization" 
              style={{ 
                width: "100%", 
                display: "block",
                opacity: "0.9",
                filter: "contrast(1.1)"
              }} 
            />
          </div>

          <div className="video-scroll-container" style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "40px",
            overflowX: "auto",
            paddingBottom: "16px",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
          }}>
            {/* Source Phase */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              backgroundColor: "rgba(255,184,0,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "220px"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>SOURCE</span>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(255,184,0,0.1)", color: "#FFB800", fontSize: "12px" }}>Google Sheets API</div>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(255,184,0,0.1)", color: "#FFB800", fontSize: "12px" }}>Redis Cache Layer</div>
              </div>
            </div>

            <div style={{ color: "#444", fontSize: "20px" }}>→</div>

            {/* Queue Phase */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              backgroundColor: "rgba(0,132,255,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "220px"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>ORCHESTRATION</span>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(0,132,255,0.1)", color: "#0084FF", fontSize: "12px" }}>BullMQ Distributed Queues</div>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(0,132,255,0.1)", color: "#0084FF", fontSize: "12px" }}>Job Segregation (P0/P1)</div>
              </div>
            </div>

            <div style={{ color: "#444", fontSize: "20px" }}>→</div>

            {/* Worker Phase */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              backgroundColor: "rgba(187,38,255,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "220px"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>WORKERS (AI)</span>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(187,38,255,0.1)", color: "#BB26FF", fontSize: "12px" }}>Content Generator</div>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(187,38,255,0.1)", color: "#BB26FF", fontSize: "12px" }}>Image Engine</div>
              </div>
            </div>

            <div style={{ color: "#444", fontSize: "20px" }}>→</div>

            {/* Sink Phase */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              backgroundColor: "rgba(0,255,132,0.03)",
              backdropFilter: "blur(8px)",
              minWidth: "220px"
            }}>
              <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>DELIVERY</span>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(0,255,132,0.1)", color: "#00FF84", fontSize: "12px" }}>Batch Write-Back Sink</div>
                <div style={{ padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(0,255,132,0.1)", color: "#00FF84", fontSize: "12px" }}>Progress Webhooks</div>
              </div>
            </div>
          </div>
        </div>
        {/* --- FLOWDESK (ASTRA) SECTION --- */}
        <div className="section-divider">
          <h1 style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            letterSpacing: "-0.5px"
          }}>
            flowdesk (astra) — e-commerce automation & dashboard
          </h1>

          <ul style={{
            paddingLeft: "28px",
            marginBottom: "48px",
            lineHeight: "1.8",
            fontSize: "15px",
            listStyleType: "disc",
            color: "#d4d4d4"
          }}>
            <li style={{ paddingLeft: "8px", marginBottom: "24px" }}>
              built a high-performance e-commerce operations suite — FlowDesk (ASTRA) — <span style={{ color: "#a0a0a0" }}>processing 1,500+ accounts daily for enterprise clients</span> <br />
              link→ <span style={{ color: "#666", fontStyle: "italic" }}>private client instance</span> <br />
              managing bulk orders across 9+ platforms (Amazon, Vivo, Flipkart, etc.) is an operational bottleneck. this RPA suite automates tracking, IP-allocation, and bulk link execution via a custom in-app browser. <br />
              here is the technical breakdown.
            </li>
            <li style={{ paddingLeft: "8px" }}>
              behind the scenes: engineered a sophisticated Playwright RPA engine and custom Electron browser to automate massive-scale e-commerce operations.<br />
              <div style={{ color: "#a0a0a0", fontSize: "14px", paddingLeft: "12px", borderLeft: "2px solid rgba(255,255,255,0.1)", marginTop: "12px", marginBottom: "8px" }}>
                <span style={{ color: "#d4d4d4" }}>1. multi-platform hub:</span> automated order tracking across 9+ major e-commerce websites, handling complex navigation and MFA flows via Node.js.<br />
                <span style={{ color: "#d4d4d4" }}>2. in-app bulk browser:</span> custom browser engine for simultaneous link execution, allowing users to open and manage hundreds of product links for bulk ordering.<br />
                <span style={{ color: "#d4d4d4" }}>3. intelligent ip allocation:</span> advanced routing and IP management to maintain account health and bypass sophisticated anti-bot protections.<br />
                <span style={{ color: "#d4d4d4" }}>4. high-performance dashboard:</span> real-time UI monitoring 1,500+ daily active accounts with sub-second filtering, search, and session persistence.<br />
                <span style={{ color: "#d4d4d4" }}>5. operational intelligence:</span> integrated CSV exports for logistics, smart batch fetching, and automated chatbot-driven customer updates.<br />
                <span style={{ color: "#d4d4d4" }}>6. ai-powered order intelligence:</span> implemented a RAG-based chatbot with a Vector Database to allow users to query complex order details and logistics history via natural language.
              </div>
            </li>
          </ul>

          {/* FlowDesk Dashboard Mockup */}
          <div style={{ 
            marginBottom: "48px", 
            borderRadius: "24px", 
            overflow: "hidden", 
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            backgroundColor: "#000"
          }}>
            <div style={{ 
              padding: "12px 20px", 
              backgroundColor: "rgba(255,255,255,0.03)", 
              borderBottom: "1px solid rgba(255,255,255,0.05)", 
              display: "flex", 
              alignItems: "center", 
              gap: "10px" 
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
              </div>
              <span style={{ fontSize: "12px", color: "#666", fontFamily: "ui-monospace, monospace" }}>flowdesk_astra_admin_v4.0.app</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/flowdesk-ui.png" 
              alt="FlowDesk (ASTRA) Admin Intelligence UI" 
              style={{ 
                width: "100%", 
                display: "block",
                opacity: "1.0"
              }} 
            />
          </div>

          {/* Downloads & Credentials */}
          <div style={{ 
            marginTop: "32px", 
            marginBottom: "48px",
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a 
                href="/FlowDesk-0.1.2-arm64.dmg" 
                download 
                className="pow-download-btn"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7 7 7-7"/>
                </svg>
                Download for Mac (arm64)
              </a>
              <a 
                href="/FlowDesk-Setup-0.1.2.exe" 
                download 
                className="pow-download-btn"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7 7 7-7"/>
                </svg>
                Download for Windows (.exe)
              </a>
            </div>

            <div style={{
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "rgba(0,132,255,0.05)",
              border: "1px solid rgba(0,132,255,0.1)",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              width: "fit-content"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0084FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span style={{ fontSize: "13px", color: "#0084FF", fontWeight: "500" }}>
                Access Credentials: <span style={{ color: "#d4d4d4", marginLeft: "8px" }}>u: testuser / p: testuser123</span>
              </span>
            </div>
          </div>

          <div style={{ marginTop: "48px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", color: "#fff", margin: 0 }}>automation tech stack</h3>
              <span style={{ fontSize: "13px", color: "#666" }}>robotic process automation & real-time monitoring</span>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
              gap: "16px" 
            }}>
              {[
                { label: "Frontend", value: "React 19, Tailwind v4, Lucide" },
                { label: "Automation", value: "Playwright (RPA), Node.js, TS" },
                { label: "Intelligence", value: "LLM (Gemini), Vector DB (Qdrant), RAG" },
                { label: "Architecture", value: "Electron Desktop App, Persistent Contexts" }
              ].map((stack, idx) => (
                <div key={idx} style={{
                  padding: "20px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(4px)"
                }}>
                  <div style={{ fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{stack.label}</div>
                  <div style={{ fontSize: "14px", color: "#d4d4d4" }}>{stack.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* --- RESEARCH SECTION --- */}
        <div style={{ marginTop: "120px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "80px", marginBottom: "80px" }}>
          <h1 style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            letterSpacing: "-0.5px"
          }}>
            research & experiments
          </h1>

          <ul style={{
            paddingLeft: "28px",
            marginBottom: "48px",
            lineHeight: "1.8",
            fontSize: "15px",
            listStyleType: "disc",
            color: "#d4d4d4"
          }}>
            <li style={{ paddingLeft: "8px", marginBottom: "24px" }}>
              i read research papers and try to build stuff — <span style={{ color: "#a0a0a0" }}>exploring the boundaries of LLM reasoning & memory</span> <br />
              currently building my own small memory architecture. <br />
              link→ <a href="/Memory v1 (2).pdf" className="pow-link" target="_blank" rel="noopener noreferrer">
                Memory v1.pdf (Architecture breakdown)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
