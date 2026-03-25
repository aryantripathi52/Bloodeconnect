// src/landing/LandingPage.jsx
// Fonts: Add to your index.html or main CSS —
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

import { useEffect, useRef, useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  deepGreen: "#1a4a3a",
  midGreen: "#00594a",
  accentGreen: "#2d7a5e",
  lightGreen: "#4a9e7e",
  paleGreen: "#e8f5f0",
  red: "#c0392b",
  white: "#ffffff",
  softGray: "#f4f6f5",
  midGray: "#8a9a94",
  dark: "#0d1f18",
  text: "#1c2e26",
};

const serif = "'Playfair Display', Georgia, serif";
const sans = "'DM Sans', sans-serif";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCounter(target, trigger) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const duration = 1800;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target]);
  return value;
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: 72,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid rgba(26,74,58,0.08)`,
        boxShadow: scrolled ? "0 4px 24px rgba(26,74,58,0.1)" : "none",
        transition: "box-shadow 0.3s",
        fontFamily: sans,
      }}
    >
      <a href="#" style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 700, color: C.deepGreen, textDecoration: "none", letterSpacing: "-0.02em" }}>
        Blood<span style={{ color: C.red }}>Connect</span>
      </a>

      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        {["Home", "Find Camp", "Donate", "Register"].map((link) => (
          <li key={link}>
            <a href="#" style={{ fontSize: "0.88rem", fontWeight: 500, color: C.text, textDecoration: "none", letterSpacing: "0.02em" }}>
              {link}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#cta"
        style={{
          background: C.deepGreen, color: C.white,
          padding: "0.55rem 1.4rem", borderRadius: 50,
          fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.target.style.background = C.midGreen}
        onMouseLeave={e => e.target.style.background = C.deepGreen}
      >
        Donate Now
      </a>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [statRef, statVisible] = useScrollReveal();
  const count = useCounter(42895, statVisible);

  return (
    <section style={{ minHeight: "100vh", paddingTop: 72, display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden", fontFamily: sans }}>

      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8% 6% 14% 8%", background: C.white, position: "relative", zIndex: 2 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accentGreen, marginBottom: "1.5rem" }}>
          <span style={{ display: "block", width: 24, height: 2, background: C.red }} />
          Blood Donation Platform
        </span>

        <h1 style={{ fontFamily: serif, fontSize: "clamp(3rem, 5.5vw, 5.5rem)", fontWeight: 900, lineHeight: 1.05, color: C.deepGreen, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
          Every Drop is a{" "}
          <em style={{ fontStyle: "italic", color: C.red }}>Lifeline.</em>
        </h1>

        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#4a6058", maxWidth: 440, marginBottom: "2.5rem" }}>
          Join thousands of donors saving lives every day. Your blood donation can make the critical difference for someone in need — and takes less than an hour.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <PrimaryBtn href="#cta">
            <HeartIcon /> Donate Now
          </PrimaryBtn>
          <GhostBtn href="#find-sanctuary">Find Camp</GhostBtn>
        </div>
      </div>

      {/* Right — photo */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${C.deepGreen} 0%, ${C.accentGreen} 50%, #3d9e7e 100%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=900&q=80') center/cover no-repeat",
          opacity: 0.82,
          mixBlendMode: "luminosity",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,74,58,0.55) 0%, rgba(0,89,74,0.2) 100%)" }} />

        {/* Floating badge */}
        <div style={{
          position: "absolute", top: "12%", right: "8%", zIndex: 3,
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 16, padding: "1.25rem 1.5rem",
          color: C.white, fontFamily: sans,
        }}>
          <span style={{ fontFamily: serif, fontSize: "2rem", fontWeight: 700, display: "block", marginBottom: "0.2rem" }}>98%</span>
          <span style={{ opacity: 0.75, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.68rem", fontWeight: 600 }}>Donor Satisfaction</span>
        </div>
      </div>

      {/* Floating stat card */}
      <div
        ref={statRef}
        style={{
          position: "absolute", bottom: "-2.5rem", left: "50%", transform: "translateX(-50%)",
          width: "90%", maxWidth: 560,
          background: C.white, borderRadius: 20,
          boxShadow: "0 20px 60px rgba(26,74,58,0.18)",
          padding: "1.75rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          zIndex: 10, fontFamily: sans,
        }}
      >
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.midGray, marginBottom: "0.4rem" }}>Lives Saved This Year</div>
          <div style={{ fontFamily: serif, fontSize: "2.8rem", fontWeight: 900, color: C.deepGreen, lineHeight: 1, marginBottom: "0.3rem" }}>
            {count.toLocaleString()}
          </div>
          <div style={{ fontSize: "0.85rem", color: C.accentGreen, fontWeight: 600 }}>↑ 214k+ total donations recorded</div>
        </div>
        <div style={{
          width: 80, height: 80, background: C.paleGreen, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem", flexShrink: 0, marginLeft: "1.5rem",
        }}>📍</div>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const STATS = [
  { number: "1.2M+", label: "Blood Donations" },
  { number: "Join Us", label: "Become a Partner", cta: true },
  { number: "4,200+", label: "Camps Organized" },
  { number: "86K+", label: "Volunteers" },
];

function StatsBar() {
  return (
    <section style={{ background: C.softGray, padding: "5rem 5% 3rem", marginTop: "2.5rem", fontFamily: sans }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        maxWidth: 1100, margin: "0 auto",
        border: `1px solid rgba(26,74,58,0.1)`, borderRadius: 20,
        overflow: "hidden", background: C.white,
        boxShadow: "0 4px 30px rgba(26,74,58,0.06)",
      }}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <StatBlock {...s} last={i === STATS.length - 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StatBlock({ number, label, cta, last }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "2.5rem 2rem", textAlign: "center",
        borderRight: last ? "none" : `1px solid rgba(26,74,58,0.08)`,
        background: hover ? C.paleGreen : C.white,
        transition: "background 0.2s",
      }}
    >
      <div style={{ fontFamily: serif, fontSize: cta ? "1.3rem" : "2.5rem", fontWeight: 900, color: cta ? C.red : C.deepGreen, lineHeight: 1, marginBottom: "0.4rem" }}>
        {number}
      </div>
      <div style={{ fontSize: "0.78rem", color: C.midGray, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
      {cta && (
        <a href="#cta" style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.78rem", fontWeight: 600, color: C.deepGreen, textDecoration: "none", borderBottom: `1px solid ${C.deepGreen}` }}>
          Partner Today →
        </a>
      )}
    </div>
  );
}

// ─── Blood Types ──────────────────────────────────────────────────────────────
const BLOOD_TYPES = [
  { type: "O−", rare: "Universal Donor", desc: "Compatible with all blood types. Critically needed for emergency transfusions." },
  { type: "O+", rare: null, desc: "Most common blood type. Can donate to all positive blood types." },
  { type: "A−", rare: "Rare", desc: "Compatible with A and AB. Highly sought for platelet donations." },
  { type: "A+", rare: null, desc: "Second most common. Can donate to A+ and AB+ recipients." },
  { type: "B−", rare: "Rare", desc: "Found in less than 2% of the population. Vital for B and AB types." },
  { type: "B+", rare: null, desc: "Can donate to B+ and AB+ patients. Found in about 9% of people." },
  { type: "AB−", rare: "Rarest", desc: "Universal plasma donor. Found in just 1% of the global population." },
  { type: "AB+", rare: null, desc: "Universal plasma recipient. Can receive any blood type with positive Rh." },
];

function BloodTypes() {
  return (
    <section id="blood-types" style={{ padding: "6rem 5%", background: C.white, textAlign: "center", fontFamily: sans }}>
      <Reveal><SectionTitle>Every Type Matters</SectionTitle></Reveal>
      <Reveal delay={100}>
        <SectionSub style={{ margin: "0 auto 3.5rem" }}>
          Each blood type plays a unique role in saving lives. Understanding compatibility can help match the right donor with the right patient at the right time.
        </SectionSub>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", maxWidth: 1100, margin: "0 auto" }}>
        {BLOOD_TYPES.map((b, i) => (
          <Reveal key={b.type} delay={(i % 4) * 80}>
            <BloodCard {...b} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BloodCard({ type, rare, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? C.paleGreen : C.white,
        border: `1.5px solid ${hover ? C.accentGreen : "rgba(26,74,58,0.1)"}`,
        borderRadius: 16, padding: "2rem 1.5rem",
        cursor: "pointer", textAlign: "center",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 8px 32px rgba(26,74,58,0.12)" : "none",
        transition: "all 0.25s",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Bottom accent bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: C.deepGreen,
        transform: hover ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s",
      }} />
      <div style={{ fontFamily: serif, fontSize: "2.5rem", fontWeight: 900, color: C.deepGreen, marginBottom: "0.75rem", lineHeight: 1 }}>{type}</div>
      {rare && (
        <span style={{ display: "inline-block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: C.red, color: C.white, padding: "0.2rem 0.5rem", borderRadius: 4, marginBottom: "0.75rem" }}>
          {rare}
        </span>
      )}
      <p style={{ fontSize: "0.82rem", color: "#5a7068", lineHeight: 1.5, marginTop: rare ? 0 : "1.5rem" }}>{desc}</p>
    </div>
  );
}

// ─── Find Sanctuary ───────────────────────────────────────────────────────────
function FindSanctuary() {
  return (
    <section id="find-sanctuary" style={{ background: C.deepGreen, padding: "6rem 5%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", fontFamily: sans }}>
      <div>
        <Reveal>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: C.white, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Find a Sanctuary Near You
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Donation centers are located across the city, open 7 days a week. Walk in or schedule your visit for a seamless, comfortable experience.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "2.5rem" }}>
            {[
              "Over 340 verified donation centers across 48 cities, updated in real time",
              "See live availability, wait times, and center ratings before you visit",
            ].map((feat) => (
              <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", marginBottom: "0.9rem", lineHeight: 1.5 }}>
                <span style={{ width: 20, height: 20, flexShrink: 0, background: "rgba(74,158,126,0.3)", border: `1.5px solid ${C.lightGreen}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: C.lightGreen, marginTop: 2 }}>✓</span>
                {feat}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={300}>
          <WhiteBtn href="#">Find Donation Centers</WhiteBtn>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <MapWidget />
      </Reveal>
    </section>
  );
}

