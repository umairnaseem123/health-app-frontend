import client from "./axiosClient";
import {
  mockGetSymptoms,
  mockCheckRisk,
  mockRiskHistory,
} from "./mocks/symptoms.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

export async function getSymptoms() {
  if (USE_MOCK) return mockGetSymptoms();
  const res = await client.get("/symptoms/");
  return res.data.data;
}

export async function checkRisk(symptomIds) {
  if (USE_MOCK) return mockCheckRisk(symptomIds);
  const res = await client.post("/risk-check/", { symptom_ids: symptomIds });
  return res.data.data;
}

export async function getRiskHistory() {
  if (USE_MOCK) return mockRiskHistory();
  const res = await client.get("/risk-check/history/");
  return res.data.data;
}
