// Generates a repeating cardiac-monitor waveform (flat -> P wave -> QRS spike -> T wave -> flat)
// so the login page's signature ECG ticker isn't a static/generic decoration.

const CYCLE =
  "0,30 20,30 30,21 40,30 55,30 60,-6 65,52 75,30 90,30 100,17 115,30 145,30 200,30";

function buildStrip(repeats) {
  const points = [];
  for (let i = 0; i < repeats; i++) {
    CYCLE.split(" ").forEach((pair) => {
      const [x, y] = pair.split(",").map(Number);
      points.push(`${x + i * 200},${y}`);
    });
  }
  return points.join(" ");
}

export default function EcgStrip() {
  // build two identical halves so the -50% translate loop is seamless
  const half = buildStrip(6); // 6 cycles = 1200 units wide

  return (
    <div className="ecg-strip">
      {[0, 1].map((copy) => (
        <svg key={copy} width="1200" height="64" viewBox="-10 -20 1220 60">
          <polyline
            points={half}
            fill="none"
            stroke="#FF5A44"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}
