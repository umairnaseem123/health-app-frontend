import { useEffect, useState } from "react";
import { Stethoscope, HeartPulse } from "lucide-react";
import Layout from "../../components/ui/Layout";
import Navbar from "../../components/ui/Navbar";
import GlassCard from "../../components/ui/GlassCard";
import { getRiskHistory } from "../../api/symptoms";
import { getBPHistory } from "../../api/bp";
import { usePageVoice } from "../../utils/voice";

const RISK_COLORS = {
  Low: "text-[var(--success)] bg-[var(--success-light)]",
  Medium: "text-[var(--warning)] bg-[var(--warning-light)]",
  High: "text-[var(--danger)] bg-[var(--danger-light)]",
};

const BP_COLORS = {
  Normal: "text-[var(--success)] bg-[var(--success-light)]",
  Elevated: "text-[var(--warning)] bg-[var(--warning-light)]",
  High: "text-[var(--danger)] bg-[var(--danger-light)]",
  Low: "text-[var(--info)] bg-[var(--info-light)]",
  "Hypertensive Crisis": "text-white bg-[var(--danger)]",
};

export default function HistoryPage() {
  const [tab, setTab] = useState("symptoms"); // symptoms | bp
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [bpHistory, setBpHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getRiskHistory(), getBPHistory()])
      .then(([s, b]) => {
        setSymptomHistory(s);
        setBpHistory([...b].reverse());
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  usePageVoice(
    "This is your health history. Here you can review all your past symptom checks and blood pressure readings.",
    []
  );

  const lowCount = symptomHistory.filter((r) => r.risk_level === "Low").length;
  const medHighCount = symptomHistory.length - lowCount;

  return (
    <Layout>
      <Navbar
        title="Health History"
        subtitle="Review your past symptom checks and blood pressure readings."
      />

      {error && <p className="error-text mb-4">⚠ {error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <GlassCard>
          <p className="text-sm text-[var(--text-secondary)] mb-1">Total Checks</p>
          <p className="text-2xl font-bold">{symptomHistory.length}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-[var(--text-secondary)] mb-1">Low Risk</p>
          <p className="text-2xl font-bold text-[var(--success)]">{lowCount}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-[var(--text-secondary)] mb-1">Medium/High Risk</p>
          <p className="text-2xl font-bold text-[var(--warning)]">{medHighCount}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-[var(--text-secondary)] mb-1">BP Readings</p>
          <p className="text-2xl font-bold">{bpHistory.length}</p>
        </GlassCard>
      </div>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTab("symptoms")}
          className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-medium ${
            tab === "symptoms"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)]"
          }`}
        >
          <Stethoscope size={15} /> Symptom Checks
        </button>
        <button
          onClick={() => setTab("bp")}
          className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-medium ${
            tab === "bp"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)]"
          }`}
        >
          <HeartPulse size={15} /> BP Logs
        </button>
      </div>

      <GlassCard>
        {loading ? (
          <p className="text-[var(--text-secondary)]">Loading history...</p>
        ) : tab === "symptoms" ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-secondary)] border-b border-[var(--border)]">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Condition</th>
                <th className="pb-3 font-medium">Risk Level</th>
                <th className="pb-3 font-medium">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {symptomHistory.map((r) => (
                <tr key={r.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 text-[var(--text-secondary)]">{r.date}</td>
                  <td className="py-3 font-medium">{r.disease}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${RISK_COLORS[r.risk_level]}`}
                    >
                      {r.risk_level}
                    </span>
                  </td>
                  <td className="py-3">{r.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-secondary)] border-b border-[var(--border)]">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Reading</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bpHistory.map((r, i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 text-[var(--text-secondary)]">{r.date}</td>
                  <td className="py-3 font-medium">
                    {r.systolic}/{r.diastolic} mmHg
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${BP_COLORS[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>
    </Layout>
  );
}
