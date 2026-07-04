import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is this a replacement for seeing a doctor?",
    a: "No. AI Health Monitoring gives you an early, AI-based estimate of risk so you know when it's worth seeing a doctor. It never diagnoses or prescribes treatment — think of it as an informed first step, not a final answer.",
  },
  {
    q: "How does the symptom risk checker work?",
    a: "You select what you're experiencing from a list of common symptoms, and a rule-based AI model compares that pattern against known conditions to estimate a risk level and confidence score.",
  },
  {
    q: "What happens to my uploaded reports?",
    a: "Your blood test reports are processed to extract key values like WBC, platelets, and sugar levels, then flagged if anything looks outside the normal range. Your data stays tied to your account only.",
  },
  {
    q: "Is my health data private?",
    a: "Yes. Your readings, symptom checks, and reports are only visible to your account. We don't sell or share personal health data with third parties.",
  },
  {
    q: "What if my risk level comes back high?",
    a: "You'll immediately see an option to find nearby doctors with contact details and directions, so you can follow up quickly without searching around.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <div className="section-eyebrow">Questions</div>
        <h2 className="section-heading">Frequently asked questions.</h2>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  {item.q}
                  <ChevronDown size={18} className="faq-chevron" />
                </button>
                {isOpen && <p className="faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
