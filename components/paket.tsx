'use client'

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Spinner } from './selia/spinner';

type Package = {
  id: number;
  slug: string; // 1. Tambahkan field slug di sini
  title: string;
  harga: number;
  image: string;
  maskapai: string;
  durasi: number;
  hotel_rate: number;
  tipe_paket: string;
};

export default function PaketUmrohList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      // Memastikan slug juga ikut terambil dari database
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setPackages(data || []);
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  if (loading) return <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <Spinner className="size-10" />
    <p className="">Assalamualaikum</p>

  </div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-blue-700 py-16 px-8 text-center text-white">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 rounded-md px-6 py-3 text-white font-semibold text-[14px] bg-[#ffffff5b] hover:bg-[#2b5844] transition-colors"
        >
          Dashboard
        </Link>
        <h1 className="text-4xl font-bold mb-4">Pilihan Paket Umroh</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Ayo Temukan perjalanan ibadah yang nyaman dan aman bersama kami dengan berbagai pilihan fasilitas terbaik.
        </p>
      </div>

      <div className="p-8 max-w-7xl mx-auto -mt-10">
        {packages.length === 0 ? (
          <div className="bg-white text-center py-20 rounded-2xl shadow-sm">
            <p className="text-gray-400 text-lg">Saat ini belum ada paket yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <img
                    src={pkg.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                    {pkg.tipe_paket}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="font-bold text-xl text-gray-800 line-clamp-1">{pkg.title}</h2>
                    <div className="flex text-yellow-400 text-sm">
                      {'★'.repeat(pkg.hotel_rate)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Harga Paket</p>
                    <p className="text-blue-600 font-black text-2xl">
                      Rp {pkg.harga?.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-lg">✈️</span>
                      <span className="truncate">{pkg.maskapai || '-'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-lg">📅</span>
                      <span>{pkg.durasi || 0} Hari</span>
                    </div>
                  </div>

                  {/* 2. Ubah Link dari ID ke Slug */}
                  <Link
                    href={`/list-umroh/${pkg.slug}`}
                    className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-100"
                  >
                    Lihat Detail Paket
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}