function MapWidget() {
  const roads = {
    h: ["20%", "40%", "62%", "80%"],
    v: ["20%", "38%", "60%", "78%"],
  };
  const pins = [
    { top: "18%", left: "35%", label: "City Center" },
    { top: "56%", left: "58%", label: "East Wing" },
    { top: "35%", left: "73%", label: "North Hub" },
  ];

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", height: 380, background: "#1a2e26", position: "relative" }}>
      <div style={{
        width: "100%", height: "100%", position: "relative",
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(74,158,126,0.08) 39px,rgba(74,158,126,0.08) 40px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(74,158,126,0.08) 59px,rgba(74,158,126,0.08) 60px)",
      }}>
        {roads.h.map(top => <div key={top} style={{ position: "absolute", height: 2, left: 0, right: 0, top, background: "rgba(255,255,255,0.06)" }} />)}
        {roads.v.map(left => <div key={left} style={{ position: "absolute", width: 2, top: 0, bottom: 0, left, background: "rgba(255,255,255,0.06)" }} />)}

        {pins.map(p => (
          <div key={p.label} style={{ position: "absolute", top: p.top, left: p.left, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <PulsingPin />
            <span style={{ marginTop: 4, fontSize: "0.58rem", color: "rgba(255,255,255,0.8)", fontWeight: 600, background: "rgba(0,0,0,0.5)", padding: "2px 5px", borderRadius: 4, whiteSpace: "nowrap" }}>
              {p.label}
            </span>
          </div>
        ))}

        <div style={{
          position: "absolute", bottom: "1.25rem", left: "1.25rem",
          background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 10, padding: "0.75rem 1rem", color: C.white,
        }}>
          <strong style={{ display: "block", fontSize: "1.1rem", fontFamily: serif }}>340+</strong>
          <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>Active Centers</span>
        </div>
      </div>
    </div>
  );
}

