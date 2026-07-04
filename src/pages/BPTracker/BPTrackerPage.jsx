import { useEffect, useState } from "react";
import Layout from "../../components/ui/Layout";
import Navbar from "../../components/ui/Navbar";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import DisclaimerBanner from "../../components/ui/DisclaimerBanner";
import BPTrendChart from "../../components/charts/BPTrendChart";
import { logBP, getBPHistory, getLatestBP } from "../../api/bp";
import { usePageVoice } from "../../utils/voice";

const STATUS_COLORS = {
  Normal: "text-[var(--success)] bg-[var(--success-light)]",
  Elevated: "text-[var(--warning)] bg-[var(--warning-light)]",
  High: "text-[var(--danger)] bg-[var(--danger-light)]",
  Low: "text-[var(--info)] bg-[var(--info-light)]",
  "Hypertensive Crisis": "text-white bg-[var(--danger)]",
};

export default function BPTrackerPage() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  usePageVoice(
    "This is your blood pressure tracker. Log a new reading here, and I'll track your trend over time."
  );
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getLatestBP()
      .then(setLatest)
      .catch((err) => setError(err.message));
    getBPHistory()
      .then(setHistory)
      .catch((err) => setError(err.message));
  }, []);

  async function handleLog(e) {
    e.preventDefault();
    if (!systolic || !diastolic) return;
    setError("");
    setLoading(true);
    try {
      const result = await logBP(Number(systolic), Number(diastolic));
      setLatest(result);
      const updatedHistory = await getBPHistory();
      setHistory(updatedHistory);
      setSystolic("");
      setDiastolic("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Navbar title="BP Tracker" subtitle="Log and monitor your blood pressure over time." />

      {error && <p className="error-text mb-4">⚠ {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard>
          <h3 className="font-semibold mb-4">Log New Reading</h3>
          <form onSubmit={handleLog} className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Systolic</label>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                placeholder="120"
                className="w-full border border-[var(--border)] rounded-[10px] px-3 py-2.5 text-sm outline-none"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Diastolic</label>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                placeholder="80"
                className="w-full border border-[var(--border)] rounded-[10px] px-3 py-2.5 text-sm outline-none"
                required
              />
            </div>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Saving..." : "Log Reading"}
            </Button>
          </form>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <h3 className="font-semibold mb-4">Latest Reading</h3>
          {latest && (
            <>
              <div className="flex items-center gap-4 mb-3">
                <p className="text-3xl font-bold">
                  {latest.systolic}/{latest.diastolic}
                  <span className="text-sm font-normal text-[var(--text-secondary)] ml-1">
                    mmHg
                  </span>
                </p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[latest.status]}`}
                >
                  {latest.status}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{latest.advice}</p>
            </>
          )}
        </GlassCard>
      </div>

      <GlassCard className="mb-6">
        <h3 className="font-semibold mb-4">BP Trend (7 days)</h3>
        <BPTrendChart data={history} />
      </GlassCard>

      <DisclaimerBanner />
    </Layout>
  );
}
