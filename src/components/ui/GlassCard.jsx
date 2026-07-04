export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-[16px] p-6 shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  );
}
