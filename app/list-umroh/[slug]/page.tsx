"use client";

import Deskripsi from "@/components/paket/Deskripsi";
import HargaTermasuk from "@/components/paket/HargaTermasuk";
import HargaTidakTermasuk from "@/components/paket/HargaTidakTermasuk";
import Itinerary from "@/components/paket/Itinerary";
import NavbarDekstop from "@/components/theme/NavbarDekstop";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { FaBed, FaInfoCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { hotels } from "@/data/hotels";
import HotelMadinah from "@/components/paket/HotelMadinah";
import HotelMekkah from "@/components/paket/HotelMekkah";

// Tambahkan slug di type Package
type Package = {
  id: number;
  slug: string; // Tambahkan ini
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
};

type ItineraryItem = {
  id: number;
  package_id: number;
  day_number: number;
  tanggal: string | null;
  title: string;
  description: string;
};

// Ubah params menjadi slug
export default function Page({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const slug = resolvedParams.slug; // Sekarang kita ambil slug

  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);

  const hotelMekkah = pkg ? hotels.find(h => String(h.id) === String(pkg.hotel_mekkah_id)) : null;
  const hotelMadinah = pkg ? hotels.find(h => String(h.id) === String(pkg.hotel_madinah_id)) : null;

  // Fetch package detail BERDASARKAN SLUG
  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("slug", slug) // Filter pakai slug
        .single();

      if (error) {
        console.error("Fetch error:", error.message);
        setPkg(null);
      } else {
        setPkg(data);
      }
      setLoading(false);
    };

    fetchDetail();
  }, [slug]);

  // Fetch itinerary (tetap pakai pkg.id karena relasi di tabel itinerary biasanya pakai ID)
  useEffect(() => {
    if (!pkg?.id) return;

    const fetchItinerary = async () => {
      const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("package_id", pkg.id)
        .order("day_number", { ascending: true });

      if (!error && data) setItineraries(data);
    };

    fetchItinerary();
  }, [pkg?.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat detail paket...</div>;
  if (!pkg) return <div className="min-h-screen flex items-center justify-center">Paket tidak ditemukan.</div>;

  return (
    <div className="bg-[#f2f4f8]">
      <NavbarDekstop />

      {/* Hero */}
      <div className="relative h-[300px] text-white overflow-hidden">
        <Image
          src="/NawayaAssets/umi-hero.png"
          alt="hero image"
          fill
          className="object-center object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-[#072331] opacity-80"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-[20px] md:text-[35px] font-extrabold leading-tight mb-3 capitalize">
            {pkg.title}
          </h1>
        </div>
      </div>

      <div className="relative w-full md:w-[87%] p-3 md:p-0 mx-auto flex flex-col md:flex-row items-start justify-between gap-10 py-10">
        {/* Kiri */}
        <div className="flex flex-col justify-center basis-[70%]">
          <div className="rounded-md p-5 shadow-md border-2 border-[#003d57] flex flex-col gap-5 bg-white">
            <Image
              src={pkg.image}
              alt={pkg.title}
              width={1200}
              height={400}
              className="w-full h-auto object-contain rounded-md"
            />
            {/* Grid Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-[#e4ebff] rounded-md space-y-1">
                <p className="text-[14px]">Durasi</p>
                <p className="font-bold text-[15px]">{pkg.durasi} Hari</p>
              </div>
              <div className="p-4 bg-[#e4ebff] rounded-md space-y-1">
                <p className="text-[14px]">Maskapai</p>
                <p className="font-bold text-[15px]">{pkg.maskapai}</p>
              </div>
              <div className="p-4 bg-[#e4ebff] rounded-md space-y-1">
                <p className="text-[14px]">Keberangkatan</p>
                <p className="font-bold text-[15px]">
                  {new Date(pkg.tanggal_keberangkatan).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="p-4 bg-[#003d57] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#002a3d] transition-colors">
                <p className="font-bold text-[15px] text-white">Download Flyer</p>
              </div>
            </div>
          </div>

          <div className="mt-[30px]">
            <div className="flex justify-start items-center gap-5">
              <div className="p-3 bg-[#003d57] rounded-lg rounded-br-none rounded-bl-none text-white">
                <FaInfoCircle />
              </div>
              <p className="font-bold text-[#003d57]">Informasi Paket</p>
            </div>
            <div className="border-t-2 border-[#003d57]"></div>
          </div>

          <Deskripsi deskripsi={pkg.deskripsi} />
          <HargaTermasuk/>
          <HargaTidakTermasuk/>
          <Itinerary itineraries={itineraries} />

          {hotelMekkah && (
            <HotelMekkah
              name={hotelMekkah.name}
              image={hotelMekkah.image}
              rate={hotelMekkah.rate}
              location={hotelMekkah.location}
              description={hotelMekkah.description}
            />
          )}
          {hotelMadinah && (
            <HotelMadinah
              name={hotelMadinah.name}
              image={hotelMadinah.image}
              rate={hotelMadinah.rate}
              location={hotelMadinah.location}
              description={hotelMadinah.description}
            />
          )}
        </div>

        {/* Kanan - Floating Sidebar */}
        <div className="flex flex-col gap-6 basis-[30%] shadow-md border-2 border-[#003d57] p-6 bg-white rounded-md sticky top-10">
          <div>
            <p className="font-bold mb-1">{pkg.title}</p>
            <h3 className="text-[30px] text-[#003d57] font-bold my-3">
              Rp{pkg.harga?.toLocaleString("id-ID")},-
            </h3>

            <div className="mb-6 text-sm">
              <div className="border-b border-[#c7c7c7] py-4 flex items-baseline">
                <BiSolidPlaneTakeOff className="mr-3 text-[#333333] text-[16px]" />
                <div>
                  <p className="text-[#666666]">Maskapai</p>
                  <p className="font-semibold">{pkg.maskapai || "-"}</p>
                </div>
              </div>
              <div className="border-b border-[#c7c7c7] py-4 flex items-baseline">
                <FaLocationDot className="mr-3 text-[#333333] text-[16px]" />
                <div>
                  <p className="text-[#666666]">Lokasi Keberangkatan</p>
                  <p className="font-semibold">{pkg.berangkat_dari || "-"}</p>
                </div>
              </div>
              <div className="border-b border-[#c7c7c7] py-4 flex items-baseline">
                <FaBed className="mr-3 text-[#333333] text-[16px]" />
                <div>
                  <p className="text-[#666666]">Hotel Mekkah</p>
                  <p className="font-semibold">{hotelMekkah?.name || "-"}</p>
                </div>
              </div>
              <div className="border-b border-[#c7c7c7] py-4 flex items-baseline">
                <FaBed className="mr-3 text-[#333333] text-[16px]" />
                <div>
                  <p className="text-[#666666]">Hotel Madinah</p>
                  <p className="font-semibold">{hotelMadinah?.name || "-"}</p>
                </div>
              </div>
            </div>

            <Link
              href={`https://wa.me/085234567890?text=Halo, saya ingin bertanya tentang paket ${pkg.title}`}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-md px-6 py-3 text-white font-semibold text-[14px] bg-[#d30000] hover:bg-[#2b5844] transition-colors"
            >
              <IoLogoWhatsapp />
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}