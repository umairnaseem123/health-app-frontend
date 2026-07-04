import { useState, useRef, useEffect } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import Layout from "../../components/ui/Layout";
import Navbar from "../../components/ui/Navbar";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import DisclaimerBanner from "../../components/ui/DisclaimerBanner";
import { uploadReport, getReportById } from "../../api/reports";
import { usePageVoice } from "../../utils/voice";

export default function ReportUploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | processing | completed | error
  const [error, setError] = useState("");

  usePageVoice(
    "This is the report upload page. Upload your blood test report, and I'll extract and analyze key values like white blood cells, platelets, and sugar levels."
  );
  const [result, setResult] = useState(null);
  const pollRef = useRef(null);

  // stop polling if the user navigates away mid-upload
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function handleUpload() {
    if (!file) return;
    setError("");
    setStatus("processing");

    try {
      const { report_id } = await uploadReport(file);

      // poll every 2s until OCR finishes — mirrors how the real async backend will behave
      pollRef.current = setInterval(async () => {
        try {
          const data = await getReportById(report_id);
          if (data.status === "completed") {
            clearInterval(pollRef.current);
            setResult(data);
            setStatus("completed");
          } else if (data.status === "failed") {
            clearInterval(pollRef.current);
            setError("Report processing failed. Please try uploading again.");
            setStatus("error");
          }
        } catch (err) {
          clearInterval(pollRef.current);
          setError(err.message);
          setStatus("error");
        }
      }, 2000);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <Layout>
      <Navbar
        title="Report Upload"
        subtitle="Upload your blood test report for AI analysis."
      />

      {error && <p className="error-text mb-4">⚠ {error}</p>}

      <GlassCard className="mb-6">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] rounded-[14px] p-10 cursor-pointer hover:bg-[var(--primary-light)] transition-colors">
          <UploadCloud className="text-[var(--primary)] mb-3" size={32} />
          <p className="text-sm font-medium mb-1">
            {file ? file.name : "Click to upload PDF or image"}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Blood test reports only, max 10MB
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <div className="mt-4">
          <Button
            onClick={handleUpload}
            disabled={!file || status === "processing"}
          >
            {status === "processing" ? "Processing..." : "Analyze Report"}
          </Button>
        </div>
      </GlassCard>

      {status === "processing" && (
        <GlassCard className="mb-6 flex items-center gap-3">
          <Loader2 className="animate-spin text-[var(--primary)]" size={20} />
          <p className="text-sm text-[var(--text-secondary)]">
            Extracting values from your report, this takes a few seconds...
          </p>
        </GlassCard>
      )}

      {status === "completed" && result && (
        <GlassCard className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-[var(--primary)]" />
            <h3 className="font-semibold">Extracted Results</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-[var(--primary-light)] rounded-[10px]">
              <p className="text-xs text-[var(--text-secondary)]">WBC</p>
              <p className="text-lg font-bold">{result.extracted.wbc}</p>
            </div>
            <div className="p-4 bg-[var(--primary-light)] rounded-[10px]">
              <p className="text-xs text-[var(--text-secondary)]">Platelets</p>
              <p className="text-lg font-bold">{result.extracted.platelets}</p>
            </div>
            <div className="p-4 bg-[var(--primary-light)] rounded-[10px]">
              <p className="text-xs text-[var(--text-secondary)]">Sugar</p>
              <p className="text-lg font-bold">{result.extracted.sugar}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-[var(--danger)]">{result.analysis.wbc_flag}</p>
            <p className="text-[var(--warning)]">{result.analysis.sugar_flag}</p>
          </div>
        </GlassCard>
      )}

      <DisclaimerBanner />
    </Layout>
  );
}
