import { useEffect } from "react";

export function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
}

export function isVoiceMuted() {
  return localStorage.getItem("voice_muted") === "true";
}

export function setVoiceMuted(muted) {
  localStorage.setItem("voice_muted", muted ? "true" : "false");
  if (muted) window.speechSynthesis?.cancel();
}

/**
 * Speaks `text` once when the page mounts (small delay so the route
 * transition finishes first). Respects the global mute preference.
 * Pass a `deps` array if the text depends on data that loads async
 * (e.g. wait until a name or result is available before speaking).
 */
export function usePageVoice(text, deps = []) {
  useEffect(() => {
    if (isVoiceMuted() || !text) return;
    const timer = setTimeout(() => speak(text), 350);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
