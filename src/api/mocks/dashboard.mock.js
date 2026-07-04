export function mockGetSummary() {
  return Promise.resolve({
    total_scans: 24,
    latest_risk_level: "Low",
    latest_bp_status: "Normal",
    reports_count: 6,
  });
}

export function mockGetBPTrend() {
  const days = ["May 20", "May 21", "May 22", "May 23", "May 24", "May 25", "May 26"];
  return Promise.resolve(
    days.map((date, i) => ({
      date,
      systolic: 118 + Math.round(Math.sin(i) * 8),
      diastolic: 78 + Math.round(Math.cos(i) * 5),
    }))
  );
}
