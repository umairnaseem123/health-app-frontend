const SYMPTOMS = [
  { id: 1, name: "Fever", category: "General" },
  { id: 2, name: "Headache", category: "General" },
  { id: 3, name: "Cough", category: "Respiratory" },
  { id: 4, name: "Fatigue", category: "General" },
  { id: 5, name: "Nausea", category: "Digestive" },
  { id: 6, name: "Sore Throat", category: "Respiratory" },
  { id: 7, name: "Shortness of Breath", category: "Respiratory" },
  { id: 8, name: "Body Pain", category: "General" },
  { id: 9, name: "Loss of Taste", category: "Other" },
  { id: 10, name: "Loss of Smell", category: "Other" },
  { id: 11, name: "Chest Pain", category: "Cardiac" },
  { id: 12, name: "Chills", category: "General" },
  { id: 13, name: "Diarrhea", category: "Digestive" },
  { id: 14, name: "Joint Pain", category: "General" },
  { id: 15, name: "Skin Rash", category: "Other" },
  { id: 16, name: "Runny Nose", category: "Respiratory" },
  { id: 17, name: "Dizziness", category: "Other" },
  { id: 18, name: "Vomiting", category: "Digestive" },
  { id: 19, name: "Eye Pain", category: "Other" },
  { id: 20, name: "Abdominal Pain", category: "Digestive" },
];

export function mockGetSymptoms() {
  return Promise.resolve(SYMPTOMS);
}

export function mockCheckRisk(symptomIds) {
  const names = SYMPTOMS.filter((s) => symptomIds.includes(s.id)).map((s) => s.name);
  // simple rule-based mock — replicate this weighting logic on the real FastAPI service
  const hasFeverCough = symptomIds.includes(1) && symptomIds.includes(3);
  const disease = hasFeverCough ? "Flu" : "Common Cold";
  const risk_level = symptomIds.length >= 5 ? "Medium" : "Low";
  return Promise.resolve({
    prediction_id: Date.now(),
    disease,
    risk_level,
    confidence: hasFeverCough ? 87 : 62,
    matched_symptoms: names,
    recommendation:
      risk_level === "Medium"
        ? "Monitor for 48 hours. Consult a doctor if symptoms worsen."
        : "Rest and stay hydrated. Symptoms should improve in a few days.",
  });
}

export function mockRiskHistory() {
  return Promise.resolve([
    { id: 1, date: "2026-06-30", disease: "Common Cold", risk_level: "Low", confidence: 76 },
    { id: 2, date: "2026-06-24", disease: "Flu", risk_level: "Medium", confidence: 87 },
    { id: 3, date: "2026-06-15", disease: "Migraine", risk_level: "Low", confidence: 68 },
    { id: 4, date: "2026-06-05", disease: "Viral Infection", risk_level: "Medium", confidence: 81 },
    { id: 5, date: "2026-05-27", disease: "Common Cold", risk_level: "Low", confidence: 72 },
  ]);
}
