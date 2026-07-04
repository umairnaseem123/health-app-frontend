import client from "./axiosClient";
import { mockGetNearbyDoctors } from "./mocks/emergency.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

export async function getNearbyDoctors(lat, lng) {
  if (USE_MOCK) return mockGetNearbyDoctors();

  // Only attach lat/lng to the URL if they're real numbers - otherwise the
  // backend receives the literal string "undefined" and rejects it (422).
  const params = {};
  if (typeof lat === "number" && !Number.isNaN(lat)) params.lat = lat;
  if (typeof lng === "number" && !Number.isNaN(lng)) params.lng = lng;

  const res = await client.get("/emergency/nearby-doctors/", { params });
  return res.data.data;
}
