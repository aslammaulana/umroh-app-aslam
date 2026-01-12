"use client";

import Deskripsi from "@/components/paket/Deskripsi";
import HargaTermasuk from "@/components/paket/HargaTermasuk";
import HargaTidakTermasuk from "@/components/paket/HargaTidakTermasuk";
import Itinerary from "@/components/paket/Itinerary";
import NavbarDekstop from "@/components/theme/Navbar/NavbarDekstop";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useEffect, useState, use } from "react";
import { FaInfoCircle, FaPlaneDeparture } from "react-icons/fa";
import { hotels } from "@/data/hotels";
import HotelMadinah from "@/components/paket/HotelMadinah";
import HotelMekkah from "@/components/paket/HotelMekkah";
import TagCard from "@/components/paket/TagCard";
import { Package, ItineraryItem, Hotel } from "@/types";
import InformasiTravel from "@/components/paket/InformasiTravel";
import HeroCard from "@/components/paket/HeroCard";
import HeroHeader from "@/components/paket/HeroHeader";
import Navbar from "@/components/theme/Navbar/Navbar";
import { CgSpinner } from "react-icons/cg";
import { Spinner } from '@/components/selia/spinner';
import HotelSection from "@/components/paket/Hotel";



// Ubah params menjadi slug
export default function Page({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const slug = resolvedParams.slug; // Sekarang kita ambil slug

  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);

  // Tambahkan tipe Hotel | null agar import 'Hotel' terpakai dan type-safe
  const hotelMekkah: Hotel | null = pkg
    ? (hotels.find(h => String(h.id) === String(pkg.hotel_mekkah_id)) ?? null)
    : null;

  const hotelMadinah: Hotel | null = pkg
    ? (hotels.find(h => String(h.id) === String(pkg.hotel_madinah_id)) ?? null)
    : null;

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

  if (loading) return <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <Spinner className="size-10" />
    <p className="">Memuat detail paket...</p>
  </div>;
  if (!pkg) return <div className="min-h-screen flex items-center justify-center">Paket tidak ditemukan.</div>;

  return (
    <div className="bg-[#f6f7fa]">
      <Navbar />

      {/* Hero */}
      {/* <HeroHeader title={pkg.title} /> */}

      <div className="relative w-full md:w-[87%] p-3 md:p-0 mx-auto flex flex-col md:flex-row items-start justify-between gap-10 py-0 mt-3 md:mt-10">
        {/* Kiri */}
        <div className="flex flex-col justify-center basis-[70%]">
          <HeroCard
            pkg={pkg}
            onDownloadFlyer={() => {
              console.log("Download flyer:", pkg.title);
              // nanti bisa isi:
              // window.open(pkg.flyer_url)
            }}
          />

          <div className="md:hidden mt-5">
            <TagCard
              pkg={pkg}
              hotelMekkah={hotelMekkah}
              hotelMadinah={hotelMadinah}
            />

          </div>

          <div className="mt-[30px]">
            <div className="flex justify-start items-center gap-5">
              <div className="p-3 bg-[#003d57] rounded-md rounded-br-none rounded-bl-none text-white">
                <FaInfoCircle />
              </div>
              <p className="font-bold text-[#003d57]">Informasi Paket</p>
            </div>
            <div className="border-t-2 border-[#003d57]"></div>
          </div>



          <Deskripsi deskripsi={pkg.deskripsi} />
          <HargaTermasuk />
          <HargaTidakTermasuk />
          <Itinerary itineraries={itineraries} />
          {pkg && (
            <HotelSection pkg={pkg} />
          )}
        </div>

        {/* Kanan  */}
        <div className="basis-[30%] flex flex-col gap-5 w-full">

          <div className="hidden lg:block ">
            <TagCard
              pkg={pkg}
              hotelMekkah={hotelMekkah}
              hotelMadinah={hotelMadinah}
            />

          </div>

          <InformasiTravel />
        </div>
      </div>
      <div className="pt-[100px]"></div>
    </div>
  );
}