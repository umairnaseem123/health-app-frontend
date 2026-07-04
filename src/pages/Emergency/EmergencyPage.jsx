import { useEffect, useState } from "react";
import { Phone, MapPin, Navigation, ShieldAlert } from "lucide-react";
import Layout from "../../components/ui/Layout";
import Navbar from "../../components/ui/Navbar";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import { getNearbyDoctors } from "../../api/emergency";
import { usePageVoice } from "../../utils/voice";

export default function EmergencyPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNearbyDoctors()
      .then((data) => setDoctors(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  usePageVoice(
    "This is the emergency referral page. If your risk level is high, here are nearby doctors you can contact right away.",
    []
  );

  return (
    <Layout>
      <Navbar
        title="Find a Doctor"
        subtitle="Nearby doctors you can contact based on your location."
      />

      <div className="flex items-start gap-3 bg-[var(--danger-light)] border border-[var(--danger)]/30 rounded-[12px] p-4 mb-6">
        <ShieldAlert className="text-[var(--danger)] shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-[var(--text-primary)]">
          <span className="font-semibold">If this is a medical emergency,</span>{" "}
          call your local emergency number immediately instead of using this
          app. The list below is for non-emergency follow-up care.
        </p>
      </div>

      {error && <p className="error-text mb-4">⚠ {error}</p>}

      {loading ? (
        <p className="text-[var(--text-secondary)]">Finding doctors near you...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctors.map((doc) => (
            <GlassCard key={doc.id}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{doc.name}</h3>
                  <p className="text-sm text-[var(--primary)]">{doc.specialty}</p>
                </div>
                <span className="text-xs bg-[var(--primary-light)] text-[var(--primary)] px-2 py-1 rounded-full font-medium">
                  {doc.distance_km} km
                </span>
              </div>

              <p className="text-sm text-[var(--text-secondary)] mb-1">{doc.hospital}</p>

              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4">
                <MapPin size={14} />
                {doc.address}
              </div>

              <div className="flex gap-2">
                <a href={`tel:${doc.phone}`} className="flex-1">
                  <Button fullWidth>
                    <Phone size={14} /> Call
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    doc.hospital + " " + doc.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" fullWidth>
                    <Navigation size={14} /> Directions
                  </Button>
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </Layout>
  );
}
