
import { useState, useEffect } from "react";

const IMG_SYMBOL = "/images/symbol.jpg";
const IMG_TIKTOK_LIVE = "/images/tiktok_live.jpg";
const IMG_FORBES = "/images/forbes.png";
const IMG_TIKTOK = "/images/tiktok.jpg";
const IMG_INSTAGRAM = "/images/instagram.jpg";
const IMG_LINKEDIN = "/images/linkedin.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0a;
    --surface-low: #111111;
    --surface-mid: #181818;
    --pink: #ff2d78;
    --blue: #00cfff;
    --purple: #9b6dff;
    --white-5: rgba(255,255,255,0.04);
  }

  body { background: var(--bg); color: #fff; font-family: 'DM Sans', sans-serif; }
  .display { font-family: 'Barlow Condensed', sans-serif; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(-15deg); }
    50% { transform: translateY(-20px) rotate(-15deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255,45,120,0.3), 0 0 60px rgba(255,45,120,0.1); }
    50% { box-shadow: 0 0 40px rgba(255,45,120,0.6), 0 0 100px rgba(255,45,120,0.2); }
  }
  @keyframes slide-in {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hero-animate { animation: slide-in 0.8s ease forwards; }
  .hero-animate-2 { animation: slide-in 0.8s 0.2s ease forwards; opacity: 0; }
  .hero-animate-3 { animation: slide-in 0.8s 0.4s ease forwards; opacity: 0; }

  .gradient-text {
    background: linear-gradient(135deg, var(--pink) 0%, var(--purple) 50%, var(--blue) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gradient-text-shimmer {
    background: linear-gradient(90deg, var(--pink), var(--purple), var(--blue), var(--pink));
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--pink), #c4006a);
    color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 16px 36px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;
    animation: glow-pulse 3s ease-in-out infinite;
  }
  .btn-primary:hover { transform: scale(1.04); }

  .btn-ghost {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 16px 36px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.25); }

  .service-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 36px 32px;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--pink), var(--blue));
    transform: scaleX(0);
    transition: transform 0.3s;
  }
  .service-card:hover::before { transform: scaleX(1); }
  .service-card:hover { background: rgba(255,255,255,0.07); }

  .step-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 100px;
    line-height: 1;
    position: absolute;
    top: -10px;
    right: -5px;
    color: rgba(255,255,255,0.025);
    pointer-events: none;
    letter-spacing: -0.05em;
  }

  .live-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,45,120,0.15);
    border: 1px solid rgba(255,45,120,0.3);
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--pink);
  }
  .live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--pink);
    animation: pulse-dot 1.5s ease-in-out infinite;
  }

  .partner-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
  }

  .stat-card {
    border-left: 2px solid;
    padding: 20px 24px;
    background: rgba(255,255,255,0.04);
  }

  .orb {
    border-radius: 50%;
    filter: blur(80px);
    position: absolute;
    pointer-events: none;
  }

  .nav-link {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
  }
  .nav-link:hover { color: #fff; }

  .accent-line {
    width: 40px; height: 2px;
    background: linear-gradient(90deg, var(--pink), var(--blue));
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 12px;
  }

  .mobile-menu {
    position: fixed;
    inset: 0;
    background: rgba(5,5,5,0.97);
    backdrop-filter: blur(30px);
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 36px;
  }
  .mobile-nav-link {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 52px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
  }
  .mobile-nav-link:hover { color: #fff; }

  /* ── Responsive grids ── */

  .grid-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .grid-3col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .grid-4col {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
  }
  .grid-footer {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px;
    margin-bottom: 60px;
  }
  .forbes-inner {
    display: grid;
    grid-template-columns: auto 1px 1fr;
    gap: 48px;
    align-items: center;
  }
  .forbes-divider { display: block; }

  .hero-h1-size { font-size: 108px; }
  .section-h2-size { font-size: 72px; }
  .about-h2-size { font-size: 80px; }
  .cta-h2-size { font-size: 96px; }
  .section-pad { padding: 120px 40px; }
  .hero-pad { padding: 140px 40px 100px; }
  .footer-pad { padding: 72px 40px 40px; }
  .about-visual { display: block; }

  @media (max-width: 900px) {
    .grid-2col { grid-template-columns: 1fr; gap: 48px; }
    .grid-3col { grid-template-columns: 1fr; gap: 2px; }
    .grid-4col { grid-template-columns: 1fr 1fr; gap: 2px; }
    .grid-footer { grid-template-columns: 1fr 1fr; gap: 40px; }
    .forbes-inner { grid-template-columns: 1fr; gap: 28px; }
    .forbes-divider { display: none; }
    .hero-h1-size { font-size: 68px; }
    .section-h2-size { font-size: 52px; }
    .about-h2-size { font-size: 60px; }
    .cta-h2-size { font-size: 68px; }
    .section-pad { padding: 80px 24px; }
    .hero-pad { padding: 120px 24px 80px; }
    .footer-pad { padding: 56px 24px 32px; }
    .about-visual { display: none; }
    .hide-mobile { display: none !important; }
  }

  @media (max-width: 600px) {
    .grid-4col { grid-template-columns: 1fr; }
    .grid-footer { grid-template-columns: 1fr; gap: 36px; }
    .hero-h1-size { font-size: 56px; }
    .section-h2-size { font-size: 44px; }
    .about-h2-size { font-size: 50px; }
    .cta-h2-size { font-size: 56px; }
    .section-pad { padding: 64px 20px; }
    .hero-pad { padding: 110px 20px 60px; }
    .footer-pad { padding: 48px 20px 28px; }
  }
`;

export default function HierarchyMusic() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 28, right: 28, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 32, cursor: 'pointer', lineHeight: 1 }}>✕</button>
          <span className="mobile-nav-link" onClick={() => scrollTo('about')}>About</span>
          <span className="mobile-nav-link" onClick={() => scrollTo('services')}>Services</span>
          <span className="mobile-nav-link" onClick={() => scrollTo('process')}>Process</span>
          <span className="mobile-nav-link" onClick={() => scrollTo('press')}>Press</span>
          <a href="https://www.tiktok.com/t/ZThEgupyg/" target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ marginTop: 16, animation: 'none' }} onClick={() => setMenuOpen(false)}>Apply Now</button>
          </a>
        </div>
      )}

      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        transition: 'all 0.3s',
      }}>
        <nav style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={IMG_SYMBOL} alt="H" style={{ height: 32, width: 'auto', mixBlendMode: 'screen' }} />
            <span className="display" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', fontStyle: 'italic' }}>Hierarchy Music</span>
          </div>
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <span className="nav-link" onClick={() => scrollTo('about')}>About</span>
            <span className="nav-link" onClick={() => scrollTo('services')}>Services</span>
            <span className="nav-link" onClick={() => scrollTo('process')}>Process</span>
            <span className="nav-link" onClick={() => scrollTo('press')}>Press</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="https://www.tiktok.com/t/ZThEgupyg/" target="_blank" rel="noopener noreferrer" className="hide-mobile">
              <button className="btn-primary" style={{ padding: '11px 24px', fontSize: 11, animation: 'none' }}>Apply Now</button>
            </a>
            <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: 40, height: 40, borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 5, padding: 10 }}>
              <span style={{ display: 'block', width: 18, height: 1.5, background: '#fff', borderRadius: 2 }}></span>
              <span style={{ display: 'block', width: 12, height: 1.5, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }}></span>
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#060606' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'rgba(255,45,120,0.12)', top: '10%', left: '-10%' }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(0,207,255,0.08)', bottom: '10%', right: '-5%' }} />
        <div className="orb" style={{ width: 300, height: 300, background: 'rgba(155,109,255,0.1)', top: '40%', right: '20%' }} />
        <img src={IMG_SYMBOL} alt="" style={{ position: 'absolute', width: '80vw', maxWidth: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-15deg)', opacity: 0.03, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', textAlign: 'center' }} className="hero-pad">
          <div className="hero-animate" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
            <span className="partner-badge">
              <img src={IMG_TIKTOK} alt="TikTok" style={{ height: 15, width: 'auto', mixBlendMode: 'screen' }} />
              Official TikTok LIVE Partner
            </span>
            <span className="live-badge">
              <span className="live-dot"></span>
              Now Recruiting
            </span>
          </div>

          <h1 className="display hero-animate-2 hero-h1-size" style={{ fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', fontStyle: 'italic', marginBottom: 28 }}>
            Your Talent.<br />
            <span className="gradient-text-shimmer">Your Stream.</span><br />
            Your Income.
          </h1>

          <p className="hero-animate-3" style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75, fontWeight: 400 }}>
            An <strong style={{ color: '#fff' }}>AI Record Label</strong> and Official TikTok LIVE Partner built for music artists, models, and actors — we turn your livestreams into <strong style={{ color: '#fff' }}>real, consistent income</strong>.
          </p>

          <div className="hero-animate-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.tiktok.com/t/ZThEgupyg/" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary" style={{ fontSize: 12 }}>Apply Now</button>
            </a>
            <button className="btn-ghost" onClick={() => scrollTo('services')}>See How It Works</button>
          </div>

          {/* Stats */}
          <div className="hero-animate-3" style={{ display: 'flex', gap: 0, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap' }}>
            {[
              { val: '10K+', label: 'Creator Hours', color: 'var(--pink)' },
              { val: 'Official', label: 'TikTok Partner', color: 'var(--blue)' },
              { val: 'Forbes', label: 'Featured In', color: 'var(--purple)' },
            ].map((s, i) => (
              <div key={i} className="stat-card" style={{ borderLeftColor: s.color, flex: '1 1 140px', minWidth: 120 }}>
                <div className="display" style={{ fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, right: 28, opacity: 0.4 }}>
          <img src={IMG_TIKTOK_LIVE} alt="TikTok LIVE" style={{ height: 32, width: 'auto', mixBlendMode: 'screen' }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: 'var(--surface-low)', position: 'relative', overflow: 'hidden' }} className="section-pad">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="grid-2col">
            <div>
              <div className="accent-line"></div>
              <p className="section-label">Who We Are</p>
              <h2 className="display about-h2-size" style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 24 }}>
                The Label<br />
                <span className="gradient-text">Built for</span><br />
                Live.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: 15, marginBottom: 16 }}>
                Hierarchy Music is an <strong style={{ color: '#fff' }}>AI-powered record label and Official TikTok LIVE Partner</strong> based in Florida. We exist for one purpose: to take music artists, models, and actors from talented to <em>paid</em>.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, fontSize: 15, marginBottom: 32 }}>
                We combine proprietary AI strategy with hands-on coaching — giving every creator in our network the tools, insights, and support to grow faster and earn consistently.
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={IMG_TIKTOK} alt="TikTok" style={{ height: 20, width: 'auto', opacity: 0.8, mixBlendMode: 'screen' }} />
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Official Partner</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 2, background: 'linear-gradient(135deg,var(--pink),var(--blue))', display: 'block' }}></span>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>AI-Powered Label</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Follow</span>
                {[
                  { href: 'https://www.instagram.com/hierarchymusic', img: IMG_INSTAGRAM, label: '@hierarchymusic' },
                  { href: 'https://www.tiktok.com/@hierarchy.music', img: IMG_TIKTOK, label: '@hierarchy.music' },
                  { href: 'https://www.linkedin.com/company/hierarchymusic', img: IMG_LINKEDIN, label: 'LinkedIn' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                    <img src={s.img} alt="" style={{ height: 15, width: 'auto', mixBlendMode: 'screen', opacity: 0.8 }} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Visual panel — hidden on mobile via CSS */}
            <div className="about-visual">
              <div style={{ background: 'var(--surface-mid)', borderRadius: 4, padding: 48, border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div className="orb" style={{ width: 200, height: 200, background: 'rgba(255,45,120,0.15)', top: -50, right: -50, filter: 'blur(60px)' }} />
                <img src={IMG_SYMBOL} alt="Hierarchy Symbol" style={{ width: '80%', maxWidth: 260, margin: '0 auto', display: 'block', position: 'relative', zIndex: 1, mixBlendMode: 'screen' }} />
                <div className="display" style={{ textAlign: 'center', marginTop: 16, fontSize: 20, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', position: 'relative', zIndex: 1 }}>Hierarchy Music</div>
                <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <span className="live-badge"><span className="live-dot"></span>LIVE Partner</span>
                  <img src={IMG_TIKTOK_LIVE} alt="TikTok LIVE" style={{ height: 30, width: 'auto', opacity: 0.9, mixBlendMode: 'screen' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div className="accent-line"></div>
            <p className="section-label">What We Do</p>
            <h2 className="display section-h2-size" style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Coaching &amp;<br />
              <span className="gradient-text">Optimization.</span>
            </h2>
          </div>
          <div className="grid-3col">
            {[
              { icon: '🎙', num: '01', title: 'LIVE Monetization Coaching', body: 'One-on-one coaching to maximize earnings from TikTok LIVE gifts, events, and brand deals. Go LIVE with a professional label strategy — and a real paycheck.', accent: 'var(--pink)' },
              { icon: '⚡', num: '02', title: 'AI Optimization', body: 'Our proprietary AI identifies the right audience segments, content styles, and streaming schedules for music artists, models, and actors — so your reach actually matches your talent.', accent: 'var(--blue)' },
              { icon: '🎯', num: '03', title: 'Official TikTok Support', body: 'As an Official TikTok LIVE Partner, we give you priority access, dedicated creator managers, live feedback, and exclusive collaboration opportunities unavailable to solo creators.', accent: 'var(--purple)' },
            ].map((s) => (
              <div key={s.num} className="service-card">
                <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: s.accent, marginBottom: 12, textTransform: 'uppercase' }}>{s.num}</div>
                <h3 className="display" style={{ fontSize: 26, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 14, lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>{s.body}</p>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.accent }}>Learn More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ background: 'var(--surface-low)' }} className="section-pad">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div className="accent-line"></div>
            <p className="section-label">How You Start Earning</p>
            <h2 className="display section-h2-size" style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Four Steps.<br />
              <span className="gradient-text">One Goal.</span>
            </h2>
          </div>
          <div className="grid-4col">
            {[
              { n: '01', title: 'Apply', body: "Submit your application. We review your profile to see if you're the right fit for our AI label network.", color: 'var(--pink)' },
              { n: '02', title: 'Onboard', body: 'We build a personalized AI-optimized strategy around your unique talent as an artist, model, or actor.', color: 'var(--blue)' },
              { n: '03', title: 'Go Live', body: 'Start streaming with professional coaching. Maximize gifts, brand income, and audience growth every session.', color: 'var(--pink)' },
              { n: '04', title: 'Get Paid', body: 'Watch your earnings grow. We handle the backend strategy so you can stay focused on performing.', color: 'var(--blue)' },
            ].map((step) => (
              <div key={step.n} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                <span className="step-num">{step.n}</span>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: step.color, marginBottom: 16, textTransform: 'uppercase' }}>{step.n}</div>
                <h3 className="display" style={{ fontSize: 30, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.75 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section id="press" style={{ background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 52 }}>
            <div className="accent-line"></div>
            <p className="section-label">Press &amp; Media</p>
            <h2 className="display section-h2-size" style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              As Seen on<br />
              <span className="gradient-text">Forbes.</span>
            </h2>
          </div>
          <a href="https://www.forbes.com/sites/anniebrown/2021/05/31/making-ai-sing-an-interview-with-verphoria-on-the-use-of-artificial-intelligence-within-the-music-industry/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '40px 36px', borderRadius: 4, transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
            <div className="forbes-inner">
              <img src={IMG_FORBES} alt="Forbes" style={{ height: 32, width: 'auto', mixBlendMode: 'screen', opacity: 0.85 }} />
              <div className="forbes-divider" style={{ height: 72, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 12 }}>By Annie Brown · Forbes</div>
                <h3 className="display" style={{ fontSize: 26, fontWeight: 800, fontStyle: 'italic', letterSpacing: '-0.01em', marginBottom: 12, lineHeight: 1.15 }}>
                  "Making AI Sing" — The Future of Artificial Intelligence Within the Music Industry
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.7, maxWidth: 520, marginBottom: 20 }}>
                  Hierarchy Music featured in Forbes exploring how AI optimization is transforming creator management and reshaping the modern music industry.
                </p>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)' }}>Read Full Article →</div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#060606', textAlign: 'center', position: 'relative', overflow: 'hidden' }} className="section-pad">
        <div className="orb" style={{ width: 600, height: 600, background: 'rgba(255,45,120,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(120px)' }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(155,109,255,0.07)', top: '20%', left: '15%', filter: 'blur(100px)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            <img src={IMG_SYMBOL} alt="Hierarchy" style={{ height: 90, width: 'auto' }} />
          </div>
          <h2 className="display cta-h2-size" style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.88, marginBottom: 20 }}>
            Ready to<br /><span className="gradient-text-shimmer">Get Paid?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 440, margin: '0 auto 40px', lineHeight: 1.75 }}>
            If you're a music artist, model, or actor ready to let <strong style={{ color: '#fff' }}>AI strategy and real coaching</strong> turn your audience into income — we want to hear from you.
          </p>
          <a href="https://www.tiktok.com/t/ZThEgupyg/" target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ fontSize: 13, padding: '18px 48px' }}>Apply Now</button>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="footer-pad">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="grid-footer">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img src={IMG_SYMBOL} alt="H" style={{ height: 36, width: 'auto', mixBlendMode: 'screen' }} />
                <span className="display" style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>Hierarchy Music</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, lineHeight: 1.75, maxWidth: 260, marginBottom: 20 }}>
                An AI Record Label and Official TikTok LIVE Partner helping music artists, models, and actors turn their audience into real income.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                {[
                  { href: 'https://www.instagram.com/hierarchymusic', img: IMG_INSTAGRAM },
                  { href: 'https://www.tiktok.com/@hierarchy.music', img: IMG_TIKTOK },
                  { href: 'https://www.linkedin.com/company/hierarchymusic', img: IMG_LINKEDIN },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                    <img src={s.img} alt="" style={{ height: 20, width: 'auto', mixBlendMode: 'screen', opacity: 0.5, transition: 'opacity 0.2s' }}
                      onMouseEnter={e => e.target.style.opacity = '1'}
                      onMouseLeave={e => e.target.style.opacity = '0.5'} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { heading: 'Navigate', links: [{ label: 'About', fn: () => {} }, { label: 'Services', fn: () => {} }, { label: 'Process', fn: () => {} }, { label: 'Press', fn: () => {} }] },
              { heading: 'Legal', links: [{ label: 'Terms of Service', href: '#' }, { label: 'Privacy Policy', href: '#' }, { label: 'Contact', href: '#' }] },
              { heading: 'Connect', links: [{ label: 'Instagram', href: 'https://www.instagram.com/hierarchymusic' }, { label: 'TikTok', href: 'https://www.tiktok.com/@hierarchy.music' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hierarchymusic' }, { label: 'Forbes Feature', href: 'https://www.forbes.com/sites/anniebrown/2021/05/31/making-ai-sing-an-interview-with-verphoria-on-the-use-of-artificial-intelligence-within-the-music-industry/' }] },
            ].map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 20 }}>{col.heading}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => (
                    <li key={l.label}>
                      <a href={l.href || '#'} target={l.href && l.href !== '#' ? '_blank' : undefined} rel={l.href && l.href !== '#' ? 'noopener noreferrer' : undefined}
                        style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = '#fff'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>© 2026 Hierarchy Music LLC. All Rights Reserved.</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Florida, USA</p>
          </div>
        </div>
      </footer>
    </>
  );
}
