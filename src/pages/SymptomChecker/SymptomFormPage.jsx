import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import Navbar from "../../components/ui/Navbar";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import DisclaimerBanner from "../../components/ui/DisclaimerBanner";
import { getSymptoms, checkRisk } from "../../api/symptoms";
import { usePageVoice } from "../../utils/voice";

export default function SymptomFormPage() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  usePageVoice(
    "This is the symptom checker. Select the symptoms you're experiencing, and I'll analyze your risk level using AI."
  );

  useEffect(() => {
    getSymptoms()
      .then(setSymptoms)
      .catch((err) => setError(err.message));
  }, []);

  function toggle(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleAnalyze() {
    if (selected.length === 0) return;
    setError("");
    setLoading(true);
    try {
      const result = await checkRisk(selected);
      navigate("/symptom-checker/result", { state: { result } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Navbar
        title="Symptom Check"
        subtitle="Please select your symptoms to get AI analysis and prediction."
      />

      {error && <p className="error-text mb-4">⚠ {error}</p>}

      <GlassCard className="mb-6">
        <h3 className="font-semibold mb-4">Select Symptoms ({selected.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {symptoms.map((s) => (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`text-sm px-3 py-2.5 rounded-[10px] border text-left transition-colors ${
                selected.includes(s.id)
                  ? "border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] font-medium"
                  : "border-[var(--border)] hover:bg-[var(--primary-light)]"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-between items-center">
        <DisclaimerBanner />
      </div>

      <div className="mt-6">
        <Button onClick={handleAnalyze} disabled={selected.length === 0 || loading}>
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </Button>
      </div>
    </Layout>
  );
}
