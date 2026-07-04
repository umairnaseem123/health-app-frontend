function computeStatus(systolic, diastolic) {
  if (systolic >= 180 || diastolic >= 120)
    return { status: "Hypertensive Crisis", advice: "Seek emergency care immediately." };
  if (systolic >= 140 || diastolic >= 90)
    return { status: "High", advice: "Reduce salt intake, avoid caffeine, consult a doctor within a week." };
  if (systolic >= 120 && systolic < 140)
    return { status: "Elevated", advice: "Monitor regularly, reduce sodium, stay active." };
  if (systolic < 90 || diastolic < 60)
    return { status: "Low", advice: "Stay hydrated, avoid sudden posture changes, consult if dizzy." };
  return { status: "Normal", advice: "Great job! Keep maintaining a healthy lifestyle." };
}

export function mockLogBP(systolic, diastolic) {
  const { status, advice } = computeStatus(systolic, diastolic);
  return Promise.resolve({
    id: Date.now(),
    systolic,
    diastolic,
    status,
    advice,
    created_at: new Date().toISOString(),
  });
}

export function mockGetBPHistory() {
  const days = ["May 20", "May 21", "May 22", "May 23", "May 24", "May 25", "May 26"];
  return Promise.resolve(
    days.map((date, i) => {
      const systolic = 118 + Math.round(Math.sin(i) * 8);
      const diastolic = 78 + Math.round(Math.cos(i) * 5);
      const { status } = computeStatus(systolic, diastolic);
      return { date, systolic, diastolic, status };
    })
  );
}

export function mockGetLatestBP() {
  return Promise.resolve({
    systolic: 120,
    diastolic: 80,
    status: "Normal",
    advice: "Your blood pressure is in a healthy range. Keep it up!",
  });
}
