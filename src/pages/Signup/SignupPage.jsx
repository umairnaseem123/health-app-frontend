import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, HeartPulse } from "lucide-react";
import Button from "../../components/ui/Button";
import { signup } from "../../api/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, fullName);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-[24px] overflow-hidden shadow-[var(--shadow-card)] bg-[var(--bg-card)]">
        <div className="p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
            <HeartPulse className="text-[var(--primary)]" size={26} />
            <div>
              <p className="font-bold leading-tight">AI Health</p>
              <p className="text-xs text-[var(--primary)] leading-tight">Monitoring</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1">Create Account</h1>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            Join us to monitor your health and stay healthy.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <div className="flex items-center gap-2 border border-[var(--border)] rounded-[10px] px-3 py-2.5">
                <User size={16} className="text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full outline-none text-sm bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Email Address</label>
              <div className="flex items-center gap-2 border border-[var(--border)] rounded-[10px] px-3 py-2.5">
                <Mail size={16} className="text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full outline-none text-sm bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <div className="flex items-center gap-2 border border-[var(--border)] rounded-[10px] px-3 py-2.5">
                <Lock size={16} className="text-[var(--text-muted)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full outline-none text-sm bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Confirm Password</label>
              <div className="flex items-center gap-2 border border-[var(--border)] rounded-[10px] px-3 py-2.5">
                <Lock size={16} className="text-[var(--text-muted)]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full outline-none text-sm bg-transparent"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-[var(--danger)]" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-sm text-center text-[var(--text-secondary)] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--primary)] font-medium">
              Sign In
            </Link>
          </p>
        </div>

        <div
          className="hidden md:flex flex-col items-center justify-center p-10 text-white text-center"
          style={{
            background:
              "linear-gradient(160deg, var(--gradient-start), var(--gradient-end))",
          }}
        >
          <h2 className="text-3xl font-bold mb-3">Your Health, Our Priority</h2>
          <p className="text-white/80 text-sm">
            AI powered health monitoring and predictions, in your hand.
          </p>
        </div>
      </div>
    </div>
  );
}
