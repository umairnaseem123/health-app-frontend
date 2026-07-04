import { AlertTriangle } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <div className="flex items-start gap-3 bg-[var(--warning-light)] border border-[var(--warning)]/30 rounded-[12px] p-4 text-sm">
      <AlertTriangle className="text-[var(--warning)] shrink-0 mt-0.5" size={18} />
      <p className="text-[var(--text-primary)]">
        <span className="font-semibold">Not a medical device.</span> This tool
        provides AI-based suggestions only and is not a substitute for
        professional medical advice, diagnosis, or treatment. Consult a
        doctor for accurate diagnosis.
      </p>
    </div>
  );
}
