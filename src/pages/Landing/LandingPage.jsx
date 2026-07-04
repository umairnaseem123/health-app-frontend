import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Stethoscope,
  HeartPulse,
  FileText,
  ShieldAlert,
  PlayCircle,
  Activity,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import EcgStrip from "../Login/EcgStrip";
import DashboardPreview from "./DashboardPreview";
import LandingHeader from "./LandingHeader";
import FaqSection from "./FaqSection";
import LandingFooter from "./LandingFooter";
import "./LandingPage.css";

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Symptom Risk Checker",
    desc: "Select what you're experiencing and get an AI-estimated risk level with a confidence score in seconds.",
  },
  {
    icon: HeartPulse,
    title: "BP Tracker",
    desc: "Log readings and get instant analysis — Normal, Elevated, High, or Hypertensive Crisis — with clear next steps.",
  },
  {
    icon: FileText,
    title: "Report Analysis",
    desc: "Upload a blood test report and let AI extract and flag key values like WBC, platelets, and sugar.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency Referral",
    desc: "When risk is high, get pointed straight to nearby doctors — because early awareness saves time.",
  },
];

const WHY = [
  {
    icon: Activity,
    title: "Small signals are easy to ignore",
    desc: "A headache, a spike in blood pressure, a strange lab value — these get brushed off until they don't. Regular tracking catches what a one-off checkup misses.",
  },
  {
    icon: Sparkles,
    title: "A starting point, not a guess",
    desc: "Instead of searching symptoms online and spiraling, get a structured, AI-informed estimate of what might be going on and how urgent it is.",
  },
  {
    icon: ShieldCheck,
    title: "Built to nudge, not replace",
    desc: "Every result comes with a clear disclaimer and a direct path to a real doctor the moment it actually matters.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create your account",
    desc: "Sign up in seconds — no medical jargon, no complicated forms.",
  },
  {
    n: "02",
    title: "Log your vitals or symptoms",
    desc: "Track blood pressure, check symptoms, or upload a lab report.",
  },
  {
    n: "03",
    title: "Get AI insight instantly",
    desc: "See your risk level, trends, and whether it's time to see a doctor.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  function handleViewDemo() {
    // lets visitors explore the dashboard instantly without a real login —
    // the actual Login/Signup flow still exists separately, untouched
    localStorage.setItem("access_token", "demo-token");
    localStorage.setItem("user_name", "Guest");
    navigate("/dashboard");
  }

  return (
    <div className="landing" id="top">
      <LandingHeader />

      <section className="landing-hero">
        <div className="hero-ecg-track">
          <EcgStrip />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            AI-Powered Early Risk Detection
          </div>

          <h1 className="hero-heading">
            Know your risk <span>before</span> it becomes a diagnosis.
          </h1>

          <p className="hero-subtext">
            Symptom checking, blood pressure tracking, and lab report
            analysis — in one dashboard. Built to help you decide when to
            see a doctor, not replace one.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate("/signup")} className="btn-primary">
              Get Started <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate("/login")} className="btn-secondary">
              Sign In
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">4</div>
              <div className="hero-stat-label">AI Modules</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">24/7</div>
              <div className="hero-stat-label">Monitoring</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">100%</div>
              <div className="hero-stat-label">Private</div>
            </div>
          </div>
        </div>

        <div className="preview-wrap">
          <DashboardPreview />
        </div>
      </section>

      <section className="why-section">
        <div className="section-eyebrow">Why it matters</div>
        <h2 className="section-heading">
          Most health concerns don't start as emergencies.
        </h2>
        <div className="why-grid">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="why-card">
              <div className="why-icon">
                <Icon size={19} color="#FF5A44" />
              </div>
              <h3 className="why-title">{title}</h3>
              <p className="why-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-eyebrow">What it does</div>
        <h2 className="section-heading">
          Four AI modules, one dashboard for your everyday health decisions.
        </h2>
        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="feature-card">
              <span className="feature-number">0{i + 1}</span>
              <div className="feature-icon">
                <Icon size={17} color="#FF5A44" />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>

        <button onClick={handleViewDemo} className="demo-link" style={{ marginTop: 36 }}>
          <PlayCircle size={14} />
          Or explore a live demo dashboard, no sign up needed →
        </button>
      </section>

      <section id="how-it-works" className="steps-section">
        <div className="steps-inner">
          <div className="section-eyebrow" style={{ color: "#3ADCC0" }}>
            How it works
          </div>
          <h2 className="section-heading">Three steps to your first insight.</h2>
          <div className="steps-grid">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="step-number">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      <div className="disclaimer-band">
        <ShieldAlert size={18} color="#FF5A44" style={{ flexShrink: 0, marginTop: 2 }} />
        <p>
          <strong>Not a medical device.</strong> AI Health Monitoring provides
          AI-based suggestions only and is not a substitute for professional
          medical advice, diagnosis, or treatment. Always consult a doctor
          for accurate diagnosis.
        </p>
      </div>

      <LandingFooter />
    </div>
  );
}
