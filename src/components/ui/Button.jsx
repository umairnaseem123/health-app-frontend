export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | outline
  disabled = false,
  fullWidth = false,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
      : "text-[var(--text-primary)] bg-transparent border border-[var(--border)] hover:bg-[var(--primary-light)]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}
