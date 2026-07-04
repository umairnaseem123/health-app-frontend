import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel(); // stop any overlap
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
}

export default function VoiceGreeting({ name = "" }) {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (muted) return;
    const greeting = name
      ? `Assalam o Alaikum ${name}, welcome back to your health dashboard.`
      : "Assalam o Alaikum, welcome to your AI health assistant. Please login to continue.";
    speak(greeting);

    // stop speaking if the user navigates away mid-sentence
    return () => window.speechSynthesis?.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !muted;
        setMuted(next);
        if (next) window.speechSynthesis?.cancel();
      }}
      title={muted ? "Unmute voice greeting" : "Mute voice greeting"}
      className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
