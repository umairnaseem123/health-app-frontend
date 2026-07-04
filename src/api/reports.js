import client from "./axiosClient";
import { mockUploadReport, mockGetReport } from "./mocks/reports.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

export async function uploadReport(file) {
  if (USE_MOCK) return mockUploadReport(file);
  const formData = new FormData();
  formData.append("file", file);
  const res = await client.post("/reports/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function getReportById(reportId) {
  if (USE_MOCK) return mockGetReport(reportId);
  const res = await client.get(`/reports/${reportId}/`);
  return res.data.data;
}