function PulsingPin() {
  return (
    <div style={{
      width: 14, height: 14,
      background: C.red, borderRadius: "50%",
      border: "2px solid white",
      boxShadow: "0 0 0 5px rgba(192,57,43,0.25)",
      animation: "bc-pulse 2s infinite",
    }} />
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { initial: "P", name: "Priya Mehta", role: "First-time donor, Mumbai", quote: "I was nervous about my first donation, but the staff made everything so easy. Knowing my blood went to someone in need is an indescribable feeling." },
  { initial: "R", name: "Rajiv Sharma", role: "Recipient family, Delhi", quote: "My daughter received AB− blood during an emergency surgery. BloodConnect and their donors literally gave her a second chance at life." },
  { initial: "A", name: "Ananya Krishnan", role: "Regular donor, Bengaluru", quote: "I've donated 14 times over 5 years. The app reminds me when I'm eligible and shows the nearest camp. Seamless — I'll keep going as long as I can." },
];

function Testimonials() {
  return (
    <section id="voices" style={{ padding: "6rem 5%", background: C.softGray, fontFamily: sans }}>
      <Reveal><SectionTitle style={{ textAlign: "center" }}>Voices of the Community</SectionTitle></Reveal>
      <Reveal delay={100}><SectionSub style={{ textAlign: "center", margin: "0 auto 3.5rem" }}>Real stories from our amazing donors and recipients who are at the heart of everything we do.</SectionSub></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <TestiCard {...t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TestiCard({ initial, name, role, quote }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.white, borderRadius: 20, padding: "2rem",
        boxShadow: hover ? "0 12px 40px rgba(26,74,58,0.12)" : "0 4px 24px rgba(26,74,58,0.06)",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontFamily: serif, fontSize: "4rem", color: C.paleGreen, lineHeight: 1, fontWeight: 900, marginBottom: "-1rem" }}>"</div>
      <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#4a5e56", marginBottom: "1.5rem", fontStyle: "italic" }}>{quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.paleGreen, border: `2px solid ${C.lightGreen}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: C.deepGreen, fontSize: "1rem", flexShrink: 0 }}>
          {initial}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: C.deepGreen }}>{name}</div>
          <div style={{ fontSize: "0.75rem", color: C.midGray, marginTop: 1 }}>{role}</div>
        </div>
        <div style={{ marginLeft: "auto", color: "#f0b429", fontSize: "0.8rem", letterSpacing: -1 }}>★★★★★</div>
      </div>
    </div>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section id="cta" style={{
      background: C.deepGreen, padding: "7rem 5%", textAlign: "center",
      position: "relative", overflow: "hidden", fontFamily: sans,
    }}>
      {/* Dot grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, rgba(74,158,126,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(192,57,43,0.08) 0%, transparent 50%)` }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900, color: C.white, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Ready to be a <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>hero?</em>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", marginBottom: "2.5rem", maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            Every donation matters. Every donor is a hero. It takes just one hour of your time to potentially save three lives.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <WhiteBtn href="#">Start Your Journey</WhiteBtn>
            <OutlineWhiteBtn href="#find-sanctuary">Find Camps</OutlineWhiteBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  { title: "About", links: ["Our Mission", "Team", "Impact Report", "Press"] },
  { title: "Camps", links: ["Find a Camp", "Host a Camp", "Camp Calendar", "Partners"] },
  { title: "Donate & Contact", links: ["Donate Blood", "Register", "Support", "Contact Us"] },
];

const SOCIAL_ICONS = [
  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
];

function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "4rem 5% 1.5rem", fontFamily: sans }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
        <div>
          <a href="#" style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 700, color: C.white, textDecoration: "none" }}>
            Blood<span style={{ color: C.red }}>Connect</span>
          </a>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "0.75rem", lineHeight: 1.6, maxWidth: 220 }}>
            Connecting generous donors with those who need it most. Together, we save lives every day.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            {SOCIAL_ICONS.map(icon => (
              <SocialBtn key={icon.label} path={icon.path} />
            ))}
          </div>
        </div>

        {FOOTER_COLS.map(col => (
          <div key={col.title}>
            <h5 style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.2rem" }}>
              {col.title}
            </h5>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {col.links.map(link => (
                <li key={link} style={{ marginBottom: "0.65rem" }}>
                  <a href="#" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>© 2026 BloodConnect. All rights reserved.</p>
        <a href="#" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Privacy Policy</a>
      </div>
    </footer>
  );
}

function SocialBtn({ path }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: 36, height: 36, background: hover ? C.accentGreen : "rgba(255,255,255,0.07)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", textDecoration: "none" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={hover ? C.white : "rgba(255,255,255,0.6)"}>
        <path d={path} />
      </svg>
    </a>
  );
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────
function SectionTitle({ children, style = {} }) {
  return <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: C.deepGreen, letterSpacing: "-0.02em", marginBottom: "1rem", ...style }}>{children}</h2>;
}
function SectionSub({ children, style = {} }) {
  return <p style={{ fontSize: "1rem", color: "#5a7068", maxWidth: 520, lineHeight: 1.7, ...style }}>{children}</p>;
}
function PrimaryBtn({ href, children }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: hover ? C.midGreen : C.deepGreen, color: C.white, padding: "0.85rem 2rem", borderRadius: 50, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transform: hover ? "translateY(-2px)" : "none", boxShadow: hover ? "0 8px 24px rgba(26,74,58,0.3)" : "none", transition: "all 0.2s" }}>
      {children}
    </a>
  );
}
function GhostBtn({ href, children }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ border: `2px solid ${C.deepGreen}`, color: C.deepGreen, padding: "0.8rem 2rem", borderRadius: 50, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", background: hover ? C.paleGreen : "transparent", transform: hover ? "translateY(-2px)" : "none", transition: "all 0.2s" }}>
      {children}
    </a>
  );
}
function WhiteBtn({ href, children }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: hover ? C.paleGreen : C.white, color: C.deepGreen, padding: "0.85rem 2rem", borderRadius: 50, fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", display: "inline-block", transform: hover ? "translateY(-2px)" : "none", boxShadow: hover ? "0 8px 24px rgba(255,255,255,0.2)" : "none", transition: "all 0.2s" }}>
      {children}
    </a>
  );
}
function OutlineWhiteBtn({ href, children }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ border: "2px solid rgba(255,255,255,0.5)", color: C.white, padding: "0.8rem 2rem", borderRadius: 50, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", background: hover ? "rgba(255,255,255,0.1)" : "transparent", borderColor: hover ? C.white : "rgba(255,255,255,0.5)", transition: "all 0.2s" }}>
      {children}
    </a>
  );
}
function HeartIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

// ─── Global keyframe injection ─────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; }
      @keyframes bc-pulse {
        0%, 100% { box-shadow: 0 0 0 5px rgba(192,57,43,0.25); }
        50% { box-shadow: 0 0 0 10px rgba(192,57,43,0.08); }
      }
      a { transition: color 0.2s; }
    `}</style>
  );
}

// ─── Root export ───────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <BloodTypes />
        <FindSanctuary />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
