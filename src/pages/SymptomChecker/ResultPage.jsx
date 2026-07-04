import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import Navbar from "../../components/ui/Navbar";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import DisclaimerBanner from "../../components/ui/DisclaimerBanner";
import RiskScoreChart from "../../components/charts/RiskScoreChart";
import { usePageVoice } from "../../utils/voice";
import { ShieldAlert } from "lucide-react";

const RISK_COLORS = {
  Low: "text-[var(--success)] bg-[var(--success-light)]",
  Medium: "text-[var(--warning)] bg-[var(--warning-light)]",
  High: "text-[var(--danger)] bg-[var(--danger-light)]",
};

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  usePageVoice(
    result
      ? `Your results are ready. Based on your symptoms, the most likely condition is ${result.disease}, with a ${result.risk_level} risk level and ${result.confidence} percent confidence. ${result.recommendation}`
      : null,
    [result]
  );

  if (!result) {
    return (
      <Layout>
        <Navbar title="Prediction Results" />
        <GlassCard>
          <p className="text-[var(--text-secondary)] mb-4">
            No result found. Please run a symptom check first.
          </p>
          <Button onClick={() => navigate("/symptom-checker")}>
            Go to Symptom Check
          </Button>
        </GlassCard>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar
        title="Prediction Results"
        subtitle="Based on your symptoms and information provided."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <p className="text-sm text-[var(--text-secondary)] mb-1">
            Most Likely Condition
          </p>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">{result.disease}</h2>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${RISK_COLORS[result.risk_level]}`}
            >
              {result.risk_level} Risk
            </span>
          </div>

          <div className="flex justify-center mb-6">
            <RiskScoreChart confidence={result.confidence} riskLevel={result.risk_level} />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {result.matched_symptoms.map((s) => (
              <span
                key={s}
                className="text-xs bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            {result.recommendation}
          </p>
        </GlassCard>

        <div className="flex flex-col gap-4">
          <DisclaimerBanner />

          {(result.risk_level === "Medium" || result.risk_level === "High") && (
            <Button
              onClick={() => navigate("/emergency")}
              fullWidth
            >
              <ShieldAlert size={15} /> Find Doctor Near Me
            </Button>
          )}

          <Button onClick={() => navigate("/symptom-checker")} variant="outline" fullWidth>
            Back to Symptom Check
          </Button>
        </div>
      </div>
    </Layout>
  );
}
