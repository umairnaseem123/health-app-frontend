import { useState } from "react";
import { Bell, Volume2, VolumeX } from "lucide-react";
import { isVoiceMuted, setVoiceMuted, speak } from "../../utils/voice";

export default function Navbar({ title, subtitle }) {
  const [muted, setMuted] = useState(isVoiceMuted());
  const userName = localStorage.getItem("user_name") || "John Doe";
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function toggleVoice() {
    const next = !muted;
    setMuted(next);
    setVoiceMuted(next);
    if (!next) speak("Voice assistant enabled.");
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)] mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleVoice}
          title={muted ? "Unmute voice assistant" : "Mute voice assistant"}
          className="p-2 rounded-full hover:bg-[var(--primary-light)]"
        >
          {muted ? (
            <VolumeX size={20} className="text-[var(--text-secondary)]" />
          ) : (
            <Volume2 size={20} className="text-[var(--primary)]" />
          )}
        </button>

        <button className="relative p-2 rounded-full hover:bg-[var(--primary-light)]">
          <Bell size={20} className="text-[var(--text-secondary)]" />
          <span className="absolute -top-0.5 -right-0.5 bg-[var(--danger)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] font-semibold text-sm">
            {initials}
          </div>
          <span className="text-sm font-medium">{userName}</span>
        </div>
      </div>
    </div>
  );
}
