export type Hotel = {
  id: string;
  name: string;
  city: "Mekkah" | "Madinah";
  image: string;
  rate: number;
  location: string;
  description: string;
};

export const hotels: Hotel[] = [
  {
    id: "al-massa-fayzeen",
    name: "Al Massa Dar Fayzeen (Ramada AL Fayzeen)",
    city: "Mekkah",
    image: "/Hotel/Massa.jpg",
    rate: 5,
    location: "Mekkah",
    description:
      "Al Massa Dar Al Fayzeen Makkah, juga dikenal sebagai Ramada by Wyndham Dar Al Fayzeen Makkah..."
  },
  {
    id: "dar-al-naeem",
    name: "Dar Al-Naeem Hotel",
    city: "Madinah",
    image: "/Hotel/Naem.jpg",
    rate: 4,
    location: "Madinah",
    description:
      "Alamat: المركزية الشمالية، شارع الستين، Medina Arab Saudi..."
  },
  {
    id: "ritz-madinah",
    name: "Hotel Ritz Madinah",
    city: "Madinah",
    image: "/Hotel/ritz.jpg",
    rate: 4,
    location: "Madinah",
    description:
      "Al Ritz Al Madina Hotel - pilihan akomodasi yang nyaman..."
  },
  {
    id: "elaf-kinda",
    name: "Elaf Kinda Hotel",
    city: "Mekkah",
    image: "/Hotel/elaf.jpg",
    rate: 3,
    location: "Mekkah",
    description:
      "Di menara megah bertingkat tinggi di sepanjang jalan komersial..."
  }
];
