import { Mic } from "lucide-react";
import { useState } from "react";

export default function VoiceInput({ onResult, placeholder = "Tap to speak" }) {
  const [listening, setListening] = useState(false);

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input isn't supported on this browser. Try Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  }

  return (
    <button
      type="button"
      onClick={startListening}
      title={placeholder}
      className={`p-2 rounded-full transition-colors ${
        listening
          ? "bg-[var(--danger)] text-white animate-pulse"
          : "bg-[var(--primary-light)] text-[var(--primary)]"
      }`}
    >
      <Mic size={16} />
    </button>
  );
}
