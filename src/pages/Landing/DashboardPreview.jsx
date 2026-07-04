import { HeartPulse, CheckCircle2, FileText, Activity } from "lucide-react";

const ACTIVITY = [
  { icon: CheckCircle2, text: "Symptom check completed", color: "#3ADCC0" },
  { icon: HeartPulse, text: "Blood pressure logged", color: "#FF5A44" },
  { icon: FileText, text: "Report analyzed", color: "#7C9187" },
];

export default function DashboardPreview() {
  return (
    <div className="preview-frame">
      <div className="preview-chrome">
        <span className="preview-dot" style={{ background: "#FF5A44" }} />
        <span className="preview-dot" style={{ background: "#F5B849" }} />
        <span className="preview-dot" style={{ background: "#3ADCC0" }} />
        <span className="preview-url">app.aihealth.io/dashboard</span>
      </div>

      <div className="preview-shell">
        <div className="preview-mini-sidebar">
          <div className="preview-mini-logo">
            <HeartPulse size={13} color="#FF5A44" />
          </div>
          <span className="preview-mini-item preview-mini-item--active" />
          <span className="preview-mini-item" />
          <span className="preview-mini-item" />
          <span className="preview-mini-item" />
        </div>

        <div className="preview-body">
          <div className="preview-stats">
            <div className="preview-stat">
              <span className="preview-stat-label">Total Scans</span>
              <span className="preview-stat-value">24</span>
            </div>
            <div className="preview-stat">
              <span className="preview-stat-label">Latest BP</span>
              <span className="preview-stat-value" style={{ color: "#0EA98A" }}>
                Normal
              </span>
            </div>
            <div className="preview-stat">
              <span className="preview-stat-label">Risk Level</span>
              <span className="preview-stat-value" style={{ color: "#0EA98A" }}>
                Low
              </span>
            </div>
          </div>

          <div className="preview-chart">
            <div className="preview-chart-head">
              <span className="preview-chart-title">Blood Pressure Trend</span>
              <div className="preview-chart-legend">
                <span className="legend-dot" style={{ background: "#FF5A44" }} />
                Systolic
                <span className="legend-dot" style={{ background: "#3ADCC0" }} />
                Diastolic
              </div>
            </div>
            <svg viewBox="0 0 400 80" width="100%" height="70" preserveAspectRatio="none">
              <polyline
                points="0,50 40,45 80,52 120,40 160,47 200,33 240,43 280,28 320,38 360,25 400,32"
                fill="none"
                stroke="#FF5A44"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polyline
                points="0,62 40,60 80,64 120,58 160,61 200,54 240,59 280,50 320,56 360,48 400,53"
                fill="none"
                stroke="#3ADCC0"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>

          <div className="preview-activity">
            <span className="preview-activity-title">Recent Activity</span>
            {ACTIVITY.map(({ icon: Icon, text, color }) => (
              <div key={text} className="preview-activity-row">
                <Icon size={13} color={color} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
