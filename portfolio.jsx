import { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "Linux System Programming", level: 80 },
  { name: "Network Protocol Analysis", level: 60 },
  { name: "Low-level Performance Optimization", level: 70 },
  { name: "Binary Exploitation & Reverse Engineering", level: 50 },
  { name: "Wayland Compositor Internals", level: 40 },
];

const PROJECTS = [
  {
    name: "dotfiles",
    emoji: "🔧",
    desc: "Complete Linux environment, version-controlled life. Every config line has a reason — nothing is there by default.",
    link: "https://github.com/itachi-re/dotfiles",
    tags: ["Hyprland", "Sway", "Neovim", "Ghostty", "Pywal", "Zsh"],
    status: "production_ready",
    statusColor: "#28c840",
  },
  {
    name: "notes-c",
    emoji: "📚",
    desc: "Structured C programming knowledge base. Organized from first principles — every abstraction traced back to the metal.",
    link: "https://github.com/itachi-re/notes-c",
    tags: ["C", "Systems", "Low-level", "Kernel"],
    status: "ongoing",
    statusColor: "#FFD700",
  },
  {
    name: "scripts",
    emoji: "⚡",
    desc: "System automation that earns its place. No bloat. No magic. Every line is readable.",
    link: "https://github.com/itachi-re/scripts",
    tags: ["Bash", "Zsh", "Automation", "Workflow"],
    status: "active",
    statusColor: "#58a6ff",
  },
];

const NAV = ["home", "about", "skills", "projects", "philosophy", "contact"];

