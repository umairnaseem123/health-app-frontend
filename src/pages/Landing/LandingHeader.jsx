import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Menu, X } from "lucide-react";

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`landing-header ${scrolled ? "landing-header--scrolled" : ""}`}>
      <div className="landing-header-inner">
        <a href="#top" className="landing-brand">
          <div className="landing-brand-mark">
            <HeartPulse size={16} color="#FF5A44" />
          </div>
          <span>
            AI Health
            <strong>Monitoring</strong>
          </span>
        </a>

        <nav className="landing-header-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="landing-header-actions">
          <Link to="/login">Sign In</Link>
          <Link to="/signup" className="nav-cta">
            Get Started
          </Link>
        </div>

        <button
          className="landing-header-burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`landing-header-mobile ${mobileOpen ? "landing-header-mobile--open" : ""}`}>
        <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
        <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
        <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
        <Link to="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
        <Link to="/signup" className="nav-cta" onClick={() => setMobileOpen(false)}>
          Get Started
        </Link>
      </div>
    </header>
  );
}
