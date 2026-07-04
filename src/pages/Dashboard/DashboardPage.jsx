import { useEffect, useState } from "react";
import { Activity, HeartPulse, FileText, ShieldCheck } from "lucide-react";
import Layout from "../../components/ui/Layout";
import Navbar from "../../components/ui/Navbar";
import GlassCard from "../../components/ui/GlassCard";
import BPTrendChart from "../../components/charts/BPTrendChart";
import DisclaimerBanner from "../../components/ui/DisclaimerBanner";
import { getSummary, getBPTrend } from "../../api/dashboard";
import { usePageVoice } from "../../utils/voice";

const STAT_ICONS = {
  total_scans: Activity,
  latest_bp_status: HeartPulse,
  reports_count: FileText,
  latest_risk_level: ShieldCheck,
};

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [bpTrend, setBpTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userName = localStorage.getItem("user_name") || "there";

  useEffect(() => {
    async function load() {
      try {
        const [summaryData, trendData] = await Promise.all([
          getSummary(),
          getBPTrend(),
        ]);
        setSummary(summaryData);
        setBpTrend(trendData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // speaks once the dashboard data has actually loaded, not before
  usePageVoice(
    !loading && !error
      ? `Welcome, ${userName}. This is your health dashboard. Here you can see your total scans, latest blood pressure, reports, and risk level at a glance. Use the sidebar to check your symptoms, track your blood pressure, or upload a report.`
      : null,
    [loading, error]
  );

  const cards = summary
    ? [
        { key: "total_scans", label: "Total Scans", value: summary.total_scans },
        { key: "latest_bp_status", label: "Latest BP", value: summary.latest_bp_status },
        { key: "reports_count", label: "Reports", value: summary.reports_count },
        { key: "latest_risk_level", label: "Latest Risk", value: summary.latest_risk_level },
      ]
    : [];

  return (
    <Layout>
      <Navbar
        title={`Welcome back, ${userName}!`}
        subtitle="Here's your health summary for today."
      />

      {error && <p className="error-text mb-4">⚠ {error}</p>}

      {loading ? (
        <p className="text-[var(--text-secondary)]">Loading your dashboard...</p>
      ) : error ? null : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cards.map(({ key, label, value }) => {
              const Icon = STAT_ICONS[key];
              return (
                <GlassCard key={key}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-[var(--primary-light)]">
                      <Icon size={18} className="text-[var(--primary)]" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                  </div>
                  <p className="text-2xl font-bold">{value}</p>
                </GlassCard>
              );
            })}
          </div>

          <GlassCard className="mb-6">
            <h3 className="font-semibold mb-4">Blood Pressure Trend (7 days)</h3>
            <BPTrendChart data={bpTrend} />
          </GlassCard>

          <DisclaimerBanner />
        </>
      )}
    </Layout>
  );
}
