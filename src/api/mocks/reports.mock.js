let mockReportStore = {};

export function mockUploadReport(file) {
  const report_id = Date.now();
  mockReportStore[report_id] = { status: "processing" };

  // simulate OCR taking a couple seconds, like the real Tesseract/FastAPI call would
  setTimeout(() => {
    mockReportStore[report_id] = {
      status: "completed",
      extracted: { wbc: 12500, platelets: 180000, sugar: 145 },
      analysis: {
        wbc_flag: "High — possible infection risk",
        sugar_flag: "Elevated — pre-diabetic range",
      },
    };
  }, 2500);

  return Promise.resolve({ report_id, status: "processing" });
}

export function mockGetReport(reportId) {
  const record = mockReportStore[reportId] || { status: "processing" };
  return Promise.resolve({ report_id: reportId, ...record });
}
