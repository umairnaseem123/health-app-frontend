import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Volume2, VolumeX, HeartPulse } from "lucide-react";
import { login } from "../../api/auth";
import { speak, isVoiceMuted, setVoiceMuted } from "../../utils/voice";
import EcgStrip from "./EcgStrip";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(isVoiceMuted());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (!muted) {
      const knownName = localStorage.getItem("user_name");
      speak(
        knownName
          ? `Welcome back, ${knownName}. Please sign in to continue.`
          : "Assalam o Alaikum. Welcome to your AI health monitoring system. Please sign in to continue."
      );
    }
    const clock = setInterval(() => setTime(new Date()), 1000);
    return () => {
      window.speechSynthesis?.cancel();
      clearInterval(clock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleVoice() {
    const next = !muted;
    setMuted(next);
    setVoiceMuted(next);
    if (!next) speak("Voice assistant enabled.");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_name", data.user.full_name);

      // no speech here — Dashboard greets the user by name once it has
      // fully mounted, so the sentence never gets cut off by navigation
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const timeString = time.toLocaleTimeString("en-US", { hour12: false });

  return (
    <div className="login-page">
      <div className="status-readout">
        <span className="status-dot" />
        System Status — Online
      </div>
      <div className="status-readout status-readout--right">
        {timeString} · Secure Session
      </div>

      <div className="ecg-track">
        <EcgStrip />
      </div>

      <div className="login-card">
        <button
          type="button"
          className="voice-toggle"
          onClick={toggleVoice}
          title={muted ? "Unmute voice assistant" : "Mute voice assistant"}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <div className="brand-row">
          <div className="brand-mark">
            <HeartPulse size={17} color="#FF5A44" />
          </div>
          <div className="brand-text">
            AI Health
            <strong>Monitoring System</strong>
          </div>
        </div>

        <h1 className="login-heading">Welcome back.</h1>
        <p className="login-subtext">Sign in to access your vitals dashboard.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Email Address</label>
            <div className="field-input-wrap">
              <Mail size={15} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label">Password</label>
            <div className="field-input-wrap">
              <Lock size={15} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="error-text">⚠ {error}</p>}

          <button type="submit" className="signin-button" disabled={loading}>
            <span className="pulse-dot-btn" />
            {loading ? "Authenticating..." : "Sign In"}
            <ArrowRight size={15} />
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <div className="card-status-line">
          <span className="status-dot" style={{ background: "#3ADCC0" }} />
          Encrypted Connection Active
        </div>
      </div>
    </div>
  );
}
