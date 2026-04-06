"use client";

import React, { useEffect, useState } from "react";

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
    <div style={{
      backgroundColor: "#1a1a1a",
      minHeight: "100vh",
      color: "#d4d4d4",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      padding: "48px 64px",
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
            link→ <a href="https://nagent.ai/dashboard/ugc" className="pow-link" target="_blank" rel="noopener noreferrer">
              https://nagent.ai/dashboard/ugc
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
          paddingBottom: "16px",
          width: "calc(100vw - 64px)", /* Account for container padding */
          marginRight: "-64px" /* Bleed off right edge */
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
              <video
                autoPlay
                loop
                controls
                playsInline
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "9/16",
                  objectFit: "cover"
                }}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

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
              link→ <a href="https://nagent.ai/dashboard/virtual-photoshoot-agent" className="pow-link" target="_blank" rel="noopener noreferrer">
                https://nagent.ai/dashboard/virtual-photoshoot-agent
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
            width: "calc(100vw - 64px)",
            marginRight: "-64px",
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
        <div style={{ marginTop: "120px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "80px" }}>
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
              link→ <a href="https://nagent.ai/dashboard/campaign-hub" className="pow-link" target="_blank" rel="noopener noreferrer">
                https://nagent.ai/dashboard/campaign-hub
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
            width: "calc(100vw - 64px)",
            marginRight: "-64px",
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
      </div>
    </div>
  );
}
