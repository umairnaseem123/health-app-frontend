import client from "./axiosClient";
import { mockLogBP, mockGetBPHistory, mockGetLatestBP } from "./mocks/bp.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

export async function logBP(systolic, diastolic) {
  if (USE_MOCK) return mockLogBP(systolic, diastolic);
  const res = await client.post("/bp/log/", { systolic, diastolic });
  return res.data.data;
}

export async function getBPHistory(days = 30) {
  if (USE_MOCK) return mockGetBPHistory();
  const res = await client.get(`/bp/history/?days=${days}`);
  return res.data.data;
}

export async function getLatestBP() {
  if (USE_MOCK) return mockGetLatestBP();
  const res = await client.get("/bp/latest/");
  return res.data.data;
}
