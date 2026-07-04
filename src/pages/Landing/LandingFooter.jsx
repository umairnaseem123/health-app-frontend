import { Link } from "react-router-dom";
import { HeartPulse, Globe, Send, Mail } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-col footer-brand-col">
          <div className="landing-brand" style={{ marginBottom: 14 }}>
            <div className="landing-brand-mark">
              <HeartPulse size={16} color="#FF5A44" />
            </div>
            <span>
              AI Health
              <strong>Monitoring</strong>
            </span>
          </div>
          <p className="footer-tagline">
            AI-powered early risk detection, blood pressure tracking, and
            report analysis — built to help you decide when to see a doctor.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Website"><Globe size={16} /></a>
            <a href="#" aria-label="Telegram"><Send size={16} /></a>
            <a href="#" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Product</p>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#faq">FAQ</a>
          <Link to="/signup">Get Started</Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Account</p>
          <Link to="/login">Sign In</Link>
          <Link to="/signup">Create Account</Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Legal</p>
          <span className="footer-static-link">Privacy Policy</span>
          <span className="footer-static-link">Terms of Use</span>
          <span className="footer-static-link">Medical Disclaimer</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AI Health Monitoring System</span>
        <span>Built by Umair · Tafsol Technologies</span>
      </div>
    </footer>
  );
}
