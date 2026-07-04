import client from "./axiosClient";
import { mockGetSummary, mockGetBPTrend } from "./mocks/dashboard.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

export async function getSummary() {
  if (USE_MOCK) return mockGetSummary();
  const res = await client.get("/dashboard/summary/");
  return res.data.data;
}

export async function getBPTrend(days = 30) {
  if (USE_MOCK) return mockGetBPTrend();
  const res = await client.get(`/dashboard/bp-trend/?days=${days}`);
  return res.data.data;
}