const SOCIALS = [
  { label: "GitHub", icon: "GH", href: "https://github.com/itachi-re", sub: "itachi-re" },
  { label: "GitLab", icon: "GL", href: "https://gitlab.com/itachi_re", sub: "itachi_re" },
  { label: "Codeberg", icon: "CB", href: "https://codeberg.org/itachi-re", sub: "itachi-re" },
  { label: "Telegram", icon: "TG", href: "https://t.me/itachi_re", sub: "@itachi_re" },
  { label: "Email", icon: "✉", href: "mailto:xanbenson99@gmail.com", sub: "xanbenson99@gmail.com" },
  { label: "Discord", icon: "DC", href: "https://discord.com/users/ulquiorracifer9", sub: "ulquiorracifer9" },
];

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("home");
  const [typed, setTyped] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState({});
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const sectionRefs = useRef({});

  const FULL_TEXT = "systems enthusiast · low-level explorer · terminal dweller";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(FULL_TEXT.slice(0, i));
      i++;
      if (i > FULL_TEXT.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent = dark ? "88, 166, 255" : "26, 107, 196";
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${accent}, ${0.12 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [dark]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(v => ({ ...v, [e.target.id]: true }));
          setActiveNav(e.target.id);
        }
      }),
      { threshold: 0.2 }
    );
    NAV.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const T = dark ? {
    bg: "#0d1117", bg2: "#161b22",
    glass: "rgba(22,27,34,0.7)", glassBorder: "rgba(88,166,255,0.12)",
    glassHover: "rgba(88,166,255,0.06)", text: "#e6edf3", textMuted: "#7d8590",
    accent: "#58a6ff", gold: "#FFD700",
    navBg: "rgba(13,17,23,0.9)", tagBg: "rgba(88,166,255,0.1)", tagText: "#58a6ff",
    codeBar: "#161b22", codeBg: "#0d1117", commentColor: "#8b949e",
    successColor: "#3fb950",
  } : {
    bg: "#f6f8fa", bg2: "#edf0f3",
    glass: "rgba(255,255,255,0.8)", glassBorder: "rgba(0,0,0,0.08)",
    glassHover: "rgba(0,0,0,0.02)", text: "#1c2128", textMuted: "#57606a",
    accent: "#0969da", gold: "#9a6700",
    navBg: "rgba(246,248,250,0.92)", tagBg: "rgba(9,105,218,0.08)", tagText: "#0969da",
    codeBar: "#f0f2f4", codeBg: "#f6f8fa", commentColor: "#6e7781",
    successColor: "#1a7f37",
  };

  const glass = {
    background: T.glass,
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${T.glassBorder}`,
    borderRadius: "16px",
  };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${T.bg}; }
    ::-webkit-scrollbar-thumb { background: ${T.accent}66; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${T.accent}; }
    body { background: ${T.bg}; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
    @keyframes glow { 0%,100%{box-shadow:0 4px 20px ${T.accent}33;} 50%{box-shadow:0 4px 36px ${T.accent}66;} }
    @keyframes shine { from{background-position:-200% center;} to{background-position:200% center;} }
    @keyframes skillIn { from{width:0;} }
    @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }

    .fade-up { animation: fadeUp 0.7s cubic-bezier(.2,.8,.4,1) both; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }

    .card-hover {
      transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }
    .card-hover:hover {
      transform: translateY(-5px);
      background: ${T.glassHover} !important;
      border-color: ${T.accent}44 !important;
      box-shadow: 0 16px 40px ${T.accent}18;
    }
    .nav-item {
      padding: 5px 13px; border-radius: 6px; cursor: pointer;
      font-size: 12px; letter-spacing: 0.06em; text-transform: lowercase;
      transition: all 0.18s; color: ${T.textMuted};
      font-family: 'JetBrains Mono', monospace;
    }
    .nav-item:hover { color: ${T.accent}; background: ${T.tagBg}; }
    .nav-item.active { color: ${T.accent}; background: ${T.tagBg}; }
    .social-link {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 18px; border-radius: 12px; text-decoration: none;
      color: ${T.text}; transition: all 0.22s;
      background: ${T.glass}; border: 1px solid ${T.glassBorder};
      backdrop-filter: blur(12px);
    }
    .social-link:hover { transform: translateX(6px); border-color: ${T.accent}44; background: ${T.glassHover}; }
    .skill-bar-fill { animation: skillIn 1.4s cubic-bezier(.4,0,.2,1) both; }
    .tag {
      display: inline-block; padding: 3px 10px; border-radius: 20px;
      font-size: 11px; margin: 3px;
      background: ${T.tagBg}; color: ${T.tagText};
      border: 1px solid ${T.accent}22;
      font-family: 'JetBrains Mono', monospace;
    }
    .gradient-text {
      background: linear-gradient(135deg, ${T.accent} 0%, ${T.gold} 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .shimmer-bar {
      background: linear-gradient(90deg, ${T.accent}, ${T.gold}, ${T.accent});
      background-size: 200% 100%;
      animation: shine 3s linear infinite;
    }
    .cursor-blink {
      display: inline-block; width: 10px; height: 1.1em;
      background: ${T.accent}; vertical-align: text-bottom;
      animation: blink 1s step-end infinite; margin-left: 2px;
    }
    .ascii-glow { text-shadow: 0 0 30px ${T.accent}55, 0 0 60px ${T.accent}22; }
    .float-anim { animation: float 4s ease-in-out infinite; }
    .primary-btn {
      background: linear-gradient(135deg, ${T.accent}, ${dark ? "#3d7fcc" : "#0550ae"});
      color: #fff; border: none; border-radius: 10px;
      padding: 12px 28px; cursor: pointer;
      font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600;
      animation: glow 2.5s ease-in-out infinite;
      transition: transform 0.15s;
    }
    .primary-btn:hover { transform: translateY(-2px); }
    .ghost-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: ${T.glass}; border: 1px solid ${T.glassBorder};
      border-radius: 10px; padding: 12px 28px; cursor: pointer;
      font-family: 'JetBrains Mono', monospace; font-size: 14px;
      color: ${T.text}; text-decoration: none;
      backdrop-filter: blur(10px); transition: all 0.2s;
    }
    .ghost-btn:hover { border-color: ${T.accent}44; transform: translateY(-2px); }
    .section-wrap { max-width: 940px; margin: 0 auto; padding: 80px 24px; }
    .section-head { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: ${T.text}; margin-bottom: 6px; }
    .section-sub { color: ${T.textMuted}; font-size: 12px; margin-bottom: 32px; font-family: 'JetBrains Mono', monospace; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .toggle-btn {
      background: ${T.tagBg}; border: 1px solid ${T.glassBorder};
      border-radius: 20px; padding: 6px 15px; cursor: pointer;
      color: ${T.accent}; font-size: 12px;
      font-family: 'JetBrains Mono', monospace; transition: all 0.2s;
    }
    .toggle-btn:hover { border-color: ${T.accent}44; }
    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .mobile-btn { display: block !important; }
      .grid2 { grid-template-columns: 1fr !important; }
      .section-head { font-size: 1.5rem; }
      .ascii-art { font-size: 7px !important; line-height: 1.1 !important; }
      .hero-btns { flex-direction: column; }
    }
    @media (max-width: 420px) {
      .ascii-art { display: none; }
    }
  `;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.3s, color 0.3s" }}>
      <style>{CSS}</style>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: T.navBg, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: `1px solid ${T.glassBorder}`, height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "17px" }}>
          <span style={{ color: T.accent }}>itachi</span><span style={{ color: T.gold }}>_re</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          {NAV.map(n => (
            <span key={n} className={`nav-item ${activeNav === n ? "active" : ""}`} onClick={() => scrollTo(n)}>
              {n}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button className="toggle-btn" onClick={() => setDark(!dark)}>
            {dark ? "☀ light" : "☾ dark"}
          </button>
          <button className="mobile-btn" style={{ display: "none", background: "transparent", border: `1px solid ${T.glassBorder}`, borderRadius: "8px", padding: "6px 11px", cursor: "pointer", color: T.text, fontSize: "15px" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: "60px", inset: "60px 0 auto 0", zIndex: 99, background: T.navBg, backdropFilter: "blur(24px)", borderBottom: `1px solid ${T.glassBorder}`, padding: "12px 24px", display: "flex", flexDirection: "column", gap: "3px" }}>
          {NAV.map(n => (
            <span key={n} style={{ padding: "10px 14px", borderRadius: "8px", cursor: "pointer", color: activeNav === n ? T.accent : T.text, background: activeNav === n ? T.tagBg : "transparent", fontSize: "14px" }} onClick={() => scrollTo(n)}>
              ▸ {n}
            </span>
          ))}
        </div>
      )}

      <main style={{ position: "relative", zIndex: 1, paddingTop: "60px" }}>

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
          <div style={{ maxWidth: "860px", width: "100%" }}>

            {/* ASCII Banner */}
            <div className="fade-up float-anim" style={{ ...glass, padding: "24px 20px", marginBottom: "24px", overflow: "hidden", position: "relative", textAlign: "center" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px" }} className="shimmer-bar" />
              <pre className="ascii-art ascii-glow" style={{ color: T.accent, fontSize: "11px", lineHeight: "1.25", fontFamily: "'JetBrains Mono', monospace" }}>
{`██╗████████╗ █████╗  ██████╗██╗  ██╗██╗
██║╚══██╔══╝██╔══██╗██╔════╝██║  ██║██║
██║   ██║   ███████║██║     ███████║██║
██║   ██║   ██╔══██║██║     ██╔══██║██║
██║   ██║   ██║  ██║╚██████╗██║  ██║██║
╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝`}
              </pre>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px" }} className="shimmer-bar" />
            </div>

            {/* Terminal */}
            <div className="fade-up delay-1" style={{ ...glass, overflow: "hidden", marginBottom: "28px" }}>
              <div style={{ background: T.codeBar, padding: "10px 18px", display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${T.glassBorder}` }}>
                {["#ff5f57","#ffbd2e","#28c840"].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                <span style={{ marginLeft: 10, fontSize: 12, color: T.textMuted }}>~/itachi — zsh — 80×24</span>
              </div>
              <div style={{ padding: "22px 28px", fontFamily: "'JetBrains Mono', monospace" }}>
                {[
                  { cmd: "whoami", out: `itachi — ${typed}`, outColor: T.text, showCursor: true },
                  { cmd: "uptime", out: "always learning · always building · always questioning", outColor: T.textMuted },
                  { cmd: "uname -a", out: "Linux mind 7.x #1 SMP x86_64 | philosophy: minimal, focused, consistent", outColor: T.textMuted },
                ].map(({ cmd, out, outColor, showCursor }, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                    <div><span style={{ color: T.gold }}>❯ </span><span style={{ color: T.accent }}>{cmd}</span></div>
                    <div style={{ color: outColor, paddingLeft: 18, marginTop: 4, fontSize: 13, lineHeight: 1.6 }}>
                      {out}{showCursor && <span className="cursor-blink" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="fade-up delay-2 hero-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button className="primary-btn" onClick={() => scrollTo("projects")}>ls ./projects</button>
              <a className="ghost-btn" href="https://github.com/itachi-re" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                GitHub
              </a>
              <a className="ghost-btn" href="https://t.me/itachi_re" target="_blank" rel="noreferrer">✈ Telegram</a>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about">
          <div className="section-wrap">
            <div className={visible.about ? "fade-up" : ""}>
              <h2 className="section-head"><span style={{ color: T.accent }}>▸ </span>init: <span className="gradient-text">identity</span></h2>
              <p className="section-sub">$ cat ./identity.c — loading core modules...</p>

              <div className="grid2" style={{ marginBottom: 18 }}>
                <div className="card-hover" style={{ ...glass, padding: "26px" }}>
                  <div style={{ color: T.commentColor, fontSize: 12, marginBottom: 14 }}>/* core identity */</div>
                  {[
                    [".handle", '"itachi"'],
                    [".role", '"systems enthusiast · low-level explorer"'],
                    [".reads_source", "true  /* always */"],
                    [".builds_minimal", "true"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 12, flexWrap: "wrap" }}>
                      <span style={{ color: T.gold, minWidth: 110 }}>{k}</span>
                      <span style={{ color: T.textMuted }}>=</span>
                      <span style={{ color: T.accent }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="card-hover" style={{ ...glass, padding: "26px" }}>
                  <div style={{ color: T.commentColor, fontSize: 12, marginBottom: 14 }}>/* daily driver stack */</div>
                  {["openSUSE Tumbleweed", "Arch Linux", "Kali Linux"].map(e => (
                    <div key={e} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span style={{ color: T.successColor, fontSize: 10 }}>●</span>
                      <span style={{ fontSize: 13 }}>{e}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${T.glassBorder}`, paddingTop: 14, marginTop: 6 }}>
                    {["Hyprland", "Sway", "Neovim", "Ghostty", "Zsh", "rEFInd", "Btrfs", "Pywal"].map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>

              <div className="card-hover" style={{ ...glass, padding: "26px" }}>
                <div style={{ color: T.commentColor, fontSize: 12, marginBottom: 16 }}>/* currently_exploring[] = &#123; */</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                  {[
                    ["⚙", "wayland_compositor_internals"],
                    ["🔓", "binary_exploitation"],
                    ["🌐", "network_protocol_analysis"],
                    ["⚡", "c_systems_programming"],
                    ["📊", "low_level_performance"],
                  ].map(([icon, label]) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: T.tagBg, fontSize: 12 }}>
                      <span style={{ fontSize: 16 }}>{icon}</span>
                      <span style={{ color: T.accent }}>{label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ color: T.commentColor, fontSize: 12, marginTop: 14 }}>/* &#125; */</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills">
          <div className="section-wrap">
            <div className={visible.skills ? "fade-up" : ""}>
              <h2 className="section-head"><span style={{ color: T.accent }}>▸ </span>cat <span className="gradient-text">learning_goals.txt</span></h2>
              <p className="section-sub">$ [ACTIVE MODULES] — progress tracking enabled</p>

              <div style={{ ...glass, padding: "30px", marginBottom: 18 }}>
                {SKILLS.map((s, i) => (
                  <div key={s.name} style={{ marginBottom: i < SKILLS.length - 1 ? 26 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 13 }}>► {s.name}</span>
                      <span style={{ fontSize: 12, color: T.accent, fontWeight: 600 }}>{s.level}%</span>
                    </div>
                    <div style={{ height: "5px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                      <div className="skill-bar-fill" style={{
                        width: `${s.level}%`, height: "100%", borderRadius: "3px",
                        background: `linear-gradient(90deg, ${T.accent}, ${T.gold})`,
                        animationDelay: `${i * 0.18}s`,
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: T.textMuted, textAlign: "right", marginTop: 3, letterSpacing: "-1px" }}>
                      {"█".repeat(Math.floor(s.level / 10))}{"░".repeat(10 - Math.floor(s.level / 10))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ ...glass, padding: "24px" }}>
                <div style={{ color: T.commentColor, fontSize: 12, marginBottom: 14 }}>/* languages & tools */</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {[
                    { n: "C", c: "#A8B9CC" }, { n: "Python", c: "#3776AB" },
                    { n: "Bash", c: "#4EAA25" }, { n: "Lua", c: "#7C74D9" },
                    { n: "Zsh", c: "#89E051" }, { n: "GDB", c: "#ff6b6b" },
                    { n: "Make", c: "#FFD700" }, { n: "Git", c: "#F54D27" },
                    { n: "Neovim", c: "#57A143" }, { n: "Docker", c: "#2496ED" },
                  ].map(({ n, c }) => (
                    <div key={n} style={{ padding: "7px 15px", borderRadius: "8px", fontSize: 13, background: `${c}18`, border: `1px solid ${c}44`, color: c }}>
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <div className="section-wrap">
            <div className={visible.projects ? "fade-up" : ""}>
              <h2 className="section-head"><span style={{ color: T.accent }}>▸ </span>ls -la <span className="gradient-text">./projects</span></h2>
              <p className="section-sub">$ total 3 — drwxr-xr-x itachi-re</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>
                {PROJECTS.map((p, i) => (
                  <a key={p.name} href={p.link} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <div className="card-hover" style={{ ...glass, padding: "26px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", animationDelay: `${i * 0.12}s` }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 22 }}>{p.emoji}</span>
                          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: T.text }}>{p.name}</span>
                          <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: "5px", background: `${p.statusColor}18`, color: p.statusColor, border: `1px solid ${p.statusColor}33` }}>{p.status}</span>
                        </div>
                        <p style={{ color: T.textMuted, fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
                        <div>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                      </div>
                      <span style={{ color: T.accent, fontSize: 22, opacity: 0.45 }}>→</span>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ ...glass, padding: "24px", textAlign: "center" }}>
                <div style={{ color: T.commentColor, fontSize: 12, marginBottom: 16 }}>/* github activity graph */</div>
                <img
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=itachi-re&bg_color=00000000&color=${dark ? "FFD700" : "0969da"}&line=${dark ? "58a6ff" : "0969da"}&point=${dark ? "FFD700" : "9a6700"}&hide_border=true`}
                  alt="GitHub Activity Graph"
                  style={{ width: "100%", borderRadius: 10, maxWidth: "100%", opacity: 0.9 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── PHILOSOPHY ── */}
        <section id="philosophy">
          <div className="section-wrap">
            <div className={visible.philosophy ? "fade-up" : ""}>
              <h2 className="section-head"><span style={{ color: T.accent }}>▸ </span>cat <span className="gradient-text">/proc/philosophy</span></h2>
              <p className="section-sub">$ python3 philosophy.py — runtime beliefs (read-only)</p>

              <div className="grid2" style={{ marginBottom: 18 }}>
                {[
                  { k: "precision", v: "Every line has purpose. Decoration is a warning sign.", i: "⚡" },
                  { k: "transparency", v: "If a system can't be understood, it can't be trusted.", i: "🔍" },
                  { k: "documentation", v: "Future-you deserves to know what present-you figured out.", i: "📝" },
                  { k: "depth", v: "Go one level deeper than you think you need to.", i: "⬇" },
                ].map(({ k, v, i }) => (
                  <div key={k} className="card-hover" style={{ ...glass, padding: "22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 18 }}>{i}</span>
                      <span style={{ color: T.gold, fontSize: 12 }}>"{k}"</span>
                    </div>
                    <p style={{ color: T.text, fontSize: 13, lineHeight: 1.65 }}>{v}</p>
                  </div>
                ))}
              </div>

              <div style={{ ...glass, padding: "24px", marginBottom: 18 }}>
                <div style={{ color: "#ff6b6b", fontSize: 12, marginBottom: 14 }}>/* REJECTS = [</div>
                {["cargo-cult configuration", "tools you can't explain", "complexity that serves the author, not the reader", "giving up before reading the source"].map((item, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 13 }}>
                    <span style={{ color: "#ff6b6b" }}>✗</span>
                    <span style={{ color: T.textMuted }}>"{item}"{i < arr.length - 1 ? "," : ""}</span>
                  </div>
                ))}
                <div style={{ color: "#ff6b6b", fontSize: 12, marginTop: 10 }}>] */</div>
              </div>

              <div style={{ ...glass, padding: "36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px" }} className="shimmer-bar" />
                <blockquote style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontStyle: "italic", color: T.text, lineHeight: 1.5, fontWeight: 600 }}>
                  "The quieter you become, the more you can hear."
                </blockquote>
                <p style={{ color: T.textMuted, fontSize: 12, marginTop: 10 }}>— /proc/philosophy</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact">
          <div className="section-wrap">
            <div className={visible.contact ? "fade-up" : ""}>
              <h2 className="section-head"><span style={{ color: T.accent }}>▸ </span>find <span className="gradient-text">./contact</span></h2>
              <p className="section-sub">$ ping itachi-re — awaiting response...</p>

              <div className="grid2" style={{ marginBottom: 24 }}>
                {SOCIALS.map(({ label, icon, href, sub }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="social-link">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: T.tagBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: T.accent, fontWeight: 700, flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{label}</div>
                      <div style={{ fontSize: 11, color: T.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>{sub}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ ...glass, padding: "26px", fontFamily: "'JetBrains Mono', monospace" }}>
                <div style={{ color: T.commentColor, fontSize: 12, marginBottom: 14 }}>$ systemctl --user status life.service</div>
                {[
                  ["● ", "life.service — Itachi's Operating Runtime", T.successColor],
                  ["   Loaded:", "loaded (/etc/systemd/user/life.service; enabled)", T.text],
                  ["   Active:", "active (running) — and always iterating", T.successColor],
                  ["  CGroup:", "curiosity [running] · discipline [running] · open_source [running]", T.accent],
                ].map(([k, v, c], i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, flexWrap: "wrap" }}>
                    <span style={{ color: T.textMuted, minWidth: 80, flexShrink: 0 }}>{k}</span>
                    <span style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${T.glassBorder}`, padding: "28px 24px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace" }}>
          <p style={{ color: T.textMuted, fontSize: 12 }}>© 2025 <span style={{ color: T.accent }}>itachi_re</span> — built with curiosity · refined with patience</p>
          <p style={{ color: T.accent, fontSize: 11, marginTop: 6 }}>[  ∞.∞∞∞∞∞∞ ] Still learning...</p>
        </footer>
      </main>
    </div>
  );
}
