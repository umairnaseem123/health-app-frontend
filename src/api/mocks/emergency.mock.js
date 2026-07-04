export function mockGetNearbyDoctors() {
  return Promise.resolve([
    {
      id: 1,
      name: "Dr. Ayesha Raza",
      specialty: "General Physician",
      hospital: "South City Hospital",
      address: "Clifton Block 5, Karachi",
      phone: "+92 21 3587 4444",
      distance_km: 1.8,
    },
    {
      id: 2,
      name: "Dr. Bilal Sheikh",
      specialty: "Internal Medicine",
      hospital: "Aga Khan University Hospital",
      address: "Stadium Road, Karachi",
      phone: "+92 21 3486 1234",
      distance_km: 3.2,
    },
    {
      id: 3,
      name: "Dr. Sana Farooq",
      specialty: "Cardiologist",
      hospital: "Tabba Heart Institute",
      address: "Korangi Road, Karachi",
      phone: "+92 21 3520 4801",
      distance_km: 4.6,
    },
    {
      id: 4,
      name: "Dr. Omar Khalid",
      specialty: "General Physician",
      hospital: "Liaquat National Hospital",
      address: "National Stadium Road, Karachi",
      phone: "+92 21 3437 5744",
      distance_km: 5.1,
    },
  ]);
}
