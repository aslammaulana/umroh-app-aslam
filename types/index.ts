// types/index.ts

export interface Package {
  id: number;
  slug: string;
  title: string;
  harga: number;
  image: string;
  deskripsi: string;
  tipe_paket: string;
  maskapai: string;
  berangkat_dari: string;
  tanggal_keberangkatan: string;
  durasi: number;
  hotel_mekkah_id: string | null;
  hotel_madinah_id: string | null;
}

export interface ItineraryItem {
  id: number;
  package_id: number;
  day_number: number;
  tanggal: string | null;
  title: string;
  description: string;
}

export interface Hotel {
  id: string | number;
  name: string;
  image: string;
  rate: number;
  location: string;
  description: string;
}

// 3. Definisikan Props untuk Komponen
export interface TagCardProps {
  pkg: Package; 
  hotelMekkah: Hotel | null; // Bisa null jika hotel tidak ditemukan
  hotelMadinah: Hotel | null;
}